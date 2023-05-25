import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material'
import { getCategories } from '../../slice/categorySlice'
import './Filter.css'
import { getProducts } from '../../slice/productSlice'
const prices = [
    {
        name: 'tất cả',
        value: [0, 100000000]
    },
    {
        name: 'dưới 200 nghìn',
        value: [0, 200000]
    },
    {
        name: '200 - 400 nghìn',
        value: [200000, 400000]
    },
    {
        name: '400 - 600 nghìn',
        value: [400000, 600000]
    },
    {
        name: '600 - 800 nghìn',
        value: [600000, 800000]
    },
    {
        name: '800 - 1 triệu',
        value: [800000, 1000000]
    },
    {
        name: 'trên 1 triệu',
        value: [1000000, 1000000000]
    },

]
const Filter = () => {
    const { categoryData } = useSelector(state => state.category)
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState("[0,100000000]")

    const handleFilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        } else {
            all = all.filter((c) => c !== id)
        }
        setChecked(all)
    }

    const handleCheckAll = () => {
        if (checked.length === categoryData.length) {
            setChecked([])
        } else {
            const categories = categoryData.map(category => category._id)
            setChecked(categories)
        }
    }

    const dispatch = useDispatch()
    useEffect(() => {
        if (categoryData.length === 0) {
            dispatch(getCategories())
        }
    }, [])

    useEffect(() => {
        const categories = categoryData.map(category => category._id)
        setChecked(categories)
    }, [categoryData])

    useEffect(() => {
        const prices = JSON.parse(radio)
        if (checked.length || prices.length) {
            const filter = {
                checked, radio: prices
            }
            localStorage.setItem('filter', JSON.stringify(filter))
            dispatch(getProducts(filter))
        } else {
            dispatch(getProducts())
        }
    }, [checked, radio])

    return (
        <div className='Filter'>
            <div className="Filter__CheckboxGroup">
                <FormControlLabel
                    label="Tất cả"
                    control={
                        <Checkbox
                            checked={checked.length === categoryData.length}
                            value='all'
                            onChange={handleCheckAll}
                        />
                    }
                />
                {
                    categoryData?.map((category) => {
                        return (
                            <FormControlLabel
                                key={category._id}
                                label={category.name}
                                control={
                                    <Checkbox
                                        checked={checked.includes(category._id)}
                                        value={category._id}
                                        onChange={(e) => handleFilter(e.target.checked, e.target.value)}
                                    />
                                }
                            />
                        )
                    })
                }
            </div>
            <div className="Filter__radioButtonGroup">
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="use-radio-group"
                    value={radio}
                    onChange={(e) => setRadio(e.target.value)}
                >
                    {
                        prices?.map((price) => {
                            return (
                                <FormControlLabel
                                    key={price.name.toString()}
                                    value={JSON.stringify(price.value)}
                                    control={<Radio />}
                                    label={price.name}
                                />
                            )
                        })
                    }
                </RadioGroup>
            </div>
        </div>
    )
}

export default Filter

