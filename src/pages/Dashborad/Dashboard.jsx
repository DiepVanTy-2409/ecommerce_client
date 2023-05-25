import { useDispatch } from "react-redux"
import CreateProduct from "./CreateProduct/CreateProduct"
import ViewProduct from "./ViewProduct/ViewProduct"
import { useEffect, useState } from "react"
import { getProducts } from "../../slice/productSlice"
import { getCategories } from "../../slice/categorySlice"
import { IoCreateOutline } from 'react-icons/io5'
import { Button } from '../../components'
import './Dashboard.css'
import { Modal } from "@mui/material"
const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getCategories())
  }, [])
  return (
    <div className="Dashboard">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <CreateProduct handleClose={() => setOpen(false)} />
      </Modal>
      {/* {open && <CreateProduct handleClose={() => setOpen(false)}/>} */}
      <Button className='Dashboard_create_btn' handleClick={() => setOpen(true)}>
        Tạo mới <IoCreateOutline color="white" size='1.5rem' />
      </Button>
      <ViewProduct />
    </div>
  )
}

export default Dashboard