window.addEventListener("load", async () => {
  try {
    const response = await fetch(
      "https://imaginative-rolypoly-8c493c.netlify.app/projects"
    );
    const data = await response.json();

    const mainProject = data.find(project => project.uuid === '1'); // Cambia '1' por el UUID del proyecto principal
    loadMainProject(mainProject);

    const otherProjects = data.filter(project => project.uuid !== '1'); // Cambia '1' por el UUID del proyecto principal
    loadOtherProjects(otherProjects);
  } catch (error) {
    console.log(error);
  } finally {
    document.querySelector("section.recent-projects").removeAttribute("hidden");
  }
});

function loadMainProject(project) {
  if (project) {
    document.querySelector('.title').textContent = project.name;
    document.querySelector('.UI-design-title').textContent = project.description;
    document.querySelector('.completed-title-data').textContent = project.completed_on;
    document.querySelector('.project-image').src = project.image;
    document.querySelector('.project-image').alt = project.name;
    document.querySelector('.project-description').innerHTML = project.content;
  }
}

function loadOtherProjects(projects) {
  const projectsContainer = document.querySelector("div.projects-container");
  projectsContainer.innerHTML = "";

  projects.forEach(project => {
    const article = jsonProjectToHtmlArticle(project);
    projectsContainer.appendChild(article);
  });
}

function jsonProjectToHtmlArticle(project) {
  const article = document.createElement("article");
  article.className = "project-card";

  const wrapper = createProjectWrapperAnchor(project);
  article.appendChild(wrapper);

  return article;
}

function createProjectWrapperAnchor(project) {
  const wrapperAnchor = document.createElement("a");
  wrapperAnchor.className = "project-wrapper";
  wrapperAnchor.href = `./pages/projects.html?id=${project.uuid}`;

  const imgElement = document.createElement("img");
  imgElement.className = "img-project";
  imgElement.setAttribute("src", project.image);
  imgElement.setAttribute("alt", project.name);
  wrapperAnchor.appendChild(imgElement);

  const divInnerCard = createProjectInnerCard(project);
  wrapperAnchor.appendChild(divInnerCard);

  return wrapperAnchor;
}

function createProjectInnerCard(project) {
  const divInnerCard = document.createElement("div");
  divInnerCard.className = "project-inner-card";

  const h4Element = document.createElement("h4");
  h4Element.className = "project-title";
  h4Element.innerHTML = project.name;
  divInnerCard.appendChild(h4Element);

  const pElement = document.createElement("p");
  pElement.className = "project-description capitalize";
  pElement.innerHTML = project.description;
  divInnerCard.appendChild(pElement);

  const learnMoreLink = document.createElement("a");
  learnMoreLink.className = "learn-more";
  learnMoreLink.innerHTML = "Learn more";
  learnMoreLink.setAttribute("href", `./pages/projects.html?id=${project.uuid}`);
  divInnerCard.appendChild(learnMoreLink);

  return divInnerCard;
}
