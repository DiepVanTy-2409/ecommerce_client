import { HiOutlineTrash } from 'react-icons/hi'
import { CiEdit } from 'react-icons/ci'
import { useState } from 'react'
import { IoEyeOutline } from 'react-icons/io5'
import { Button, ToastMessage } from '../../../components'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getMoreProducts } from '../../../slice/productSlice'
import { Link } from 'react-router-dom'
import UpdateProduct from '../UpdateProduct/UpdateProduct'
import './ViewProduct.css'
import { Modal } from '@mui/material'
const ViewProduct = () => {
    const dispatch = useDispatch()
    const { products, isOutLoad } = useSelector(state => state.products)
    const [isOpen, setIsOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [upadteData, setUpadteData] = useState(null)

    const loadMore = () => {
        dispatch(getMoreProducts({ skip: products.length }))
    }

    const handleDelete = (id) => {
        if (confirm('Khi xóa sẽ không thẻ hoàn tác!')) {
            dispatch(deleteProduct(id))
            setIsOpen(true)
        }
    }

    const handleUpdate = (product) => {
        setUpdate(true)
        setUpadteData(product)
    }
    return (
        <div className='ViewProduct'>
            <h1>Quản lý sản phẩm</h1>
            <div className="ViewProduct__headings">
                <p className="ViewProduct__heading">Hình ảnh</p>
                <p className="ViewProduct__heading">Tên sản phẩm</p>
                <p className="ViewProduct__heading">Mô tả</p>
                <p className="ViewProduct__heading">Giá</p>
            </div>
            {
                products.map(product => (
                    <div key={product._id} className="ViewProduct__row">
                        <div className="ViewProduct__image">
                            <img src={import.meta.env.VITE_PUBLIC_FOLDER + product.images[0]} alt="" />
                        </div>
                        <p className="ViewProduct__title">{product.title}</p>
                        <p className="ViewProduct__desc">{product.desc}</p>
                        <p className="ViewProduct__price">{product.cost.toLocaleString('vi', {
                            style: 'currency',
                            currency: 'VND'
                        })}</p>
                        <Link to={`../${product._id}`} className='ViewProduct__btn ViewProduct__view_btn button'><IoEyeOutline /></Link>
                        <Button className='ViewProduct__btn ViewProduct__edit_btn' handleClick={() => handleUpdate(product)}><CiEdit /></Button>
                        <Button className='ViewProduct__btn ViewProduct__delete_btn' handleClick={() => handleDelete(product._id)}><HiOutlineTrash color='red' /></Button>
                    </div>
                ))
            }
            <Modal open={update} onClose={() => setUpdate(false)}>
                <UpdateProduct handleClose={() => setUpdate(false)} {...upadteData} />
            </Modal>
            {(products.length && !isOutLoad)
                && <Button className='homepage_loadmore_btn' handleClick={loadMore}>Xem thêm</Button>}
            <ToastMessage isOpen={isOpen} setIsOpen={setIsOpen}>Đã xóa!</ToastMessage>
        </div>
    )
}

export default ViewProduct