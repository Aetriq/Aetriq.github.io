document.addEventListener('DOMContentLoaded', () => {
    const base = window.siteBasePath || '';

    const footerContainer = document.getElementById('global-footer');
    if (footerContainer) {
        footerContainer.innerHTML = `
        <footer class="footer">
            <div class="container">
                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; margin-bottom: 30px;">
                    <div>
                        <!-- LOCKED LOGO SIZE -->
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                            <img src="${base}assets/img/AetriqDynamics 1.0.png" alt="Logo" style="width: 45px; height: 45px; object-fit: contain; filter: grayscale(100%);">
                            <div style="font-size: 1.2rem; font-weight: 700; letter-spacing: 1.5px; color: #fff;">Aetriq</div>
                        </div>
                        <p style="color: #8b949e; font-size: 0.9rem; max-width: 400px;">
                            Published November 24th, 2024<br>
                            Last Updated September 13th, 2026<br>
                            You are looking at v9.26 (build 2.80).
                        </p>
                        <div style="margin-top: 15px; display: flex; gap: 15px;">
                            <a href="https://github.com/aetriq" target="_blank" rel="noopener noreferrer" style="color: var(--primary-text); text-decoration: none;">GH</a>
                            <a href="https://www.youtube.com/@Aetriq" target="_blank" rel="noopener noreferrer" style="color: var(--primary-text); text-decoration: none;">YT</a>
                            <a href="https://x.com/Veetwo__" target="_blank" rel="noopener noreferrer" style="color: var(--primary-text); text-decoration: none;">X</a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 style="color: #fff; font-size: 0.95rem; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px;">Navigate</h4>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <a href="${base}index.html" style="color: #8b949e; text-decoration: none; font-size: 0.9rem;">Home</a>
                            <a href="${base}projects.html" style="color: #8b949e; text-decoration: none; font-size: 0.9rem;">Projects</a>
                            <!-- <a href="${base}tech.html" style="color: #8b949e; text-decoration: none; font-size: 0.9rem;">Tech Stack</a> -->
                            <a href="${base}contact.html" style="color: #8b949e; text-decoration: none; font-size: 0.9rem;">Contact</a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 style="color: #fff; font-size: 0.95rem; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px;">Resources</h4>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <a href="https://github.com/aetriq" target="_blank" rel="noopener noreferrer" style="color: #8b949e; text-decoration: none; font-size: 0.9rem;">GitHub</a>
                            <a href="https://linktr.ee/Aetriq" target="_blank" rel="noopener noreferrer" style="color: #8b949e; text-decoration: none; font-size: 0.9rem;">Linktree</a>
                            <a href="${base}privacy.html" style="color: #8b949e; text-decoration: none; font-size: 0.9rem;">Privacy Policy</a>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.05); font-size: 0.8rem; color: #555; font-family: 'JetBrains Mono', monospace; flex-wrap: wrap; gap: 15px;">
                    <div>© 2026 Veetwo Music Ltd. All rights reserved.</div>
                    <div style="max-width: 500px; text-align: right;">By browsing my website, you agree to the cookies obtained via CloudFlare. See <a href="${base}privacy.html" style="color: var(--accent-gold); text-decoration: underline;">Privacy Policy</a>.</div>
                </div>
            </div>
        </footer>
        `;
    }
});