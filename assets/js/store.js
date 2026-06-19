// assets/js/store.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // --- Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    let productsData = [];
    let currentProductIndex = 0;
    let currentImageIndex = 0;

    const grid = document.getElementById('productGrid');
    const modal = document.getElementById('productModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const carouselImg = document.getElementById('carouselImg');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const imageCounter = document.getElementById('imageCounter');
    
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalStatusBadge = document.getElementById('modalStatusBadge');
    const modalActionBtn = document.getElementById('modalActionBtn');

    // --- Fetch Store Data ---
    fetch('data/store.json')
        .then(res => {
            if(!res.ok) throw new Error("Could not load store data");
            return res.json();
        })
        .then(data => {
            productsData = data.products;
            
            productsData.forEach((prod, index) => {
                const isAvailable = prod.status === 'available';
                const mainImg = prod.images && prod.images.length > 0 ? prod.images[0] : 'https://via.placeholder.com/400x300/111/fff?text=No+Image';
                
                // Sold overlay logic
                const soldOverlay = !isAvailable ? 
                    `<div style="position:absolute; inset:0; background:rgba(0,0,0,0.7); display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:1.5rem; letter-spacing:4px; text-transform:uppercase;">Sold Out</div>` : '';

                const cardHTML = `
                    <div class="project-card fade-up" style="transition-delay: ${(index % 4) * 50}ms; cursor: pointer;" data-index="${index}">
                        <div class="card-image" style="position: relative;">
                            <img src="${mainImg}" alt="${prod.title}">
                            ${soldOverlay}
                        </div>
                        <div class="card-content">
                            <h3 style="font-size: 1.15rem; margin-bottom: 15px; line-height: 1.4;">${prod.title}</h3>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.05);">
                                <span style="font-family: monospace; font-size: 1.2rem; font-weight: bold; color: ${isAvailable ? 'var(--accent-gold)' : 'var(--body-text)'};">
                                    ${isAvailable ? prod.price : 'SOLD'}
                                </span>
                                <span class="btn ${isAvailable ? 'btn-outline' : ''}" style="${!isAvailable ? 'padding:0; border:none; color:var(--body-text); font-size:0.9rem;' : 'padding: 8px 16px;'}">
                                    ${isAvailable ? 'View Details' : 'Archived'}
                                </span>
                            </div>
                        </div>
                    </div>
                `;
                
                // Append card
                grid.insertAdjacentHTML('beforeend', cardHTML);
            });

            // Add click listeners to newly created cards
            document.querySelectorAll('#productGrid .project-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    const idx = card.getAttribute('data-index');
                    openModal(parseInt(idx));
                });
                observer.observe(card);
            });
        })
        .catch(err => console.error("Error loading store:", err));

    // --- Modal Logic ---
    function openModal(productIndex) {
        currentProductIndex = productIndex;
        currentImageIndex = 0;
        const prod = productsData[currentProductIndex];
        
        modalTitle.textContent = prod.title;
        modalDesc.textContent = prod.desc; 
        
        if (prod.status === 'available') {
            modalStatusBadge.textContent = 'Available';
            modalStatusBadge.className = 'status-badge status-available';
            
            modalActionBtn.textContent = `Buy Now - ${prod.price}`;
            modalActionBtn.className = 'btn btn-primary';
            modalActionBtn.disabled = false;
            modalActionBtn.onclick = () => window.open(prod.link, '_blank');
        } else {
            modalStatusBadge.textContent = 'Sold Out';
            modalStatusBadge.className = 'status-badge status-sold';

            modalActionBtn.textContent = 'Item Unavailable';
            modalActionBtn.className = 'btn';
            modalActionBtn.style.background = 'rgba(255,255,255,0.1)';
            modalActionBtn.style.color = 'var(--body-text)';
            modalActionBtn.disabled = true;
            modalActionBtn.onclick = null;
        }

        updateCarousel();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    function updateCarousel() {
        const prod = productsData[currentProductIndex];
        const hasImages = prod.images && prod.images.length > 0;
        
        if(hasImages) {
            carouselImg.src = prod.images[currentImageIndex];
            imageCounter.textContent = `${currentImageIndex + 1} / ${prod.images.length}`;
            
            const showControls = prod.images.length > 1;
            prevBtn.style.display = showControls ? 'flex' : 'none';
            nextBtn.style.display = showControls ? 'flex' : 'none';
            imageCounter.style.display = showControls ? 'block' : 'none';
        } else {
            carouselImg.src = 'https://via.placeholder.com/800x600/111/fff?text=No+Image';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            imageCounter.style.display = 'none';
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; 
    }

    // Modal Event Listeners
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    nextBtn.addEventListener('click', () => {
        const prod = productsData[currentProductIndex];
        currentImageIndex = (currentImageIndex + 1) % prod.images.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        const prod = productsData[currentProductIndex];
        currentImageIndex = (currentImageIndex - 1 + prod.images.length) % prod.images.length;
        updateCarousel();
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight' && productsData[currentProductIndex].images.length > 1) nextBtn.click();
        if (e.key === 'ArrowLeft' && productsData[currentProductIndex].images.length > 1) prevBtn.click();
    });
});