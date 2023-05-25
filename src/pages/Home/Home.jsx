import { useDispatch, useSelector } from 'react-redux'
import { Banner, Filter, Products, Button } from '../../components'
import { useEffect } from 'react'
import { getMoreProducts, getProducts } from './../../slice/productSlice';
import './Home.css'
const Home = () => {
    const dispatch = useDispatch()
    const { products, isOutLoad } = useSelector(state => state.products)

    const loadMore = () => {
        const filter = JSON.parse(localStorage.getItem('filter') || {})
        dispatch(getMoreProducts({ ...filter, skip: products.length }))

    }

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    return (
        <div className='homepage'>
            <Banner />
            <Filter />
            <Products products={products} />
            {(products.length && !isOutLoad)
                && <Button className='homepage_loadmore_btn' handleClick={loadMore}>Xem thêm</Button>}
        </div>
    )
}
export default Home