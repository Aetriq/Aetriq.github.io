// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // --- System Update Banner Logic ---
    const banner = document.getElementById('updateBanner');
    const closeBtn = document.getElementById('closeBannerBtn');
    
    if(banner && closeBtn) {
        // Check if the user has already closed it during this browser session
        if(!sessionStorage.getItem('bannerClosed')) {
            banner.classList.remove('hidden');
        }
        
        // When they click X, hide it and remember for the session
        closeBtn.addEventListener('click', () => {
            banner.classList.add('hidden');
            sessionStorage.setItem('bannerClosed', 'true');
        });
    }

    // --- Highly Optimized Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // CRITICAL OPTIMIZATION: Stop observing once visible to save mobile CPU
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observe initial static elements
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // --- Helper function to batch observe newly added elements ---
    const observeNewElements = (container) => {
        if(container) {
            container.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
        }
    };

    // --- Unified Async Data Fetching ---
    async function loadSiteData() {
        try {
            // Load all JSON files concurrently for maximum speed
            const [projectsRes, modelsRes, techRes, creativeRes] = await Promise.all([
                fetch('data/projects.json'),
                fetch('data/models.json'),
                fetch('data/techstack.json'),
                fetch('data/creative.json')
            ]);

            if (projectsRes.ok) {
                const projectData = await projectsRes.json();
                buildProjects(projectData);
            }
            if (modelsRes.ok) {
                const modelData = await modelsRes.json();
                buildModels(modelData);
            }
            if (techRes.ok) {
                const techData = await techRes.json();
                buildTechStack(techData);
            }
            if (creativeRes.ok) {
                const creativeData = await creativeRes.json();
                buildCreative(creativeData);
            }

        } catch (error) {
            console.error("Critical error loading site data:", error);
        }
    }

    // --- Component Builders (DOM Thrashing Eliminated) ---
    
    function buildProjects(data) {
        const highlightContainer = document.getElementById('highlight-container');
        if(highlightContainer && data.highlighted) {
            // Build string in memory, append ONCE
            highlightContainer.innerHTML = data.highlighted.map((proj, index) => {
                const linksHTML = proj.links ? proj.links.map(link => 
                    `<a href="${link.url}" class="btn btn-${link.type}" target="_blank">${link.text}</a>`
                ).join('') : '';

                return `
                    <div class="project-card highlight-card fade-up" style="transition-delay: ${index * 100}ms;">
                        <div class="highlight-body">
                            <h1 style="font-size: 2.5rem; margin-bottom: 5px;">${proj.title}</h1>
                            <h3 class="accent-text" style="margin-bottom: 20px;">${proj.subtitle}</h3>
                            <p class="card-description">${proj.description}</p>
                            <div class="status-indicator" style="border-left-color: ${proj.statusColor};">
                                Status: <strong style="color:${proj.statusColor};">${proj.status}</strong>
                            </div>
                            <div class="card-links">${linksHTML}</div>
                        </div>
                        <div class="card-image">
                            <img src="${proj.image}" alt="${proj.title}" loading="lazy">
                        </div>
                    </div>
                `;
            }).join('');
            observeNewElements(highlightContainer);
        }

        const allContainer = document.getElementById('all-projects-container');
        if(allContainer && data.all) {
            allContainer.innerHTML = data.all.map((proj, index) => {
                const tagsHTML = proj.techStack ? proj.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('') : '';
                const linksHTML = proj.links ? proj.links.map(link => 
                    `<a href="${link.url}" class="btn btn-${link.type}">${link.text}</a>`
                ).join('') : '';

                return `
                    <div class="project-card fade-up" style="transition-delay: ${(index % 3) * 100}ms;">
                        <div class="card-image">
                            <img src="${proj.image}" alt="${proj.title}" loading="lazy">
                        </div>
                        <div class="card-content">
                            <h3 class="card-title">${proj.title}</h3>
                            <p class="card-description">${proj.description}</p>
                            <p class="status-text" style="color:${proj.statusColor};">${proj.status}</p>
                            <div class="card-tech">${tagsHTML}</div>
                            <div class="card-links">${linksHTML}</div>
                        </div>
                    </div>
                `;
            }).join('');
            observeNewElements(allContainer);
        }
    }

    function buildModels(data) {
        const modelsContainer = document.getElementById('models-container');
        if(modelsContainer && data.models) {
            modelsContainer.innerHTML = data.models.map((model, index) => `
                <div class="project-card fade-up" style="transition-delay: ${(index % 3) * 100}ms;">
                    <div class="card-image printables-img">
                        <img src="${model.image}" alt="${model.title}" loading="lazy">
                        <div class="printables-badge">Printables</div>
                    </div>
                    <div class="card-content centered-content"> 
                        <h3 class="card-title">${model.title}</h3>
                        <p class="card-description"><i>updated ${model.updated}</i><br><br>${model.description}</p>
                        <a href="${model.link}" target="_blank" class="btn btn-primary full-width">View on Printables</a>
                    </div>
                </div>
            `).join('');
            observeNewElements(modelsContainer);
        }
    }

    function buildTechStack(data) {
        const container = document.getElementById('tech-stack-container');
        if(container && data.categories) {
            container.innerHTML = data.categories.map((cat, index) => `
                <div class="tech-category-card fade-up" style="transition-delay: ${index * 150}ms;">
                    <h3>${cat.title}</h3>
                    <div class="tech-pill-grid">
                        ${cat.skills.map(skill => `<span class="tech-pill">${skill}</span>`).join('')}
                    </div>
                </div>
            `).join('');
            observeNewElements(container);
        }
    }

    function buildCreative(data) {
        const descContainer = document.getElementById('creative-description');
        const gridContainer = document.getElementById('creative-grid');
        
        if(descContainer && data.description) {
            descContainer.innerHTML = `<p>${data.description}</p>`;
        }
        
        if(gridContainer && data.items) {
            gridContainer.innerHTML = data.items.map((item, index) => `
                <div class="creative-item fade-up" style="transition-delay: ${(index % 3) * 100}ms;">
                    <img src="${item.image}" alt="Creative Work Thumbnail" loading="lazy">
                </div>
            `).join('');
            observeNewElements(gridContainer);
        }
    }

    // Initialize the engine
    loadSiteData();
});