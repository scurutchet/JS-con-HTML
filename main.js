// ``
const tituloPrincipal = document.getElementById ("tituloPrincipal");

tituloPrincipal.innerText = "Hola! Esto es una calculadora de ahorro.";

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
};

const arrayPersona = [];

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    ingresarDatos();
    mostrarResultado();    
});

function ingresarDatos(){
    const sueldo = parseFloat(document.getElementById("sueldo").value);
    const gastos = parseFloat(document.getElementById("gastos").value);
    const ahorro = parseFloat(document.getElementById("ahorro").value);

    const persona = new Persona(sueldo, gastos, ahorro);
    arrayPersona.push(persona);
    localStorage.setItem("arrayPersona", JSON.stringify(arrayPersona));
    formulario.reset();
};

if(localStorage.getItem("arrayPersona")){
    let arrayPersona = JSON.parse(localStorage.getItem("arrayPersona"));
    for(let i = 0; i < arrayPersona.length; i++){
        console.log(arrayPersona[i]);
    } 
};


const contenedorResultado = document.getElementById("contenedorResultado");


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
            </div>
`;      const etiquetaP = document.createElement("etiquetaP");
        (persona.gastos + persona.ahorro) >= persona.sueldo ? etiquetaP.innerHTML= `<p>Lo que quieres ahorrar es más de lo que tienes disponible, prueba con una cantidad menor</p>` : 
        etiquetaP.innerHTML= `<p>Lo que puedes gastar por semana es $${(persona.sueldo - persona.gastos - persona.ahorro) / semana}</p>` || alert(`Los datos que ingresaste no son válidos`);

        div.appendChild(etiquetaP);
        contenedorResultado.appendChild(div);
    })
};
