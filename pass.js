let currentLock = 1;
let inputPass = "";

const passwords = {
  1: "301213",
  2: "1",
  3: "2"
};

function getInput() {
  return document.getElementById("password-input-" + currentLock);
}

function enterNumber(num) {
  if (inputPass.length >= 8) return;
  inputPass += num;
  getInput().value = inputPass;
}

function deleteNumber() {
  inputPass = inputPass.slice(0, -1);
  getInput().value = inputPass;
}

function checkPass() {
  const currentScreen = document.getElementById("lock-screen-" + currentLock);
  const input = getInput();
  const submitBtn = currentScreen.querySelector(".submit-btn");

  if (inputPass === passwords[currentLock]) {

    input.classList.add("input-success");
    submitBtn.classList.add("submit-success");

    setTimeout(() => {
      currentScreen.classList.add("success");

      setTimeout(() => {
        currentScreen.style.display = "none";
        currentScreen.classList.remove("success");
        input.classList.remove("input-success");
        submitBtn.classList.remove("submit-success");

        inputPass = "";
        input.value = "";

        if (currentLock < 3) {
          currentLock++;
          document.getElementById("lock-screen-" + currentLock).style.display = "flex";
        } else {
          document.getElementById("book").style.display = "block";
        }

      }, 600);

    }, 300);

  } else {

    input.classList.add("input-error");
    currentScreen.classList.add("shake");
    currentScreen.classList.add("flash-error");

    setTimeout(() => {
      input.classList.remove("input-error");
      currentScreen.classList.remove("shake");
      currentScreen.classList.remove("flash-error");
    }, 400);

    inputPass = "";
    input.value = "";
  }
}
