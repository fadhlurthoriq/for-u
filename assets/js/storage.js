const Storage = {

    KEY: "for-u-progress"

};

// ==========================
// SAVE
// ==========================

Storage.saveScene=function(scene){

    console.log(

        "Scene Saved :",

        scene

    );

    localStorage.setItem(

        this.KEY,

        scene

    );

}

// ==========================
// LOAD
// ==========================

Storage.loadScene=function(){

    const scene=

    localStorage.getItem(

        this.KEY

    );

    console.log(

        "Scene Loaded :",

        scene

    );

    return scene;

}

// ==========================
// RESET
// ==========================

Storage.reset = function(){

    localStorage.removeItem(

        this.KEY

    );

}