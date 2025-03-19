// ###########################################################
// ##                                                       ##
// ##                                                       ##
// ##               Importing DOM elements                  ##
// ##                                                       ##
// ##                                                       ##
// ###########################################################

let title = document.querySelector(".title");
let loginTitle = document.querySelector(".lTitle");
let nameInput = document.querySelector(".nameInput");
let surnameInput = document.querySelector(".surnameInput");
let telegramInput = document.querySelector(".telegramInput");
let passwordInput = document.querySelector(".passwordInput");
let confirmPasswordInput = document.querySelector(".confirmPasswordInput");
let submitBtn = document.querySelector(".submitBtn");
let loginBtn = document.querySelector(".loginBtn");
let signUpBtn = document.querySelector(".signUpBtn");

// ###########################################################
// ##                                                       ##
// ##                                                       ##
// ##                  Checing The Mode                     ##
// ##                                                       ##
// ##                                                       ##
// ###########################################################

let isLogin = false;

loginBtn.onclick = () => {
  if (isLogin == false) {
    // enabling login mode
    isLogin = true;
    // switching titles
    title.style.display = "none";
    loginTitle.style.display = "block";
    // removing unnecessary inputs
    nameInput.style.display = "none";
    surnameInput.style.display = "none";
    confirmPasswordInput.style.display = "none";
    // swaping buttons
    loginBtn.style.display = "none";
    signUpBtn.style.display = "block";
  }
};

signUpBtn.onclick = () => {
  if (isLogin == true) {
    // disabling login mode
    isLogin = false;
    // switching titles
    title.style.display = "block";
    loginTitle.style.display = "none";
    // adding inputs back
    nameInput.style.display = "block";
    surnameInput.style.display = "block";
    confirmPasswordInput.style.display = "block";
    // swaping buttons
    loginBtn.style.display = "block";
    signUpBtn.style.display = "none";
  }
};
