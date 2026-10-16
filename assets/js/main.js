// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const base = window.siteBasePath || '';
    const fixPath = (p) => {
        if (!p) return '';
        if (p.startsWith('http://') || p.startsWith('https://')) return p;
        return base + p.replace(/^\//, '');
    };

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

    // --- Independent Async Data Fetching ---
    async function loadSiteData() {
        // Load Projects
        if (document.getElementById('highlight-container') || document.getElementById('all-projects-container')) {
            try {
                const res = await fetch(`${base}data/projects.json`);
                if (res.ok) buildProjects(await res.json());
            } catch (e) { console.error("Error loading projects.json:", e); }
        }

        // Load 3D Models
        if (document.getElementById('models-container')) {
            try {
                const res = await fetch(`${base}data/models.json`);
                if (res.ok) buildModels(await res.json());
            } catch (e) { console.error("Error loading models.json:", e); }
        }

        // Load Tech Stack
        if (document.getElementById('tech-stack-container')) {
            try {
                const res = await fetch(`${base}data/techstack.json`);
                if (res.ok) buildTechStack(await res.json());
            } catch (e) { console.error("Error loading techstack.json:", e); }
        }

        // Load Creative Work
        if (document.getElementById('creative-grid-main') || document.getElementById('channels-container')) {
            try {
                const res = await fetch(`${base}data/creative.json`);
                if (res.ok) buildCreative(await res.json());
            } catch (e) { console.error("Error loading creative.json:", e); }
        }
    }

    function buildProjects(data) {
        // Highlighted Projects
        const highlightContainer = document.getElementById('highlight-container');
        if(highlightContainer && data.highlighted) {
            highlightContainer.innerHTML = data.highlighted.map((proj) => {
                const linksHTML = proj.links ? proj.links.map(link => 
                    `<a href="${link.url}" class="btn btn-${link.type}" target="_blank" rel="noopener noreferrer">${link.text}</a>`
                ).join('') : '';

                const affiliatesHTML = proj.affiliates ? `
                    <div style="display: flex; gap: 20px; margin-top: 20px; padding-top: 15px; border-top: 1px dashed #333; flex-wrap: wrap; align-items: center;">
                        ${proj.affiliates.map(aff => `
                            <a href="\${aff.url}" target="_blank" rel="noopener noreferrer" title="\${aff.name}">
                                <img src="${fixPath(aff.icon)}" alt="${aff.name}" style="width: 36px; height: 36px; object-fit: contain;">
                            </a>
                        `).join('')}
                    </div>
                ` : '';

                return `
                    <div class="project-card highlight-card">
                        <div class="card-image">
                            <img src="${fixPath(proj.image)}" alt="${proj.title}" loading="lazy">
                            <div style="position: absolute; bottom: 15px; left: 15px; background: rgba(5, 5, 5, 0.9); padding: 12px 20px; border: 1px solid #444;">
                                <h1 style="font-size: 26px; margin-bottom: 2px; color: var(--primary-text);">${proj.title}</h1>
                                <h3 style="margin: 0; color: var(--accent-red); font-size: 15px;">${proj.subtitle}</h3>
                            </div>
                        </div>
                        
                        <div class="highlight-body">
                            <div style="border-left: 3px solid ${proj.statusColor}; padding-left: 12px; margin-bottom: 15px; font-size: 15px;">
                                Status: <strong style="color:${proj.statusColor};">${proj.status}</strong>
                            </div>
                            
                            <div class="highlight-desc-container" style="margin-bottom: 20px;">
                                <button class="desc-toggle-btn btn btn-outline" onclick="this.parentElement.classList.toggle('expanded')" style="display: inline-flex; align-items: center; gap: 10px;">
                                    <span>View Details</span>
                                    <svg class="toggle-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
                                </button>
                                
                                <div class="card-description-collapsible">
                                    <p style="white-space: pre-wrap; margin: 0;">${proj.description}</p>
                                </div>
                            </div>
                            
                            <div style="display: flex; gap: 10px; flex-wrap: wrap;">${linksHTML}</div>
                            ${affiliatesHTML}
                        </div>
                    </div>
                `;
            }).join('');
        }

        // All Projects (16:9 Cropped Images + Explicit Details Button)
        const allContainer = document.getElementById('all-projects-container');
        if(allContainer && data.all) {
            allContainer.innerHTML = data.all.map((proj) => {
                const linksHTML = proj.links ? proj.links.map(link => 
                    `<a href="${link.url}" class="btn btn-${link.type} btn-compact" target="_blank" rel="noopener noreferrer">${link.text}</a>`
                ).join('') : '';

                return `
                    <div class="project-card">
                        <div class="card-image">
                            <img src="${fixPath(proj.image)}" alt="${proj.title}" loading="lazy">
                            <div class="desc-popup-overlay">
                                <p>${proj.description}</p>
                                <p style="color:${proj.statusColor}; margin-top: 10px; font-size: 13px; font-weight: bold;">STATUS: ${proj.status}</p>
                            </div>
                        </div>
                        <div class="card-content">
                            <h3 class="card-title">${proj.title}</h3>
                            <div style="margin-top: auto; padding-top: 10px; display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
                                <button class="btn btn-outline btn-compact desc-toggle-btn" onclick="this.closest('.project-card').classList.toggle('show-desc')" style="display: inline-flex; align-items: center; gap: 6px; border-color: var(--accent-gold); color: var(--accent-gold);">
                                    <span>Details</span>
                                    <svg class="toggle-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                                </button>
                                ${linksHTML}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    function buildModels(data) {
        const modelsContainer = document.getElementById('models-container');
        if(modelsContainer && data.models) {
            modelsContainer.innerHTML = data.models.map((model) => `
                <div class="project-card">
                    <div class="card-image">
                        <img src="${fixPath(model.image)}" alt="${model.title}" loading="lazy">
                        <div class="desc-popup-overlay">
                            <p style="color: var(--accent-gold); font-size: 13px; margin-bottom: 8px; font-weight: bold;">UPDATED ${model.updated}</p>
                            <p>${model.description}</p>
                        </div>
                    </div>
                    <div class="card-content"> 
                        <h3 class="card-title" style="text-align: center;">${model.title}</h3>
                        <div style="margin-top: auto; padding-top: 10px; display: flex; flex-direction: column; gap: 8px;">
                            <button class="btn btn-outline btn-compact desc-toggle-btn" onclick="this.closest('.project-card').classList.toggle('show-desc')" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; border-color: var(--accent-gold); color: var(--accent-gold); width: 100%;">
                                <span>Details</span>
                                <svg class="toggle-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                            <a href="${model.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-compact" style="width: 100%; text-align: center;">View on Printables</a>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
    
    function buildTechStack(data) {
        const container = document.getElementById('tech-stack-container');
        if(container && data.categories) {
            container.innerHTML = data.categories.map((cat) => `
                <div class="project-card" style="padding: 20px;">
                    <h3 style="color: var(--accent-gold); border-bottom: 1px solid #333; padding-bottom: 8px; margin-bottom: 15px;">${cat.title}</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${cat.skills.map(skill => `<span class="tech-pill">\${skill}</span>`).join('')}
                    </div>
                </div>
            `).join('');
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
            descContainer.innerHTML = `<p style="white-space: pre-wrap;">${data.description}</p>`;
        }
        
        if (channelsContainer && data.channels) {
            channelsContainer.innerHTML = data.channels.map((channel) => `
                <a href="${channel.url}" target="_blank" rel="noopener noreferrer" class="channel-card">
                    <img src="${fixPath(channel.banner)}" alt="Banner" class="channel-banner" loading="lazy">
                    <div class="channel-info">
                        <img src="${fixPath(channel.avatar)}" alt="${channel.name}" class="channel-avatar" loading="lazy">
                        <h3 class="channel-name">${channel.name}</h3>
                    </div>
                </a>
            `).join('');
        }
        
        const generateVideoCards = (items) => {
            return items.map((item) => {
                const parentChannel = data.channels ? data.channels.find(c => c.id === item.channelId) : null;
                const avatarSrc = item.customIcon ? fixPath(item.customIcon) : (parentChannel ? fixPath(parentChannel.avatar) : '');
                const avatarHTML = avatarSrc ? `<img src="${avatarSrc}" class="video-channel-icon" alt="Icon" loading="lazy">` : '';
                const dateHTML = item.date ? `<span class="creative-date">${item.date}</span>` : '';

                return `
                    <a href="${item.videoUrl || '#'}" target="_blank" rel="noopener noreferrer" class="creative-card">
                        <div class="creative-thumb">
                            <img src="${fixPath(item.image)}" alt="${item.title || 'Video'}" loading="lazy">
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
            }

            if (legacyGrid && legacyWrapper && legacyItems.length > 0) {
                legacyGrid.innerHTML = generateVideoCards(legacyItems);
                legacyWrapper.style.display = 'block'; 
                
                if (legacyDescContainer && data.legacyDescription) {
                    legacyDescContainer.innerHTML = `<p style="color: #999; white-space: pre-wrap;">${data.legacyDescription}</p>`;
                }
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