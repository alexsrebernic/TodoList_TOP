import { slideHomeToCalendar,slideCalendarToHome,openAddProjectButton,openConfiguration,openOrCloseTask,closeTask} from "./animations"
import languajeSwitch from "./languajeSwitch"
import turnNightThemeOrWhiteTheme from "./themeSwitch"
import { initializeApp } from 'firebase/app';
import {getAuth,signOut,GoogleAuthProvider,signInWithPopup,getRedirectResult,sendSignInLinkToEmail,isSignInWithEmailLink,signInWithEmailLink, EmailAuthProvider} from 'firebase/auth'
import { getDatabase ,ref, set, child, get,update} from "firebase/database";
import {arrayOfProjects, Project,Task} from './projectObject'
import stringifyObject from 'stringify-object';
import {firebaseConfig,actionCodeSettings} from './firebase.config'
const HOME_BUTTON = document.getElementById("home")
const ADD_PROJECT_BUTTON = document.getElementById("add_project")
const CALENDAR_BUTTON = document.getElementById("calendar")
const SETTINGS_BUTTON = document.getElementById("settings")
const LOG_IN_BUTTON = document.getElementById("login")
const NIGHT_MODE_SWITCH = document.getElementById("checkBoxTheme")
const LANGUAJE_SWITCH_BUTTON = document.getElementById("checkBox")
const DONE_PROJECT_BUTTON = document.getElementById("submit-name-project")
const ADD_TASK_BUTTON = document.querySelectorAll(".add_task")
const DELETE_PROJECT_BUTTON = document.getElementById("remove-project")
const workElements = document.querySelectorAll(".work")
const elementTodoQuantity = document.getElementById("todo_quantity")
const elementInProgressQuantity = document.getElementById("inprogress_quantity")
const elementCompletedQuantity = document.getElementById("complete_quantity")
const content = document.querySelector(".content") 
const calendar = document.querySelector("#calendarPage")
const home = document.querySelector("#homePage")
const svgPlus = document.getElementById("plus")
const listLi = document.querySelector(".list")
const projectDefault = document.getElementById("projectdefault")
const popUpLogIn  = document.getElementById("popup-login")
const backgroundPopUp = document.getElementById("background-popup")
const formUser = document.getElementById("formUser")
const nameUserSpan = document.getElementById("account-name")
const selectProject = document.getElementById("projects")
const toDoDiv = document.getElementById("to_dos")
const inProgressDiv = document.getElementById("inprogress")
const completedDiv = document.getElementById("completed")
let plusTodo = document.getElementById("plusToDo")
let plusInProgress = document.getElementById("plusInprogress")
let plusCompleted = document.getElementById("plusCompleted")
let task = document.querySelectorAll("#task")
let projectsArray = new arrayOfProjects([],null)
let isTaskAlready;
let todoQuantity = 0
let inProgressQuantity = 0
let completedQuantity = 0
let whereIsTheTask;
let items = []
let userUID;
HOME_BUTTON.onclick = () => slideCalendarToHome()
ADD_PROJECT_BUTTON.onclick = () => openAddProjectButton()
CALENDAR_BUTTON.onclick = () =>  slideHomeToCalendar()
SETTINGS_BUTTON.onclick = () => openConfiguration()
NIGHT_MODE_SWITCH.onclick = () => turnNightThemeOrWhiteTheme()
LANGUAJE_SWITCH_BUTTON.onclick = () => languajeSwitch()
LOG_IN_BUTTON.onclick = () => displayPopUpOrLogOut()
DONE_PROJECT_BUTTON.onclick = (e) => createProject(e)
ADD_TASK_BUTTON.forEach(taskButton => {
   taskButton.onclick = () => displayTaskInputs()
})
selectProject.onchange = () => changeDisplayToOptionSelected()
window.onload = languajeSwitch()
window.onload = turnNightThemeOrWhiteTheme()
window.onload = checkOption()
window.onload = () => {
   if(!(localStorage.getItem("firstSession"))){
      localStorage.setItem("firstSession","1")
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
function createProject(e){
   updateArrayOfProjectsInDataBase(userUID,projectsArray)
   const inputProject = document.getElementById("input-project")
   if(inputProject.value == "") return e.preventDefault()
   checkIfHasProject(userUID)
   let index = arrayOfProjects.getArrayOfProjects(projectsArray).findIndex(object=> Project.getNameProject(object) == inputProject.value)
   if(index > -1){
      return alert("Project already exists, please use another name."),e.preventDefault()
   }
   e.preventDefault()
   let newProject = new Project(inputProject.value,[],[],[])
   arrayOfProjects.setProject(newProject,projectsArray)
   let optionProject = Project.createSelectProject(newProject)
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
   updateArrayOfProjectsInDataBase(userUID,projectsArray)

}
function checkOption(){
   let option = selectProject.options[selectProject.selectedIndex]
if(option.text == "Projects" || option.text == "Proyectos"){
   ADD_TASK_BUTTON.forEach(button => {
      button.onclick = () => alert("Please , add a project to create a task.")
   })
   DELETE_PROJECT_BUTTON.onclick =  (e) =>{
      return e.preventDefault()
   } 
} else {
   ADD_TASK_BUTTON.forEach(button => {
      button.onclick = () => displayTaskInputs()
   })
   DELETE_PROJECT_BUTTON.onclick = () => deleteProject()
}
}


   

function changeDisplayToOptionSelected(){
   let option = selectProject.options[selectProject.selectedIndex];
   let indexProject = arrayOfProjects.getArrayOfProjects(projectsArray).findIndex(object => Project.getNameProject(object) == option.text)
   if(option.text !== "Projects"){
      if(Project.getArrayOfToDoTask(arrayOfProjects.getPositionProject(indexProject,projectsArray).length == 0)){
       toDoDiv.innerHTML = ''
      } else {
         toDoDiv.innerHTML = ''
         let arrayOfTodoTask = Project.getArrayOfToDoTask(arrayOfProjects.getPositionProject(indexProject,projectsArray))
         
         for(let elements in arrayOfTodoTask){
            toDoDiv.appendChild(Task.getHtml(arrayOfTodoTask[elements]))
         }
      }
      if(Project.getArrayOfInProgressTask(arrayOfProjects.getPositionProject(indexProject,projectsArray)).length == 0){
       inProgressDiv.innerHTML = '' 
      } else {
         inProgressDiv.innerHTML = ''
         let arrayOfInProgressTask = Project.getArrayOfInProgressTask(arrayOfProjects.getPositionProject(indexProject,projectsArray))
         for(let elements in arrayOfInProgressTask){
            inProgressDiv.appendChild(Task.getHtml(arrayOfInProgressTask[elements])) 
         }
      }
      if(Project.getArrayOfCompletedTask(arrayOfProjects.getPositionProject(indexProject,projectsArray)).length === 0){
          completedDiv.innerHTML = ''
      } else {
         completedDiv.innerHTML = ''

         let arrayOfCompletedTask = Project.getArrayOfCompletedTask(arrayOfProjects.getPositionProject(indexProject,projectsArray))
         for(let elements in arrayOfCompletedTask){
            completedDiv.appendChild(Task.getHtml(arrayOfCompletedTask[elements])) 
         }
      }
   checkOption()
   elementTodoQuantity.textContent = String(toDoDiv.children.length)
   elementInProgressQuantity.textContent = String(inProgressDiv.children.length)
   elementCompletedQuantity.textContent= String(completedDiv.children.length)
   }
   moveTask()
}

function displayTaskInputs(){
   
   if(plusTodo.getAttribute("class") == "rotate")return openOrCloseTask(toDoDiv,plusTodo),isTaskAlready = false
   if(plusInProgress.getAttribute("class") == "rotate") return openOrCloseTask(inProgressDiv,plusInProgress),isTaskAlready = false
   if(plusCompleted.getAttribute("class") == "rotate") return openOrCloseTask(completedDiv,plusCompleted) ,isTaskAlready = false
   if(plusCompleted.getAttribute("class") === undefined || plusCompleted.getAttribute("class") === "return" || event.target.tagName == "path") isTaskAlready = false
   if(isTaskAlready === true) return
   if(event.srcElement.id == "add_todo" || event.srcElement.id == "plusToDo"){
      openOrCloseTask(toDoDiv,plusTodo)
      let firstChild = toDoDiv.firstChild
      if(firstChild === null){
         toDoDiv.appendChild(createInputTask())
      } else {
         toDoDiv.insertBefore(createInputTask(),toDoDiv.firstChild)
         firstChild.setAttribute("class","down1")
      }
      whereIsTheTask = "toDoDiv"
   } else if(event.srcElement.id == "add_inprogress" || event.srcElement.id == "plusInprogress"){

      openOrCloseTask(inProgressDiv,plusInProgress)

      let firstChild = inProgressDiv.firstChild
      if(firstChild === null){
         inProgressDiv.appendChild(createInputTask())
      } else {
         inProgressDiv.insertBefore(createInputTask(),inProgressDiv.firstChild)
         firstChild.setAttribute("class","down1")
      }
      whereIsTheTask = "inProgressDiv"

   }else if(event.srcElement.id == "add_complete" || event.srcElement.id == "plusCompleted"){

      openOrCloseTask(completedDiv,plusCompleted)

      let firstChild = completedDiv.firstChild
      if(firstChild === null){
         completedDiv.appendChild(createInputTask())
      } else {
         completedDiv.insertBefore(createInputTask(),completedDiv.firstChild)
         firstChild.setAttribute("class","down1")
      }
      whereIsTheTask = "completedDiv"

   }
   if(NIGHT_MODE_SWITCH.checked) turnNightThemeOrWhiteTheme()
   isTaskAlready = true
}

function createInputTask(){
   const div = document.createElement("div")
   div.innerHTML = '<div class="titletask"><input required id="titleTaskInput" placeholder="Title"></div><p><textarea maxlength = "50" placeholder="Details" id="detailsInput"></textarea></p><input id="subDate" type="date"><button id="doneButtonTask" style="background-color: rgba(0, 0, 0, 0.1);">Done</button>'
   div.setAttribute("id","task")
   div.setAttribute("class","fromtop")
   return div
}

window.onclick = () => {
   if(event.target.id === "doneButtonTask"){
      let inputTitle = document.getElementById("titleTaskInput").value
      let inputDetails = document.getElementById("detailsInput").value
      let subDate = document.getElementById("subDate").value
      if(inputTitle.value === "" || inputDetails.value === "" || subDate.value === "") return 
      let newTask = new Task(inputTitle,inputDetails,subDate)
      let option = selectProject.options[selectProject.selectedIndex];
      let indexProject = arrayOfProjects.getArrayOfProjects(projectsArray).findIndex(object => Project.getNameProject(object) == option.text)
      let newCard = createTaskCard(inputTitle,inputDetails,subDate)
      if(whereIsTheTask === "toDoDiv"){
         const elementTodoQuantity = document.getElementById("todo_quantity")
         Project.setTaskInArrayOfToDoTask(newTask,arrayOfProjects.getPositionProject(indexProject,projectsArray))
         let firstChild = toDoDiv.firstChild
         toDoDiv.insertBefore(newCard,toDoDiv.firstChild)
         firstChild.setAttribute("class","down3")        
         toDoDiv.removeChild(toDoDiv.childNodes[1])      
            closeTask(plusTodo)
            isTaskAlready = false
         elementTodoQuantity.innerHTML  = String(toDoDiv.children.length)
      } 
      else if(whereIsTheTask === "inProgressDiv"){
         const elementInProgressQuantity = document.getElementById("inprogress_quantity")
         Project.setTaskInArrayOfInProgressTask(newTask,arrayOfProjects.getPositionProject(indexProject,projectsArray))
         let firstChild = inProgressDiv.firstChild        
         inProgressDiv.insertBefore(newCard,inProgressDiv.firstChild)
         firstChild.setAttribute("class","down3")
            inProgressDiv.removeChild(inProgressDiv.childNodes[1])            
            closeTask(plusInProgress)
            isTaskAlready = false
            elementInProgressQuantity.innerHTML = String(inProgressDiv.children.length)

         } else if(whereIsTheTask === "completedDiv"){
         const elementCompletedQuantity = document.getElementById("complete_quantity")
         Project.setTaskInArrayOfCompletedTask(newTask,arrayOfProjects.getPositionProject(indexProject,projectsArray))
         let firstChild = completedDiv.firstChild    
         completedDiv.insertBefore(newCard,completedDiv.firstChild)
         firstChild.setAttribute("class","down3")
            completedDiv.removeChild(completedDiv.childNodes[1])
         closeTask(plusCompleted)
         isTaskAlready = false
         elementCompletedQuantity.innerHTML = String(completedDiv.children.length)

      }  
      if(NIGHT_MODE_SWITCH.checked) turnNightThemeOrWhiteTheme()
      ADD_TASK_BUTTON.forEach(taskButton => {
         taskButton.disabled = true
      })
      setTimeout(() => {
         ADD_TASK_BUTTON.forEach(taskButton => {
            taskButton.disabled = false
         })
      }, 2000);
      Task.setHtml(newCard,newTask)
      moveTask()
      updateArrayOfProjectsInDataBase(userUID,projectsArray)

   } else if (event.target.getAttribute("class") == "deleteButton"){
      const deleteButton = document.getElementById(event.target.id)
      deleteTask(deleteButton)
     updateArrayOfProjectsInDataBase(userUID,projectsArray)

   }
}

function moveTask(e){
   task = document.querySelectorAll("#task")
   task.forEach(task => {
      task.addEventListener("dragstart",() => {
         task.removeAttribute("class")
         task.classList.add('dragging')
         deleteQuantityInContainerDragging(task.parentNode.id)
         findIndexAndDeleteOrAdd(task,true)
   if(userUID != undefined && projectsArray.array != []) updateArrayOfProjectsInDataBase(userUID,projectsArray)

      })
      task.addEventListener("dragend",()=>{
       task.removeAttribute("class")
         task.classList.remove('dragging')
         addQuantityInContainerDropping(task.parentNode.id)
         findIndexAndDeleteOrAdd(task,false)
   if(userUID != undefined && projectsArray.array != []) updateArrayOfProjectsInDataBase(userUID,projectsArray)

      })
   })
   if(NIGHT_MODE_SWITCH.checked) turnNightThemeOrWhiteTheme()

}
moveTask()
workElements.forEach(container => {
   container.addEventListener("dragover",(e)=>{
      const afterELement = getDragAfterElement(container,e.clientY)
      const draggable = document.querySelector('.dragging')
      if(afterELement == null){
      container.appendChild(draggable)
      } else {
         container.insertBefore(draggable,afterELement)
        
      }
     
         
   })
})
function findIndexAndDeleteOrAdd(task,remove){

   let parentOfTask = task.closest("#task")
   let workdiv = task.closest(".work")
   let index = Array.from(parentOfTask.parentNode.children).indexOf(parentOfTask)
   let option = selectProject.options[selectProject.selectedIndex];
   let indexProject = arrayOfProjects.getArrayOfProjects(projectsArray).findIndex(object => Project.getNameProject(object) == option.text)
   if(option.text == "Projects" || option.text == "Proyectos") return
   if(remove == true){
      if(workdiv.getAttribute("id") == "to_dos"){
      let element = Project.deleteTaskInArrayOfToDoTask(index,arrayOfProjects.getPositionProject(indexProject,projectsArray))
       items.push(element)

       } else if(workdiv.getAttribute("id") == "inprogress") {
      let  element = Project.deleteTaskInArrayOfInProgressTask(index,arrayOfProjects.getPositionProject(indexProject,projectsArray))

       items.push(element)
       } else if(workdiv.getAttribute("id") == "completed"){
       let element = Project.deleteTaskInArrayOfCompletedTask(index,arrayOfProjects.getPositionProject(indexProject,projectsArray))

       items.push(element)

       }
   } else if(remove == false){
    
      if(workdiv.getAttribute("id") == "to_dos"){
        
      let item = items.pop()
         Project.setTaskInASpeceficIndexArrayOfToDoTask(item,index,arrayOfProjects.getPositionProject(indexProject,projectsArray))
         for(let item in Project.getArrayOfToDoTask(arrayOfProjects.getPositionProject(indexProject,projectsArray))){
            if(Project.getArrayOfToDoTask(arrayOfProjects.getPositionProject(indexProject,projectsArray))[item] === undefined){
               Project.getArrayOfToDoTask(arrayOfProjects.getPositionProject(indexProject,projectsArray)).splice(item,1)
            }
         }
      

       } else if(workdiv.getAttribute("id") == "inprogress") {
         let item = items.pop()
          Project.setTaskInASpeceficIndexArrayOfInProgressTask(item,index,arrayOfProjects.getPositionProject(indexProject,projectsArray))
          for(let item in Project.getArrayOfInProgressTask(arrayOfProjects.getPositionProject(indexProject,projectsArray))){
            if(Project.getArrayOfInProgressTask(arrayOfProjects.getPositionProject(indexProject,projectsArray))[item] === undefined){
               Project.getArrayOfInProgressTask(arrayOfProjects.getPositionProject(indexProject,projectsArray)).splice(item,1)
            }
         }
       } else if(workdiv.getAttribute("id") == "completed"){
        
          let item = items.pop()
          Project.setTaskInASpeceficIndexArrayOfCompletedTask(item,index,arrayOfProjects.getPositionProject(indexProject,projectsArray))
          for(let item in Project.getArrayOfCompletedTask(arrayOfProjects.getPositionProject(indexProject,projectsArray))){
            if(Project.getArrayOfCompletedTask(arrayOfProjects.getPositionProject(indexProject,projectsArray))[item] === undefined){
               Project.getArrayOfCompletedTask(arrayOfProjects.getPositionProject(indexProject,projectsArray)).splice(item,1)
            }
         }
       }
   }

  
}
function deleteQuantityInContainerDragging(container){

   if(container === "to_dos"){
         elementTodoQuantity.textContent = String(toDoDiv.children.length - 1)
   } else if(container === "inprogress"){
      
      elementInProgressQuantity.textContent = String(inProgressDiv.children.length - 1)
   } else if(container=== "completed"){

      elementCompletedQuantity.textContent = String(completedDiv.children.length - 1)
   }

}
function addQuantityInContainerDropping(container){

   if(container === "to_dos"){

         elementTodoQuantity.textContent = String(toDoDiv.children.length)
   } else if(container === "inprogress"){
      inProgressQuantity += 1
      elementInProgressQuantity.textContent = String(inProgressDiv.children.length)
   } else if(container=== "completed"){
      completedQuantity += 1
      elementCompletedQuantity.textContent = String(completedDiv.children.length)
   }

}
function getDragAfterElement(container,y){
   const draggableELements = [...container.querySelectorAll('#task:not(.dragging)')]
   return draggableELements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if(offset < 0 && offset > closest.offset){
         return {offset:offset, element:child}     
      } else {
         return closest
      }
   },{offset: Number.NEGATIVE_INFINITY}).element
}
function deleteTask(task){
   let parentOfTask = task.closest("#task")
   let card = task.closest(".card")
   let index = Array.from(parentOfTask.parentNode.children).indexOf(parentOfTask)
   parentOfTask.parentNode.removeChild(parentOfTask)
   let option = selectProject.options[selectProject.selectedIndex];
   let indexProject = arrayOfProjects.getArrayOfProjects(projectsArray).findIndex(object => Project.getNameProject(object) == option.text)
   if(card.childNodes[1].childNodes[3].getAttribute("id") === "todo_quantity"){
      elementTodoQuantity.textContent = String(toDoDiv.children.length)
      Project.deleteTaskInArrayOfToDoTask(index,arrayOfProjects.getPositionProject(indexProject,projectsArray))
   } else if(card.childNodes[1].childNodes[3].getAttribute("id") === "inprogress_quantity"){
      elementInProgressQuantity.textContent = String(inProgressDiv.children.length)
      Project.deleteTaskInArrayOfInProgressTask(index,arrayOfProjects.getPositionProject(indexProject,projectsArray))
   } else if(card.childNodes[1].childNodes[3].getAttribute("id") === "complete_quantity"){
      elementCompletedQuantity.textContent = String(completedDiv.children.length)
      Project.deleteTaskInArrayOfCompletedTask(index,arrayOfProjects.getPositionProject(indexProject,projectsArray))
   }
}
function createTaskCard(title,details,date){
   const div = document.createElement("div")
   div.setAttribute("id","task")
   div.setAttribute("draggable","true")
   div.innerHTML = '<div class="titletask"><h2>' + title +  '</h2><div> <svg  class="deleteButton" id="'+ random(0,100000) +'" xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /> </svg> <svg draggable ="true" style="cursor:move;" id='+ random(0,100000) +' xmlns="http://www.w3.org/2000/svg" class="pinButton" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg> </div> </div> <p>'+ details +'</p> <sub id="date">' + date + '</sub>'
   return div
}
function deleteProject(){
   let option = selectProject.options[selectProject.selectedIndex];
   let indexProject = arrayOfProjects.getArrayOfProjects(projectsArray).findIndex(object => Project.getNameProject(object) == option.text)
   arrayOfProjects.getArrayOfProjects(projectsArray).splice(indexProject,1)
   selectProject.removeChild(option)
   if(arrayOfProjects.getArrayOfProjects(projectsArray).length === 0){
     setDefaultPage()
   } else if(arrayOfProjects.getArrayOfProjects(projectsArray).length > 0){
      selectProject.selectedIndex = "1"
      changeDisplayToOptionSelected()
   }
   if(NIGHT_MODE_SWITCH.checked) turnNightThemeOrWhiteTheme()
   updateArrayOfProjectsInDataBase(userUID,projectsArray)

}
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
function setDefaultPage(){
   selectProject.appendChild(projectDefault)
   toDoDiv.innerHTML = '<div draggable="true" id="task" style="background-color: white; color: black;"> <div class="titletask"> <h2>Welcome</h2> <div> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: black;"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: black;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg> </div> </div> <p>To start managing your tasks, you first need to create a project, this is created in the task bar on the left.If you want to switch between To do , In progress and Completed section , just click the pin in the right corner of a task and move it to the section that you want. </p> <sub id="date">27/10/2021</sub></div>'
   inProgressDiv.innerHTML = ''
   completedDiv.innerHTML = ''
   elementTodoQuantity.textContent = String(toDoDiv.children.length)
elementInProgressQuantity.textContent = String(inProgressDiv.children.length)
elementCompletedQuantity.textContent= String(completedDiv.children.length)
selectProject.innerHTML = ""
selectProject.appendChild(projectDefault)
projectsArray.array = []
   moveTask()
}

// FIREBASE
//AUTH
const emailElement  = document.getElementById("email-input")
const signUpElement = document.getElementById("sign-up")
const googleUser = document.getElementById("googleUser")
const demoUser = document.getElementById("demoUser")
const stateForm = document.getElementById("state")
stateForm.style.textAlign = "center"


 const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app);

signUpElement.onclick = (e) => {
   e.preventDefault()

   sendSignInLinkToEmail(auth, emailElement.value, actionCodeSettings)
   .then(() => {
      stateForm.textContent = "A verification email has been sent to your email, please check."
      stateForm.style.color = "green"
     window.localStorage.setItem('emailForSignIn', emailElement.value);
   signUpElement.disabled = true      
   })
   .catch((error) => {
     const errorCode = error.code;
     console.log(errorCode)
     const errorMessage = error.message;
      stateForm.textContent = errorMessage
      setTimeout(() => {
         stateForm.textContent = ""
      }, 3000);
   });  
}
if (isSignInWithEmailLink(auth, window.location.href)){
   let email = window.localStorage.getItem('emailForSignIn')
   if(!email){
      displayPopUp()

   }
   signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      setDefaultPage()
      let user = result.user
      writeUserData(user.uid,email)
      userUID = user.uid
      window.localStorage.removeItem('emailForSignIn');
      formUser.reset()
      closePopUp()
      nameUserSpan.textContent = user.displayName
      endLogInOrLogOut(false,true,user,false)
      getArrayOfArrayOfProjectsFromDB(userUID)
    })
    .catch((error) => {
    
      console.log(error.code)
    });

}

function logOutUser(){
   setDefaultPage()
   userUID = null
   projectsArray = new arrayOfProjects([],null)
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
   setDefaultPage()
   const credential = GoogleAuthProvider.credentialFromResult(result)
   const token = credential.accessToken
   const user = result.user
   writeUserData(user.uid,user.email)
   userUID = user.uid
   endLogInOrLogOut(false,true,user,true)
   getArrayOfArrayOfProjectsFromDB(userUID)
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

function endLogInOrLogOut(logout,login,user,googleUser){
   closePopUp()
   if(login === true && logout === false){
      if(LANGUAJE_SWITCH_BUTTON.checked){
         LOG_IN_BUTTON.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg> ` + '<span id="loginspan">Cerrar sesión</span>'
    if(googleUser){
    nameUserSpan.textContent = "Hola " + user.displayName + "!"

    }else if(!googleUser){
    nameUserSpan.textContent = "Hola " + user.email + "!"

    }
      } else if (!(LANGUAJE_SWITCH_BUTTON.checked)){
         LOG_IN_BUTTON.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg> ` + '<span id="loginspan">Log out</span>'
    if(googleUser){
      nameUserSpan.textContent = "Hi " + user.displayName + "!"
  
      }else if(!googleUser){
      nameUserSpan.textContent = "Hi " + user.email + "!"
  
      }
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


function writeUserData(userId, email) {
   if(userId === undefined) return
   set(ref(db, 'users/' + userId), {
     email: email,
   });
  }

  

 function updateArrayOfProjectsInDataBase(userId,arrayOfProjects){
    arrayOfProjects.uid  = userId
   if(userId === undefined) return
   set(ref(db,userId), {
    arrayOfProjects:arrayOfProjects  
  }
   )
}
 function checkIfHasProject(userId){
    if(userId === undefined)  return
   const dbRef = ref(getDatabase());
   get(child(dbRef, `${userId}`)).then((snapshot) => {
     if (!(snapshot.exists())) {
      projectsArray = new arrayOfProjects([],userUID)
      projectsArray.uid = userUID
      set(ref(db,`${userId}`),{
         arrayOfProjects:projectsArray
      })
   } 
   });
}
function getArrayOfArrayOfProjectsFromDB(userId){
   const dbRef = ref(getDatabase());
   get(child(dbRef, `${userId}`)).then((snapshot) => {
    
     if (snapshot.exists()) {
     projectsArray = snapshot.val().arrayOfProjects
      for(let projects in projectsArray.array){
         let optionProject = Project.createSelectProject(projectsArray.array[projects])
         selectProject.appendChild(optionProject)
         if(typeof projectsArray.array[projects] == "object"){
            if(projectsArray.array[projects].toDoTask == undefined) projectsArray.array[projects].toDoTask = []
            if(projectsArray.array[projects].inProgressTask == undefined) projectsArray.array[projects].inProgressTask = []
            if(projectsArray.array[projects].completedTask == undefined) projectsArray.array[projects].completedTask = []
         } 
         for(let task in projectsArray.array[projects]){
            if(typeof projectsArray.array[projects][task] == "object" && projectsArray.array[projects][task].length > 0){
               let newCard = createTaskCard(projectsArray.array[projects][task][0].name,projectsArray.array[projects][task][0].details,projectsArray.array[projects][task][0].date)
               Task.setHtml(newCard,projectsArray.array[projects][task][0])
            }
       
         }
         moveTask()
      }
   } 
   });
}
