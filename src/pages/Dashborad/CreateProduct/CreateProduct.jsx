import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFiles } from '../../../action/upload';
import { createProduct } from '../../../slice/productSlice';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Button, Form, InputField, InputFiles, ToastMessage } from './../../../components';
import useSlideDrag from './../../../hooks/useSlideDrag'; 
import { HiOutlineXMark } from 'react-icons/hi2'
import './CreateProduct.css'
const CreateProduct = ({ handleClose }) => {
    const { categoryData } = useSelector(state => state.category)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [files, setFiles] = useState()
    const [category, setCategory] = useState('')
    
    const [content, setContent] = useState({
        title: '',
        desc: '',
        cost: '',
    })
    const handleGetFiles = (e) => {
        if (e.target.files.length > 0) {
            setFiles(e.target.files)
        }
    }
    const handleChange = (e) => {
        setContent({ ...content, [e.target.name]: e.target.value })
    }
    const handleSelect = (e) => {
        setCategory(e.target.value)
    }
    const handleSubmit = async () => {
        if (!(files && files.length)) {
            alert('Please select images')
            return
        }
        const fileNames = uploadFiles(files)
        dispatch(createProduct({
            ...content,
            images: fileNames,
            categoryId: category
        }))
        setContent({
            title: '',
            desc: '',
            cost: '',
        })
        setFiles('')
        setIsOpen(true)
    }
    return (
        <div className='CreateProduct'>
            <Button className='Create_button_close' handleClick={handleClose}><HiOutlineXMark /></Button>
            <h1>Tạo mới sản phẩm</h1>
            <Form onSubmit={handleSubmit}>
                <InputField name='title' placeholder='Tên sản phẩm' value={content.title} handleChange={handleChange} required={true} />
                <InputField name='desc' placeholder='Mô tả' value={content.desc} handleChange={handleChange} required={true} />
                <InputField name='cost' placeholder='Giá' value={content.cost} handleChange={handleChange} type='number' required={true} />
                
                <FormControl sx={{minWidth: 120 }} size="small">
                    <InputLabel id="category_select">Danh mục sản phẩm</InputLabel>
                    <Select
                        labelId="category_select"
                        id="demo-simple-select"
                        value={category}
                        label="Danh mục sản phẩm" 
                        onChange={handleSelect}
                    >
                        {
                            categoryData?.map((category => <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>))
                        }
                    </Select>
                </FormControl>
                {
                    (files && files.length != 0) && <ImagePreview fileList={files} />
                }
                <InputFiles handleChange={handleGetFiles} />
                <Button type={'submit'} className='CreateProduct__btn_submit' handleClick={() => null}>Tạo</Button>
            </Form>
            <ToastMessage isOpen={isOpen} setIsOpen={setIsOpen}>Tạo mới thành công!</ToastMessage>
        </div >
    )
}
export default CreateProduct

const ImagePreview = ({ fileList }) => {
    const imagePreviews = useSlideDrag()
    return (
        <div className="ImagePreview" ref={imagePreviews}>
            {
                [...fileList].map(file => <img key={file.name} className='ImagePreview__img' src={URL.createObjectURL(file)} alt="" />)
            }
        </div>
    )
}