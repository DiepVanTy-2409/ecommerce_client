import { productImages as images } from '../assets'

let id = 1
export const products = images.map(img => {
    return {
        _id: id++,
        image: img,
        title: 'Gaming Headphone',
        cost: Math.round(Math.random() * 500 + 100),
        desc: 'Table with air purifier, stained venner/black',
        rating: [1, 2, 3, 4, 5] // HERE
    }
})
