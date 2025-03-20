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
let successAlert = document.querySelector(".alert-success");
let closeBtn = document.querySelector(".close");


// ###########################################################
// ##                                                       ##
// ##                                                       ##
// ##                     Miscellaneous                     ##
// ##                                                       ##
// ##                                                       ##
// ###########################################################

closeBtn.onclick = () => {
  successAlert.style.display = "none";
};

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
  let date = new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear();

  try {
    let response = await axios.get(DB_API);
    let userExists = response.data.some(user => user.candidateTelegram === telegramInput.value);

    if (isLogin) {
      // #########################
      // ##     LOGIN LOGIC     ##
      // #########################


      let user = response.data.find(user => user.candidateTelegram === telegramInput.value);
      if (user.candidatePassword !== passwordInput.value) {
        alert("Incorrect password!");
        return;
      }

      window.location.href = "https://google.com"; // Redirect after login
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

      if(telegramInput.value == "@AzizbekEshimov"){        
        await axios.post(DB_API, {
          status: "Admin/Creator",
          candidateName: nameInput.value,
          candidateSurname: surnameInput.value,
          candidateTelegram: telegramInput.value,
          candidatePassword: passwordInput.value,
          registrationDate: date,
          candidateExams: []
        });
      }else{
        await axios.post(DB_API, {
          status: "Student/TestTaker",
          candidateName: nameInput.value,
          candidateSurname: surnameInput.value,
          candidateTelegram: telegramInput.value,
          candidatePassword: passwordInput.value,
          registrationDate: date,
          candidateExams: []
        });
      }


      window.location.href="https://youtube.com"
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred! Please try again later.");
  }
});
