// ``
const tituloPrincipal = document.getElementById ("tituloPrincipal");
console.log(tituloPrincipal);

tituloPrincipal.innerText = "Hola! Esto es una calculadora de ahorro.";
console.log(tituloPrincipal);

const contenedor = document.getElementById("contenedor");

const tituloSecundario = document.createElement("h2");
tituloSecundario.innerText = "Te indicará cuánto puedes gastar por semana para llegar a tu objetivo de ahorro mensual.";

contenedor.appendChild(tituloSecundario);

class Persona {
    constructor (sueldo, gastos, ahorro) {
        this.sueldo = sueldo;
        this.gastos = gastos;
        this.ahorro = ahorro;
    }
}

const arrayPersona = [];

const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const sueldo = document.getElementById("sueldo");
    const gastos = document.getElementById("gastos");
    const ahorro = document.getElementById("ahorro");
    console.log("El sueldo ingresado es $" + sueldo.value);
    console.log("Los gastos ingresados son $" + gastos.value);
    console.log("El ahorro deseado es $" + ahorro.value);
    const persona = new Persona(sueldo.value, gastos.value, ahorro.value);
    arrayPersona.push(persona);
    console.log(arrayPersona);
    formulario.reset();
});

const semanasDelMes = 4;

function calculoDisponible(valor1, valor2, valor3, valor4){
    resultado = (valor1 - valor2 - valor3) / valor4;
};
calculoDisponible(sueldo.value, gastos.value, ahorro.value, semanasDelMes);

const calculo = document.getElementById("calculo");

const mostrarResultado = document.createElement("p");
mostrarResultado.innerText = "Lo que puedes gastar por semana es $" + resultado;

calculo.appendChild(mostrarResultado);


