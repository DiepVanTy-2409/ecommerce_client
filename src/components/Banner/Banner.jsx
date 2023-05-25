import { bannerImage } from '../../assets'
import './Banner.css'
import { Search } from './../';
const Banner = () => {
  return (
    <div className='banner flex'>
      <div className="banner__left flex items-center justify-center">
        <Search />
      </div>
      <div className="banner__right flex items-center justify-center">
        <img className='banner__image' src={bannerImage} />
      </div>
    </div>
  )
}

export default Banner