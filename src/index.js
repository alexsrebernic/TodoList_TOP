import {displayHome,displayCalendar} from "./display"



const HOME_BUTTON = document.getElementById("home")
const ADD_PROJECT_BUTTON = document.getElementById("add_project")
const CALENDAR_BUTTON = document.getElementById("calendar")
const SETTINGS_BUTTON = document.getElementById("settings")
const LOG_IN_BUTTON = document.getElementById("login")
const content = document.querySelector(".content") 
const calendar = document.querySelector(".auto-jsCalendar")
const home = document.querySelector(".home")
let firstTime = localStorage.getItem("first_time")
calendar.style.display = "none"

HOME_BUTTON.onclick = () => displayHomeButton()
ADD_PROJECT_BUTTON.onclick = () => AddProject()
CALENDAR_BUTTON.onclick = () => displayCalendarButton()

function displayCalendarButton(){
    home.style.display = "none"
    calendar.style.display = "flex"
}
function displayHomeButton(){
   calendar.style.display = "none"
   home.style.display = "block"
}
