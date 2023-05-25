import { useEffect, useLayoutEffect, useRef, } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { IoCloseOutline } from 'react-icons/io5'
import { AddToCartButton, Button, Logo } from './../../components';
import { gsap, Elastic } from 'gsap';
import useSlideDrag from '../../hooks/useSlideDrag';
import { useSelector } from 'react-redux';
import './SingleProductPage.css'

/**
 * !no need to fetch the api again because SingleProductPage.jsx is being a modal box of home.jsx. so Home.jsx will do it
 */
const SingleProductPage = () => {
    const navigate = useNavigate()
    const imgRef = useRef()
    const slideRef = useSlideDrag()
    const { productId } = useParams()
    const { products } = useSelector(state => state.products)
    const product = products?.find(product => product._id == productId)

    const handleGoBack = () => {
        navigate('../')
    }
    useLayoutEffect(() => {
        let context = gsap.context(() => {
            const tl = gsap.timeline()
            tl.from('h1', {
                y: '-1em',
                opacity: 0,
                duration: 0.2,
                delay: 0.2
            })
            tl.fromTo(imgRef.current, {
                scale: 0,

            }, {
                ease: Elastic.easeOut.config(1, 0.3),
                scale: 1,
                duration: 1
            })

            tl.from('.gsapToTop', {
                y: '0.5em',
                opacity: 0,
                duration: 0.3,
                stagger: 0.2
            })
        })
        return () => context.revert()
    }, [])
    return (
        <div className='SingleProductPage'>
            <div className="SingleProductPage__header">
                <Logo />
                {/* <Button className='button--close' handleClick={handleGoBack}><IoCloseOutline fontSize={'2.5rem'} /></Button> */}
                <h1>{product?.title}</h1>
                <img className='SingleProductPage__image' src={import.meta.env.VITE_PUBLIC_FOLDER + product?.images[0]} alt="" ref={imgRef} />
            </div>
            <div className="SingleProductPage__footer">
                <div className="SingleProductPage__footer__inner">
                    <p className="SingleProductPage__cost gsapToTop">{product?.cost.toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND'
                    })}</p>
                    <p className="SingleProductPage__desc gsapToTop">{product?.desc}</p>
                    <div className="SingleProductPage__imagesList gsapToTop" ref={slideRef}>
                        {
                            product?.images.map((img, index) => (

                                <img key={index} className='SingleProductPage__image_small' src={import.meta.env.VITE_PUBLIC_FOLDER + img} onClick={() => imgRef.current.src = import.meta.env.VITE_PUBLIC_FOLDER + img} />
                            ))
                        }
                    </div>
                    <AddToCartButton className='gsapToTop' product={{ ...product, image: product?.images[0] }} />
                </div>
            </div>
        </div>
    )
}

export default SingleProductPage