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
const QUESTION_MARK_BUTTON = document.getElementById("question-mark")

const content = document.querySelector(".content") 
const calendar = document.querySelector("#calendarPage")
const home = document.querySelector("#homePage")
const svgPlus = document.getElementById("plus")
const listLi = document.querySelector(".list")
const formInputProject = document.getElementById("form-input-project")


HOME_BUTTON.onclick = () => displayHomeButton()
ADD_PROJECT_BUTTON.onclick = () => addProjectButton()
CALENDAR_BUTTON.onclick = () => displayCalendarButton()
QUESTION_MARK_BUTTON.onclick = () => displayPopUpHelp()
SETTINGS_BUTTON.onclick = () => openConfiguration()
NIGHT_MODE_SWITCH.onclick = () => turnNightThemeOrWhiteTheme()
LANGUAJE_SWITCH_BUTTON.onclick = () => languajeSwitch()
window.onload = languajeSwitch()
window.onload = turnNightThemeOrWhiteTheme()
function displayCalendarButton(){
   slideHomeToCalendar()
}
function displayHomeButton(){
   slideCalendarToHome()
   
}

function addProjectButton(){  
   openAddProjectButton()
}

