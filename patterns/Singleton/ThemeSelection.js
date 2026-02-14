export class ThemeSelection {
    static #instance; // adding # to denote that it is a private variable and no one can delete the instance (delete ThemeSelection.#instance);
    constructor(theme) {
        // if(ThemeSelection.#instance){
        //     return ThemeSelection.#instance //For returning the same instance everytime
        // }
        if (ThemeSelection.#instance) {
            throw new Error(`Only one Instance can be create on ThemeSelection Class`);
        }
        this.theme = theme;
        ThemeSelection.#instance = this;
    }

    lightTheme() {
        this.theme = 'light';
        return this.theme;
    }

    darkTheme() {
        this.theme = 'dark';
        return this.theme;
    }

    defaultTheme() {
        this.theme = 'light';
        return this.theme;
    }

    getTheme() {
        return this.theme;
    }
}


// Exporting an INSTANCE (Auto Singleton)
// class ThemeSelection {
//    constructor(theme) {
//       this.theme = theme;
//    }
// }

// export default new ThemeSelection("light");

// import theme1 from "./ThemeSelection.js";
// import theme2 from "./ThemeSelection.js";

// console.log(theme1 === theme2); // true

// Because:
// Module executed once
// Instance created once
// Same reference returned everywhere
// 👉 No need for constructor check.
// This is the modern JS way.
