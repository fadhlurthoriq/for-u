const App = {};

App.init = function(){

    Character.init();

    Login.init();

    Scene.init();

}

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        App.init();

    }

);