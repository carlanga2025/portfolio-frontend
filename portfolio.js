document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM cargado y script ejecutándose");

    // Funcionalidad básica del formulario de contacto
    const form = document.getElementById('contact-form');
    const responseMessage = document.getElementById('response-message');
    console.log("Formulario y contenedor de respuesta obtenidos:", form, responseMessage);

    if (!responseMessage) {
        console.error("El contenedor de respuesta no se encuentra en el DOM.");
        return;  // Evitar ejecutar el script si el contenedor no está presente
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault(); // Evitar el envío tradicional del formulario

        // Obtener los valores de los campos
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Verificar valores obtenidos
        console.log("Valores obtenidos:", { name, email, message });

        // Validar si los campos están vacíos
        if (!name || !email || !message) {
            responseMessage.textContent = 'Todos los campos son obligatorios.';
            responseMessage.style.color = 'red';
            console.log("Validación fallida:", { name, email, message });
            return; // Detener la ejecución si algún campo está vacío
        }

        // Crear el objeto de datos a enviar
        const formData = { name, email, message };

        // Mostrar el proceso de envío
        responseMessage.textContent = 'Enviando...';
        responseMessage.style.color = 'white';

        try {
            // Enviar los datos al backend usando fetch
            const response = await fetch('https://portfolio-backend-i283.onrender.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.text(); // Obtener la respuesta del servidor
            responseMessage.textContent = result; // Mostrar el mensaje del servidor
            responseMessage.style.color = 'green'; // Si todo sale bien, mensaje en verde

            // Limpiar el formulario
            form.reset();
        } catch (error) {
            responseMessage.textContent = 'Hubo un error al enviar el mensaje.';
            responseMessage.style.color = 'red'; // Si hay un error, mensaje en rojo
            console.error('Error al enviar el correo:', error);
        }
    });

    // Toggle del menú hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', (event) => {
        nav.classList.toggle('active');
        event.stopPropagation();
    });

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            nav.classList.remove('active');
        });
    });

    document.addEventListener("click", function (event) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove("active");
        }
    });

    document.querySelectorAll('.back-to-top').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth' // Desplazamiento suave
            });

            nav.classList.remove('active');
        });
    });
});


///////////////////////dark mode ////////////////////

const darkModeButton = document.getElementById('dark-mode-button');
darkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);

    // Cambiar íconos de sol/luna
    if (isDarkMode) {
        document.querySelector('.fa-sun').style.display = 'block';
        document.querySelector('.fa-moon').style.display = 'none';
    } else {
        document.querySelector('.fa-sun').style.display = 'none';
        document.querySelector('.fa-moon').style.display = 'block';
    }
});

// Mantener la preferencia del usuario
if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-mode');
    document.querySelector('.fa-sun').style.display = 'block';
    document.querySelector('.fa-moon').style.display = 'none';
}

