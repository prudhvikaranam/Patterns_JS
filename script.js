import { CreateUser } from './patterns/Factory/CreateUser.js';
import { ThemeSelection } from './patterns/Singleton/ThemeSelection.js';
import { UserStore } from './patterns/Singleton/UserStore.js';


// Code for changing the theme 
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



// User creation
const form = document.getElementById("userForm");
let userData;
form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevents page reload

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;

    userData = {
        name,
        email,
        role
    };


    const userStore = UserStore.getInstance();
    userStore.addUser(userData)
    console.log('Prudhvi userssss', userStore.getUsers());
});
