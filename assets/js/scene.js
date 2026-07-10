const Scene={

    current:"login-scene",

    timers:[]

};

Scene.init = function(){

    const savedScene =

        Storage.loadScene();

    if(savedScene){

        this.show(savedScene);

    }

    else{

        this.show("login-scene");

    }

}

Scene.addTimer=function(callback,time){

    this.timers.push(

        setTimeout(callback,time)

    );

}

Scene.clearTimers=function(){

    this.timers.forEach(timer=>{

        clearTimeout(timer);

    });

    this.timers=[];

}

Scene.show = function (id) {

    Scene.clearTimers();

    if(id === "login-scene"){

        setTimeout(()=>{

            Character.introduction();

        },400);

    }

    document
        .querySelectorAll(".scene")
        .forEach(scene => {

            scene.classList.remove("active");

        });

    document
        .getElementById(id)
        .classList.add("active");

    this.current = id;

    if(id==="welcome-scene"){

        Character.say({

            emotion:"happy",

            message:"Psst... ❤️"

        });

        Scene.addTimer(()=>{

            Character.say({

            emotion:"thinking",

            message:"Aku punya sesuatu buat kamu..."

        });

        },2200);

        Scene.addTimer(()=>{

            Character.say({

                emotion:"super_excited",

                message:"Coba klik amplopnya yaa ❤️"

            });

        },4500);

        Envelope.start();

    }

    Storage.saveScene(id);
}

Scene.cinematic=function(nextScene){

    const overlay=

    document.getElementById(

        "transition-overlay"

    );

    const title=

    document.getElementById(

        "transition-title"

    );

    const subtitle=

    document.getElementById(

        "transition-subtitle"

    );

    overlay.classList.add("show");

    title.innerHTML="Sebentar ya...";

    subtitle.innerHTML=

    "Aku sudah menyiapkan sesuatu khusus untukmu ❤️";

    console.log("Music Fade In");

    setTimeout(()=>{

        Scene.show(nextScene);

    },2500);

    setTimeout(()=>{

        overlay.classList.remove("show");

    },3200);

}