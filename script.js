const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".main-nav");
const navLinks = [...document.querySelectorAll(".nav-link")];
const revealElements = document.querySelectorAll(".reveal");
const sections = [...document.querySelectorAll("main section[id], header[id]")];

const closeNavigation = () => {
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Abrir menú de navegación");
  navigation?.classList.remove("is-open");
  document.body.classList.remove("nav-open");
};

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Abrir menú de navegación" : "Cerrar menú de navegación");
  navigation?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});

window.addEventListener(
  "scroll",
  () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 20);
  },
  { passive: true },
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

revealElements.forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

    if (!visibleSection) return;

    navLinks.forEach((link) => {
      const target = link.getAttribute("href")?.slice(1);
      link.classList.toggle("is-active", target === visibleSection.target.id);
    });
  },
  { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.2, 0.5] },
);

sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeNavigation();
});
