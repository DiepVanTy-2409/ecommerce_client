import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material'
import { getCategories } from '../../slice/categorySlice'
import './Filter.css'
const prices = [
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
        value: [1000000]
    },

]
const Filter = () => {
    const { categoryData } = useSelector(state => state.category)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategories())
    }, [])
    return (
        <div className='Filter'>
            <div className="Filter__CheckboxGroup">
                {/* <FormControlLabel
                    label="Tất cả"
                    control={
                        <Checkbox
                            checked = {true}
                            value='all'
                        />
                    }
                /> */}
                {
                    categoryData?.map(category => {
                        return (
                            <FormControlLabel
                                key={category._id}
                                label={category.name}
                                control={
                                    <Checkbox
                                        value={category._id}
                                        // onChange={handleChangeCategory}
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
                    defaultValue='all'
                >
                    <FormControlLabel
                        value="all"
                        control={<Radio />}
                        label="Tất cả"
                    />
                    {
                        prices?.map(price => {
                            return (
                                <FormControlLabel
                                    key={price.name.toString()}
                                    value={price.value.toString()}
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

