let DB_API = "https://67c8964c0acf98d07087272b.mockapi.io/users";

// checking before loading
if (localStorage.getItem("candidateTelegram")) {
  console.log("Everything is fine!");
} else {
  window.location.href = "../index.html";
}

// ###########################################################
// ##               Importing DOM elements                  ##
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
let studentList = document.querySelector(".student-list");

// ###########################################################
// ##                    Main functionality                 ##
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

async function getStudentScore() {
  let response = await axios(DB_API)

  let student = response.data.find(user => user.candidateTelegram === localStorage.getItem("candidateTelegram"));

  let sc = student.studentScore

  indicatorLine.style.width = student.studentScore + "%";
  indicatorLine.innerHTML = student.studentScore + " SC";

  if (student.studentScore == 100) {
    indicatorLine.style.background = "linear-gradient(to right, blue, blueviolet)";
  } else if (sc > 85) {
    indicatorLine.style.background = "rgb(9,121,32)";
    indicatorLine.style.background = "linear-gradient(90deg, rgba(9,121,32,1) 11%, rgba(0,255,9,1) 100%)";
  } else if (sc > 74) {
    indicatorLine.style.background = "rgb(39,121,9)";
    indicatorLine.style.background = "linear-gradient(90deg, rgba(39,121,9,1) 11%, rgba(227,255,0,1) 100%)";
    indicatorLine.style.color = "#000";
  } else if (sc > 52) {
    indicatorLine.style.background = "rgb(116,121,9)";
    indicatorLine.style.background = "linear-gradient(90deg, rgba(116,121,9,1) 11%, rgba(227,255,0,1) 100%)";
    indicatorLine.style.color = "#000";
  } else if (sc > 0) {
    indicatorLine.style.background = "rgb(121,9,9)";
    indicatorLine.style.background = "linear-gradient(90deg, rgba(121,9,9,1) 11%, rgba(255,0,0,1) 100%)";
  } else {
    console.log("what the hail");
  }
}

getStudentScore()

async function getStudentList() {
  let students = await axios.get(DB_API);

  studentList.innerHTML = students.data
    .map(student => `<li class="student ${student.id}">#${student.id} -- ${student.candidateName} -- ${student.status} -- ${student.studentScore}</li>`)
    .join("");
}

getStudentList();

// ###########################################################
// ##      Functionality to Load Clicked Student's Data     ##
// ###########################################################

studentList.addEventListener("click", async (event) => {
  if (event.target.classList.contains("student")) {
    let studentId = event.target.classList[1]; // Get clicked student's ID
    let response = await axios.get(DB_API);
    let student = response.data.find(user => user.id === studentId);

    if (student) {
      // Store clicked student's data in sessionStorage
      sessionStorage.setItem("tempCandidateName", student.candidateName);
      sessionStorage.setItem("tempCandidateSurname", student.candidateSurname);
      sessionStorage.setItem("tempCandidateTelegram", student.candidateTelegram);
      sessionStorage.setItem("tempStudentScore", student.studentScore);
      sessionStorage.setItem("tempStudentStatus", student.status);
      sessionStorage.setItem("tempStudentRegistrationDate", student.registrationDate);
      
      location.reload(); // Reload page
    }
  }
});

// Check if temporary student data exists and load it
if (sessionStorage.getItem("tempCandidateName")) {
  let tempScore = sessionStorage.getItem("tempStudentScore");
  profileName.innerHTML = sessionStorage.getItem("tempCandidateName");
  nameText.innerHTML = sessionStorage.getItem("tempCandidateName");
  surnameText.innerHTML = sessionStorage.getItem("tempCandidateSurname");
  telegramText.innerHTML = sessionStorage.getItem("tempCandidateTelegram");
  passwordText.innerHTML = "************";
  profileDate.innerHTML = "Beloved user Since: " + sessionStorage.getItem("tempStudentRegistrationDate");
  indicatorLine.innerHTML = tempScore + " SC";

  indicatorLine.style.width = tempScore + "%";

  if (tempScore == 100) {
    indicatorLine.style.background = "linear-gradient(to right, blue, blueviolet)";
  } else if (tempScore > 85) {
    indicatorLine.style.background = "rgb(9,121,32)";
    indicatorLine.style.background = "linear-gradient(90deg, rgba(9,121,32,1) 11%, rgba(0,255,9,1) 100%)";
  } else if (tempScore > 74) {
    indicatorLine.style.background = "rgb(39,121,9)";
    indicatorLine.style.background = "linear-gradient(90deg, rgba(39,121,9,1) 11%, rgba(227,255,0,1) 100%)";
    indicatorLine.style.color = "#000";
  } else if (tempScore > 52) {
    indicatorLine.style.background = "rgb(116,121,9)";
    indicatorLine.style.background = "linear-gradient(90deg, rgba(116,121,9,1) 11%, rgba(227,255,0,1) 100%)";
    indicatorLine.style.color = "#000";
  } else if (tempScore > 0) {
    indicatorLine.style.background = "rgb(121,9,9)";
    indicatorLine.style.background = "linear-gradient(90deg, rgba(121,9,9,1) 11%, rgba(255,0,0,1) 100%)";
  } else {
    console.log("what the hail");
  }

  // Remove temp data after displaying
  setTimeout(() => {
    sessionStorage.removeItem("tempCandidateName");
    sessionStorage.removeItem("tempCandidateSurname");
    sessionStorage.removeItem("tempCandidateTelegram");
    sessionStorage.removeItem("tempStudentRegistrationDate");
    sessionStorage.removeItem("tempStudentStatus");
    sessionStorage.removeItem("tempStudentScore");
    location.reload(); // Reload back to the owner's profile
  }, 10000); // Show student's data for 10 seconds, then return
}


// admin only feature to adjust sc