import  express  from "express"
import { createProduct, deleteProduct, getProductByTitle, getProducts, updateProduct } from "./product.controller.js"

const router = express.Router()

router.route('/').get(getProducts).post(createProduct)
router.route('/title/:title').get(getProductByTitle)
router.route('/:id').put(updateProduct).delete(deleteProduct)

export default router