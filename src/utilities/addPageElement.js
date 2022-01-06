export const addPageElement = (parentId, elementTag, elementId, html) => {
  let parentElement = document.getElementById(parentId);
  let elementToAdd = document.createElement(elementTag);
  elementToAdd.setAttribute("id", elementId);
  elementToAdd.innerHTML = html;
  parentElement.appendChild(elementToAdd);
  return elementToAdd;
};
