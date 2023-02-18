const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario div");
const imgSuccess = "images/success-icon.svg";
const imgError = "images/error-icon.svg";
const campoVacio = "Rellene este campo";
var claveActual = "";

class Validaciones {
    constructor(nombreOk, emailOk, claveOk, confirmarClaveOk) {
        this.nombreOk = nombreOk;
        this.emailOk = emailOk;
        this.claveOk = claveOk;
        this.confirmarClaveOk = confirmarClaveOk;
    }

    setValidate(validate, containerType) {
        if(containerType === "nombre") {
            this.nombreOk = validate;
        } else if(containerType === "email") {
            this.emailOk = validate;
        } else if(containerType === "clave") {
            this.claveOk = validate;
        } else if(containerType === "confirmeclave") {
            this.confirmarClaveOk = validate;
        }
    }

    validateOK() {
        return this.nombreOk && this.emailOk && this.claveOk && this.confirmarClaveOk;
    }
}

var validaciones = new Validaciones(false, false, false, false);

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]+$/,
    email: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ,
    clave: /^.{8,16}$/
}

const anotaciones = {
    nombre: "Nombre inválido",
    email: "Email inválido",
    clave: "Debe tener al menos 8 caracteres",
    confirmeclave: "Las contraseñas no coinciden"
}

formulario.addEventListener("submit", (event) => {
    enviar();
    event.preventDefault();
});

inputs.forEach((input) => {
    var imagen = input.querySelector(".image");
    var inputText = input.querySelector(".input_text");
    inputText.addEventListener("blur", (event) => {
        validar(event.target, imagen, input);
    });
})

function validar(inputText, imagen, inputContainer) {
    switch(inputText.name) {
        case "nombre":
            validarTexto(inputText, expresiones.nombre, imagen, inputContainer);
        break;
        case "email":
            validarTexto(inputText, expresiones.email, imagen, inputContainer);
        break;
        case "clave":
            validarTexto(inputText, expresiones.clave, imagen, inputContainer);
            claveActual = inputText.value;
            var confirmClaveContainer = document.getElementById("confirmarclave");
            var inputTextCofirmClave = confirmClaveContainer.querySelector(".input_text");
            var imagenConfirmClave = confirmClaveContainer.querySelector(".image");
            validateConfirmarClave(inputTextCofirmClave, imagenConfirmClave, confirmClaveContainer);
        break;
        case "confirmeclave":
            validateConfirmarClave(inputText, imagen, inputContainer);
        break;
    }
}

function validarTexto(inputText, expresion, imagen, inputContainer) {
    if(expresion.test(inputText.value)) {
        validaciones.setValidate(true, inputText.name);
        mostrarValidacionSuccess(imagen, inputContainer);
    } else {
        validaciones.setValidate(false, inputText.name);
        mostrarValidacionError(imagen, inputContainer);
    }
}

function validateConfirmarClave(inputText, imagen, inputContainer) {
    if(claveActual === inputText.value) {
        validaciones.setValidate(true, inputText.name);
        mostrarValidacionSuccess(imagen, inputContainer)
    } else {
        validaciones.setValidate(false, inputText.name);
        mostrarValidacionError(imagen, inputContainer);
    }
}

function mostrarValidacionSuccess(imagen, inputContainer) {
    imagen.src = imgSuccess;
    inputContainer.classList.add("input__container-success");
    inputContainer.classList.remove("input__container-error");
    inputContainer.querySelector(".input_anotation").textContent = "";
}

function mostrarValidacionError(imagen, inputContainer) {
    imagen.src = imgError;
    inputContainer.classList.add("input__container-error");
    inputContainer.classList.remove("input__container-success");
    var inputText = inputContainer.querySelector(".input_text");
    if(inputText.value === "") {
        inputContainer.querySelector(".input_anotation").textContent = campoVacio;
    }
    inputContainer.querySelector(".input_anotation").textContent = anotaciones[inputText.name];
}

function enviar() {
    if(validaciones.validateOK()){
        alert("La inscripción ha sido correcta");
    } else {
        inputs.forEach((input) => {
            var imagen = input.querySelector(".image");
            if(input.querySelector(".input_text").value === "") {
                imagen.src = imgError;
                input.classList.add("input__container-error");
                input.classList.remove("input__container-success");
                input.querySelector(".input_anotation").textContent = campoVacio;
            }
        })
    }
}