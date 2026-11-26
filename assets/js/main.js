import { projects } from "./projects.js";

const $ = (selector, root = document) => root.querySelector(selector);
const projectGrid = $("#project-grid");
const yearNode = $("#year");
const menuButton = $(".menu-toggle");
const navigation = $("#site-nav");

function projectCard(project, index) {
  const card = document.createElement("article");
  card.className = "project-card reveal";
  card.style.setProperty("--card-index", index);
  const visual = project.image
    ? `<img class="project-image" src="${project.image}" alt="Обложка проекта ${project.title}" loading="lazy">`
    : `<div class="project-placeholder" aria-hidden="true"><span class="placeholder-mark">n<span>0</span></span><span class="placeholder-index">PROJECT / ${String(index + 1).padStart(2, "0")}</span><span class="placeholder-orbit"></span></div>`;
  const link = project.url
    ? `<a class="project-link" href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="Открыть проект ${project.title}">Открыть проект <span>↗</span></a>`
    : `<span class="project-link is-muted">Скоро <span>↗</span></span>`;
  card.innerHTML = `
    <div class="project-visual">${visual}<span class="project-status">${project.status}</span></div>
    <div class="project-info">
      <div class="project-meta"><span>${project.category}</span><span>${project.year}</span></div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-bottom"><div class="project-stack">${project.stack.map(item => `<span>${item}</span>`).join("")}</div>${link}</div>
    </div>`;
  return card;
}

function renderProjects() {
  if (!projectGrid) return;
  const featured = projects.filter(project => project.featured);
  const remaining = projects.filter(project => !project.featured);
  const ordered = [...featured, ...remaining];
  projectGrid.replaceChildren(...ordered.map(projectCard));
  const count = $("#project-count");
  if (count) count.textContent = String(projects.length).padStart(2, "0");
}

function setupMenu() {
  if (!menuButton || !navigation) return;
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
  });
  navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }));
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(item => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}

function setupCurrentYear() {
  if (yearNode) yearNode.textContent = new Date().getFullYear();
}

renderProjects();
setupMenu();
setupCurrentYear();
setupReveal();
