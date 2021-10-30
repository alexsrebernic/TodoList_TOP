 
 
 export default function displayHome(html){
    const content = document.querySelector(".content") 
    if (html === undefined){
        content.innerHTML = '<div class="header"><ul><img src="https://img.icons8.com/material-outlined/24/000000/help.png"/></ul> <ul><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z"/></svg></ul> </div> <div class="title"> <select name="projects" id="projects" > <option value="" hidden selected>Project</option> </select> <select name="select"> <option value="thisweek" selected >This week</option> <option value="day" >Day</option> <option value="week">Week</option> <option value="year">Year</option> </select> </div> <div class="dashboard"><div class="card"> <div class="top"> <h2>To do</h2> <h2 class="quantity" id="todo_quantity">0</h2> </div> <button id="add_todo">+</button> <div class="work" id="to_dos"> <div class="task"> <div class="titletask"> <h2>Example</h2> <div> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /> </svg> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g> <path d="M97.344,482.17c-23.311,0-45.215-9.084-61.689-25.555c-34.01-34.014-34.01-89.361,0-123.371L305.343,63.543 c21.727-21.75,50.645-33.713,81.39-33.713c30.75,0,59.667,11.963,81.395,33.713c21.748,21.744,33.726,50.645,33.726,81.389 c0,30.75-11.964,59.65-33.708,81.381L255.843,438.596c-6.374,6.371-16.696,6.371-23.067,0c-6.374-6.373-6.374-16.695,0-23.07 l212.298-212.283c15.583-15.58,24.153-36.291,24.153-58.311c0-22.016-8.588-42.74-24.167-58.322 c-15.583-15.58-36.294-24.154-58.327-24.154c-22.029,0-42.74,8.574-58.323,24.154L58.725,356.311 c-21.283,21.301-21.283,55.938,0,77.234c20.645,20.617,56.589,20.617,77.233,0l181.091-181.105 c4.924-4.924,7.745-11.74,7.745-18.688c0-7.045-2.755-13.686-7.759-18.689c-10.291-10.291-27.067-10.322-37.358,0L156,338.754 c-6.37,6.375-16.697,6.375-23.067,0c-6.374-6.371-6.374-16.697,0-23.066l123.673-123.691c23.005-23.004,60.461-23.004,83.497,0 c11.169,11.166,17.317,26,17.317,41.756c0,15.547-6.308,30.762-17.3,41.754L159.029,456.615 C142.555,473.086,120.65,482.17,97.344,482.17z"/></g> </svg> </div> </div> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti exercitationem delectus quis molestiae officiis illo veritatis aliquam odio, totam enim.</p> <sub id="date">27/10/2021</sub></div></div> </div> <div class="card"> <div class="top"> <h2>In progress</h2> <h2 id="inprogress_quantity" class="quantity">0</h2> </div> <button id="add_inprogress">+</button> <div class="work" id="inprogress"></div> </div> <div class="card"> <div class="top"> <h2>Completed</h2> <h2 id="complete_quantity" class="quantity">0</h2> </div> <button id="add_complete">+</button> <div class="work" id="completed"></div> </div> </div>'
    } else if (html !== undefined){
        content.innerHTML = html
    }
    
}