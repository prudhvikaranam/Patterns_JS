import { ThemeSelection } from './patterns/Singleton/ThemeSelection.js';



const themeSelection = new ThemeSelection('light');
let existingTheme = themeSelection.getTheme();
let selectedTheme_UI = document.getElementById('selectedTheme');
selectedTheme_UI.innerText = existingTheme;


document.getElementById('theme-selection-btn').addEventListener('click', () => {
    let existingTheme = themeSelection.getTheme();
    if (existingTheme === 'light') {
        selectedTheme_UI.innerText = themeSelection.darkTheme();
    } else if (existingTheme === 'dark') {
        selectedTheme_UI.innerText = themeSelection.lightTheme();
    } else {
        selectedTheme_UI.innerText = themeSelection.lightTheme();
    }
})

