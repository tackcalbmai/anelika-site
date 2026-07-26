from pathlib import Path
import re
import shutil

footer = Path('tools/footer.html').read_text(encoding='utf-8').strip()
cookie = Path('tools/cookie.html').read_text(encoding='utf-8').strip()
pages = [
    Path('index.html'), Path('uzkopsana/index.html'),
    Path('teritoriju-kopsana/index.html'), Path('siki-remontdarbi/index.html'),
    Path('kontakti/index.html'), Path('404.html')
]

for path in pages:
    text = path.read_text(encoding='utf-8')
    text = re.sub(r'<footer class="site-footer">.*?</footer>', footer, text, count=1, flags=re.S)
    if 'data-cookie-banner' not in text:
        text = text.replace(footer, footer + '\n  ' + cookie)
    if '/footer.css' not in text:
        text = text.replace('</head>', '  <link rel="stylesheet" href="/footer.css?v=1">\n  <link rel="stylesheet" href="/cookie-legal.css?v=1">\n</head>')
    if '/footer-cookie.js' not in text:
        text = text.replace('</body>', '  <script src="/footer-cookie.js?v=1" defer></script>\n</body>')
    path.write_text(text, encoding='utf-8')

privacy = Path('tools/privacy.html').read_text(encoding='utf-8')
privacy = privacy.replace('<!-- FOOTER -->', footer).replace('<!-- COOKIE -->', cookie)
privacy_path = Path('privatuma-politika/index.html')
privacy_path.parent.mkdir(parents=True, exist_ok=True)
privacy_path.write_text(privacy, encoding='utf-8')

sitemap_path = Path('sitemap.xml')
sitemap = sitemap_path.read_text(encoding='utf-8')
if '/privatuma-politika/' not in sitemap:
    entry = '  <url><loc>https://www.anelika.lv/privatuma-politika/</loc><lastmod>2026-07-26</lastmod><changefreq>yearly</changefreq><priority>0.4</priority></url>\n'
    sitemap = sitemap.replace('</urlset>', entry + '</urlset>')
    sitemap_path.write_text(sitemap, encoding='utf-8')

shutil.rmtree('tools')
