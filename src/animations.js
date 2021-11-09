export {slideHomeToCalendar,slideCalendarToHome,openAddProjectButton,openConfiguration}
const HOME_BUTTON = document.getElementById("home")
const ADD_PROJECT_BUTTON = document.getElementById("add_project")
const CALENDAR_BUTTON = document.getElementById("calendar")
const SETTINGS_BUTTON = document.getElementById("settings")
const LOG_IN_BUTTON = document.getElementById("login")

const content = document.querySelector(".content") 
const calendar = document.querySelector("#calendarPage")
const home = document.querySelector("#homePage")
const svgPlus = document.getElementById("plus")


const formInputProject = document.getElementById("form-input-project")
const settingOptions = document.getElementById("settings-options")
const svgConfg = document.getElementById("svg-config")
const nightModeButton = document.getElementById("night-mode")

function slideHomeToCalendar(){
    home.setAttribute("class","slideLeft")
    calendar.setAttribute("class","slideLeft2")
    setTimeout(() => {
        home.style.display = "none"
    calendar.style.display = "flex"
        
    }, 500);
}

home.style.display = "block"
function slideCalendarToHome(){
    if(home.style.display != "block"){  
        calendar.removeAttribute("class")
        home.removeAttribute("class")
        home.setAttribute("class","slideLeft2")
        calendar.setAttribute("class","slideLeft")
        setTimeout(() => {
            calendar.style.display = "none"
            home.style.display = "block"
        }, 500);
    }  
}

function openAddProjectButton(){
    if(svgPlus.getAttribute("class") === "rotate"){
        svgPlus.removeAttribute("class")
        svgPlus.setAttribute("class","return")
        formInputProject.removeAttribute("class")
        formInputProject.setAttribute("class","up")
        CALENDAR_BUTTON.removeAttribute("class")
        setTimeout(() => {
        formInputProject.style.display = "none"    
        }, 1000);
        return
    } 
  
    if(svgPlus.getAttribute("class") == undefined || svgPlus.getAttribute("class") === "return"){
        svgPlus.removeAttribute("class")
        svgPlus.setAttribute("class","rotate")
        formInputProject.style.display = "flex"
        formInputProject.removeAttribute("class")
        formInputProject.setAttribute("class","down")
        CALENDAR_BUTTON.removeAttribute("class")
        CALENDAR_BUTTON.setAttribute("class","down1")
        return
    }
}
settingOptions.style.display = "none"
function openConfiguration(){
    svgConfg.removeAttribute("class")

    if(settingOptions.style.display === "flex"){
        settingOptions.removeAttribute("class")
        settingOptions.setAttribute("class", "down2")
        svgConfg.setAttribute("class","rotate")
        setTimeout(() => {
        settingOptions.style.display = "none"
        }, 1000);
        return
    } else if(settingOptions.style.display === "none"){
        settingOptions.style.display = "flex"
        settingOptions.setAttribute("class", "up1")
        svgConfg.setAttribute("class","return")
        return
    }
    
}
