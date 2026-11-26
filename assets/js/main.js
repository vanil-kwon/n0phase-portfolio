import { projects } from "./projects.js";

const $ = (selector, root = document) => root.querySelector(selector);
const projectGrid = $("#project-grid");
const filterRoot = $("#project-filters");
const yearNode = $("#year");
const menuButton = $(".menu-toggle");
const navigation = $("#site-nav");
let activeFilter = "all";

const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[char]);

function projectCard(project, index) {
  const card = document.createElement("article");
  card.className = "project-card reveal";
  card.style.setProperty("--card-index", index);

  const visual = project.logo
    ? `<div class="project-logo-wrap"><img class="project-logo" src="${escapeHTML(project.logo)}" alt="Логотип ${escapeHTML(project.title)}" loading="lazy" onerror="this.closest('.project-logo-wrap').classList.add('logo-failed');this.remove()"><span class="logo-fallback">${escapeHTML(project.mark || project.title.slice(0, 2))}</span></div>`
    : `<div class="project-logo-wrap wordmark wordmark-${escapeHTML(project.mark || "default").toLowerCase()}"><span class="logo-fallback">${escapeHTML(project.mark || project.title)}</span><small>${escapeHTML(project.title)}</small></div>`;

  const siteLink = project.url
    ? `<a class="project-link" href="${escapeHTML(project.url)}" target="_blank" rel="noopener noreferrer">Открыть сайт <span>↗</span></a>`
    : "";
  const repoLink = project.repo
    ? `<a class="project-repo" href="${escapeHTML(project.repo)}" target="_blank" rel="noopener noreferrer" aria-label="Исходный код ${escapeHTML(project.title)}">GitHub ↗</a>`
    : "";

  card.innerHTML = `
    <div class="project-visual project-visual-${escapeHTML(project.group)}">
      <span class="placeholder-index">PROJECT / ${String(index + 1).padStart(2, "0")}</span>
      ${visual}
      <span class="project-status">${escapeHTML(project.status)}</span>
    </div>
    <div class="project-info">
      <div class="project-meta"><span>${escapeHTML(project.category)}</span><span>${escapeHTML(project.year)}</span></div>
      <h3>${escapeHTML(project.title)}</h3>
      <p>${escapeHTML(project.description)}</p>
      <div class="project-bottom">
        <div class="project-stack">${project.stack.map(item => `<span>${escapeHTML(item)}</span>`).join("")}</div>
        <div class="project-actions">${siteLink}${repoLink}</div>
      </div>
    </div>`;
  return card;
}

function renderProjects() {
  if (!projectGrid) return;
  const visible = projects.filter(project => activeFilter === "all" || project.group === activeFilter);
  projectGrid.replaceChildren(...visible.map(projectCard));
  const count = $("#project-count");
  if (count) count.textContent = String(visible.length).padStart(2, "0");
  setupReveal(projectGrid);
}

function setupFilters() {
  if (!filterRoot) return;
  filterRoot.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    activeFilter = button.dataset.filter;
    filterRoot.querySelectorAll("[data-filter]").forEach(item => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderProjects();
  });
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

function setupReveal(root = document) {
  const items = root.querySelectorAll(".reveal:not(.is-visible)");
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
  }, { threshold: 0.1 });
  items.forEach(item => observer.observe(item));
}

function setupCurrentYear() {
  if (yearNode) yearNode.textContent = new Date().getFullYear();
}

setupFilters();
renderProjects();
setupMenu();
setupCurrentYear();
setupReveal();
