// ###########################################################
// ##                                                       ##
// ##                                                       ##
// ##               Importing DOM elements                  ##
// ##                                                       ##
// ##                                                       ##
// ###########################################################

let form = document.querySelector(".registration-form")
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
let closeBtn = document.querySelector(".close")


// ###########################################################
// ##                                                       ##
// ##                                                       ##
// ##                       Alerts                          ##
// ##                                                       ##
// ##                                                       ##
// ###########################################################


closeBtn.onclick = () => {
  successAlert.style.display = "none"
}


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

// ###########################################################
// ##                                                       ##
// ##                                                       ## 
// ##                     Registration                      ##
// ##                                                       ##
// ##                                                       ##
// ###########################################################

form.addEventListener("submit", async function(e) {
  e.preventDefault();
  let date = new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear();
  let DB_API = "https://67c8964c0acf98d07087272b.mockapi.io/users";

  try {
    // Check if the Telegram username already exists
    let response = await axios.get(`${DB_API}?candidateTelegram=${telegramInput.value}`);

    if (passwordInput.value === confirmPasswordInput.value && response.data.length === 0) {
      // Register the user
      await axios.post(DB_API, {
        candidateName: nameInput.value,
        candidateSurname: surnameInput.value,
        candidateTelegram: telegramInput.value,
        candidatePassword: passwordInput.value,
        registrationDate: date,
        candidateExams: []
      });

      successAlert.style.display = "block"
    } else {
      alert("We could not register you! Either passwords don't match or Telegram is already registered.");
    }
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Error during registration. Please try again.");
  }
});
