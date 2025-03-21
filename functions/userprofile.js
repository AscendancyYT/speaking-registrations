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
let nameLabel = document.querySelector(".candidate-name-text");

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
