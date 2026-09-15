function loadScriptOnce(src) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.head.append(script);
}

function embedInstagram(url) {
  const blockquote = document.createElement('blockquote');
  blockquote.className = 'instagram-media';
  blockquote.setAttribute('data-instgrm-permalink', url);
  blockquote.setAttribute('data-instgrm-version', '14');

  loadScriptOnce('https://www.instagram.com/embed.js');
  if (window.instgrm) window.instgrm.Embeds.process();
  else {
    const observer = new MutationObserver(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
        observer.disconnect();
      }
    });
    observer.observe(document.head, { childList: true });
  }

  return blockquote;
}

export default function decorate(block) {
  const link = block.querySelector('a[href]');
  const url = link ? link.href : block.textContent.trim();
  block.textContent = '';
  if (!url) return;

  if (url.includes('instagram.com')) {
    block.append(embedInstagram(url));
  }
}
