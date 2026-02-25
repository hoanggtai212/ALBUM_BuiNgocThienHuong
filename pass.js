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

  if (inputPass === passwords[currentLock]) {

    const overlay = document.getElementById("unlock-overlay");
    const bigLock = overlay.querySelector(".big-lock");

    overlay.style.display = "flex";

    // reset animation
    bigLock.classList.remove("spin", "open");
    void bigLock.offsetWidth;

    // quay
    bigLock.classList.add("spin");

    // sau khi quay xong → mở khóa
    setTimeout(() => {
      bigLock.classList.add("open");
    }, 2000);

    // sau khi mở xong → chuyển màn
    setTimeout(() => {

      overlay.style.display = "none";
      bigLock.classList.remove("spin", "open");

      currentScreen.style.display = "none";

      inputPass = "";
      getInput().value = "";

      if (currentLock < 3) {
        currentLock++;
        document.getElementById("lock-screen-" + currentLock).style.display = "flex";
      } else {
        document.getElementById("book").style.display = "block";
      }

    }, 2500);

  } else {

    // Sai → rung
    currentScreen.classList.add("shake");

    setTimeout(() => {
      currentScreen.classList.remove("shake");
    }, 400);

    inputPass = "";
    getInput().value = "";
  }
}
