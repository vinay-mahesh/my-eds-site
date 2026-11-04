export default function decorate(block) {
  const titles = block.querySelectorAll(':scope > div:nth-child(odd)');
  titles.forEach((title) => {
    // Add a class to the title container
    title.classList.add('item-title');
    // Remove empty extra cells, keeping the cell that holds the title
    [...title.children].slice(1).forEach((cell) => {
      if (!cell.textContent.trim() && !cell.querySelector('img, picture')) cell.remove();
    });
    // Add a class to the content
    title.nextElementSibling?.classList.add('item-content');
    // Add a click handler to open the content
    title.addEventListener('click', () => {
      title.classList.toggle('open');
    });
  });
}
