import { ProductCard } from '../index'
import './Products.css'
const Products = ({ products }) => {
    return (
        <div className='Products' id='product_list'>
            {
                !products?.length
                    ? <p className='Products_notfound_msg'>Không có sản phẩm phù hợp</p>
                    : products.map(product => <ProductCard key={product._id}  {...product} />)
            }
        </div>
    )
}
export default Products