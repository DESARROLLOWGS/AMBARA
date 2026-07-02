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
function changeSlide(index) {
    currentIndex = index;

    // Cambiamos la imagen de fondo en el CSS manteniendo el degradado envolvente
    heroSection.style.backgroundImage = `linear-gradient(to right, 
                rgba(7, 7, 7, 1) 0%, 
                rgba(7, 7, 7, 0.9) 30%, 
                rgba(7, 7, 7, 0.4) 60%, 
                rgba(7, 7, 7, 0) 100%), 
              url('${sliderImages[currentIndex]}')`;

    // Actualizamos la clase activa en los puntitos de navegación
    dots.forEach((dot, i) => {
        if (i === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Función para ir al siguiente slide automáticamente
function nextSlide() {
    let nextIndex = (currentIndex + 1) % sliderImages.length;
    changeSlide(nextIndex);
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
