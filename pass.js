let currentLock = 1;
let inputPass = "";

const passwords = {
  1: "301213",
  2: "123456",
  3: "999999"
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
  if (inputPass === passwords[currentLock]) {

    document.getElementById("lock-screen-" + currentLock).style.display = "none";
    inputPass = "";

    if (currentLock < 3) {
      currentLock++;
      document.getElementById("lock-screen-" + currentLock).style.display = "block";
    } else {
      document.getElementById("book").style.display = "block";
    }

  } else {
    alert("Sai mật khẩu 😜");
    inputPass = "";
    getInput().value = "";
  }
}
