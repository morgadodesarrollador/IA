// index.js - muestra un "Hola mundo" simple y añade interacción

document.addEventListener('DOMContentLoaded', () => {
  const greeting = document.getElementById('greeting');
  if (greeting) greeting.textContent = '¡Hola mundo!';

  const btn = document.getElementById('btn');
  if (btn) {
    btn.addEventListener('click', () => {
      // pequeña interacción para verificar que el script se cargó
      alert('¡Hola mundo!');
    });
  }
});
