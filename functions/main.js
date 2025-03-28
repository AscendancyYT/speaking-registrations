if(localStorage.getItem("candidateTelegram")){
  alert("Be sure that you already have an accaunt")
}

// ###########################################################
// ##                                                       ##
// ##                                                       ##
// ##               Importing DOM elements                  ##
// ##                                                       ##
// ##                                                       ##
// ###########################################################

let form = document.querySelector(".registration-form");
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
// ##                     Miscellaneous                     ##
// ##                                                       ##
// ##                                                       ##
// ###########################################################



let DB_API = "https://67c8964c0acf98d07087272b.mockapi.io/users";

// ###########################################################
// ##                                                       ##
// ##                                                       ##
// ##                  Checking The Mode                    ##
// ##                                                       ##
// ##                                                       ##
// ###########################################################

let isLogin = false;

loginBtn.onclick = () => {
  if (!isLogin) {
    isLogin = true;
    title.style.display = "none";
    loginTitle.style.display = "block";

    // Disable & hide unnecessary inputs
    nameInput.disabled = true;
    surnameInput.disabled = true;
    confirmPasswordInput.disabled = true;
    nameInput.style.display = "none";
    surnameInput.style.display = "none";
    confirmPasswordInput.style.display = "none";

    // Swap buttons
    loginBtn.style.display = "none";
    signUpBtn.style.display = "block";
  }
};

signUpBtn.onclick = () => {
  if (isLogin) {
    isLogin = false;
    title.style.display = "block";
    loginTitle.style.display = "none";

    // Enable & show inputs again
    nameInput.disabled = false;
    surnameInput.disabled = false;
    confirmPasswordInput.disabled = false;
    nameInput.style.display = "block";
    surnameInput.style.display = "block";
    confirmPasswordInput.style.display = "block";

    // Swap buttons
    loginBtn.style.display = "block";
    signUpBtn.style.display = "none";
  }
};

// ###########################################################
// ##                                                       ##
// ##                                                       ##
// ##                     Registration                      ##
// ##                                                       ##
// ##                                                       ##
// ###########################################################

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let date =
    new Date().getDate() +
    "/" +
    new Date().getMonth() +
    "/" +
    new Date().getFullYear();

  try {
    let response = await axios.get(DB_API);
    let userExists = response.data.some(
      (user) => user.candidateTelegram === telegramInput.value
    );

    if (isLogin) {
      // #########################
      // ##     LOGIN LOGIC     ##
      // #########################

      let user = response.data.find(
        (user) => user.candidateTelegram == telegramInput.value
      );
      if (user.candidatePassword != passwordInput.value) {
        alert("Incorrect password!");
        return;
      }

   

      localStorage.setItem("userStatus", "Admin/Creator");
      localStorage.setItem("candidateName", user.candidateName);
      localStorage.setItem("candidateSurname", user.candidateSurname);
      localStorage.setItem("candidateTelegram", user.candidateTelegram);
      localStorage.setItem("candidatePassword", user.candidatePassword);
      localStorage.setItem("registrationDate", user.registrationDate);
      localStorage.setItem("studentScore", user.studentScore);
      window.location.href = "./pages/UserProfile.html"; // Redirect after login
    } else {
      // ###########################
      // ##   REGISTRATION LOGIC   ##
      // ###########################
      if (userExists) {
        alert("Telegram username already exists!");
        return;
      }

      if (passwordInput.value !== confirmPasswordInput.value) {
        alert("Passwords do not match!");
        return;
      }

      if (telegramInput.value == "@AzizbekEshimov") {
        await axios.post(DB_API, {
          status: "Admin/Creator",
          candidateName: nameInput.value,
          candidateSurname: surnameInput.value,
          candidateTelegram: telegramInput.value,
          candidatePassword: passwordInput.value,
          registrationDate: date,
          studentScore: 100,
        });
        localStorage.setItem("userStatus", "Admin/Creator");
        localStorage.setItem("candidateName", nameInput.value);
        localStorage.setItem("candidateSurname", surnameInput.value);
        localStorage.setItem("candidateTelegram", telegramInput.value);
        localStorage.setItem("candidatePassword", passwordInput.value);
        localStorage.setItem("registrationDate", date);
        localStorage.setItem("studentScore", 100);
      } else {
        await axios.post(DB_API, {
          status: "Student/TestTaker",
          candidateName: nameInput.value,
          candidateSurname: surnameInput.value,
          candidateTelegram: telegramInput.value,
          candidatePassword: passwordInput.value,
          registrationDate: date,
          studentScore: 100,
        });
        localStorage.setItem("userStatus", "Student/TestTaker");
        localStorage.setItem("candidateName", nameInput.value);
        localStorage.setItem("candidateSurname", surnameInput.value);
        localStorage.setItem("candidateTelegram", telegramInput.value);
        localStorage.setItem("candidatePassword", passwordInput.value);
        localStorage.setItem("registrationDate", date);
        localStorage.setItem("studentScore", 100);
      }

      window.location.href = "./pages/UserProfile.html";
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred! Please try again later.");
  }
});
