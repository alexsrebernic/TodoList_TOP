export {slideHomeToCalendar,slideCalendarToHome,openAddProjectButton}
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

function slideHomeToCalendar(){
    home.setAttribute("class","slideLeft")
    calendar.setAttribute("class","slideLeft2")
    setTimeout(() => {
        home.style.display = "none"
    calendar.style.display = "flex"
        
    }, 500);
}
function slideCalendarToHome(){
    calendar.removeAttribute("class")
    home.removeAttribute("class")
    home.setAttribute("class","slideLeft2")
    calendar.setAttribute("class","slideLeft")
    setTimeout(() => {
        calendar.style.display = "none"
        home.style.display = "block"
    }, 500);
}
let isOpen

function openAddProjectButton(){
    if(svgPlus.getAttribute("class") === "rotate"){
        console.log("activado2")
        svgPlus.removeAttribute("class")
        svgPlus.setAttribute("class","return")
        isOpen = false
        formInputProject.removeAttribute("class")
        formInputProject.setAttribute("class","up")
        calendar.removeAttribute("class")
        setTimeout(() => {
        formInputProject.style.display = "none"    
        }, 1000);
        return
    } 
    if(svgPlus.getAttribute("class") === "return"){
        console.log("activado1")
        svgPlus.removeAttribute("class")
        svgPlus.setAttribute("class","rotate")
        isOpen = true
        formInputProject.style.display = "flex"
        formInputProject.removeAttribute("class")
        formInputProject.setAttribute("class","down")
        CALENDAR_BUTTON.removeAttribute("class")
        CALENDAR_BUTTON.setAttribute("class","down1")
        return
    }    
    if(svgPlus.getAttribute("class") == undefined){
        svgPlus.removeAttribute("class")
        svgPlus.setAttribute("class","rotate")
        isOpen = true
        formInputProject.style.display = "flex"
        formInputProject.removeAttribute("class")
        formInputProject.setAttribute("class","down")
        CALENDAR_BUTTON.removeAttribute("class")
        CALENDAR_BUTTON.setAttribute("class","down1")
        return
    }
}