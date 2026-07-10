const Character = {

    name:"Mochi",

    mode:"idle",

    currentEmotion:"happy",

    currentAnimation:"idle",

    visible:true,

    timer:null,

    typingTimer:null,

    idleTimer:null,

    isTalking:false,

    bubble: document.getElementById("character-bubble"),

    text: document.getElementById("bubble-text"),

    image: document.getElementById("character-image"),

    typing: document.getElementById("typing-indicator"),

};

// ======================================
// SHOW / HIDE CHARACTER
// ======================================

Character.show = function () {

    this.image.style.display = "block";

    this.visible = true;

}

Character.hide = function () {

    this.image.style.display = "none";

    this.visible = false;

}

Character.showTyping=function(){

    clearTimeout(this.timer);

    this.showBubble();

    this.text.style.display="none";

    this.typing.style.display="flex";

}

Character.hideTyping=function(){

    this.typing.style.display="none";

    this.text.style.display="block";

}

// ======================================
// SHOW / HIDE BUBBLE
// ======================================

Character.showBubble = function () {

    this.bubble.style.opacity = "1";
    this.bubble.style.visibility = "visible";

}

Character.hideBubble = function () {

    this.bubble.style.opacity = "0";
    this.bubble.style.visibility = "hidden";

}

// ======================================
// MODE
// ======================================

Character.startCutscene=function(){

    this.mode="cutscene";

    this.stopIdle();

}

Character.finishCutscene=function(){

    this.mode="idle";

    this.startIdle();

}

Character.stopIdle=function(){

    clearTimeout(this.idleTimer);

}

// ======================================
// CHANGE EMOTION
// ======================================

Character.changeEmotion = function (emotion) {

    if (!emotion) return;

    this.currentEmotion = emotion;

    this.image.src = `assets/emoji/mochi/${emotion}.png`;

}

// ======================================
// CHANGE ANIMATION
// ======================================

Character.changeAnimation = function (animation) {

    this.image.classList.remove(

        "idle",
        "bounce",
        "shake",
        "sleep",
        "love"

    );

    if (animation) {

        this.image.classList.add(animation);

    }

}

// ======================================
// TYPING EFFECT
// ======================================

Character.typeText = function(text, speed = 35){

    clearInterval(this.typingTimer);

    this.text.innerHTML="";

    let i=0;

    this.typingTimer=setInterval(()=>{

        if(i<text.length){

            this.text.innerHTML+=text.charAt(i);

            i++;

        }else{

            clearInterval(this.typingTimer);

        }

    },speed);

}

Character.say = function({

    emotion = this.currentEmotion,

    message = "",

    speed = 35,

    duration = null

}){

    clearTimeout(this.timer);

    this.showBubble();

    this.changeEmotion(emotion);

    this.typeText(message,speed);

    if(duration!==null){

        this.timer=setTimeout(()=>{

            this.hideBubble();

        },duration);

    }

}

// ======================================
// IDLE MESSAGE
// ======================================

Character.idleMessages = [

    "....",

    "Hehe~ 🐱",

    "Aku tunggu yaa ❤️",

    "Hmm...",

    "♪ ♪ ♪",

    "Jangan lama-lama yaa 🥺",

    "Hari ini kamu cantik banget ❤️",

    "Aku penasaran nih...",

    "(｡•ᴗ•｡)",

    "Semangat yaa ✨"

];

Character.idleTimer = null;

Character.startIdle=function(){

    if(this.mode!=="idle"){

        return;

    }

    clearTimeout(this.idleTimer);

    this.idleTimer=setTimeout(()=>{

        if(this.mode!=="idle"){

            return;

        }

        const random=

        this.idleMessages[

            Math.floor(

                Math.random()*

                this.idleMessages.length

            )

        ];

        this.say({

            emotion:"happy",

            message:random

        });

        this.startIdle();

    },10000);

}

Character.resetIdle=function(){

    this.stopIdle();

    this.startIdle();

}

// ======================================
// DEFAULT
// ======================================

Character.init=function(){

    this.say({

        emotion:"waving",

        message:"Haiii! Kenalin aku Mochi 🐱❤️ Aku yang nemenin kamu disini gantiin thoriq sementara yaah...",

        duration:6000

    });

    setTimeout(()=>{

        this.startIdle();

    },6000);

}