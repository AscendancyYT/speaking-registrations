// checking before loading

if(localStorage.getItem("candidateTelegram")){
  console.log("Everything is fine!");
}else{
  window.location.href="../index.html"
}

// ###########################################################
// ##                                                       ##
// ##                                                       ##
// ##               Importing DOM elements                  ##
// ##                                                       ##
// ##                                                       ##
// ###########################################################

let profileIcon = document.querySelector(".profile-icon");
let profileName = document.querySelector(".profile-name");
let profileDate = document.querySelector(".profile-date");
let profileStatus = document.querySelector(".profile-status");
let nameText = document.querySelector(".candidate-name-text");
let surnameText = document.querySelector(".candidate-surname-text");
let telegramText = document.querySelector(".candidate-telegram-text");
let passwordText = document.querySelector(".candidate-password-text");

// ###########################################################
// ##                                                       ##
// ##                                                       ##
// ##                    Main functionality                 ##
// ##                                                       ##
// ##                                                       ##
// ###########################################################

let profileNameContent = localStorage.getItem("candidateName");
let profileIconContent = profileNameContent[0];
let profileDateContent = localStorage.getItem
("registrationDate");
let profileStatusContent = localStorage.getItem("userStatus");

profileIcon.innerHTML = profileIconContent;
profileName.innerHTML = profileNameContent;
profileDate.innerHTML += profileDateContent;
profileStatus.innerHTML = profileStatusContent;

if(profileStatusContent == "Admin/Creator"){
  profileStatus.style.background = "red"
}else{
  profileStatus.style.background = "green"
}

nameText.innerHTML += profileNameContent;
surnameText.innerHTML += localStorage.getItem("candidateSurname");
telegramText.innerHTML += localStorage.getItem("candidateTelegram");
passwordText.innerHTML += localStorage.getItem("candidatePassword")