function mostrarCarrito() {
    let carritoCMP = capturarStorage()
    contenedorTabla.innerHTML = ""
    carritoCMP.forEach(element => {
        contenedorTabla.innerHTML += `
        <div class="carritoHTML">
            <tr>
                <th scope="row">${element.cant}</th>
                <td>
                    <img src="./img/producto${element.id}.png" width=100>
                </td>
                <td>${element.prodName}</td>
                <td>${element.precio}</td>
            </tr>
        </div>
        `
    })
}
function capturarStorage() {
    return JSON.parse(localStorage.getItem("carritoCompra")) || []
}
function guardarStorage(articulos) {
    localStorage.setItem("carritoCompra", JSON.stringify(articulos))
}
function borrarStorage() {
    localStorage.setItem('carritoCompra', JSON.stringify([]))
    carritocompra = []
    articulos = []
}

function precioCompra(articulosEnLS) {
    acumulador = 0;
    articulosEnLS.forEach((articuloCarrito) => {
        acumulador += articuloCarrito.precio * articuloCarrito.cant
    })
    if(acumulador == 0) {
        finalCompra.innerHTML = ""
        modalBody.innerHTML = "<p>SELECCIONE ARTICULOS PARA COMPRAR</p>" 
    } else {
        finalCompra.innerHTML = `TOTAL $ ${new Intl.NumberFormat("de-DE").format(acumulador)}`
    }
}

function cargaDeEventos(articulosEnLS) {

    //SUMAR ARTICULO AL CARRITO
    articulosEnLS.forEach((articuloCarrito, indice) => {
        document.getElementById(`sum${indice}`).addEventListener('click', () => {
            if(articulos[indice].cant < articulos[indice].stock) {
                articulos[indice].cant++
                guardarStorage(articulos)
                articulosAlCarrito(JSON.parse(localStorage.getItem('carritoCompra')))
            }
        })
    })

    //RESTAR ARTICULO DEL CARRITO
    articulosEnLS.forEach((articuloCarrito, indice) => {
        document.getElementById(`rest${indice}`).addEventListener('click', () => {
            if(articulos[indice].cant > 1) {
                articulos[indice].cant--
                guardarStorage(articulos)
                articulosAlCarrito(JSON.parse(localStorage.getItem('carritoCompra')))
            }
        })
    })

    //BOTON ELIMINAR ARTICULO
    articulosEnLS.forEach((articuloCarrito, indice) => {
        document.getElementById(`botonEliminar${indice}`).addEventListener('click', () => {
            document.getElementById(`articuloCarrito${indice}`).remove()
            articulos.splice(indice, 1)
            guardarStorage(articulos)
            articulosAlCarrito(JSON.parse(localStorage.getItem('carritoCompra')))
        })
    })
}

function articulosAlCarrito(articulosEnLS) {
    modalBody.innerHTML = " "  
    articulosEnLS.forEach((articuloCarrito, indice) => {    
        modalBody.innerHTML += `
            <div class="cardCarrito mb-3" id ="articuloCarrito${indice}">
                <div class="row g-1">
                    <div>
                        <img src="./img/${articuloCarrito.img}" class="img-fluid rounded-start">
                </div>
            <div class="artiCarro col-md-2">
                <div class="text-center card-body">
                <h5 class="card-title">${articuloCarrito.prodName}</h5>
                <div class="contenedor row">
                    <p class="cantCarro card-text">Cantidad: ${articuloCarrito.cant}</p>
                    <button class= "botonCant btn btn-outline-secondary" id="rest${indice}"><i class="fas fa-minus"></i></button> 
                    <button class= "botonCant btn btn-outline-secondary" id="sum${indice}"><i class="fas fa-plus"></i></button>
                </div>
                <p class="textoCarro text-center card-text">SUBTOTAL: $   ${new Intl.NumberFormat("de-DE").format(articuloCarrito.precio * articuloCarrito.cant)}</p> 
                <button class= "btn btn-primary" id="botonEliminar${indice}">ELIMINAR</i></button>
            </div>
            </div>
            </div>
        </div>
    `
})
cargaDeEventos(articulosEnLS)
mostrarCarrito(articulosEnLS)
precioCompra(articulosEnLS)
}

botonProcesar.addEventListener('click', () => {
    let articulosEnLS = JSON.parse(localStorage.getItem('carritoCompra'))
    articulosAlCarrito(articulosEnLS)
})

botonFinalizarCompra.addEventListener('click', () => {
    if(acumulador === 0) {
        Swal.fire('NADA PARA COMPRAR')
        return
    } else {    
        localStorage.setItem('carritoCompra', JSON.stringify([]))
        Swal.fire({
            icon: 'success',
            html: `<h1>Compra Registrada</h1>
            <br>
            <p>TOTAL A PAGAR</p>
            <br>
            <h2><strong> $ ${acumulador} </strong></h2>
            <br>
            <br>
            <a href="#">Imprimir ticket para pago</a>
            `,
        });
        borrarStorage()
        mostrarCarrito()
    }
})


botonVaciarCarrito.addEventListener('click', () => {
    //CAMBIAR ESTE IF ELSE
    articulosEnLS = JSON.parse(localStorage.getItem('carritoCompra'))
    if(articulosEnLS.length === 0) {                         
        Swal.fire('NADA PARA ELIMINAR')
    } else {  
        Swal.fire({
            title: 'ESTA SEGURO?',
            text: "Se borraran los articulos del carrito",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire(
                'CARRITO VACIO',
                'Cargue nuevos articulos.',
                'success',
                borrarStorage(),
                mostrarCarrito()
            )}
        })
    }
})
