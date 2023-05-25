import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFiles } from '../../../action/upload';
import { updateProduct } from '../../../slice/productSlice';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Button, Form, InputField, InputFiles, ToastMessage } from './../../../components';
import useSlideDrag from './../../../hooks/useSlideDrag';
import { HiOutlineXMark } from 'react-icons/hi2'
import '../CreateProduct/CreateProduct.css'
const UpdateProduct = ({ handleClose, _id, categoryId, title, desc, cost, images }) => {
    const { categoryData } = useSelector(state => state.category)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [files, setFiles] = useState()
    const [category, setCategory] = useState(categoryId)
    const [content, setContent] = useState({
        title: title,
        desc: desc,
        cost: cost,
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
        const newData = {
            _id: _id,
            ...content,
            categoryId: category
        }
        if (files && files.length) {
            const fileNames = uploadFiles(files)
            newData.images = fileNames
        }
        dispatch(updateProduct(newData))
        setIsOpen(true)
    }
    return (
        <div className='CreateProduct'>
            <Button className='Create_button_close' handleClick={handleClose}><HiOutlineXMark /></Button>
            <h1>Cập nhật sản phẩm</h1>
            <Form onSubmit={handleSubmit}>
                <InputField name='title' placeholder='Tên sản phẩm' value={content.title} handleChange={handleChange} required={true} />
                <InputField name='desc' placeholder='Mô tả' value={content.desc} handleChange={handleChange} required={true} />
                <InputField name='cost' placeholder='Giá' value={content.cost} handleChange={handleChange} type='number' required={true} />
                
                <FormControl sx={{ minWidth: 120 }} size="small">
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
                <Button type={'submit'} className='CreateProduct__btn_submit' handleClick={() => null}>Cập nhật</Button>
            </Form>
            <ToastMessage isOpen={isOpen} setIsOpen={setIsOpen}>Cập nhật thành công!</ToastMessage>
        </div >
    )
}
export default UpdateProduct

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