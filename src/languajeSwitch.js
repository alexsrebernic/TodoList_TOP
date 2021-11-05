export default function languajeSwitch(){
const LANGUAJE_SWITCH_BUTTON = document.getElementById("checkBox")
const homespan = document.getElementById("homespan")
const addprojectspan = document.getElementById("addprojectspan")
const calendarspan = document.getElementById("spancalendar")
const settingsspan = document.getElementById("loginsettings")
const loginspan = document.getElementById("loginspan")
const todotext = document.getElementById("todotext")
const inprogresstext = document.getElementById("inprogresstext")
const completetext = document.getElementById("completedtext")
const selectprojects = document.getElementById("projectdefault")
const dayoption = document.getElementById("dayoption")
const weekoption = document.getElementById("weekoption")
const yearoption = document.getElementById("yearoption")
const selectdefaultweek = document.getElementById("selectdefaultweek")
const labelinput = document.getElementById("labelinput")
const inputproject = document.getElementById("input-project")
const submitnameproject = document.getElementById("submit-name-project")
if(LANGUAJE_SWITCH_BUTTON.checked){
    homespan.textContent = "Casa"
    addprojectspan.textContent = "Añadir proyecto"
    calendarspan.textContent = "Calendario"
    settingsspan.textContent = "Configuraciones"
    loginspan.textContent = "Iniciar sesion"
    todotext.textContent = "Para hacer"
    inprogresstext.textContent = "En progreso"
    completetext.textContent = "Completado"
    selectprojects.textContent = "Proyectos"
    dayoption.textContent = "Dia"
    weekoption.textContent = "Semana"
    yearoption.textContent = "Año"
    selectdefaultweek.textContent = "Esta semana"
    labelinput.textContent = "Nombre del proyecto"
    inputproject.setAttribute("placeholder","Ej: Mi rutina de gimnasio...")
    submitnameproject.setAttribute("value","Hecho")
 } else if (LANGUAJE_SWITCH_BUTTON.checked == false){
    homespan.textContent = "Home"
    addprojectspan.textContent = "Add project"
    calendarspan.textContent = "Calendar"
    settingsspan.textContent = "Configuration"
    loginspan.textContent = "Log in"
    todotext.textContent = "To do"
    inprogresstext.textContent = "In progress"
    completetext.textContent = "Completed"
    selectprojects.textContent = "Projects"
    dayoption.textContent = "Day"
    weekoption.textContent = "Week"
    yearoption.textContent = "Year"
    selectdefaultweek.textContent = "This week"
    labelinput.textContent = "Name of the project"
    inputproject.setAttribute("placeholder","Ex: My gym rutine...")
    submitnameproject.setAttribute("value","Done")
}
}