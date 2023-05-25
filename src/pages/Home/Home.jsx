import { useDispatch, useSelector } from 'react-redux'
import { Banner, Filter, Products } from '../../components'
import './Home.css'
import { useEffect } from 'react'
import { getAllProducts } from './../../slice/productSlice';
const Home = () => {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.products)
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
    return (
        <div className='homepage'>
            <Banner />
            <Filter/>
            <Products products={products} />
        </div>
    )
}
export default Home