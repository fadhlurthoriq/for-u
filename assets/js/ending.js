const Ending = {
    typingTimer: null,
    stage: "gift",
};

Ending.init = function () {
    this.mochiImage = document.getElementById("ending-mochi-image");
    this.mochiBubble = document.getElementById("ending-mochi-bubble");

    this.giftStage = document.getElementById("ending-gift-stage");
    this.giftImage = document.getElementById("ending-gift-image");

    this.thanksCard = document.getElementById("ending-thanks-card");
    this.thanksText = document.getElementById("ending-thanks-text");
    this.thanksClose = document.getElementById("ending-thanks-close");

    this.qrCard = document.getElementById("ending-qr-card");
    this.qrText = document.getElementById("ending-qr-text");
    this.qrImage = document.getElementById("ending-qr-image");
    this.qrLink = document.getElementById("ending-qr-link");

    this.thanksClose.onclick = () => this.closeThanks();

    // ⬅️ GANTI 2 baris ini sesuai file/link kamu nanti
    this.qrImage.src = "assets/img/ending/qr-bloopers.png";
    this.qrLink.href = "https://drive.google.com/drive/folders/1zYCazp4gv15BeHLG0e7UMbTAxdeb5-vr?usp=sharing";
};

Ending.enter = function () {
    this.stage = "gift";

    this.giftStage.style.display = "flex";
    this.giftStage.style.opacity = "1";

    this.thanksCard.classList.remove("card-show", "hide");
    this.qrCard.classList.remove("card-show");

    Overlay.hideFocus();

    this.giftImage.src = "assets/img/ending/gift-closed.png";
    this.giftImage.classList.remove("gift-pop", "gift-settle");
    this.giftImage.onclick = () => this.openGift();
};

Ending.openGift = function () {
    this.giftImage.onclick = null;

    // 1. closed -> open (tutup kotak kebuka)
    this.giftImage.src = "assets/img/ending/gift-open.png";
    this.giftImage.classList.add("gift-pop");

    setTimeout(() => {
        // 2. open -> confetti (meriah, jadi tampilan akhir)
        this.giftImage.src = "assets/img/ending/gift-confetti.png";
        this.giftImage.classList.remove("gift-pop");
        this.giftImage.classList.add("gift-settle");
    }, 500);

    setTimeout(() => {
        this.showThanks();
    }, 1400);
};

Ending.showThanks = function () {
    this.stage = "thanks";

    this.giftStage.style.display = "none";

    Overlay.showFocus();

    this.mochiImage.src = "assets/emoji/mochi/love.png";
    this.mochiBubble.innerHTML = "";

    this.thanksCard.classList.add("card-show");

    this.typeText(
        this.thanksText,
        "Makasih ya udah nemenin aku bikin ini semua, dan makasih udah jadi bagian penting di hidupku ❤️"
    );
};

Ending.closeThanks = function () {
    Overlay.hideFocus();

    this.thanksCard.classList.remove("card-show");
    this.thanksCard.classList.add("hide");

    this.thanksCard.addEventListener("animationend", () => {
        this.thanksCard.classList.remove("hide");
        this.showQr();
    }, { once: true });
};

Ending.showQr = function () {
    this.stage = "qr";

    this.qrCard.classList.add("card-show");

    this.typeText(this.qrText, "Ini ada bloopers pas aku bikin web ini, klik ya buat liat videonya 😄");
};

Ending.typeText = function (el, text, callback, speed = 30) {
    clearInterval(this.typingTimer);
    el.innerHTML = "";
    let i = 0;

    this.typingTimer = setInterval(() => {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(this.typingTimer);
            if (callback) callback();
        }
    }, speed);
};