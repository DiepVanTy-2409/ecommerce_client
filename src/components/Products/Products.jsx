import { ProductCard } from '../index'
import './Products.css'
const Products = ({ products }) => {
    return (
        <div className='Products' id='product_list'>
            {
                products.map(product => <ProductCard key={product._id}  {...product}/>)
            }
        </div>
    )
}
export default Products