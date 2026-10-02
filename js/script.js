// Navigation Active Toggle Status
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach((link =>{
    link.addEventListener("click", () =>{
        navLinks.forEach((item) => {
            item.classList.remove('active');
        });
        link.classList.add('active');
    });
}));


// PROJECTS CLASSIFIER
const projectClassifierBtns = document.querySelectorAll('.project-classifier li p');

projectClassifierBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        projectClassifierBtns.forEach((classifierBtn) => {
            classifierBtn.classList.remove('active');
        });
        btn.classList.add('active');
    });
});


// PROJECTS FILTER
'use strict';

const projectsContainer = document.querySelector('.projects');
const classifierButtons = document.querySelectorAll('.project-classifier li p');
const emptyPrompt = document.querySelector('.project-error-prompt'); // optional — see earlier note

let projectsData = [];

async function loadProjects() {
    try {
        const response = await fetch('./assets/compiled_projects/projects.json');
        const data = await response.json();
        projectsData = data.projects;
        renderProjects(projectsData);
    } catch (error) {
        console.error('Could not load projects.json:', error);
    }
}

function createProjectElement(project) {
    const anchor = document.createElement('a');
    anchor.href = project.href || '#';
    anchor.className = 'project';

    const cover = document.createElement('div');
    cover.className = 'project-cover';

    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.alt;
    cover.appendChild(img);

    const details = document.createElement('div');
    details.className = 'project-details';

    const title = document.createElement('h3');
    title.textContent = project.title;

    const category = document.createElement('p');
    category.textContent = project.category;

    details.appendChild(title);
    details.appendChild(category);

    anchor.appendChild(cover);
    anchor.appendChild(details);

    return anchor;
}

function renderProjects(projects) {
    projectsContainer.replaceChildren(); // clears existing content — no innerHTML needed

    projects.forEach((project) => {
        projectsContainer.appendChild(createProjectElement(project));
    });

    if (emptyPrompt) emptyPrompt.style.display = projects.length ? 'none' : 'block';
}

function filterProjects(category) {
    if (category === 'all') {
        renderProjects(projectsData);
        return;
    }
    const filtered = projectsData.filter(
        (project) => project.category.toLowerCase().trim() === category.toLowerCase().trim()
    );
    renderProjects(filtered);
}

classifierButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        classifierButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        filterProjects(btn.textContent.trim().toLowerCase());
    });
});

loadProjects();


// Navigation Bar Toggle
const articles = document.querySelectorAll('.contents > article');

function showSection(targetId) {
    // Hide all articles
    articles.forEach(article => {
        article.style.display = 'none';
        article.style.opacity = '0';
    });

    // Show the target article
    const target = document.querySelector(targetId);
    if (target) {
        target.style.display = 'block';
        // slight delay so the opacity transition (if you add one) can trigger
        requestAnimationFrame(() => {
            target.style.opacity = '1';
        });
    }
}

function setActiveLink(clickedLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href'); // e.g. "#resume"

        setActiveLink(link);
        showSection(targetId);

        // update the URL hash without jumping
        history.pushState(null, '', targetId);
    });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const currentId = window.location.hash || '#about';
    const currentLink = document.querySelector(`.nav-links a[href="${currentId}"]`);

    if (currentLink) {
        setActiveLink(currentLink);
    }
    showSection(currentId);
});

// Show the correct section on page load (handles refresh / direct link with hash)
window.addEventListener('DOMContentLoaded', () => {
    const initialId = window.location.hash || '#about';
    const initialLink = document.querySelector(`.nav-links a[href="${initialId}"]`);

    if (initialLink) {
        setActiveLink(initialLink);
    }
    showSection(initialId);
});


//CONTACT FORM VALIDATION
const form = document.querySelector(".contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const submitBtn = form.querySelector("button[type='submit']");

function updateSubmitState() {
    const nameFilled = nameInput.value.trim() !== "";
    const emailValid = emailInput.value.trim() !== "" && emailInput.checkValidity();
    const messageFilled = messageInput.value.trim() !== "";
    submitBtn.disabled = !(nameFilled && emailValid && messageFilled);
}

[nameInput, emailInput, messageInput].forEach((el) => {
    el.addEventListener("input", updateSubmitState);
});

updateSubmitState();