document.addEventListener('DOMContentLoaded', () => {
  fetch('../path/to/0_db.json')  // Actualiza la ruta a tu archivo JSON
    .then(response => response.json())
    .then(data => {
      loadProjectSection(data.projects);
      loadOtherProjectsSection(data.projects);
    })
    .catch(error => console.error('Error loading JSON data:', error));
});

function loadProjectSection(projects) {
  const mainProject = projects.find(project => project.uuid === '1');  // Cambia '1' por el UUID del proyecto principal
  if (mainProject) {
    document.querySelector('.title').textContent = mainProject.name;
    document.querySelector('.UI-design-title').textContent = mainProject.description;
    document.querySelector('.completed-title-data').textContent = mainProject.completed_on;
    document.querySelector('.project-image').src = mainProject.image;
    document.querySelector('.project-image').alt = mainProject.name;
    document.querySelector('.project-description').innerHTML = mainProject.content;
  }
}

function loadOtherProjectsSection(projects) {
  const otherProjects = projects.filter(project => project.uuid !== '1');  // Cambia '1' por el UUID del proyecto principal
  const projectsContainer = document.querySelector('.projects-container');
  projectsContainer.innerHTML = '';

  otherProjects.forEach(project => {
    const article = document.createElement('article');
    article.classList.add('project-card');

    const projectWrapper = document.createElement('a');
    projectWrapper.classList.add('project-wrapper');
    projectWrapper.href = `/pages/projects?id=${project.uuid}`;

    const img = document.createElement('img');
    img.classList.add('img-project');
    img.src = project.image;
    img.alt = project.name;

    const div = document.createElement('div');
    div.classList.add('project-inner-card');

    const h4 = document.createElement('h4');
    h4.classList.add('project-title');
    h4.textContent = project.name;

    const p = document.createElement('p');
    p.classList.add('project-description', 'capitalize');
    p.textContent = project.description;

    const learnMoreLink = document.createElement('a');
    learnMoreLink.classList.add('learn-more');
    learnMoreLink.href = `/pages/projects?id=${project.uuid}`;
    learnMoreLink.textContent = 'Learn more';

    div.appendChild(h4);
    div.appendChild(p);
    div.appendChild(learnMoreLink);
    projectWrapper.appendChild(img);
    projectWrapper.appendChild(div);
    article.appendChild(projectWrapper);
    projectsContainer.appendChild(article);
  });
}
