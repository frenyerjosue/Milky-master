const carrito = document.getElementById("carrito");
const listaProductos = document.getElementById("lista-productos");
const contenedorCarrito = document.querySelector('.buy-card .lista_productos');
const vaciarCarritoBtn  = document.querySelector ('#vaciar_carrito');
    
 let articulosCarrito = [];    
registrarEventsListener()

function registrarEventsListener(){
    listaProductos.addEventListener('click', agregarProducto);

 //eliminar producto
carrito.addEventListener('click', eleminarProducto) 

//vaciar el carrito
vaciarCarritoBtn.addEventListener ('click', e => {
    articulosCarrito = [];
    limpiarHTML()
})
}



function   agregarProducto(e){
    if(e.target.classList.contains("agregar-carrito")){
    const productoSeleccionado = e.target.parentElement.parentElement;
    leerInfo(productoSeleccionado)
}
}
//elimina un produto del carrito
function eleminarProducto(e) {
    if(e.target.classList.contains("borrar-producto")){
        const productoId = e.target.getAttribute('data-id');

        //eliminar el arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId)
        carritoHTML()
    }
}

function leerInfo(producto){
    //objeto con contenido
    const infoProducto = {
        imagen : producto.querySelector('img').src,
        titulo : producto.querySelector('h3').textContent,
        precio: producto.querySelector('.descuento').textContent,
        id : producto.querySelector('button').getAttribute('data-id'),
        cantidad : 1

    }
//existencia de productos
const existe = articulosCarrito.some(producto => producto.id === infoProducto.id)

if (existe){
    //actualizar la cantidad
    const productos = articulosCarrito.map(producto => {
     if(producto.id === infoProducto.id) {
         producto.cantidad++;
         return producto
     } else{
        return producto;
     }
    });
   [...articulosCarrito, infoProducto]
} else {
    //agg rlementos al carrito
    articulosCarrito = [...articulosCarrito, infoProducto]
    

}

carritoHTML()
    
}

function carritoHTML(){
    limpiarHTML()

    articulosCarrito.forEach(producto =>{
      const fila = document.createElement('div');
      fila.innerHTML = `
      <img src="${producto.imagen}"></img>
      <p>${producto.titulo}</p>
      <p>${producto.precio}</p>
      <p>${producto.cantidad}</p>
      <p><span class="borrar-producto" data-id="${producto.id}">X</span/></p>
      `;
      contenedorCarrito.appendChild(fila)

    });


}
//limpiar lista de productos
function limpiarHTML(){
    console.log(contenedorCarrito)
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}