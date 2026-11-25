document.documentElement.classList.add("js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Sticky nav gets an outline once the page scrolls.
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Reveal on scroll.
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    io.unobserve(e.target);
  });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// The loop: light up one step at a time.
const nodes = [...document.querySelectorAll(".loop-node")];
if (nodes.length && !reduceMotion) {
  let i = 0;
  const step = () => {
    nodes.forEach((n, k) => n.classList.toggle("active", k === i));
    i = (i + 1) % nodes.length;
  };
  step();
  setInterval(step, 1800);
}

// A little parallax on the clouds of the hero scene.
const hero = document.querySelector(".hero");
if (hero && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  const layers = hero.querySelectorAll(".sc-drift, .sc-drift2");
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    layers.forEach((c, k) => { c.style.translate = `${dx * -(14 + k * 8)}px 0`; });
  });
  hero.addEventListener("mouseleave", () => layers.forEach((c) => (c.style.translate = "")));
}
