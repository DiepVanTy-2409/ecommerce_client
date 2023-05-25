import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, InputField, Button } from '../../components';
import { useDispatch } from 'react-redux';
import { login, register } from '../../slice/authSlice';
import './Auth.css'

export const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState({
        userName: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSunmit = () => {
        dispatch(register(data))
    }

    return (
        <div className="AuthPage">
            <h1>Đăng ký</h1>
            <Form className='Form-register' onSubmit={handleSunmit}>
                <InputField name='userName' placeholder='Ho và tên' value={data.userName} handleChange={handleChange} required={true} />
                <InputField type='email' name='email' placeholder='Email' value={data.email} handleChange={handleChange} required={true} />
                <InputField type='password' name='password' placeholder='Mật khẩu' value={data.password} handleChange={handleChange} required={true} />
                <InputField type='number' name='phone' placeholder='Số điện thoại' value={data.phone} handleChange={handleChange} required={true} />
                <InputField name='address' placeholder='Địa chỉ' value={data.address} handleChange={handleChange} required={true} />
                <Button handleClick={() => navigate('../login')}>Đã có tài khoản</Button>
                <Button type='submit' >Đăng ký</Button>
            </Form>
        </div>

    )
}


export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSunmit = () => {
        dispatch(login(data))
    }

    return (
        <div className="AuthPage">
            <h1>Đăng nhập</h1>
            <Form className='Form-login' onSubmit={handleSunmit}>
                <InputField type='email' name='email' placeholder='Email' value={data.email} handleChange={handleChange} required={true} />
                <InputField type='password' name='password' placeholder='Mật khẩu' value={data.password} handleChange={handleChange} required={true} />
                <div className="buttons">
                    <Button handleClick={() => navigate('../register')}>Chưa có tài khoản</Button>
                    <Button type='submit' >Đăng nhập</Button>
                </div>
            </Form>
        </div>

    )
}