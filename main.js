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

const arrayPersona = JSON.parse(sessionStorage.getItem("arrayPersona")) ||[];

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
    sessionStorage.setItem("arrayPersona", JSON.stringify(arrayPersona));
    formulario.reset();
};

const contenedorResultado = document.getElementById("contenedorResultado");

function mostrarResultado(){
    contenedorResultado.innerHTML = "";
    const semana = 4;
    arrayPersona.forEach( persona => {
        const div = document.createElement("div");
        div.className = "usuario"
        div.innerHTML =  `
                <br>
                <p class="text-center">El sueldo ingresado es $${persona.sueldo}</p>
                <br>
                <p class="text-center">Los gastos ingresados son $${persona.gastos}</p>
                <br>
                <p class="text-center">El ahorro deseado es $${persona.ahorro}</p>
                <br>`
        console.log(persona)
        if(persona.gastos+persona.ahorro>=persona.sueldo){
            setTimeout( ()=> Swal.fire({
                text: "Lo que quieres ahorrar es más de lo que tienes disponible, prueba con una cantidad menor.",
                background: "#735146",
                backdrop: "#CFB6A6",
                color: "#CFB6A6",
                confirmButtonColor: "#CFB6A6"
            }) , 3000);
        }else{
            setTimeout( ()=> Swal.fire({
                text: `Lo que puedes gastar por semana es $${(persona.sueldo - persona.gastos - persona.ahorro) / semana}`,
                background: "#828A34",
                backdrop: "#CFB6A6",
                color: "#CFB6A6",
                confirmButtonColor: "#CFB6A6"
            }) , 3000);    
        } ;
        contenedorResultado.appendChild(div);
    })
};