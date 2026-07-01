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
            highlightContainer.innerHTML = data.highlighted.map((proj, index) => {
                
                // 1. Map main buttons
                const linksHTML = proj.links ? proj.links.map(link => 
                    `<a href="${link.url}" class="btn btn-${link.type}" target="_blank">${link.text}</a>`
                ).join('') : '';

                // 2. NEW: Map affiliate icons
                const affiliatesHTML = proj.affiliates ? `
                    <div class="affiliate-links">
                        ${proj.affiliates.map(aff => `
                            <a href="${aff.url}" target="_blank" title="${aff.name}">
                                <img src="${aff.icon}" alt="${aff.name}" class="affiliate-icon" loading="lazy">
                            </a>
                        `).join('')}
                    </div>
                ` : '';

                // 3. Return the full HTML
                return `
                    <div class="project-card highlight-card fade-up" style="transition-delay: ${index * 100}ms;">
                        <div class="highlight-body">
                            <h1 style="font-size: 2.5rem; margin-bottom: 5px;">${proj.title}</h1>
                            <h3 class="accent-text" style="margin-bottom: 20px; color: var(--accent-red); font-family: 'JetBrains Mono', monospace;">${proj.subtitle}</h3>
                            <p class="card-description">${proj.description}</p>
                            <div class="status-indicator" style="border-left: 2px solid ${proj.statusColor}; padding-left: 15px; margin-bottom: 25px; font-family: 'JetBrains Mono', monospace; font-size: 0.9rem;">
                                Status: <strong style="color:${proj.statusColor};">${proj.status}</strong>
                            </div>
                            <div class="card-links">${linksHTML}</div>
                            ${affiliatesHTML} </div>
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
        const legacyDescContainer = document.getElementById('legacy-description'); // Added
        const channelsContainer = document.getElementById('channels-container');
        const mainGrid = document.getElementById('creative-grid-main');
        const legacyGrid = document.getElementById('creative-grid-legacy');
        const legacyWrapper = document.getElementById('legacy-section-wrapper');
        
        // Added white-space: pre-wrap to force \n\n line breaks
        if (descContainer && data.description) {
            descContainer.innerHTML = `<p style="font-size: 1.1rem; opacity: 0.85; white-space: pre-wrap;">${data.description}</p>`;
        }
        // 1. Build Channel Banners
        if (channelsContainer && data.channels) {
            channelsContainer.innerHTML = data.channels.map((channel, index) => `
                <a href="${channel.url}" target="_blank" class="channel-card fade-up" style="transition-delay: ${index * 100}ms;">
                    <img src="${channel.banner}" alt="Banner" class="channel-banner" loading="lazy">
                    <div class="channel-info">
                        <img src="${channel.avatar}" alt="${channel.name}" class="channel-avatar" loading="lazy">
                        <h3 class="channel-name">${channel.name}</h3>
                    </div>
                </a>
            `).join('');
            observeNewElements(channelsContainer);
        }
        
        // Helper function to build the video card HTML
        const generateVideoCards = (items) => {
            return items.map((item, index) => {
                const parentChannel = data.channels ? data.channels.find(c => c.id === item.channelId) : null;
                const avatarSrc = item.customIcon ? item.customIcon : (parentChannel ? parentChannel.avatar : '');
                const avatarHTML = avatarSrc ? `<img src="${avatarSrc}" class="video-channel-icon" alt="Channel Icon" loading="lazy">` : '';
                const dateHTML = item.date ? `<span class="creative-date">${item.date}</span>` : '';

                return `
                    <a href="${item.videoUrl || '#'}" target="_blank" class="creative-card fade-up" style="transition-delay: ${(index % 4) * 100}ms;">
                        <div class="creative-thumb">
                            <img src="${item.image}" alt="${item.title || 'Creative Video'}" loading="lazy">
                            <div class="play-overlay">
                                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                        </div>
                        <div class="creative-info">
                            ${avatarHTML}
                            <div class="creative-text-group">
                                <h3 class="creative-title">${item.title || 'Video Title'}</h3>
                                ${dateHTML}
                            </div>
                        </div>
                    </a>
                `;
            }).join('');
        };

        // 2. Build Video Cards & Split by Legacy Status
        if (data.items) {
            const mainItems = data.items.filter(item => !item.isLegacy);
            const legacyItems = data.items.filter(item => item.isLegacy);

            if (mainGrid && mainItems.length > 0) {
                mainGrid.innerHTML = generateVideoCards(mainItems);
                observeNewElements(mainGrid);
            }

            if (legacyGrid && legacyWrapper) {
                if (legacyItems.length > 0) {
                    legacyGrid.innerHTML = generateVideoCards(legacyItems);
                    legacyWrapper.style.display = 'block'; 
                    
                    // Inject the new legacy description with line break support
                    if (legacyDescContainer && data.legacyDescription) {
                        legacyDescContainer.innerHTML = `<p style="font-size: 1rem; color: #888; white-space: pre-wrap;">${data.legacyDescription}</p>`;
                    }

                    observeNewElements(legacyGrid);
                    
                    legacyGrid.addEventListener('mouseenter', () => { legacyGrid.style.opacity = '1'; legacyGrid.style.filter = 'grayscale(0%)'; });
                    legacyGrid.addEventListener('mouseleave', () => { legacyGrid.style.opacity = '0.65'; legacyGrid.style.filter = 'grayscale(40%)'; });
                }
            }
        }
    }
    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop page refresh
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            // Cyber-style success state
            btn.innerText = "[ MESSAGE_TRANSMITTED ]";
            btn.style.background = "#2b7a0b"; // Green success color
            btn.style.color = "#fff";
            
            // Reset form after 3 seconds
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "var(--accent-red)";
                contactForm.reset();
            }, 3000);
        });
    }
    // Initialize the engine
    loadSiteData();
});