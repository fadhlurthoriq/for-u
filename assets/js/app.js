const App={

    restoring:false

};

App.init=function(){

    Character.init();

    PopupCharacter.init();

    GalleryCharacter.init();

    Overlay.init();

    Envelope.init();

    Music.init();

    Gallery.init();

    Login.init();

    App.restore();

}

App.restore=function(){

    App.restoring=true;

    const save=Storage.load();

    Scene.show(save.scene);

    switch(save.scene){

        case "gallery-scene":

            Gallery.restore();

            Music.restore();

        break;

    }

    if(save.scene==="gallery-scene"){

    document.getElementById("welcome-card").style.display="none";}

    setTimeout(()=>{

        App.restoring=false;

    },200);

    document.getElementById("focus-overlay").classList.remove("show");

    document.getElementById("focus-overlay-journey").classList.remove("show");

}

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        App.init();

    }

);