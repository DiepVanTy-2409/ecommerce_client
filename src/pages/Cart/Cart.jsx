import { useDispatch, useSelector } from "react-redux"
import { IoCartOutline } from 'react-icons/io5'
import { Button, ToastMessage } from '../../components'
import { Link, NavLink } from "react-router-dom"
import { removeFromCart } from "../../slice/cartSlice"
import './Cart.css'
import { useState } from "react"
const Cart = () => {
    const { products, totalPrice } = useSelector(state => state.cart)
    const { userData } = useSelector(state => state.user)

    return (
        <div className="cartpage">
            <h1> Trang giỏ hàng <IoCartOutline color="mediumseagreen" /></h1>
            {
                products?.length !== 0
                    ? <ProductsCart products={products} />
                    : <p>Chưa có sản phẩm để hiện thị!<br /></p>
            }
            <div className="cartpage__checkout">
                <h2>Thanh toán</h2>
                <p className="cartpage_price">Tổng tiền: {totalPrice.toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                })}</p>
                {
                    userData?.token
                        ? <Button className='button_pay'>Thanh toán</Button>
                        : <Link style={{ color: 'dodgerblue', textDecoration: 'underline' }} to='/login'>Đăng nhập để thực hiện thanh toán</Link>
                }
            </div>
        </div>
    )
}

export default Cart

const ProductsCart = ({ products }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()

    const handleRemove = (id) => {
        dispatch(removeFromCart(id))
        setIsOpen(true)
    }
    return (
        <ul className="cart_products">
            <div className="cart_products_heading">
                <p>Hình ảnh</p>
                <p>Sản phẩm</p>
                <p>Giá</p>
                <p>Số lượng</p>
                <p>Xóa</p>
                <p>Xem</p>
            </div>
            {
                products?.map(product => {
                    return (
                        <li className="cart_product" key={product._id}>
                            <div className="cart_product_image">
                                <img src={import.meta.env.VITE_PUBLIC_FOLDER + product.image} alt={product.title} />
                            </div>
                            <p className="cart_product_title">{product.title}</p>
                            <p className="cart_product_cost">{product.cost.toLocaleString('vi', {
                                style: 'currency',
                                currency: 'VND'
                            })}</p>
                            <p className="cart_product_quantity">{product.quantity}</p>
                            <Button handleClick={() => handleRemove(product._id)} className='cart_product_remove_btn cart_btn' >Xóa</Button>
                            <NavLink to={`/${product._id}`} className='cart_product_view cart_btn' >Xem</NavLink>
                        </li>
                    )
                })
            }
            <ToastMessage isOpen={isOpen} setIsOpen={setIsOpen}>Đã xóa!</ToastMessage>
        </ul>
    )
}