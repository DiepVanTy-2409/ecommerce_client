import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { AiFillStar } from 'react-icons/ai'
import { BsCart4 } from 'react-icons/bs'
import { Button, ToastMessage } from '../';
import { addTocart } from '../../slice/cartSlice';
import './ProductCard.css'
import { useState } from 'react';
const ProductCard = ({ _id, images = [], title, cost, desc, rating = [] }) => {
  const location = useLocation();

  return (
    <div className='ProductCard'>
      <Link className="ProductCard__image_box" to={`${_id}`} state={{ background: location }}>
        <img className='ProductCard__image' src={import.meta.env.VITE_PUBLIC_FOLDER + images[0]} alt="image error" />
      </Link>
      <div className="ProductCard__content">
        <div className="ProductCard__title_cost">
          <h3 className='ProductCard__title'>{title.substring(0, 10) + '...'}</h3>
          <p className='ProductCard__cost'><span style={{ fontWeight: 'bold' }}>{cost.toLocaleString('vi', {
            style: 'currency',
            currency: 'VND'
          })}</span></p>
        </div>
        <i className='ProductCard__desc'>{desc.substring(0, 60) + '...'}</i>
        <div className="ProductCard__rate" >
          {
            rating.map((item, index) => <AiFillStar key={index} color='green' />)
          }
        </div>
        <AddToCartButton product={{ _id, image: images[0], title, cost, desc, rating }} />
      </div>
    </div>
  )
}
export default ProductCard


export const AddToCartButton = ({ product, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(addTocart(product))
    setIsOpen(true)
  }
  return (
    <>
      <Button handleClick={handleClick} className={`button-addToCart ${className}`} ><BsCart4 /> Thêm vào giỏ hàng</Button>
      <ToastMessage isOpen={isOpen } setIsOpen={setIsOpen} >Đã thêm vào giỏ hàng!</ToastMessage>
    </>
  )
}
