

const screenWidth = window.screen.width 
const screenHeight =window.screen.height

const inWidth = window.innerWidth
const inHeight = window.innerHeight

const clientWidth = document.documentElement.clientWidth
const clientHeight = document.documentElement.clientHeight


const btn = document.querySelector(".j-btn")

btn.addEventListener('click', () => {
  window.alert(
`Размеры экрана девайса\\монитора: ширина - ${screenWidth}; высота - ${screenHeight} \n
Размер окна браузера, с учётом полосы прокрутки: ширина - ${inWidth}; высота - ${inHeight}\n
Размер окна браузера, без учёта полосы прокрутки: ширина - ${clientWidth}; высота - ${clientHeight}`)

});

