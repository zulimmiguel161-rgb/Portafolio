const els = document.querySelectorAll('.reveal');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce || !('IntersectionObserver' in window)) {
  els.forEach((el) => el.classList.add('visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  els.forEach((el) => io.observe(el));
}
const botones = document.querySelectorAll('.acordeon-btn');

botones.forEach((boton) => {
  boton.addEventListener('click', () => {
    const abierto = boton.getAttribute('aria-expanded') === 'true';
    const item = boton.closest('.acordeon-item');
    const panel = document.getElementById(boton.getAttribute('aria-controls'));

    boton.setAttribute('aria-expanded', String(!abierto));
    item.classList.toggle('abierto', !abierto);
    panel.inert = abierto;
  });
});
botones.forEach((otro) => {
  if (otro !== boton) {
    otro.setAttribute('aria-expanded', 'false');
    otro.closest('.acordeon-item').classList.remove('abierto');
    document.getElementById(otro.getAttribute('aria-controls')).inert = true;
  }
});