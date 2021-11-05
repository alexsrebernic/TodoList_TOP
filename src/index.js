import { slideHomeToCalendar,slideCalendarToHome,openAddProjectButton,openConfiguration,displayPopUpHelp } from "./animations"
import languajeSwitch from "./languajeSwitch"
import turnNightThemeOrWhiteTheme from "./themeSwitch"

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

const demoUser = document.getElementById("demoUser")

HOME_BUTTON.onclick = () => displayHomeButton()
ADD_PROJECT_BUTTON.onclick = () => addProjectButton()
CALENDAR_BUTTON.onclick = () => displayCalendarButton()
SETTINGS_BUTTON.onclick = () => openConfiguration()
NIGHT_MODE_SWITCH.onclick = () => turnNightThemeOrWhiteTheme()
LANGUAJE_SWITCH_BUTTON.onclick = () => languajeSwitch()
LOG_IN_BUTTON.onclick = () => displayPopUp()
svgClosePopUp.onclick = () => closePopUp()
demoUser.onclick = () => whoIsTheUser("demo_user")
window.onload = languajeSwitch()
window.onload = turnNightThemeOrWhiteTheme()
/*
window.onload = () => {
   if(!(localStorage.getItem("firstSession"))){
      let firstTimeUser = localStorage.setItem("firstSession","1")
      displayPopUp()
   }
}
*/
function whoIsTheUser(user){
   switch(user){
      case user == "demo_user":
         closePopUp()
         localStorage.setItem("user", "0")   
      break
      case user == "google_user":
      localStorage.setItem("user", "1")   
      break
      case user = "log-in-user":
         localStorage.setItem("user","2")
      break
   }
   if(user == "demo_user"){
      if(!(localStorage.getItem("user"))){
         localStorage.setItem("user","0")
      }
   }
}

function closePopUp(){
   backgroundPopUp.style.display  = "none"
}
function displayPopUp () {
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

