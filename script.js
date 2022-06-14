// APLICANDO NULLISH
//let carritoCompra = localStorage.getItem('carritoCompra') ?? []
//let carritoCompra = []

localStorage.setItem('carritoCompra', JSON.stringify([]))

const contenedorTabla= document.getElementById("tablaCarrito")

let acumulador
let divArticulos = document.getElementById("divArticulos")
let botonProcesar = document.getElementById("botonProcesar")
let finalCompra = document.getElementById('precioTotal')
let modalBody = document.getElementById("modal-body")

let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")

let botonDarkMode = document.getElementById('botonDarkMode')
let botonLightMode = document.getElementById('botonLightMode')

//DARK_MODE Y LIGTH_MODE (TERNARIO)
darkMode = (localStorage.getItem('darkMode')) ? darkMode = localStorage.getItem('darkMode') : localStorage.setItem('darkMode', 'light')

botonDarkMode.addEventListener('click', () => {
    document.body.classList.add('darkMode')
    localStorage.setItem('darkMode', 'dark')
})
botonLightMode.addEventListener('click', () => {
    document.body.classList.remove('darkMode')
    localStorage.setItem('darkMode', 'light')
})

//PRODUCTOS AL HTML CON FETCH
fetch('articulos.json')
    .then(response => response.json())
    .then(dataArticulos => {
        dataArticulos.forEach((articuloEnArray, indice) => {
            divArticulos.innerHTML += `
                <div class="card mb-4 row" id="articulo${indice}">
                    <div class="card-title my-4">${articuloEnArray.id}</div>
                    <img src="./img/${articuloEnArray.img}" class="imagenProd"></img>
                    <div class="card-body">
                        <h5 class="card-title">${articuloEnArray.prodName}</h5>
                        <p class="card-text tamPrecio">${articuloEnArray.precio}</p>
                        <p class="card-text">Stock:${articuloEnArray.stock}</p>
                        <button id="boton${indice}" class="btn btnCompra">AGREGAR</button>
                    </div>
                </div>
                `
        })
        capturarStorage()
        mostrarCarrito()

        dataArticulos.forEach((articuloEnArray, indice) => {
            document.getElementById(`boton${indice}`).addEventListener('click', () => {
                if (articulos.find(articulo => articulo.prodName == articuloEnArray.prodName)) {
                    let index = articulos.findIndex(articulo => articulo.prodName == articuloEnArray.prodName)
                    // articulos[index].cant++
                    guardarStorage(articulos)
                    mostrarCarrito()
                    Swal.fire({
                        icon: 'error',
                        title: 'YA ESTA EN EL CARRITO',
                    })
                } else {
                    let nuevoArticulo = new Articulo(articuloEnArray.id, articuloEnArray.prodName, articuloEnArray.precio, articuloEnArray.stock, articuloEnArray.img)
                    articulos.push(nuevoArticulo)
                    guardarStorage(articulos)
                    mostrarCarrito()
                    Toastify({
                        text: "AGREGADO AL CARRITO",
                        duration: 3000,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "black",
                            color: "Yellow",
                            border: "2px solid black",
                        },
                    }).showToast();
                }
            })
        })
    })
