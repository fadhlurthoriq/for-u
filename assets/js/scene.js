const Scene = {

    current: "login-scene"

};

Scene.init=function(){

    this.show(

        "login-scene"

    );

}

Scene.show = function (id) {

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

}

Scene.transition=function(nextScene){

    const loginCard=

    document.getElementById("login-card");

    loginCard.classList.add("hide");

    setTimeout(()=>{

        this.show(nextScene);

    },800);

}