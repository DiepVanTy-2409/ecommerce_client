import React from 'react'
import './Dropdown.css'
const items = [
    { _id: 1, title: 'Laptop' },
    { _id: 2, title: 'Smart phone' },
    { _id: 3, title: 'Headphones' },
]
const Dropdown = ({value, title = 'Danh mục'}) => {
    return (
        <div className='dropdown'>
            {/* <div className='dropdown__title'>{title}</div> */}
            <select value={value} >
                {items.map(item => <option key={item._id} value={item.title}>{item.title}</option>)}
            </select>
        </div>
    )
}

export default Dropdown