// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // --- Scroll Spy & Navigation Highlight ---
    const sections = document.querySelectorAll('section[id], div[id="home"]');
    const navItems = document.querySelectorAll('.nav-links a');

    // Close mobile menu when a link is clicked
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    if (sections.length > 0 && navItems.length > 0) {
        const scrollSpyOptions = { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0 };
        const scrollSpyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navItems.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }, scrollSpyOptions);
        sections.forEach(sec => scrollSpyObserver.observe(sec));
    }

    // --- System Update Banner Logic ---
    const banner = document.getElementById('updateBanner');
    const closeBtn = document.getElementById('closeBannerBtn');
    
    if(banner && closeBtn) {
        if(!sessionStorage.getItem('bannerClosed')) {
            banner.classList.remove('hidden');
        }
        closeBtn.addEventListener('click', () => {
            banner.classList.add('hidden');
            sessionStorage.setItem('bannerClosed', 'true');
        });
    }

    // --- Highly Optimized Scroll Animations ---
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    const observeNewElements = (container) => {
        if(container) container.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    };

    // --- Unified Async Data Fetching ---
    async function loadSiteData() {
        try {
            const [projectsRes, modelsRes, techRes, creativeRes] = await Promise.all([
                fetch('data/projects.json'), fetch('data/models.json'), fetch('data/techstack.json'), fetch('data/creative.json')
            ]);

            if (projectsRes.ok) buildProjects(await projectsRes.json());
            if (modelsRes.ok) buildModels(await modelsRes.json());
            if (techRes.ok) buildTechStack(await techRes.json());
            if (creativeRes.ok) buildCreative(await creativeRes.json());
        } catch (error) {
            console.error("Critical error loading site data:", error);
        }
    }

    function buildProjects(data) {
        // Highlighted Projects - Horizontal Banner & Detached Glass Box
        const highlightContainer = document.getElementById('highlight-container');
        if(highlightContainer && data.highlighted) {
            highlightContainer.innerHTML = data.highlighted.map((proj, index) => {
                const linksHTML = proj.links ? proj.links.map(link => 
                    `<a href="${link.url}" class="btn btn-${link.type}" target="_blank" rel="noopener noreferrer">${link.text}</a>`
                ).join('') : '';

                const affiliatesHTML = proj.affiliates ? `
                    <div style="display: flex; gap: 20px; margin-top: 30px; padding-top: 20px; border-top: 1px dashed rgba(255, 255, 255, 0.1); flex-wrap: wrap; align-items: center;">
                        ${proj.affiliates.map(aff => `
                            <a href="${aff.url}" target="_blank" rel="noopener noreferrer" title="${aff.name}">
                                <img src="${aff.icon}" alt="${aff.name}" style="width: 40px; height: 40px; object-fit: contain; filter: grayscale(100%); opacity: 0.6; transition: all 0.3s;" onmouseover="this.style.filter='grayscale(0%)'; this.style.opacity='1'" onmouseout="this.style.filter='grayscale(100%)'; this.style.opacity='0.6'">
                            </a>
                        `).join('')}
                    </div>
                ` : '';

                return `
                    <div class="project-card highlight-card fade-up" style="transition-delay: ${index * 100}ms;">
                        <div class="card-image" style="width: 100%; height: 400px; position: relative; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">
                            <img src="${proj.image}" alt="${proj.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
                            
                            <div style="position: absolute; bottom: 30px; left: 30px; max-width: calc(100% - 60px); background: rgba(14, 17, 22, 0.85); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); padding: 25px 35px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.6);">
                                <h1 style="font-size: clamp(1.8rem, 3.5vw, 2.8rem); margin-bottom: 5px; color: var(--primary-text); line-height: 1.1;">${proj.title}</h1>
                                <h3 style="margin: 0; color: var(--accent-red); font-family: 'JetBrains Mono', monospace; font-size: 1rem; letter-spacing: 1px;">${proj.subtitle}</h3>
                            </div>
                        </div>
                        
                        <div class="highlight-body" style="padding: 40px;">
                            <div style="border-left: 2px solid ${proj.statusColor}; padding-left: 15px; margin-bottom: 30px; font-family: 'JetBrains Mono', monospace; font-size: 0.9rem;">
                                Status: <strong style="color:${proj.statusColor};">${proj.status}</strong>
                            </div>
                            
                            <div class="highlight-desc-container" style="margin-bottom: 30px;">
                                <button class="desc-toggle-btn btn btn-outline" onclick="this.parentElement.classList.toggle('expanded')" style="border-color: rgba(255,255,255,0.2); color: var(--primary-text); background: transparent;">
                                    <span>View Details</span>
                                    <svg class="toggle-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 8px; transition: transform 0.3s ease;"><path d="M6 9l6 6 6-6"/></svg>
                                </button>
                                
                                <div class="card-description-collapsible" style="max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;">
                                    <p style="white-space: pre-wrap; opacity: 0.85; line-height: 1.7; padding-top: 25px; margin: 0; font-size: 1.05rem;">${proj.description}</p>
                                </div>
                            </div>
                            
                            <div style="display: flex; gap: 15px; flex-wrap: wrap;">${linksHTML}</div>
                            ${affiliatesHTML}
                        </div>
                    </div>
                `;
            }).join('');
            observeNewElements(highlightContainer);
        }

        // All Projects (Standard Grid) - NOW WITH EXPLICIT DETAILS BUTTON
        const allContainer = document.getElementById('all-projects-container');
        if(allContainer && data.all) {
            allContainer.innerHTML = data.all.map((proj, index) => {
                const linksHTML = proj.links ? proj.links.map(link => 
                    `<a href="${link.url}" class="btn btn-${link.type} btn-compact" target="_blank" rel="noopener noreferrer">${link.text}</a>`
                ).join('') : '';

                return `
                    <div class="project-card fade-up" style="transition-delay: ${(index % 3) * 100}ms;">
                        <div class="card-image" style="position: relative;">
                            <img src="${proj.image}" alt="${proj.title}" loading="lazy">
                            <div class="desc-popup-overlay">
                                <p>${proj.description}</p>
                                <p style="color:${proj.statusColor}; margin-top: 15px; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; text-transform: uppercase;">STATUS: ${proj.status}</p>
                            </div>
                        </div>
                        <div class="card-content" style="display: flex; flex-direction: column;">
                            <h3 class="card-title" style="margin: 0; margin-bottom: 15px;">${proj.title}</h3>
                            
                            <div style="margin-top: auto; display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
                                <!-- Explicit Details Button -->
                                <button class="btn btn-outline btn-compact desc-toggle-btn" onclick="this.closest('.project-card').classList.toggle('show-desc')" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-color: var(--accent-gold); color: var(--accent-gold); background: transparent;">
                                    <span>Details</span>
                                    <svg class="toggle-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.3s;"><path d="M9 18l6-6-6-6"/></svg>
                                </button>
                                ${linksHTML}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            observeNewElements(allContainer);
        }
    }

    function buildModels(data) {
        // 3D Models - NOW WITH EXPLICIT DESCRIPTION BUTTON
        const modelsContainer = document.getElementById('models-container');
        if(modelsContainer && data.models) {
            modelsContainer.innerHTML = data.models.map((model, index) => `
                <div class="project-card fade-up" style="transition-delay: ${(index % 3) * 100}ms;">
                    <div class="card-image printables-img" style="position: relative;">
                        <img src="${model.image}" alt="${model.title}" loading="lazy">
                        <div class="desc-popup-overlay">
                            <p style="color: var(--accent-gold); font-size: 0.8rem; margin-bottom: 10px; font-family: 'JetBrains Mono', monospace; text-transform: uppercase;">UPDATED ${model.updated}</p>
                            <p>${model.description}</p>
                        </div>
                    </div>
                    <div class="card-content centered-content" style="display: flex; flex-direction: column; height: 100%;"> 
                        <h3 class="card-title" style="margin: 0; margin-bottom: 25px; text-align: center;">${model.title}</h3>
                        
                        <div style="margin-top: auto; display: flex; flex-direction: column; gap: 10px;">
                            <!-- Explicit Details Button -->
                            <button class="btn btn-outline btn-compact desc-toggle-btn" onclick="this.closest('.project-card').classList.toggle('show-desc')" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-color: var(--accent-gold); color: var(--accent-gold); background: transparent; width: 100%;">
                                <span>Description</span>
                                <svg class="toggle-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.3s;"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                            <a href="${model.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-compact" style="width: 100%;">View on Printables</a>
                        </div>
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
        const legacyDescContainer = document.getElementById('legacy-description'); 
        const channelsContainer = document.getElementById('channels-container');
        const mainGrid = document.getElementById('creative-grid-main');
        const legacyGrid = document.getElementById('creative-grid-legacy');
        const legacyWrapper = document.getElementById('legacy-section-wrapper');
        
        if (descContainer && data.description) {
            descContainer.innerHTML = `<p style="font-size: 1.1rem; opacity: 0.85; white-space: pre-wrap;">${data.description}</p>`;
        }
        
        if (channelsContainer && data.channels) {
            channelsContainer.innerHTML = data.channels.map((channel, index) => `
                <a href="${channel.url}" target="_blank" rel="noopener noreferrer" class="channel-card fade-up" style="transition-delay: ${index * 100}ms;">
                    <img src="${channel.banner}" alt="Banner" class="channel-banner" loading="lazy">
                    <div class="channel-info">
                        <img src="${channel.avatar}" alt="${channel.name}" class="channel-avatar" loading="lazy">
                        <h3 class="channel-name">${channel.name}</h3>
                    </div>
                </a>
            `).join('');
            observeNewElements(channelsContainer);
        }
        
        const generateVideoCards = (items) => {
            return items.map((item, index) => {
                const parentChannel = data.channels ? data.channels.find(c => c.id === item.channelId) : null;
                const avatarSrc = item.customIcon ? item.customIcon : (parentChannel ? parentChannel.avatar : '');
                const avatarHTML = avatarSrc ? `<img src="${avatarSrc}" class="video-channel-icon" alt="Icon" loading="lazy" style="width: 32px; height: 32px; border-radius: 50%;">` : '';
                const dateHTML = item.date ? `<span class="creative-date">${item.date}</span>` : '';

                return `
                    <a href="${item.videoUrl || '#'}" target="_blank" rel="noopener noreferrer" class="creative-card fade-up" style="transition-delay: ${(index % 4) * 100}ms;">
                        <div class="creative-thumb">
                            <img src="${item.image}" alt="${item.title || 'Video'}" loading="lazy">
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

        if (data.items) {
            const mainItems = data.items.filter(item => !item.isLegacy);
            const legacyItems = data.items.filter(item => item.isLegacy);

            if (mainGrid && mainItems.length > 0) {
                mainGrid.innerHTML = generateVideoCards(mainItems);
                observeNewElements(mainGrid);
            }

            if (legacyGrid && legacyWrapper && legacyItems.length > 0) {
                legacyGrid.innerHTML = generateVideoCards(legacyItems);
                legacyWrapper.style.display = 'block'; 
                
                if (legacyDescContainer && data.legacyDescription) {
                    legacyDescContainer.innerHTML = `<p style="font-size: 1rem; color: #888; white-space: pre-wrap;">${data.legacyDescription}</p>`;
                }

                observeNewElements(legacyGrid);
                
                legacyGrid.addEventListener('mouseenter', () => { legacyGrid.style.opacity = '1'; legacyGrid.style.filter = 'grayscale(0%)'; });
                legacyGrid.addEventListener('mouseleave', () => { legacyGrid.style.opacity = '0.65'; legacyGrid.style.filter = 'grayscale(40%)'; });
            }
        }
    }
    
    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = "[ MESSAGE_TRANSMITTED ]";
            btn.style.background = "#2b7a0b"; 
            btn.style.color = "#fff";
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "var(--accent-red)";
                contactForm.reset();
            }, 3000);
        });
    }
    
    loadSiteData();
});