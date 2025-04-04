const exitMenu = document.getElementById('exitMenu');
const barIcon = document.getElementById('barIcon');
const headerMenu = document.getElementById('header__menuMobile');
barIcon.addEventListener('click', () => {
  headerMenu.style.display = 'flex';
  headerMenu.style.flexDirection = 'column';
  barIcon.style.display = 'none';
});

exitMenu.addEventListener('click', () => {
  headerMenu.style.display = 'none';
  barIcon.style.display = 'block';
});
