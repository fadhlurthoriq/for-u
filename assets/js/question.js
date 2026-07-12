const Question = {
  current: 0,
  data: QuestionData,
  answers: [],
  locked: false,
  container: null,
  progressFill: null,
  cards: null,
};

Question.init = function () {
  this.container = document.getElementById("question-stack");
  this.progressFill = document.getElementById("question-progress-fill");
  this.mochiWrapper = document.getElementById("question-scene-mochi");
  this.mochiImage = document.getElementById("question-scene-mochi-image");
  this.mochiBubble = document.getElementById("question-scene-mochi-bubble");

  if (!this.container) return;

  this.render();
};

Question.render = function () {
  let html = "";

  this.data.forEach((q, index) => {
    let optionsHtml = "";

    q.options.forEach((opt) => {
      optionsHtml += `<button class="question-option">${opt}</button>`;
    });

    html += `
      <div class="question-card" data-index="${index}">
        <div class="question-top">
          <h2>${q.question}</h2>
        </div>
        <div class="question-bottom">
          ${optionsHtml}
        </div>
      </div>
    `;
  });

  this.container.innerHTML = html;
  this.cards = document.querySelectorAll(".question-card");

  this.bindOptions();
};

Question.bindOptions = function () {
  this.cards.forEach((card, index) => {
    const options = card.querySelectorAll(".question-option");

    options.forEach((btn) => {
      btn.onclick = () => {
        if (index !== this.current || this.locked) return;

        this.locked = true;

        options.forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");

        const q = this.data[index];

        this.answers.push({
          question: q.question,
          answer: btn.textContent,
        });

        setTimeout(() => {
          this.locked = false;
          this.next();
        }, 500);
      };
    });
  });
};

Question.update = function () {
  this.applyPositions();
  this.playMochi();
};

Question.applyPositions = function () {
  this.cards.forEach((card, index) => {
    card.classList.toggle("is-active", index === this.current);
  });

  const percent = (this.current / this.data.length) * 100;

  if (this.progressFill) this.progressFill.style.width = percent + "%";
};

Question.playMochi = function () {
  const q = this.data[this.current];

  if (!q || !q.mochiDialog || !this.mochiImage) return;

  this.mochiImage.src = `assets/emoji/mochi/${q.mochiDialog.emotion}.png`;
  this.mochiBubble.classList.add("gallery-popup-bubble-show");
  this.mochiWrapper.classList.add("show");
  this.typeText(q.mochiDialog.message);
};

Question.typeText = function (text, speed = 30) {
  clearInterval(this.typingTimer);

  this.mochiBubble.classList.remove("bubble-pop");
  void this.mochiBubble.offsetWidth;
  this.mochiBubble.classList.add("bubble-pop");

  this.mochiBubble.innerHTML = "";

  let i = 0;

  this.typingTimer = setInterval(() => {
    if (i < text.length) {
      this.mochiBubble.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(this.typingTimer);
    }
  }, speed);
};

Question.next = function () {
  if (this.current >= this.data.length - 1) {
    this.finish();
    return;
  }

  this.current++;
  this.update();
};

Question.finish = function () {
  if (this.progressFill) this.progressFill.style.width = "100%";

  this.submit();

  Scene.cinematicBlank(() => {
    QuestionEnd.show();
  });
};

Question.submit = function () {
  fetch(CONFIG.sheet.url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      name: CONFIG.login.username,
      timestamp: new Date().toISOString(),
      answers: this.answers,
    }),
  }).catch((err) => {
    console.error("Gagal kirim jawaban ke spreadsheet:", err);
  });
};

Question.enter = function () {
  this.current = 0;
  this.answers = [];
  this.locked = false;

  this.update();
};