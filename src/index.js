import { slideHomeToCalendar,slideCalendarToHome,openAddProjectButton,openConfiguration} from "./animations"
import languajeSwitch from "./languajeSwitch"
import turnNightThemeOrWhiteTheme from "./themeSwitch"
import { initializeApp } from 'firebase/app';
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,GoogleAuthProvider,signInWithPopup,getRedirectResult} from 'firebase/auth'
import {Project,Task} from './projectObject'
const HOME_BUTTON = document.getElementById("home")
const ADD_PROJECT_BUTTON = document.getElementById("add_project")
const CALENDAR_BUTTON = document.getElementById("calendar")
const SETTINGS_BUTTON = document.getElementById("settings")
const LOG_IN_BUTTON = document.getElementById("login")
const NIGHT_MODE_SWITCH = document.getElementById("checkBoxTheme")
const LANGUAJE_SWITCH_BUTTON = document.getElementById("checkBox")
const DONE_PROJECT_BUTTON = document.getElementById("submit-name-project")

const content = document.querySelector(".content") 
const calendar = document.querySelector("#calendarPage")
const home = document.querySelector("#homePage")
const svgPlus = document.getElementById("plus")
const listLi = document.querySelector(".list")
const popUpLogIn  = document.getElementById("popup-login")
const backgroundPopUp = document.getElementById("background-popup")
const formUser = document.getElementById("formUser")
const nameUserSpan = document.getElementById("account-name")
const selectProject = document.getElementById("projects")
let arrayOfProjects = []

HOME_BUTTON.onclick = () => displayHomeButton()
ADD_PROJECT_BUTTON.onclick = () => addProjectButton()
CALENDAR_BUTTON.onclick = () => displayCalendarButton()
SETTINGS_BUTTON.onclick = () => openConfiguration()
NIGHT_MODE_SWITCH.onclick = () => turnNightThemeOrWhiteTheme()
LANGUAJE_SWITCH_BUTTON.onclick = () => languajeSwitch()
LOG_IN_BUTTON.onclick = () => displayPopUpOrLogOut()
DONE_PROJECT_BUTTON.onclick = (e) => createProject(e)
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

     if(loginSpan.textContent == "Log in" || loginSpan.textContent == "Iniciar sesion"){
        displayPopUp()
     } else if(loginSpan.textContent == "Log out" || loginSpan.textContent == "Cerrar sesión"){
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

function createProject(e){
   const inputProject = document.getElementById("input-project")
   if(inputProject.value == "") return e.preventDefault()
   let index = arrayOfProjects.findIndex(object=> object.getNameProject() == inputProject.value)
   if(index > -1){
      return alert("Project already exists, please use another name."),e.preventDefault()
   }
   e.preventDefault()
   let newProject = new Project(inputProject.value)
   arrayOfProjects.push(newProject)
   let optionProject = newProject.createSelectProject()
   selectProject.appendChild(optionProject)
   inputProject.value = null
   if(NIGHT_MODE_SWITCH.checked){
   selectProject.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
   setTimeout(() => {
      selectProject.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
         
      }, 500);
   } else if(!(NIGHT_MODE_SWITCH.checked)){
      selectProject.style.backgroundColor = "rgba(174, 214, 241, 0.7)"
      setTimeout(() => {
      selectProject.style.backgroundColor = "rgba(174, 214, 241, 0.1)"
         
      }, 500);
   }
  
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
       createUserWithEmailAndPassword(auth,emailElement.value,passwordElement.value).then((userCredential) => {
          formUser.reset()
          const user = userCredential.user
          endLogInOrLogOut(false,true,user)
         })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         stateForm.textContent =  errorCode
         throwErrorSpan(error)
      })     
}
signInElement.onclick = (e) => {
   e.preventDefault()
   signInWithEmailAndPassword(auth,emailElement.value,passwordElement.value)
   .then((userCredential) => {
      formUser.reset()
      const user = userCredential.user
      endLogInOrLogOut(false,true,user)
   })
   .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      stateForm.textContent =  errorCode
     throwErrorSpan(error)
   })  
}
function logOutUser(){
   signOut(auth)
   .then(()=>{
      endLogInOrLogOut(true,false)
      nameUserSpan.textContent = ""
   }).catch((error)=>{
      alert(error.message)
   })
}
const provider = new GoogleAuthProvider();
googleUser.onclick = () => {
signInWithPopup(auth,provider)
.then((result) => {
   const credential = GoogleAuthProvider.credentialFromResult(result)
   const token = credential.accessToken
   const user = result.user
   endLogInOrLogOut(false,true,user)
}).catch((error) => {
   const errorCode = error.code;
   const errorMessage = error.message;
   const email = error.email;
   const credential = GoogleAuthProvider.credentialFromError(error);
   alert("A error happen: " + errorCode)
})
getRedirectResult(auth)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    const user = result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}
demoUser.onclick = () =>{
   closePopUp()
   nameUserSpan.textContent = "Hello, your tasks and projects will not be saved when you leave the page, if you want them to be saved please login or register"
}

function endLogInOrLogOut(logout,login,user){
   closePopUp()
   if(login === true && logout === false){
      if(LANGUAJE_SWITCH_BUTTON.checked){
         LOG_IN_BUTTON.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg> ` + '<span id="loginspan">Cerrar sesión</span>'
    nameUserSpan.textContent = "Hola " + user.displayName + "!"
      } else if (!(LANGUAJE_SWITCH_BUTTON.checked)){
         LOG_IN_BUTTON.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg> ` + '<span id="loginspan">Log out</span>'
    nameUserSpan.textContent = "Hi " + user.displayName + "!"

      }
   }else if (logout === true && login === false){
      if(LANGUAJE_SWITCH_BUTTON.checked){
         LOG_IN_BUTTON.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>` + '<span id="loginspan">Iniciar sesion</span>'
      } else if (!(LANGUAJE_SWITCH_BUTTON.checked)){
         LOG_IN_BUTTON.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>` + '<span id="loginspan">Log in</span>'
      }
   } 
}
function throwErrorSpan(error){
   if(error){
      nameUserSpan.textContent = ''

      }
   setTimeout(() => {
      stateForm.textContent = ""
   }, 4000);
}
