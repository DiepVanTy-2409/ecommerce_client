import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { isAdmin as checkAdmin } from '../../../api/AuthRequest';
import './PrivateRoute.css'
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const { userData } = useSelector(state => state.user)
    const [isAdmin, setIsAdmin] = useState()

    axios.defaults.headers.common['Authorization'] = userData?.token

    useEffect(() => {
        const check = async () => {
            const { data } = await checkAdmin()
            setIsAdmin(data)
        }
        if (userData?.token) {
            check()
        }
    }, [userData?.token])
    return (
        <Fragment>
            {
                isAdmin === true ? <Outlet /> : <p className="warning__message">Bạn không có quyền truy cập địa chỉ này</p> 
            }
        </Fragment>
    )
}

export default PrivateRoute