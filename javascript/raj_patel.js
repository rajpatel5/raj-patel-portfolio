/* Get current date and display on the footer */
const date = new Date();
let year = document.getElementById("year");
year.innerHTML = date.getFullYear().toString();

/* Get all other projects */
async function getAllProjects(path = "") {
    const data = await fetch(path);
    return data.json();
}

/* Add a project to grid */
function addProject(project_grid, project_name, project_tech, project_desc, project_link, index) {
    let new_project = document.createElement("a");
    let href_attr = document.createAttribute("href");
    href_attr.value = project_link;  
    new_project.setAttributeNode(href_attr);

    new_project.id = project_name;
    new_project.classList.add("project-card");
    new_project.classList.remove("hide");
    new_project.classList.add("show");
    
    let new_project_name = document.createElement("h2");
    new_project_name.innerText = project_name;

    let new_project_tech = document.createElement("h3");
    new_project_tech.innerText = project_tech;

    let new_project_hide_box = document.createElement("div");

    let new_project_description = document.createElement("p");
    new_project_description.classList.add("project-description");
    new_project_description.innerText = project_desc;

    new_project_hide_box.appendChild(new_project_description);
    new_project.appendChild(new_project_name);
    new_project.appendChild(new_project_tech);
    new_project.appendChild(new_project_hide_box);
    setTimeout(function(){ 
        project_grid.appendChild(new_project);
    }, 50 * (index + 1));
}

/* Remove a project from grid */
function removeProject(project_name, index) {
    let project = document.getElementById(project_name);
    project.classList.remove("show");
    project.classList.add("hide");
    setTimeout(function(){ 
        project.parentNode.removeChild(project);
    }, 150 * (index + 1));
}

/* Smooth Scrolling to sub pages */
document.addEventListener('click', function (event) {
    const target = event.target;

    // Navigation links
	if (target.matches('.navigate')) {
        event.preventDefault();
        const href = target.getAttribute("href");
        const offsetTop = document.querySelector(href).offsetTop;

        scroll({
            top: offsetTop,
            behavior: "smooth"
        });
    }

    // See more button
    if (target.matches('#more')) {
        let project_grid = document.getElementById("project-grid");
        let is_more;

        getAllProjects("raj-patel-portfolio/projects/project_data.json")
        .then(data => {
            const allOtherProjects = data.projects;
            const length = allOtherProjects.length;

            if (target.classList.value == "more") {
                // Add projects
                allOtherProjects.forEach(function(project, i) {
                    setTimeout(function(){ 
                        addProject(project_grid, project.name, project.technologies, 
                            project.description, project.link, i);
                    }, 150 * (i + 1));
                });
                is_more = true;
            }
            else {
                // Remove projects
                for (let i = length - 1; i >= 0; i--){
                    setTimeout(function(){ 
                        removeProject(allOtherProjects[i].name, i);
                    }, 150 * (length - i + 1));
                }
                is_more = false;
            }

            if (is_more) {
                target.classList.remove("more");
                target.classList.add("less");
                target.innerText = "See Less";
            }
            else {
                target.classList.remove("less");
                target.classList.add("more");
                target.innerText = "See More";
            }
        }).catch(() => {});
    }
}, false);
