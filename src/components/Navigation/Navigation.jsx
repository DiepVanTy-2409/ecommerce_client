import { Link, NavLink, useNavigate } from 'react-router-dom'
import { IoCartOutline } from 'react-icons/io5'
import { CiLogin, CiLogout } from 'react-icons/ci'
import { TbCategory2 } from 'react-icons/tb'
import { RiAdminLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button/Button'
import { logout } from '../../slice/authSlice'
import { clearCart } from '../../slice/cartSlice'
import './Navigation.css'
const Navigation = () => {
    const { products } = useSelector(state => state.cart)
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(clearCart())
        dispatch(logout())
        navigate('/')
    }

    return (
        <nav className="navigation flex items-center justify-between">
            <Logo />
            <ul className="navigation__right flex">
                {/* <div className="navigation__item flex items-center">
                    <TbCategory2 />
                    Danh mục
                </div> */}
                <li className="navigation__item flex items-center">
                    <NavLink className='navigation__link' to='/cart'><IoCartOutline /> <span className='navigation__link_text'>Giỏ hàng</span>{products?.length !== 0 && <span className='cart_count'>{products?.length}</span>}</NavLink>
                </li>
                {
                    userData?.role === 1
                    && <li className="navigation__item flex items-center">
                        <NavLink className='navigation__link' to='/dashboard'><RiAdminLine /> <span className='navigation__link_text'>Admin</span></NavLink>
                    </li>
                }
                <li className="navigation__item flex items-center">
                    {
                        !userData
                            ? <Button handleClick={() => navigate('/login')}> <span className='navigation__link_text'>Đăng nhập</span> <CiLogin /> </Button>
                            : <Button handleClick={handleLogout}> <span className='navigation__link_text'>Đăng xuất</span><CiLogout /> </Button>
                    }
                </li>

            </ul>
        </nav>
    )
}

export default Navigation
export const Logo = () => {
    return <Link className='logo' to='/'>Shopcart</Link>
}