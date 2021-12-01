export {Project,Task,arrayOfProjects} 

class arrayOfProjects {
    constructor (array,uid){
        this.array = array
        this.uid = uid
    }
    static setProject(project,arrayOfProjects){
        arrayOfProjects.array.push(project)
    }
    static getArrayOfProjects(arrayOfProjects){
       return arrayOfProjects.array
    }
    static deleteProject(index,arrayOfProjects){
        arrayOfProjects.array.splice(index,1)
    }
    static getPositionProject(index,arrayOfProjects){
        return arrayOfProjects.array[index]
    }
}

class Project{
    constructor(name,toDoTask,inProgressTask,completedTask){
    this.name = name
    this.toDoTask = toDoTask
    this.inProgressTask = inProgressTask
    this.completedTask = completedTask
    }
    static getNameProject = (project) => {
        return project.name
    }
    static getArrayOfToDoTask = (project) => {
        return project.toDoTask
    }
    static getArrayOfInProgressTask = (project) => {
        return project.inProgressTask
    }
    static getArrayOfCompletedTask= (project) => {
        return project.completedTask
    }
    static setTaskInArrayOfToDoTask = (task,project) => {
        project.toDoTask.unshift(task)
    }
    static setTaskInArrayOfInProgressTask = (task,project) => {
        project.inProgressTask.unshift(task)
    }
    static setTaskInArrayOfCompletedTask = (task,project) => {
        project.completedTask.unshift(task)
    }
    static setTaskInASpeceficIndexArrayOfToDoTask = (task,index,project) => {
        project.toDoTask.splice(index,0,task)
    }
    static setTaskInASpeceficIndexArrayOfInProgressTask = (task,index,project) => {
        project.inProgressTask.splice(index,0,task)
    }
    static setTaskInASpeceficIndexArrayOfCompletedTask = (task,index,project) => {
        project.completedTask.splice(index,0,task)
    }
    static deleteTaskInArrayOfToDoTask = (index,project) => {
       return project.toDoTask.splice(index,1).pop()
    }
    static deleteTaskInArrayOfInProgressTask = (index,project) => {
       return project.inProgressTask.splice(index,1).pop()
    }
    static deleteTaskInArrayOfCompletedTask = (index,project) => {
       return project.completedTask.splice(index,1).pop()
    }
    
    static createSelectProject = (project) => {
        const projectSelect = document.createElement("option")
        projectSelect.textContent = project.name
        return projectSelect
    }
    
    }

class Task{
    constructor(name,details,date){
    this.name = name
    this.details = details
    this.date = date
    }
    
    static getNameTask = (task) => {
        return task.name
    }
    static getDetailsTask = (task) => {
        return task.details
    }
    static getDateTask = (task) => {
        return task.date
    }
    static setHtml = (html,task) => {
        task.html = html
    }
    static getHtml = (task) => {
        return task.html
    }
}
