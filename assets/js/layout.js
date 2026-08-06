document.addEventListener('DOMContentLoaded', () => {
    
    // Check if the page defined a base path, otherwise default to current directory
    const base = window.siteBasePath || '';

    // 2. Inject Global Footer
    const footerContainer = document.getElementById('global-footer');
    if (footerContainer) {
        footerContainer.innerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-grid fade-up visible">
                    <div class="footer-brand">
                        <div class="footer-brand-header">
                            <img src="${base}assets/img/AetriqDynamicsthumb.png" alt="Logo">
                            <div class="footer-title">Alex Gordon</div>
                        </div>
                        <p style="color: #8b949e; font-size: 0.9rem; max-width: 400px; margin-top: 10px;">
                            Published November 24th, 2024<br>
                            Last Updated June 30th, 2026<br>
                            You are looking at v6.26 (build 2.65) of my website.
                        </p>
                        <div class="social-links" style="margin-top: 15px;">
                            <a href="https://github.com/aetriq" target="_blank" title="GitHub">GH</a>
                            <a href="https://www.youtube.com/@Aetriq" target="_blank" title="YouTube">YT</a>
                            <a href="https://x.com/Veetwo__" target="_blank" title="X (Twitter)">X</a>
                            <a href="https://www.instagram.com/aetriqdynamics/" target="_blank" title="Instagram">IG</a>
                        </div>
                    </div>
                    
                    <div class="footer-col">
                        <h4 style="color: #fff; text-transform: uppercase; letter-spacing: 1px; font-size: 0.95rem; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px;">Navigate</h4>
                        <div class="footer-links" style="display: flex; flex-direction: column; gap: 10px;">
                            <a href="${base}index.html#home" style="color: #8b949e; text-decoration: none; font-size: 0.9rem;">Home</a>
                            <a href="${base}index.html#projects" style="color: #8b949e; text-decoration: none; font-size: 0.9rem;">Projects</a>
                            <a href="${base}index.html#tech-stack" style="color: #8b949e; text-decoration: none; font-size: 0.9rem;">Tech Stack</a>
                            <a href="${base}index.html#contact" style="color: #8b949e; text-decoration: none; font-size: 0.9rem;">Contact</a>
                        </div>
                    </div>
                    
                    <div class="footer-col">
                        <h4 style="color: #fff; text-transform: uppercase; letter-spacing: 1px; font-size: 0.95rem; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px;">Resources</h4>
                        <div class="footer-links" style="display: flex; flex-direction: column; gap: 10px;">
                            <a href="https://github.com/aetriq" target="_blank" style="color: #8b949e; text-decoration: none; font-size: 0.9rem;">GitHub</a>
                            <a href="https://linktr.ee/Aetriq" target="_blank" style="color: #8b949e; text-decoration: none; font-size: 0.9rem;">Linktree</a>
                            <a href="https://veetwomusic.carrd.co/" target="_blank" style="color: #8b949e; text-decoration: none; font-size: 0.9rem;">Carrd</a>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom fade-up visible" style="display: flex; justify-content: space-between; align-items: center; padding-top: 25px; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 0.8rem; color: #555; font-family: 'JetBrains Mono', monospace; transition-delay: 200ms;">
                    <div>© 2026 Veetwo Music Ltd. All rights reserved.</div>
                    <div style="max-width: 500px; text-align: right;">By browsing my website, you agree to the cookies obtained via CloudFlare. This is done to prevent AI from scraping my site.</div>
                </div>
            </div>
        </footer>
        `;
    }
});