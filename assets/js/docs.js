// assets/js/docs.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // 1. Get which doc to load from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page') || 'chimera'; 

    // Update Title
    document.getElementById('doc-title').textContent = page.charAt(0).toUpperCase() + page.slice(1) + ' Docs';

    // 2. Fetch the Markdown file
    fetch(`../data/docs/${page}.md`)
        .then(response => {
            if (!response.ok) throw new Error("Documentation not found.");
            return response.text();
        })
        .then(markdown => {
            // 3. Parse Markdown to HTML
            const contentDiv = document.getElementById('doc-content');
            contentDiv.innerHTML = marked.parse(markdown);

            // 4. Generate Table of Contents for the Sidebar
            const toc = document.getElementById('toc');
            const headings = contentDiv.querySelectorAll('h2, h3');
            
            headings.forEach(heading => {
                // CRITICAL FIX: Prepend 'sec-' so IDs never start with a number (which breaks JS)
                if (!heading.id) {
                    let safeId = heading.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    heading.id = 'sec-' + safeId;
                }
                
                const a = document.createElement('a');
                a.href = `#${heading.id}`;
                a.textContent = heading.textContent;
                
                // Indent sub-headings (h3)
                if (heading.tagName === 'H3') {
                    a.style.paddingLeft = '30px';
                    a.style.fontSize = '0.9rem';
                    a.style.opacity = '0.8';
                    a.style.borderLeft = 'none';
                }
                
                toc.appendChild(a);
            });

            // CRITICAL FIX: Smooth scrolling using getElementById instead of querySelector
            document.querySelectorAll('#toc a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    // Extract just the ID string without the '#'
                    const targetId = this.getAttribute('href').substring(1);
                    const target = document.getElementById(targetId);
                    
                    if(target) {
                        window.scrollTo({
                            top: target.offsetTop - 40,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu on click
                        if(window.innerWidth <= 992) {
                            navLinks.classList.remove('active');
                        }
                    }
                });
            });
        })
        .catch(err => {
            document.getElementById('doc-content').innerHTML = `
                <div style="padding: 100px;">
                    <h1 style="color: #c0392b;">Error 404</h1>
                    <p style="color: #aaa;">The documentation file <b>${page}.md</b> could not be found.</p>
                </div>
            `;
        });
});