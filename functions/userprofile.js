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
profileStatus.innerHTML = profileStatusContent