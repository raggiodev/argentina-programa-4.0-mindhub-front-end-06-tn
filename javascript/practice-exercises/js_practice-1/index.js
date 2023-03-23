let miNombre = "Fernando";

let miApellido = "Raggio";

let miEdad = 24;

let miMascota = "Rocko";

let edadMascota = 9;

console.log(miNombre, miApellido, miEdad, miMascota, edadMascota);

let nombreCompleto = `${miNombre} ${miApellido}`;
let nombreCompleto_2 = miNombre + " " + miApellido;
console.log(nombreCompleto);

let textoPresentacion = `Hola! Mi nombre es ${nombreCompleto}, tengo ${miEdad} años. Mi mascota se llama ${miMascota} y tiene ${edadMascota} años.`;
console.log(textoPresentacion);

let sumaEdades = miEdad + edadMascota;
console.log("La suma de mi edad y la de mi mascota es:", sumaEdades);
let restaEdades = miEdad - edadMascota;
console.log("La resta de mi edad y la de mi mascota es:", restaEdades);
let productoEdades = miEdad * edadMascota;
console.log("El producto de mi edad y la de mi mascota es:", productoEdades);
let divisionEdades = miEdad / edadMascota;
console.log("La división de mi edad y la de mi mascota es:", divisionEdades);

miNombre = prompt('Introduce tu nombre', 'Fernando');
miApellido = prompt('Introduce tu apellido', 'Raggio');
miEdad = prompt('Introduce tu edad', 24);
miMascota = prompt('Introduce el nombre de tu mascota', 'Rocko');
edadMascota = prompt('Introduce la edad de tu mascota', 9);

if (miNombre != null) {
    (miNombre = prompt('Introduce tu nombre', 'Fernando'))
} else {
    alert("No has introducido tu nombre. Recarga la página para volver a intentarlo :)")
};

let alumno = {
    nombre: "Fernando",
    apellido: "Raggio",
    edad: 24,
    nombreMascota: "Rocko",
    edadMascota: 9
};
console.table(alumno);

