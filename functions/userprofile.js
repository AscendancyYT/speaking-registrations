// checking before loading

if (localStorage.getItem("candidateTelegram")) {
  console.log("Everything is fine!");
} else {
  window.location.href = "../index.html";
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
let indicatorLine = document.querySelector(".indicator-line");
let examlist = document.querySelector(".registered-exams-list");

// ###########################################################
// ##                                                       ##
// ##                                                       ##
// ##                    Main functionality                 ##
// ##                                                       ##
// ##                                                       ##
// ###########################################################

let profileNameContent = localStorage.getItem("candidateName");
let profileIconContent = profileNameContent[0];
let profileDateContent = localStorage.getItem("registrationDate");
let profileStatusContent = localStorage.getItem("userStatus");

profileIcon.innerHTML = profileIconContent;
profileName.innerHTML = profileNameContent;
profileDate.innerHTML += profileDateContent;
profileStatus.innerHTML = profileStatusContent;

if (profileStatusContent == "Admin/Creator") {
  profileStatus.style.background = "red";
} else {
  profileStatus.style.background = "green";
}

nameText.innerHTML += profileNameContent;
surnameText.innerHTML += localStorage.getItem("candidateSurname");
telegramText.innerHTML += localStorage.getItem("candidateTelegram");
passwordText.innerHTML += localStorage.getItem("candidatePassword");

let studentScore = localStorage.getItem("studentScore");

indicatorLine.style.width = studentScore + "%";
indicatorLine.innerHTML = studentScore + " " + "SC";

if (studentScore > 85) {
  indicatorLine.style.background = "rgb(9,121,32)";
  indicatorLine.style.background =
    "linear-gradient(90deg, rgba(9,121,32,1) 11%, rgba(0,255,9,1) 100%)";
} else if (studentScore > 74) {
  indicatorLine.style.background = "rgb(39,121,9)";
  indicatorLine.style.background =
    "linear-gradient(90deg, rgba(39,121,9,1) 11%, rgba(227,255,0,1) 100%)";
  indicatorLine.style.color = "#000";
} else if (studentScore > 52) {
  indicatorLine.style.background = "rgb(116,121,9)";
  indicatorLine.style.background =
    "linear-gradient(90deg, rgba(116,121,9,1) 11%, rgba(227,255,0,1) 100%)";
  indicatorLine.style.color = "#000";
} else if (studentScore > 0) {
  indicatorLine.style.background = "rgb(121,9,9)";
  indicatorLine.style.background =
    "linear-gradient(90deg, rgba(121,9,9,1) 11%, rgba(255,0,0,1) 100%)";
}
let DB_API = "https://67c8964c0acf98d07087272b.mockapi.io/users";

async function getuser() {
  let response = await axios.get(DB_API);
  let user = response.data.find(
    (user) => user.candidateTelegram === localStorage.getItem("candidateTelegram")
  );

  if (!user || !Array.isArray(user.candidateExams)) {
    console.error("No exams found");
    return;
  }

  localStorage.setItem("Exams", JSON.stringify(user.candidateExams));

  examlist.innerHTML = user.candidateExams
    .map(exam => `<li class="exam">${exam.examTitle}</li>`)
    .join(""); 
}

getuser();
