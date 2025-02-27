document.addEventListener('DOMContentLoaded', function() {
    // Memorias - reemplazar con tus propios recuerdos y fechas
    const memories = [
        { text: "El dia en que me pediste ser tu novia", date: "05 de Marzo 2024" },
        { text: "Cuando me dijiste las palabras mas bonitas", date: "Todos los dias" },
        { text: "El dia que vimos juntas por primera vez una pelicula", date: "18 de Octubre 2024" },
        { text: "Cuando le hable de ti a mi mamá", date: "12 de Octubre 2024" },
        { text: "Nuestro primer 'te amo'", date: "16 de Abril 2024" },
        { text: "El dia que hicimos nuestra primer llamada", date: "8 de Diciembre 2024" }
       ];
    
    // Notas de amor - reemplazar con tus propias notas
    const loveNotes = [
        "🥰🥰Mi amor: Hoy que cumplimos un año juntas, quiero decirte de corazón lo feliz que me haces. Gracias por dejarme ser tu novia. Aunque la distancia sea algo que no nos deja realizar muchas cosas se que cuando nos encontremos lograremos cumplir mucho de lo que hoy solo hablamos y planeamos por chat. Me encanta cuando hablamos y me cuentas tu día, cuando nos reímos juntas y cuando me apoyas cuando estoy triste.Estoy muy orgullosa de ti. Eres tan trabajadora y nunca te rindes, siempre buscando salir adelante. Eso me hace admirarte muchísimo.Gracias por confiar en mí, por quererme como soy, por estar ahí siempre aunque nos separen kilómetros. Cada mensaje tuyo me alegra el día.Te amo mucho y espero que podamos celebrar muchos años más juntas. La distancia es difícil, pero vale la pena por ti.Con todo mi amor:      VAL.🥰🥰"
    ];
    
    // Elementos DOM
    const memoryText = document.getElementById('memoryText');
    const memoryDate = document.getElementById('memoryDate');
    const randomMemoryBtn = document.getElementById('randomMemoryBtn');
    const loveNoteBtn = document.getElementById('loveNoteBtn');
    const surpriseBtn = document.getElementById('surpriseBtn');
    const heartContainer = document.getElementById('heartContainer');
    const gallery = document.getElementById('gallery');
    const daysCount = document.getElementById('daysCount');
    const sendBtn = document.getElementById('sendBtn');
    
    // Función para mostrar un recuerdo aleatorio
    randomMemoryBtn.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * memories.length);
        const memory = memories[randomIndex];
        
        memoryText.textContent = memory.text;
        memoryDate.textContent = memory.date;
        
        createHearts(5);
    });
    
    // Función para mostrar una nota de amor aleatoria
    loveNoteBtn.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * loveNotes.length);
        const note = loveNotes[randomIndex];
        
        memoryText.textContent = note;
        memoryDate.textContent = ""; // Limpiar la fecha

        createHearts(10);
    });
    
// Suponiendo que tienes un elemento con la clase 'memory-container' o similar
// donde quieres que aparezca la sorpresa

// Función para la sorpresa (modificada)
surpriseBtn.addEventListener('click', function() {
    // Cambiar el color de fondo a negro
    document.body.style.backgroundColor = '#000000';
    
    // Modificar el elemento que contiene la memoria/mensaje
    const memoryContainer = document.querySelector('.memory-container'); // Ajusta el selector según tu HTML
    memoryContainer.style.backgroundImage = "url('fondo.avif')";
    memoryContainer.style.backgroundSize = "cover"; // Ajusta la imagen al tamaño del contenedor
    memoryContainer.style.backgroundPosition = "center"; // Centra la imagen
    memoryContainer.style.backgroundRepeat = "no-repeat"; // Evita que la imagen se repita

    memoryContainer.style.color = 'rgb(255, 255, 255)'; // Texto en blanco para que se vea en fondo negro
    
    // Cambiar el mensaje sorpresa
    memoryText.textContent = "¿Me permites seguir siendo tu novia?";
    memoryDate.textContent = ""; // Limpiar la fecha
    // Crear muchos corazones de fondo (matriz estilo "Matrix" pero con corazones)
    createMatrixHearts();
    
    // No necesitamos volver al color original porque queremos mantener este efecto
});

// Función para crear efecto de "Matrix" con corazones
function createMatrixHearts() {
    // Primero, limpiamos cualquier corazón existente
    const existingHearts = document.querySelectorAll('.matrix-heart');
    existingHearts.forEach(heart => heart.remove());
    
    // Creamos un contenedor para los corazones de fondo
    const heartsContainer = document.createElement('div');
    heartsContainer.classList.add('hearts-background');
    heartsContainer.style.position = 'fixed';
    heartsContainer.style.top = '0';
    heartsContainer.style.left = '0';
    heartsContainer.style.width = '100%';
    heartsContainer.style.height = '100%';
    heartsContainer.style.zIndex = '-1'; // Detrás del contenido
    heartsContainer.style.overflow = 'hidden';
    document.body.appendChild(heartsContainer);
    
    // Crear columnas de corazones (similar al efecto Matrix)
    const columns = Math.floor(window.innerWidth / 20); // Aproximadamente una columna cada 20px
    
    for (let i = 0; i < columns; i++) {
        createHeartColumn(heartsContainer, i * 20);
    }
}

function createHeartColumn(container, xPos) {
    // Número aleatorio de corazones en esta columna
    const heartCount = 10 + Math.floor(Math.random() * 15);
    const speed = 1 + Math.random() * 3; // Velocidad aleatoria
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('matrix-heart');
        heart.innerHTML = '💗🥰';
        heart.style.position = 'absolute';
        heart.style.left = `${xPos}px`;
        heart.style.top = `${-100 - (i * 50)}px`; // Posición inicial fuera de la pantalla
        heart.style.fontSize = `${12 + Math.random() * 10}px`;
        heart.style.opacity = 0.5 + Math.random() * 0.5;
        container.appendChild(heart);
        
        // Animar este corazón cayendo
        animateHeart(heart, speed);
    }
}

function animateHeart(heart, speed) {
    let position = parseInt(heart.style.top);
    const maxHeight = window.innerHeight;
    
    function moveDown() {
        position += speed;
        heart.style.top = `${position}px`;
        
        // Si el corazón sale de la pantalla, lo reposicionamos arriba
        if (position > maxHeight) {
            position = -50;
            heart.style.top = `${position}px`;
            // También cambiamos un poco su posición horizontal
            const currentLeft = parseInt(heart.style.left);
            heart.style.left = `${currentLeft + (Math.random() * 10 - 5)}px`;
        }
        
        requestAnimationFrame(moveDown);
    }
    
    moveDown();
}
    
    // Función para crear corazones animados
    function createHearts(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(function() {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = '💗';
                
                // Posición aleatoria en el eje X
                const xPos = Math.random() * window.innerWidth;
                
                heart.style.left = xPos + 'px';
                heart.style.bottom = '0';
                
                heartContainer.appendChild(heart);
                
                // Eliminar el corazón después de la animación
                setTimeout(function() {
                    heart.remove();
                }, 4000);
            }, i * 100);
        }
    }
    
    // Inicializar la galería con placeholders (reemplazar con tus imágenes)
    function initGallery() {
        // Array con las rutas de tus imágenes
        const imagePaths = [
            's1.jpeg',
            'v1.jpeg',
            's2.jpeg',
            'v2.jpeg',
            'mensaje.avif',
            'v3.jpeg',
            's3.jpeg',
            'v4.jpeg',
            's4.jpeg'
        ];
    
        for (let i = 0; i < 9; i++) {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            
            // Crear elemento de imagen en lugar del placeholder
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('placeholder');
            
            // Añadir la imagen dentro del placeholder
            const img = document.createElement('img');
            img.src = imagePaths[i];
            img.alt = `Foto ${i + 1}`;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            
            // Reemplazar el texto con la imagen
            imageContainer.textContent = '';
            imageContainer.appendChild(img);
            
            galleryItem.appendChild(imageContainer);
            gallery.appendChild(galleryItem);
            
            // Al hacer clic en una imagen
            galleryItem.addEventListener('click', function() {
                memoryText.textContent = `💗`;
                memoryDate.textContent = ""; // Limpiar la fecha
                createHearts(3);
            });
        }
    }
    
       // Calcular días juntos utilizando la fecha real de inicio: 5 de marzo de 2024
    function updateDaysCount() {
        // Fecha de inicio de la relación (5 de marzo de 2024)
        const startDate = new Date('2024-03-05');
        const currentDate = new Date();
        
        const diffTime = Math.abs(currentDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        daysCount.textContent = diffDays;
    }
    
    // Inicializar todo
    initGallery();
    updateDaysCount();
    
    // Mostrar un corazón cada 10 segundos
    setInterval(function() {
        createHearts(10);
    }, 10000);
});