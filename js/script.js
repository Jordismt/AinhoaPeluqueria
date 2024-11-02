document.addEventListener("DOMContentLoaded", function() {
    // Inicializa EmailJS con tu User ID
    emailjs.init('47fb83yo39TFD9fbL'); // Reemplaza con tu API Key

    class FormValidator {
        constructor(form) {
            this.form = form;
            this.errors = [];
        }

        validate() {
            this.errors = [];
            const fields = [
                { name: "nombre", label: "El nombre" },
                { name: "telefono", label: "El teléfono" },
                { name: "fecha", label: "La fecha" },
                { name: "hora", label: "La hora" }
            ];

            fields.forEach(field => {
                const value = this.form[field.name].value.trim();
                if (!value) this.errors.push(`${field.label} es obligatorio.`);
            });

            return this.errors.length === 0;
        }
    }

    class EmailSender {
        static sendEmail(formData) {
            emailjs.send('service_odxp8p7', 'template_k7ah1op', formData)
                .then(response => {
                    console.log('Éxito!', response.status, response.text);
                    alert("Cita enviada con éxito.");
                })
                .catch(error => {
                    console.error('Error al enviar el correo:', error);
                    alert("Hubo un problema al enviar la cita. Intenta nuevamente.");
                });
        }
    }

    document.getElementById("citaForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const validator = new FormValidator(this);
        if (!validator.validate()) {
            alert(validator.errors.join("\n"));
            return;
        }

        const formData = {
            to_name: "Peluquería Estilo",
            from_name: this.nombre.value,
            message: `Cita solicitada para el ${this.fecha.value} a las ${this.hora.value}. Teléfono: ${this.telefono.value}`
        };

        EmailSender.sendEmail(formData);
        this.reset(); // Reiniciar el formulario
    });
});
