import { Link, NavLink, useNavigate } from 'react-router-dom'
import { IoCartOutline } from 'react-icons/io5'
import { CiLogin, CiLogout } from 'react-icons/ci'
import { TbCategory2 } from 'react-icons/tb'
import { RiAdminLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button/Button'
import { logout } from '../../slice/authSlice'
import './Navigation.css'
import { clearCart } from '../../slice/cartSlice'
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
            <div className="navigation__right flex">
                <div className="navigation__item flex items-center">
                    <TbCategory2 />
                    Danh mục
                </div>
                <div className="navigation__item flex items-center">
                    <IoCartOutline />
                    <NavLink to='/cart'>Giỏ hàng{products?.length !== 0 && <span className='cart_count'>{products?.length}</span>}</NavLink>
                </div>
                {
                    userData?.role === 1
                    && <div className="navigation__item flex items-center">
                        <RiAdminLine />
                        <Link to='/dashboard'>Admin</Link>
                    </div>

                }

                <div className="navigation__item flex items-center">
                    {
                        !userData
                            ? <Button handleClick={() => navigate('/login')}>Đăng nhập <CiLogin /> </Button>
                            : <Button handleClick={handleLogout}>Đăng xuất <CiLogout /> </Button>
                    }
                </div>

            </div>
        </nav>
    )
}

export default Navigation
export const Logo = () => {
    return <Link className='logo' to='/'>Shopcart</Link>
}