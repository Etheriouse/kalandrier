async function setColorTheme() {
    const theme = await window.api.getcolortheme();
    const color = document.createElement('link');
    color.rel = "stylesheet"
    color.href = theme;
    color.id = "color-style-sheet"
    document.head.appendChild(color)
    document.documentElement.style.display = 'block';
}
setColorTheme()
