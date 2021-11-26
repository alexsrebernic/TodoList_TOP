export {Project,Task} 

function Project(name){
    this.name = name
    this.toDoTask = []
    this.inProgressTask = []
    this.completedTask = []

    const getNameProject = () => {
        return this.name
    }
    const getArrayOfToDoTask = () => {
        return this.toDoTask
    }
    const getArrayOfInProgressTask = () => {
        return this.inProgressTask
    }
    const getArrayOfCompletedTask= () => {
        return this.completedTask
    }
    const setTaskInArrayOfToDoTask = (task) => {
        getArrayOfToDoTask().unshift(task)
    }
    const setTaskInArrayOfInProgressTask = (task) => {
        getArrayOfInProgressTask().unshift(task)
    }
    const setTaskInArrayOfCompletedTask = (task) => {
        getArrayOfCompletedTask().unshift(task)
    }
    const setTaskInASpeceficIndexArrayOfToDoTask = (task,index) => {
        getArrayOfToDoTask().splice(index,0,task)
    }
    const setTaskInASpeceficIndexArrayOfInProgressTask = (task,index) => {
        getArrayOfInProgressTask().splice(index,0,task)
    }
    const setTaskInASpeceficIndexArrayOfCompletedTask = (task,index) => {
        getArrayOfCompletedTask().splice(index,0,task)
    }
    const deleteTaskInArrayOfToDoTask = (index) => {
       return getArrayOfToDoTask().splice(index,1).pop()
    }
    const deleteTaskInArrayOfInProgressTask = (index) => {
       return getArrayOfInProgressTask().splice(index,1).pop()
    }
    const deleteTaskInArrayOfCompletedTask = (index) => {
       return getArrayOfCompletedTask().splice(index,1).pop()
    }
    
    const createSelectProject = () => {
        const projectSelect = document.createElement("option")
        projectSelect.textContent = getNameProject()
        return projectSelect
    }
    return {getNameProject,getArrayOfToDoTask,getArrayOfInProgressTask,getArrayOfCompletedTask,setTaskInArrayOfToDoTask,setTaskInArrayOfInProgressTask,setTaskInArrayOfCompletedTask,createSelectProject,deleteTaskInArrayOfToDoTask,deleteTaskInArrayOfInProgressTask,deleteTaskInArrayOfCompletedTask,
        setTaskInASpeceficIndexArrayOfToDoTask,setTaskInASpeceficIndexArrayOfInProgressTask,setTaskInASpeceficIndexArrayOfCompletedTask}
}

function Task(name,details,date){
    this.name = name
    this.details = details
    this.date = date
    const getNameTask = () => {
        return this.name
    }
    const getDetailsTask = () => {
        return this.details
    }
    const getDateTask = () => {
        return this.date
    }
    const setHtml = (html) => {
        this.html = html
    }
    const getHtml = () => {
        return this.html
    }
    return {getNameTask,getDetailsTask,getDateTask,getHtml,setHtml}
}