import { slideHomeToCalendar,slideCalendarToHome,openAddProjectButton,openConfiguration} from "./animations"
import languajeSwitch from "./languajeSwitch"
import turnNightThemeOrWhiteTheme from "./themeSwitch"
import { initializeApp } from 'firebase/app';
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'firebase/auth'
const HOME_BUTTON = document.getElementById("home")
const ADD_PROJECT_BUTTON = document.getElementById("add_project")
const CALENDAR_BUTTON = document.getElementById("calendar")
const SETTINGS_BUTTON = document.getElementById("settings")
const LOG_IN_BUTTON = document.getElementById("login")
const NIGHT_MODE_SWITCH = document.getElementById("checkBoxTheme")
const LANGUAJE_SWITCH_BUTTON = document.getElementById("checkBox")

const content = document.querySelector(".content") 
const calendar = document.querySelector("#calendarPage")
const home = document.querySelector("#homePage")
const svgPlus = document.getElementById("plus")
const listLi = document.querySelector(".list")
const formInputProject = document.getElementById("form-input-project")
const popUpLogIn  = document.getElementById("popup-login")
const backgroundPopUp = document.getElementById("background-popup")
const svgClosePopUp = document.getElementById("close-pop-up")
const formUser = document.getElementById("formUser")
const nameUserSpan = document.getElementById("account-name")

HOME_BUTTON.onclick = () => displayHomeButton()
ADD_PROJECT_BUTTON.onclick = () => addProjectButton()
CALENDAR_BUTTON.onclick = () => displayCalendarButton()
SETTINGS_BUTTON.onclick = () => openConfiguration()
NIGHT_MODE_SWITCH.onclick = () => turnNightThemeOrWhiteTheme()
LANGUAJE_SWITCH_BUTTON.onclick = () => languajeSwitch()
LOG_IN_BUTTON.onclick = () => displayPopUpOrLogOut()
svgClosePopUp.onclick = () => closePopUp()
window.onload = languajeSwitch()
window.onload = turnNightThemeOrWhiteTheme()

window.onload = () => {
   if(!(localStorage.getItem("firstSession"))){
      let firstTimeUser = localStorage.setItem("firstSession","1")
      displayPopUp()
   }
}


function closePopUp(){
   popUpLogIn.removeAttribute("class")
   popUpLogIn.setAttribute("class","desvanecerse")
   setTimeout(() => {
      backgroundPopUp.style.display  = "none"
      
   }, 500);
   formUser.reset()
}
function displayPopUpOrLogOut () {
const loginSpan = document.getElementById("loginspan")

     if(loginSpan.textContent == "Log in"){
        displayPopUp()
     } else if(loginSpan.textContent == "Log out"){
      logOutUser()
   }
   
}
function displayPopUp(){
   backgroundPopUp.style.display = "block"
   popUpLogIn.style.display = "flex"
   popUpLogIn.setAttribute("class","fromtop")
}
function displayCalendarButton(){
   slideHomeToCalendar()
}
function displayHomeButton(){
   slideCalendarToHome()
}

function addProjectButton(){  
   openAddProjectButton()
}

// FIREBASE
const emailElement  = document.getElementById("email-input")
const passwordElement = document.getElementById("password-input")
const signUpElement = document.getElementById("sign-up")
const signInElement = document.getElementById("sign-in")
const googleUser = document.getElementById("googleUser")
const demoUser = document.getElementById("demoUser")
const stateForm = document.getElementById("state")

const firebaseConfig = {

   apiKey: "AIzaSyB_9bN8wsncvuVCIEnzYIFhg-mwWFu9T_s",
 
   authDomain: "to-do-app-780b2.firebaseapp.com",
 
   projectId: "to-do-app-780b2",
 
   storageBucket: "to-do-app-780b2.appspot.com",
 
   messagingSenderId: "411421814027",
 
   appId: "1:411421814027:web:de143fb0d153c8fa8dc60e",
 
   measurementId: "G-WEEDGLSV32"
 
 };
 const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

signUpElement.onclick = (e) => {
   e.preventDefault()
   nameUserSpan.textContent = 'Hi!, ' + emailElement.value
       createUserWithEmailAndPassword(auth,emailElement.value,passwordElement.value).then((userCredential) => {
          formUser.reset()
          const user = userCredential.user
          closePopUp()
         LOG_IN_BUTTON.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
       </svg> ` + '<span id="loginspan">Log out</span>'
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         stateForm.textContent =  errorCode
         if(error){
         nameUserSpan.textContent = ''

         }
         setTimeout(() => {
            stateForm.textContent = ""
         }, 4000);
      })     
}
signInElement.onclick = (e) => {
   e.preventDefault()
   nameUserSpan.textContent = 'Hi!, ' + emailElement.value
   signInWithEmailAndPassword(auth,emailElement.value,passwordElement.value)
   .then((userCredential) => {
      formUser.reset()
      const user = userCredential.user
      closePopUp()
      LOG_IN_BUTTON.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
       </svg> ` + '<span id="loginspan">Log out</span>'

   })
   .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      stateForm.textContent =  errorCode
      if(error){
         nameUserSpan.textContent = ''

         }
      setTimeout(() => {
         stateForm.textContent = ""
      }, 4000);
   })  
}
function logOutUser(){
   signOut(auth)
   .then(()=>{
      LOG_IN_BUTTON.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>` + '<span id="loginspan">Log in</span>'
      nameUserSpan.textContent = ""

   }).catch((error)=>{
      alert(error.code)
   })
}
