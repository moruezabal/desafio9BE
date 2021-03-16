import express from 'express';
import Inventario from './Inventario.js'

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))



const router = express.Router();

app.use('/api', router);
app.use(express.static('public'));

let almacen = new Inventario();

router.get('/productos/', (req, res) => {
    let productos = almacen.getProductos();
    let error = {error : 'no hay productos cargados'};
    productos.length != 0 ? res.status(200).json(productos) : res.status(200).json(error);
})

router.get('/productos/:id', (req, res) => {
    let id = req.params.id;
    let producto = almacen.getProducto(id);
    let error = {error : 'producto no encontrado'};

    producto ? res.status(200).json(producto) : res.status(200).json(error)

})

router.post('/productos', (req, res) => {
    let productoModificado = almacen.addProducto(req.body);
    res.status(200).json(productoModificado);
})

router.put('/productos/:id', (req, res) => {
    let id = req.params.id;
    let productoSolicitado = almacen.getProducto(id);
    if (productoSolicitado) {
        let productoActualizado = almacen.updateProducto(id,req.body);
        res.status(200).json(productoActualizado);
    } 
    else{
        res.status(200).json({error: "no se encontró el producto a actualizar"});
    } 
})

router.delete('/productos/:id', (req, res) => {
    let id = req.params.id;
    let productoSolicitado = almacen.getProducto(id);
    if (productoSolicitado) {
        let productoBorrado = almacen.deleteProducto(id,req.body);
        res.status(200).json(productoBorrado);
    } 
    else{
        res.status(200).json({error: "no se encontró el producto a borrar"});
    } 

})


const port = 8080
const serve = app.listen(port, () => console.log("Corriendo en el puerto " + port));

