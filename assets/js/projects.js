const LOCALSTORAGE_PROJECT_KEY = 'portfolio_projects';
const DEFAULT_COVER_SOURCE_PATH = './assets/imgs/project-covers/default-cover.png';


class Project {
    #name;
    #link;
    #cover;

    constructor(name, link, cover) {
        this.#name = name;
        this.#link = link;
        this.#cover = cover;
    }

    get name() { return this.#name; }
    get link() { return this.#link; }
    get cover() { return this.#cover; }

    set name(name) { this.#name = name; }
    set link(link) { this.#link = link; }
    set cover(cover) { this.#cover = cover; }

    toJSON() {
        return {
            name: this.#name,
            link: this.#link,
            cover: this.#cover
        };
    }
}


class ProjectBuilder {
    #project;

    constructor() {
        this.#project = new Project('', '#', DEFAULT_COVER_SOURCE_PATH);
    }

    setName(name) {
        this.#project.name = name;
        return this;
    }

    setLink(link) {
        this.#project.link = link;
        return this;
    }

    setCover(src) {
        this.#project.cover = src;
        return this;
    }

    build() {
        return this.#project;
    }

    buildHTML() {
        const baseElement = document.createElement('li');

        const linkElement = document.createElement('a');
        linkElement.href = this.#project.link;
        linkElement.target = '_self';

        const coverElement = document.createElement('img');
        coverElement.src = this.#project.cover;
        coverElement.alt = this.#project.name;
        coverElement.loading = 'lazy';

        linkElement.appendChild(coverElement);
        baseElement.appendChild(linkElement);
        return baseElement;
    }
}


class ProjectManager {
    static instance;
    #projects;

    constructor() {
        ProjectManager.instance = this;
        this.#projects = [];
    }

    static getInstance() {
        if (!ProjectManager.instance) {
            return new ProjectManager();
        }
        return ProjectManager.instance;
    }

    get projects() {
        const data = localStorage.getItem(LOCALSTORAGE_PROJECT_KEY);
        if (!data) throw new Error('Projetos não encontrados');
        console.log(data);
        console.log(JSON.parse(data));

        return JSON.parse(data);
    }

    async #fetchProjectsFromJsonFile(url) {
        await fetch(url)
            .then(response => response.json())
            .then(json => json.projects)
            .then(data => data.forEach((proj, i) => {
                if (!proj.link?.title || !proj.link?.href || !proj.cover?.src) {
                    console.error(`Projeto nº${i + 1} não possui informações suficientes para ser criado.`);
                    return;
                }

                const projectBuilder = new ProjectBuilder();
                projectBuilder.setName(proj.link.title);
                projectBuilder.setLink(proj.link.href);
                projectBuilder.setCover(proj.cover.src);
                let newProject = projectBuilder.build();
                this.#projects.push(newProject);
            }))
    }

    #saveAllProjectsOnLocalStorage(key, projects) {
        localStorage.setItem(key, JSON.stringify(projects));
    }

    #display(listElementId) {
        const listEl = document.getElementById(listElementId);
        if (!listEl) throw new Error('Elemento de lista de projetos não encontrado.');

        this.#projects.forEach(proj => {
            const projectBuilder = new ProjectBuilder();
            const projectElement = projectBuilder
                .setName(proj.name)
                .setLink(proj.link)
                .setCover(proj.cover)
                .buildHTML();
            listEl.appendChild(projectElement);
        })
    }

    async load() {
        const projectsDataUrl = './assets/db/projects.json';
        await this.#fetchProjectsFromJsonFile(projectsDataUrl);

        const localStorageKey = LOCALSTORAGE_PROJECT_KEY;
        this.#saveAllProjectsOnLocalStorage(localStorageKey, this.#projects);

        const listElementId = 'project-list';
        this.#display(listElementId);
    }
}


const projectManager = new ProjectManager();
projectManager.load();