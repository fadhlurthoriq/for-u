const Music={

    player:null,

    audio:null

};

Music.init=function(){

    this.player=document.getElementById(

        "music-player"

    );

    const save=Storage.load();

    this.current=save.song;

}

Music.save=function(){

    Storage.update({

        song:this.current||0

    });

}

Music.restore=function(){

    const save=

    Storage.load();

    this.current=

    save.song||0;

}

Music.reset=function(){

    this.current=0;

}

Music.show=function(callback){

    this.player.classList.remove(

        "float"

    );

    this.player.classList.add(

        "show"

    );

    this.player.addEventListener(

        "animationend",

        ()=>{

            if(callback){

                callback();

            }

        },

        {

            once:true

        }

    );

}

Music.float=function(callback){

    console.log("FLOAT START");

    this.player.classList.remove(

        "show"

    );

    this.player.classList.add(

        "float"

    );

    this.player.addEventListener(

        "animationend",

        ()=>{

            if(callback){

                callback();

            }

        },

        {

            once:true

        }

    );

}