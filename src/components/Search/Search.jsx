import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './Search.css'
import { getProducts, searchProducts } from '../../slice/productSlice'
const Search = () => {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const handleChange = (e) => {
        setSearchValue(e.target.value)
        if (!e.target.value) {
            dispatch(getProducts())
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchValue) {
            dispatch(searchProducts(searchValue))
            document.getElementById('product_list').scrollIntoView({
                behavior: 'smooth'
            })
        }
    }
    return (
        <div className='search'>
            <form onSubmit={handleSubmit}>
                <input
                    value={searchValue}
                    onChange={handleChange}
                    className='search__field'
                    type="text"
                    placeholder='Tìm kiếm...' />
                <div className="search__line"></div>
            </form>
        </div>
    )
}
export default Search