

document.getElementById('dark-theme').addEventListener('click', async () => {
    const result = await window.api.changetheme('dark');
    if (result.ok) {
        document.getElementById('color-style-sheet').href = await window.api.getcolortheme();
        document.getElementById('change-theme-confirm').style.display = 'block'
    }
})

document.getElementById('light-theme').addEventListener('click', async () => {
    const result = await window.api.changetheme('light');
    if (result.ok) {
        document.getElementById('color-style-sheet').href = await window.api.getcolortheme();
        document.getElementById('change-theme-confirm').style.display = 'block'
    }
})

