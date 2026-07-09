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

// ======================================
// ONE TIME TALK
// Bubble muncul → Typing → Bubble hilang
// ======================================

Character.talk = function ({

    emotion,

    message,

    duration = 3000,

    speed = 35

}) {

    clearTimeout(this.timer);

    this.changeEmotion(emotion);

    this.showBubble();

    this.typeText(message, speed);

    this.timer = setTimeout(() => {

        this.hideBubble();

    }, duration);

}

// ======================================
// START CONVERSATION
// Bubble tetap terbuka
// ======================================

Character.startConversation = function ({

    emotion,

    message,

    speed = 35

}) {

    clearTimeout(this.timer);

    this.changeEmotion(emotion);

    this.showBubble();

    this.typeText(message, speed);

}

// ======================================
// UPDATE CONVERSATION
// Bubble tidak ditutup
// ======================================

Character.update = function ({

    emotion,

    message,

    speed = 35

}) {

    clearTimeout(this.timer);

    this.changeEmotion(emotion);

    this.typeText(message, speed);

}

// ======================================
// END CONVERSATION
// ======================================

Character.endConversation = function (duration = 0) {

    clearTimeout(this.timer);

    if (duration <= 0) {

        this.hideBubble();

        return;

    }

    this.timer = setTimeout(() => {

        this.hideBubble();

    }, duration);

}

// ======================================
// DEFAULT
// ======================================

window.addEventListener("DOMContentLoaded", () => {

    Character.startConversation({

        emotion: "happy",

        message: "...."

    });

});