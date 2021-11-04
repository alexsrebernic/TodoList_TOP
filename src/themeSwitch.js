export default function turnNightThemeOrWhiteTheme(){
    const NIGHT_MODE_SWITCH = document.getElementById("checkBoxTheme")
    const html = document.querySelector("html")
    const body = document.querySelector("body")
    const container = document.getElementById("container")
    const content = document.querySelector(".content")
    const nav = document.querySelector("nav")
    const headerHomePage = document.querySelector(".header")
    const homePage = document.getElementById("homePage")
    const selectProjects = document.querySelectorAll("select")
    const settingOptions = document.getElementById("settings-options")
    const formInputProject = document.getElementById("form-input-project")
    const calendarPage = document.querySelector("#calendarPage")
    const card = document.querySelectorAll(".card")
    const addTask = document.querySelectorAll(".add_task")
    const quantityTask = document.querySelectorAll(".quantity")
    const task = document.querySelectorAll(".task")
    const footer = document.querySelector("footer")
    const svg = document.querySelectorAll("svg")
    const submitNameProject = document.getElementById("submit-name-project")
    let isBlackMode
    let backgroundColorBlack  = "rgb(48, 48, 48)"
    let backgroundColorContainerBlack = "#424242"
    let backgroundColorHomePageAndCalendarBlack = "#3e3e3e"
    let colorLettersBlackTheme = "#FFFFFF"
    let backgroundColorWhite  = "#f7fcff"
    let backgroundColorCardsBlack = "#404040"
    let selectAndAddProjectBottonBlack = "rgba(0, 0, 0, 0.1)"

   
    if(NIGHT_MODE_SWITCH.checked){
        
        html.style.backgroundColor = backgroundColorBlack
        body.style.backgroundColor = backgroundColorBlack;
        container.style.backgroundColor = backgroundColorContainerBlack
        container.style.color = colorLettersBlackTheme
        content.style.backgroundColor = backgroundColorHomePageAndCalendarBlack
        homePage.style.backgroundColor = backgroundColorHomePageAndCalendarBlack
        homePage.style.color = colorLettersBlackTheme
        calendarPage.style.backgroundColor = backgroundColorHomePageAndCalendarBlack
        calendarPage.style.color = colorLettersBlackTheme
        headerHomePage.style.color = colorLettersBlackTheme
        selectProjects.forEach(select => {
            select.style.color = colorLettersBlackTheme
            select.style.background = selectAndAddProjectBottonBlack
        })
        
        card.forEach(card => {
            card.style.backgroundColor = backgroundColorCardsBlack
        })
        addTask.forEach(button => {
            button.style.backgroundColor = selectAndAddProjectBottonBlack
            button.style.color  = colorLettersBlackTheme
        })
        quantityTask.forEach(quantity =>{
            quantity.style.backgroundColor = selectAndAddProjectBottonBlack
            quantity.style.color = colorLettersBlackTheme
        })
        task.forEach(task =>{
            task.style.backgroundColor = "rgba(151, 151, 151, 0.4)"
            task.style.border = "none"
            task.style.color = "white"
        })
        footer.style.color = colorLettersBlackTheme
        svg.forEach(svgs =>{
            svgs.style.color = colorLettersBlackTheme
        } )
        submitNameProject.style.backgroundColor = selectAndAddProjectBottonBlack
    }else if(NIGHT_MODE_SWITCH.checked == false){
        html.style.backgroundColor = backgroundColorWhite
        body.style.backgroundColor = backgroundColorWhite;
        container.style.backgroundColor = "white"
        container.style.color = "black"
        content.style.backgroundColor = "rgba(250,252,252,0.4)"
        homePage.style.backgroundColor = "rgba(250,252,252,0.4)"
        homePage.style.color = "black"
        calendarPage.style.backgroundColor = "rgba(250,252,252,0.4)"
        calendarPage.style.color = "black"
        headerHomePage.style.color = "black"
        selectProjects.forEach(select => {
            select.style.color = "black"
            select.style.background = "rgba(174,214,241,0.1)"
        })
        
        card.forEach(card => {
            card.style.backgroundColor = "rgba(174,214,241,0.03)"
        })
        addTask.forEach(button => {
            button.style.backgroundColor = "rgba(174,214,241,0.1)"
            button.style.color  = "black"
        })
        quantityTask.forEach(quantity =>{
            quantity.style.backgroundColor = "rgba(174,214,241,0.1)"
            quantity.style.color = "black"
        })
        task.forEach(task =>{
            task.style.backgroundColor = "white"
            task.style.color = "black"
        })
        footer.style.color = "black"
        svg.forEach(svgs =>{
            svgs.style.color = "black"
        } )
        submitNameProject.style.backgroundColor = "rgb(174,214,241)"
    }
}
