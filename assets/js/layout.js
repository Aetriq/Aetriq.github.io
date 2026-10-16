document.addEventListener('DOMContentLoaded', () => {
    const base = window.siteBasePath || '';

    const footerContainer = document.getElementById('global-footer');
    if (footerContainer) {
        footerContainer.innerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <div class="footer-brand-header">
                            <img src="${base}assets/img/AetriqDynamicsthumb.png" alt="Logo">
                            <div class="footer-title">Alex Gordon</div>
                        </div>
                        <p style="color: #999; font-size: 14px; max-width: 400px; margin-top: 10px;">
                            Published November 24th, 2024<br>
                            Last Updated October 16th, 2026<br>
                            You are looking at v10.26 (build 2.89) of my website.
                        </p>
                        <div class="social-links" style="margin-top: 15px; display: flex; gap: 12px;">
                            <a href="https://github.com/aetriq" target="_blank" rel="noopener noreferrer" title="GitHub">GH</a>
                            <a href="https://www.youtube.com/@Aetriq" target="_blank" rel="noopener noreferrer" title="YouTube">YT</a>
                            <a href="https://twitter.com/Veetwo__" target="_blank" rel="noopener noreferrer" title="X (Twitter)">TW</a>
                            <a href="https://www.instagram.com/aetriq_/" target="_blank" rel="noopener noreferrer" title="Instagram">IG</a>
                        </div>
                    </div>
                    
                    <div class="footer-col">
                        <h4 style="color: #fff; text-transform: uppercase; font-size: 15px; margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 8px;">Navigate</h4>
                        <div class="footer-links" style="display: flex; flex-direction: column; gap: 8px;">
                            <a href="${base}index.html" style="color: #ccc; text-decoration: none;">Home</a>
                            <a href="${base}about.html" style="color: #ccc; text-decoration: none;">About</a>
                            <a href="${base}projects.html" style="color: #ccc; text-decoration: none;">Projects</a>
                            <a href="${base}models.html" style="color: #ccc; text-decoration: none;">3D Models</a>
                            <a href="${base}creative.html" style="color: #ccc; text-decoration: none;">Creative Work</a>
                            <a href="${base}store.html" style="color: #ccc; text-decoration: none;">Storefront</a>
                            <a href="${base}contact.html" style="color: #ccc; text-decoration: none;">Contact</a>
                        </div>
                    </div>
                    
                    <div class="footer-col">
                        <h4 style="color: #fff; text-transform: uppercase; font-size: 15px; margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 8px;">Resources & Legal</h4>
                        <div class="footer-links" style="display: flex; flex-direction: column; gap: 8px;">
                            <a href="https://github.com/aetriq" target="_blank" rel="noopener noreferrer" style="color: #ccc; text-decoration: none;">GitHub</a>
                            <a href="https://linktr.ee/Aetriq" target="_blank" rel="noopener noreferrer" style="color: #ccc; text-decoration: none;">Linktree</a>
                            <a href="${base}privacy.html" style="color: #ccc; text-decoration: none;">Privacy Policy</a>
                            <a href="${base}.well-known/security.txt" target="_blank" style="color: #ccc; text-decoration: none;">Security</a>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom" style="display: flex; justify-content: space-between; align-items: flex-start; padding-top: 20px; border-top: 1px solid #222; font-size: 13px; color: #777; flex-wrap: wrap; gap: 15px;">
                    <div>© 2026 Veetwo Music Ltd. All rights reserved.</div>
                    <div style="max-width: 500px; text-align: right;">By browsing my website, you agree to the cookies obtained via CloudFlare. This is done to prevent AI from scraping my site. See <a href="${base}privacy.html" style="color: var(--accent-gold); text-decoration: underline;">Privacy Policy</a>.</div>
                </div>
            </div>
        </footer>
        `;
    }
});