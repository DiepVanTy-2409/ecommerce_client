import { AiOutlinePaperClip } from 'react-icons/ai'
import { Button } from '../'
import './Form.css'
import { useRef } from 'react'
const Form = ({ children, onSubmit, className }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit()
    }
    return (
        <form onSubmit={handleSubmit} className={`Form ${className}`} >
            {children}
        </form >
    )
}

export default Form

export const InputField = ({ type, value, handleChange, name, placeholder, required }) => {
    return (
        <input
            required={required || false}
            className='InputField'
            name={name}
            type={type || "text"}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
        />
    )
}

export const InputFiles = ({ handleChange }) => {
    const inputFilesRef = useRef()
    return (
        <>
            <Button type='button' className='InputFiles__button_add_file' handleClick={() => inputFilesRef.current.click()}>
                Tải hình ảnh<AiOutlinePaperClip fontSize={'1.3rem'} />
            </Button>
            <input
                ref={inputFilesRef}
                // required
                className='InputFiles'
                name='images'
                type="file"
                accept='image/*'
                onChange={handleChange}
                multiple
            />
        </>
    )
}