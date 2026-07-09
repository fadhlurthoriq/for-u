const Character = {

    name: "Mochi",

    currentEmotion: "happy",

    currentAnimation: "idle",

    visible: true,

    timer: null,

    typingTimer: null,

    bubble: document.getElementById("character-bubble"),

    text: document.getElementById("bubble-text"),

    image: document.getElementById("character-image")

};

// ==========================
// SHOW / HIDE CHARACTER
// ==========================

Character.show = function () {

    this.image.style.display = "block";

    this.visible = true;

}

Character.hide = function () {

    this.image.style.display = "none";

    this.visible = false;

}

// ==========================
// SHOW / HIDE BUBBLE
// ==========================

Character.showBubble = function () {

    this.bubble.style.opacity = "1";

    this.bubble.style.visibility = "visible";

}

Character.hideBubble = function () {

    this.bubble.style.opacity = "0";

    this.bubble.style.visibility = "hidden";

}

// ==========================
// CHANGE EMOTION
// ==========================

Character.changeEmotion = function (emotion) {

    this.currentEmotion = emotion;

    this.image.src = `assets/emoji/mochi/${emotion}.png`;

}

// ==========================
// CHANGE ANIMATION
// ==========================

Character.changeAnimation = function (animation) {

    this.image.classList.remove(

        "idle",

        "bounce",

        "shake",

        "sleep",

        "love"

    );

    this.image.classList.add(animation);

}

// ==========================
// TYPING EFFECT
// ==========================

Character.typeText = function (text, speed = 35) {

    clearInterval(this.typingTimer);

    this.text.innerHTML = "";

    let i = 0;

    this.typingTimer = setInterval(() => {

        this.text.innerHTML += text.charAt(i);

        i++;

        if (i >= text.length) {

            clearInterval(this.typingTimer);

        }

    }, speed);

}

// ==========================
// TALK
// ==========================

Character.talk = function ({

    emotion,

    message,

    duration = 3000,

    speed = 35

}) {

    this.changeEmotion(emotion);

    this.showBubble();

    this.typeText(message, speed);

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {

        this.hideBubble();

    }, duration);

}

window.addEventListener("DOMContentLoaded", () => {

    Character.talk({

        emotion: "wave",

        message: "Haiii! Aku Mochi 🐱 Yuk, login dulu yaa ❤️",

        duration: 5000

    });

});