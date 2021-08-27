function debounce(f) {
  let timer = null;
  return function () {
    const context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      f.apply(context, args);
    }, 500);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const people = document.querySelector('.people');
  const gridMode = document.getElementById('grid-mode');
  gridMode.addEventListener('change', function () {
    people.classList.toggle('square-grid');
  });

  const toggleColor = document.getElementById('toggleColor');
  toggleColor.addEventListener('click', function() {
    var htmlElement = document.getElementsByTagName("html")[0];
    var dataColorMode = htmlElement.getAttribute("data-color-mode");
    if (dataColorMode == "dark") {
      htmlElement.setAttribute("data-color-mode", "light");
    } else {
      htmlElement.setAttribute("data-color-mode", "dark");
    }
  });

  const avatarSize = document.getElementById('avatarSize');
  avatarSize.addEventListener('change', function() {
    var rootElement = document.querySelector(':root');
    rootElement.style.setProperty('--avatarSize', avatarSize.value + "px")
  });

  const handlesInput = document.getElementById('handles-input');
  const updateAvatars = () => {
    const handles = handlesInput.value
      .split(/[,\s]+/)
      .map(h => h.trim().toLowerCase())
      .filter(h => h.length > 0)
      .sort();

    people.innerHTML = handles.map(function (avatar) {
      return `
        <div class="person">
          <img class="avatar" src="https://github.com/${avatar}.png" alt="avatar" />
          <div class="name">@${avatar}</div>
        </div>
      `;
    }).join('\n');
  };

  handlesInput.addEventListener('keyup', debounce(updateAvatars));
  updateAvatars({ target: handlesInput });
});