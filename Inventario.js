class Inventario {
    constructor(){
        this.productos = [];
    }
    getProductos = function () { 
        return this.productos;
    }

    getProducto = function (id){
        let productoEncontrado = null
        this.productos.forEach(producto => {
            if (producto.id == id){
                productoEncontrado = producto;
            }
        });
        return productoEncontrado
    }

    addProducto = function(producto){
        producto.id = this.productos.length + 1
        this.productos.push(producto);
        return producto;
    }
}

export default Inventario;