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

let studentScore = localStorage.getItem("studentScore");

indicatorLine.style.width = studentScore + "%";
indicatorLine.innerHTML = studentScore + " SC";

if (studentScore == 100) {
  indicatorLine.style.background = "linear-gradient(to right, blue, blueviolet)";
} else if (studentScore > 85) {
  indicatorLine.style.background = "rgb(9,121,32)";
  indicatorLine.style.background = "linear-gradient(90deg, rgba(9,121,32,1) 11%, rgba(0,255,9,1) 100%)";
} else if (studentScore > 74) {
  indicatorLine.style.background = "rgb(39,121,9)";
  indicatorLine.style.background = "linear-gradient(90deg, rgba(39,121,9,1) 11%, rgba(227,255,0,1) 100%)";
  indicatorLine.style.color = "#000";
} else if (studentScore > 52) {
  indicatorLine.style.background = "rgb(116,121,9)";
  indicatorLine.style.background = "linear-gradient(90deg, rgba(116,121,9,1) 11%, rgba(227,255,0,1) 100%)";
  indicatorLine.style.color = "#000";
} else if (studentScore > 0) {
  indicatorLine.style.background = "rgb(121,9,9)";
  indicatorLine.style.background = "linear-gradient(90deg, rgba(121,9,9,1) 11%, rgba(255,0,0,1) 100%)";
} else {
  console.log("what the hail");
}

let DB_API = "https://67c8964c0acf98d07087272b.mockapi.io/users";

async function getUserExams(userTelegram) {
  let response = await axios.get(DB_API);
  let user = response.data.find((user) => user.candidateTelegram === userTelegram);

  if (!user || !Array.isArray(user.candidateExams)) {
    console.error("No exams found");
    examlist.innerHTML = "<li class='exam'>No exams registered</li>";
    return;
  }

  examlist.innerHTML = user.candidateExams
    .map(exam => `<li class="exam">${exam.examTitle}</li>`)
    .join("");
}

async function getStudentList() {
  let students = await axios.get(DB_API);

  studentList.innerHTML = students.data
    .map(student => `<li class="student ${student.id}">#${student.id} -- ${student.candidateName} -- ${student.status} -- ${student.studentScore}</li>`)
    .join("");
}

// Load the current user's exams
getUserExams(localStorage.getItem("candidateTelegram"));
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
  profileName.innerHTML = sessionStorage.getItem("tempCandidateName");
  nameText.innerHTML = sessionStorage.getItem("tempCandidateName");
  surnameText.innerHTML = sessionStorage.getItem("tempCandidateSurname");
  telegramText.innerHTML = sessionStorage.getItem("tempCandidateTelegram");
  profileStatus.innerHTML = sessionStorage.getItem("tempStudentStatus");
  passwordText.innerHTML = "************";
  profileDate.innerHTML = "Beloved user Since: " + sessionStorage.getItem("tempStudentRegistrationDate");

  let tempScore = sessionStorage.getItem("tempStudentScore");
  indicatorLine.style.width = tempScore + "%";
  indicatorLine.innerHTML = tempScore + " SC";

  // Load exams for the selected student
  getUserExams(sessionStorage.getItem("tempCandidateTelegram"));

  // Remove temp data after displaying
  setTimeout(() => {
    sessionStorage.removeItem("tempCandidateName");
    sessionStorage.removeItem("tempCandidateSurname");
    sessionStorage.removeItem("tempCandidateTelegram");
    sessionStorage.removeItem("tempStudentScore");
    sessionStorage.removeItem("tempStudentRegistrationDate");
    sessionStorage.removeItem("tempStudentStatus");
    location.reload(); // Reload back to the owner's profile
  }, 10000); // Show student's data for 10 seconds, then return
}
