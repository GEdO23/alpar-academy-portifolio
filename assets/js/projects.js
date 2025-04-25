class Project {
    link;
    cover;
    constructor(link, cover) {
        this.link = link;
        this.cover = cover;
    }
}

class ProjectList {
    static instance;
    static projects = [];

    constructor() {
        ProjectList.instance = this;
    }

    static getInstance() {
        if (!ProjectList.instance) {
            new ProjectList();
        }
        return ProjectList.instance;
    }

    async fetchData() {
        const jsonFileLocation = '../assets/db/projects.json';

        await fetch(jsonFileLocation)
            .then(response => response.json())
            .then(json => json.projects)
            .then(projects => projects.forEach(
                proj => {
                    const newProject = new Project(proj.link, proj.cover);
                    ProjectList.projects.push(newProject);
                })
            )
    }

    saveAll() {
        localStorage.setItem('portfolio_projects', JSON.stringify(ProjectList.projects));
    }

    get projects() {
        const data = localStorage.getItem('portfolio_projects');
        if (!data) throw new Error('Projetos não encontrados');
        return JSON.parse(data);
    }

    display() {
        const listId = 'project-list';
        const listEl = document.getElementById(listId);
        if (!listEl) throw new Error('Elemento de lista de projetos não encontrado.');

        this.projects.forEach(proj => {
            const newItemEl = document.createElement('li');
            const projAnchorEl = document.createElement('a');
            projAnchorEl.href = proj.link.href;
            projAnchorEl.title = proj.link.title;
            projAnchorEl.target = '_self';

            const projCoverEl = document.createElement('img');
            projCoverEl.src = proj.cover.src;
            projCoverEl.alt = proj.cover.alt;
            projCoverEl.loading = 'lazy';

            projAnchorEl.appendChild(projCoverEl);
            newItemEl.appendChild(projAnchorEl)
            listEl.appendChild(newItemEl);
        })
    }

    async load() {
        await this.fetchData();
        this.saveAll();
        this.display();
    }
}

const projectList = new ProjectList();
projectList.load();