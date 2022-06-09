import Project from "./project";

const divApp = document.getElementById("app")! as HTMLDivElement;
function showTemplate(id: string) {
    const template = document.getElementById(id) as HTMLTemplateElement;
    const newNode = document.importNode(template.content, true);
    while (divApp.firstChild) {
        divApp.removeChild(divApp.firstChild);
    }
    divApp.appendChild(newNode.firstElementChild!);
    // divApp.innerHTML = template?.innerHTML;
}

const projects = [
    new Project("Project 1", "This is the first project", 3),
    new Project("Project 2", "This is the second project", 1),
    new Project("Project 3", "This is the third project", 5),
];

function getValue(id: string) {
    const el = document.getElementById(id) as HTMLInputElement;
    return el?.value;
}

function onNewProject(e: Event) {
    e.preventDefault();
    showAddProject();
}

function onCancelAddProject(e: Event) {
    e.preventDefault();
    showProjectList();
}

function onAddProject(e: Event) {
    e.preventDefault();
    const newProject = new Project(getValue("title"), getValue("description"), +getValue("people"));
    console.log(newProject);
    newProject.validate().then((result) => {
        if (result.length > 0) {
            window.alert(result.join(" and "));
        } else {
            projects.push(newProject);
            showProjectList();
        }
    });
}

function showAddProject() {
    showTemplate("project-input");
    const btnSubmit = document.getElementById("add-project")! as HTMLButtonElement;
    btnSubmit.addEventListener("click", onAddProject);
    const btnCancel = document.getElementById("cancel-add-project")! as HTMLButtonElement;
    btnCancel.addEventListener("click", onCancelAddProject);
}

function showProjectList() {
    showTemplate("project-list");
    const rowTemplate = document.getElementById("single-project")! as HTMLTemplateElement;
    const projectList = divApp.querySelector("ul")! as HTMLUListElement;
    for (const p of projects) {
        const item = document.importNode(rowTemplate.content, true);
        item.querySelector("li")!.textContent = p.title + " (" + p.people + ")";
        projectList.appendChild(item);
    }
    const btnSubmit = document.getElementById("new-project")! as HTMLButtonElement;
    btnSubmit.addEventListener("click", onNewProject);
}

// showProjectList();
showAddProject();
