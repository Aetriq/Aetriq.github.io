// assets/js/store.js

document.addEventListener('DOMContentLoaded', () => {
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
                
                const soldOverlay = !isAvailable ? 
                    `<div style="position:absolute; inset:0; background:rgba(0,0,0,0.7); display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; font-size:22px; letter-spacing:2px; text-transform:uppercase;">Sold Out</div>` : '';

                const cardHTML = `
                    <div class="project-card" style="cursor: pointer;" data-index="${index}">
                        <div class="card-image" style="position: relative;">
                            <img src="${mainImg}" alt="${prod.title}" style="width: 100%; height: 220px; object-fit: cover;">
                            ${soldOverlay}
                        </div>
                        <div class="card-content">
                            <h3 style="font-size: 18px; margin-bottom: 12px;">${prod.title}</h3>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 12px; border-top: 1px solid #222;">
                                <span style="font-size: 18px; font-weight: bold; color: ${isAvailable ? 'var(--accent-gold)' : 'var(--body-text)'};">
                                    ${isAvailable ? prod.price : 'SOLD'}
                                </span>
                                <span class="btn ${isAvailable ? 'btn-outline' : ''}" style="${!isAvailable ? 'padding:0; border:none; color:var(--body-text); font-size:14px;' : 'padding: 5px 12px;'}">
                                    ${isAvailable ? 'View Details' : 'Archived'}
                                </span>
                            </div>
                        </div>
                    </div>
                `;
                
                if (grid) grid.insertAdjacentHTML('beforeend', cardHTML);
            });

            document.querySelectorAll('#productGrid .project-card').forEach(card => {
                card.addEventListener('click', () => {
                    const idx = card.getAttribute('data-index');
                    openModal(parseInt(idx));
                });
            });
        })
        .catch(err => console.error("Error loading store:", err));

    function openModal(productIndex) {
        if (!modal) return;
        currentProductIndex = productIndex;
        currentImageIndex = 0;
        const prod = productsData[currentProductIndex];
        
        modalTitle.textContent = prod.title;
        modalDesc.textContent = prod.desc; 
        
        if (prod.status === 'available') {
            modalStatusBadge.textContent = 'Available';
            modalStatusBadge.style.color = '#4CAF50';
            modalStatusBadge.style.border = '1px solid #4CAF50';
            
            modalActionBtn.textContent = `Buy Now - ${prod.price}`;
            modalActionBtn.className = 'btn btn-primary';
            modalActionBtn.disabled = false;
            modalActionBtn.onclick = () => window.open(prod.link, '_blank');
        } else {
            modalStatusBadge.textContent = 'Sold Out';
            modalStatusBadge.style.color = '#f44336';
            modalStatusBadge.style.border = '1px solid #f44336';

            modalActionBtn.textContent = 'Item Unavailable';
            modalActionBtn.className = 'btn';
            modalActionBtn.style.background = '#222';
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
            prevBtn.style.display = showControls ? 'block' : 'none';
            nextBtn.style.display = showControls ? 'block' : 'none';
            imageCounter.style.display = showControls ? 'block' : 'none';
        } else {
            carouselImg.src = 'https://via.placeholder.com/800x600/111/fff?text=No+Image';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            imageCounter.style.display = 'none';
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; 
        }
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const prod = productsData[currentProductIndex];
            currentImageIndex = (currentImageIndex + 1) % prod.images.length;
            updateCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const prod = productsData[currentProductIndex];
            currentImageIndex = (currentImageIndex - 1 + prod.images.length) % prod.images.length;
            updateCarousel();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!modal || !modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight' && productsData[currentProductIndex].images.length > 1) nextBtn.click();
        if (e.key === 'ArrowLeft' && productsData[currentProductIndex].images.length > 1) prevBtn.click();
    });
});