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
    ingresarDatos();
    
});

function ingresarDatos(){
    const sueldo = parseFloat(document.getElementById("sueldo").value);
    const gastos = parseFloat(document.getElementById("gastos").value);
    const ahorro = parseFloat(document.getElementById("ahorro").value);

    const persona = new Persona(sueldo, gastos, ahorro);
    arrayPersona.push(persona);
    console.log(arrayPersona);
    formulario.reset();
}

const contenedorResultado = document.getElementById("contenedorResultado");

const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    mostrarResultado();
});



function mostrarResultado(){
    contenedorResultado.innerHTML = "";
    const semana = 4;
    arrayPersona.forEach( persona => {
        const div = document.createElement("div");
        div.innerHTML =  `
            <div>
                <p>El sueldo ingresado es $${persona.sueldo}</p>
                <p>Los gastos ingresados son $${persona.gastos}</p>
                <p>El ahorro deseado es $${persona.ahorro}</p>
                <p>Lo que puedes gastar por semana es $${(persona.sueldo - persona.gastos - persona.ahorro) / semana}</p>

            </div>
`;
        contenedorResultado.appendChild(div);
    })
};