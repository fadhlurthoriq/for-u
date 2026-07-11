const PopupCharacter = {

    image:null,

    bubble:null,

    typingTimer:null,

    timer:null,

    currentEmotion:"happy",

    queue:[],

    current:0,

    playing:false,

    queueTimer:null,

    defaultSpeed:28,

};

PopupCharacter.init=function(){

    this.image=document.getElementById(
        "gallery-popup-mochi-image"
    );

    this.bubble=document.getElementById(
        "gallery-popup-mochi-bubble"
    );

}

PopupCharacter.play=function(dialogs){

    if(!dialogs) return;

    if(!Array.isArray(dialogs)){

        dialogs=[dialogs];

    }

    this.stop();

    this.queue=[...dialogs];

    this.current=0;

    this.playing=true;

    this.next();

}

PopupCharacter.next=function(){

    if(this.current>=this.queue.length){

        this.playing=false;

        return;

    }

    const dialog=

        this.queue[this.current];

    this.say(dialog);

    const speed=

        dialog.speed ?? this.defaultSpeed;

        const wait=

        dialog.wait ??

        dialog.message.length*speed+(dialog.stay ?? 1800);

    clearTimeout(

        this.queueTimer

    );

    this.queueTimer=setTimeout(()=>{

        this.current++;

        this.next();

    },wait);

}

PopupCharacter.changeEmotion=function(emotion){

    if(!emotion) return;

    this.currentEmotion=emotion;

    this.image.src=

    `assets/emoji/mochi/${emotion}.png`;

}

// PopupCharacter.type=function(

//     text,

//     speed=35

// ){

//     clearInterval(this.typingTimer);

//     this.bubble.innerHTML="";

//     let i=0;

//     this.typingTimer=

//     setInterval(()=>{

//         if(i<text.length){

//             this.bubble.innerHTML+=

//             text.charAt(i);

//             i++;

//         }

//         else{

//             clearInterval(

//                 this.typingTimer

//             );

//         }

//     },speed);

// }

PopupCharacter.type=function(text,speed=28){

    clearInterval(this.typingTimer);

    this.bubble.innerHTML="";

    let i=0;

    this.typingTimer=setInterval(()=>{

        if(i>=text.length){

            clearInterval(this.typingTimer);

            return;

        }

        this.bubble.innerHTML+=text[i];

        i++;

    },speed);

}

PopupCharacter.say=function(dialog){

    console.log(dialog);

    this.image.classList.remove("gallery-popup-face-show");
    this.image.classList.add("gallery-popup-face-hide");

    this.bubble.classList.remove("gallery-popup-bubble-show");

    setTimeout(()=>{

        PopupCharacter.changeEmotion(dialog.emotion);

        PopupCharacter.image.classList.remove(
            "gallery-popup-face-hide"
        );

        PopupCharacter.image.classList.add(
            "gallery-popup-face-show"
        );

        PopupCharacter.type(dialog.message, dialog.speed || 28);

        PopupCharacter.bubble.classList.add(
            "gallery-popup-bubble-show"
        );

    },180);

}

PopupCharacter.stop=function(){

    clearTimeout(this.queueTimer);

    clearInterval(this.typingTimer);

    this.queue=[];

    this.current=0;

    this.playing=false;

}