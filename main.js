// ``
//Creo un título primario y uno secundario y los agrego al DOM:
const tituloPrincipal = document.getElementById ("tituloPrincipal");

tituloPrincipal.innerText = "Hola! Esto es una calculadora de ahorro.";

const contenedor = document.getElementById("contenedor");

const tituloSecundario = document.createElement("h2");
tituloSecundario.innerText = "Te indicará cuánto puedes gastar por semana para llegar a tu objetivo de ahorro mensual.";

contenedor.appendChild(tituloSecundario);

//Creo Persona, con los parámetros sueldo, gastos y ahorro:
class Persona {
    constructor (sueldo, gastos, ahorro) {
        this.sueldo = sueldo;
        this.gastos = gastos;
        this.ahorro = ahorro;
    }
};

//Declaro arrayPersona:
const arrayPersona = JSON.parse(sessionStorage.getItem("arrayPersona")) ||[];

//Declaro formulario y le aasigno las funciones que tiene que ejecutar el botón del form:
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    ingresarDatos();
    mostrarResultado();    
});

//Traigo los datos ingresados en los inputs del form y los pusheo al array. Mando los datos de arrayPersona al sessionStorage:
function ingresarDatos(){
    const sueldo = parseFloat(document.getElementById("sueldo").value);
    const gastos = parseFloat(document.getElementById("gastos").value);
    const ahorro = parseFloat(document.getElementById("ahorro").value);

    const persona = new Persona(sueldo, gastos, ahorro);
    arrayPersona.push(persona);
    sessionStorage.setItem("arrayPersona", JSON.stringify(arrayPersona));
    formulario.reset();
};

//Creo la función mostrarResultado, donde por cada persona creada en el array se crea un div que modifica el DOM. Además, creo un condicional para mostrar los posibles resultados usando una librería:
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
        console.log(persona);
        if(persona.gastos+persona.ahorro>=persona.sueldo){
            setTimeout( ()=> Swal.fire({
                text: "Lo que quieres ahorrar es más de lo que tienes disponible, prueba con una cantidad menor.",
                background: "#735146",
                backdrop: "#CFB6A6",
                color: "#CFB6A6",
                confirmButtonColor: "#CFB6A6"
            }) , 3000);
        }else if(persona.gastos+persona.ahorro<persona.sueldo){
            setTimeout( ()=> Swal.fire({
                text: `Lo que puedes gastar por semana es $${(persona.sueldo - persona.gastos - persona.ahorro) / semana}`,
                background: "#828A34",
                backdrop: "#CFB6A6",
                color: "#CFB6A6",
                confirmButtonColor: "#CFB6A6"
            }) , 3000);    
        }else{
            Swal.fire({
                text: `No podemos hacer el cálculo con los valores que ingresaste. Por favor, prueba nuevamente.`,
                background: "#735146",
                backdrop: "#CFB6A6",
                color: "#CFB6A6",
                confirmButtonColor: "#CFB6A6"
            });    
        }; 
        contenedorResultado.appendChild(div);
    });
};

//Conecto con api de cotización.

const cotizacion = "https://criptoya.com/api/dolar";
let dolar = document.getElementById("dolar");
setInterval(()=> {
    fetch(cotizacion)
        .then(response => response.json())
        .then(({blue, oficial, solidario}) => {
            dolar.innerHTML = `
            <br>
            <h5 class="text-center">Si quieres saber cuánto puedes ahorar en USD, aquí está la cotización actual (desde pesos argentinos): </h5>
            <br>
            <p class="text-center">Dolar oficial: ${oficial}</p>
            <br>
            <p class="text-center">Dolar blue: ${blue}</p>
            <br>
            <p class="text-center">Dolar solidario: ${solidario}</p>
            <br>
            `
        })
        .catch(error => console.error(error))
}, 3000);

//No sé cómo hacer para que aparezcan en el div solo los últimos datos que se ingresan en el form. Además, puse la cotización en pesos argentinos porque no encontré una api como criptoya para pesos uruguayos.