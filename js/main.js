// Arreglo con las rutas de tus imágenes para el slider
const sliderImages = [
    'assets/hero.png',
    'assets/hero2.png',
    'assets/hero3.png'
];

// 🚀 TRUCO DE OPTIMIZACIÓN: Precargar las imágenes en la memoria del navegador
// Esto evita que la pantalla parpadee en negro cuando el slider cambia de foto por primera vez.
sliderImages.forEach(ruta => {
    const imgElement = new Image();
    imgElement.src = ruta;
});

let currentIndex = 0;
const slideInterval = 5000; // 5 segundos

// Seleccionamos los elementos del DOM
const heroSection = document.querySelector('.hero');
const dots = document.querySelectorAll('.dot');

// Función principal para cambiar de slide
//function changeSlide(index) {
  //  currentIndex = index;

    // Cambiamos la imagen de fondo en el CSS manteniendo el degradado envolvente
    //heroSection.style.backgroundImage = `linear-gradient(to right, 
      //          rgba(7, 7, 7, 1) 0%, 
        //        rgba(7, 7, 7, 0.9) 30%, 
          //      rgba(7, 7, 7, 0.4) 60%, 
            //    rgba(7, 7, 7, 0) 100%), 
            //  url('${sliderImages[currentIndex]}')`;

    // Actualizamos la clase activa en los puntitos de navegación
    //dots.forEach((dot, i) => {
      //  if (i === currentIndex) {
        //    dot.classList.add('active');
       // } else {
         //   dot.classList.remove('active');
       // }
   // });
// }


// Función para ir al siguiente slide automáticamente
function nextSlide() {
    let nextIndex = (currentIndex + 1) % sliderImages.length;
    changeSlide(nextIndex);
}
// Función principal para cambiar de slide (Optimizada para móviles)
function changeSlide(index) {
    currentIndex = index;

    // Detectamos si la pantalla es de celular (menor o igual a 768px)
    const esMovil = window.innerWidth <= 768;

    if (esMovil) {
        // Degradado óptimo para celulares (Vertical: de arriba a abajo)
        heroSection.style.backgroundImage = `linear-gradient(to bottom, 
                    rgba(7, 7, 7, 0.9) 0%, 
                    rgba(7, 7, 7, 0.6) 40%, 
                    rgba(7, 7, 7, 0.2) 70%, 
                    rgba(7, 7, 7, 0.9) 100%), 
                  url('${sliderImages[currentIndex]}')`;
    } else {
        // Degradado óptimo para computadoras (Horizontal: de izquierda a derecha)
        heroSection.style.backgroundImage = `linear-gradient(to right, 
                    rgba(7, 7, 7, 1) 0%, 
                    rgba(7, 7, 7, 0.9) 30%, 
                    rgba(7, 7, 7, 0.4) 60%, 
                    rgba(7, 7, 7, 0) 100%), 
                  url('${sliderImages[currentIndex]}')`;
    }

    // Actualizamos la clase activa en los puntitos de navegación
    dots.forEach((dot, i) => {
        if (i === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}
// Inicializamos el temporizador para el cambio automático
let autoSlide = setInterval(nextSlide, slideInterval);

// Añadimos los eventos de clic a cada puntito
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        changeSlide(index);
        
        // Reiniciamos el temporizador para evitar saltos abruptos tras el clic
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, slideInterval);
    });
});
// ==========================================================================
// CONTROL DEL MENÚ MOVIL RESPONSIVE
// ==========================================================================
const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const mainNav = document.querySelector('.main-nav');

// Abrir el menú lateral al hacer clic en la hamburguesa
if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.add('open');
    });
}

// Cerrar el menú lateral al hacer clic en la 'X'
if (menuClose && mainNav) {
    menuClose.addEventListener('click', () => {
        mainNav.classList.remove('open');
    });
}
