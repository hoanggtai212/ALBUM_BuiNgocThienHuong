let currentLock = 1;
let inputPass = "";

const passwords = {
  1: "301213",   // Pass lock 1
  2: "123456",   // Pass lock 2
  3: "999999"    // Pass lock 3
};

function getCurrentInput() {
  return document.getElementById("password-input-" + currentLock);
}

function enterNumber(num) {
  if (inputPass.length >= 8) return;
  inputPass += num;
  getCurrentInput().value = inputPass;
}

function deleteNumber() {
  inputPass = inputPass.slice(0, -1);
  getCurrentInput().value = inputPass;
}

function checkPass() {
  if (inputPass === passwords[currentLock]) {

    // Ẩn lock hiện tại
    document.getElementById("lock-screen-" + currentLock).style.display = "none";
    inputPass = "";

    if (currentLock < 3) {
      currentLock++;
      document.getElementById("lock-screen-" + currentLock).style.display = "block";
    } else {
      // Mở album
      document.getElementById("book").style.display = "block";
    }

  } else {
    alert("Sai mật khẩu 😜");
    inputPass = "";
    getCurrentInput().value = "";
  }
}
