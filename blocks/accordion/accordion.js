export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('accordion-item');
    const label = row.children[0];
    const body = row.children[1];

    const summary = document.createElement('div');
    summary.className = 'accordion-item-label';
    summary.setAttribute('role', 'button');
    summary.setAttribute('tabindex', '0');
    summary.setAttribute('aria-expanded', 'false');
    while (label.firstChild) summary.append(label.firstChild);
    label.replaceWith(summary);

    body.className = 'accordion-item-body';

    const toggle = () => {
      const expanded = summary.getAttribute('aria-expanded') === 'true';
      summary.setAttribute('aria-expanded', !expanded);
    };

    summary.addEventListener('click', toggle);
    summary.addEventListener('keydown', (e) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        toggle();
      }
    });
  });
}
