import displayHome from "./home"




const HOME_BUTTON = document.getElementById("home")
const ADD_PROJECT_BUTTON = document.getElementById("add_project")
const CALENDAR_BUTTON = document.getElementById("calendar")
const SETTINGS_BUTTON = document.getElementById("settings")
const LOG_IN_BUTTON = document.getElementById("login")
const content = document.querySelector(".content") 

let firstTime = localStorage.getItem("first_time")
if(!firstTime) {
    localStorage.setItem("first_time","1")
    localStorage.setItem("lastPage", content.innerHTML)

} else if(firstTime){
    let page = localStorage.getItem("lastPage")
}
HOME_BUTTON.onclick = () => displayHome()
ADD_PROJECT_BUTTON.onclick = () => AddProject()
CALENDAR_BUTTON.onclick = () => displayCalendar()

function displayCalendar(){
    localStorage.setItem("lastPage", content.innerHTML)
}
