import { slideHomeToCalendar,slideCalendarToHome,openAddProjectButton } from "./animations"


const HOME_BUTTON = document.getElementById("home")
const ADD_PROJECT_BUTTON = document.getElementById("add_project")
const CALENDAR_BUTTON = document.getElementById("calendar")
const SETTINGS_BUTTON = document.getElementById("settings")
const LOG_IN_BUTTON = document.getElementById("login")

const content = document.querySelector(".content") 
const calendar = document.querySelector("#calendarPage")
const home = document.querySelector("#homePage")
const svgPlus = document.getElementById("plus")
const listLi = document.querySelector(".list")
const formInputProject = document.getElementById("form-input-project")

let firstTime = localStorage.getItem("first_time")
calendar.style.display = "none"

HOME_BUTTON.onclick = () => displayHomeButton()
ADD_PROJECT_BUTTON.onclick = () => addProjectButton()
CALENDAR_BUTTON.onclick = () => displayCalendarButton()

function displayCalendarButton(){
   slideHomeToCalendar()
}
function displayHomeButton(){
   slideCalendarToHome()
   
}

function addProjectButton(){  
   openAddProjectButton()
    

}
