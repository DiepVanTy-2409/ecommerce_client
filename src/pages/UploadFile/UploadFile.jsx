import axios from "axios";
import { useRef, useState } from "react";

const UploadFile = () => {
    const [files, setFiles] = useState()
    const imagesRef = useRef()
    const handleChangeFiles = (e) => {
        setFiles(e.target.files)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // let formData = new FormData(e.target);
        let formData = new FormData();
        for (let file of imagesRef.current.files) {
            let fileName = Date.now() + Math.round(Math.random() * 100) + '.' + file.name.split('.').pop()
            let newFile = new File([file], fileName)
            formData.append('images[]', newFile)
        }
        try {
            const { data } = await axios.post(`http://localhost:5000/upload`, formData)
            // const product = await axios.post(`http://localhost:5000/product/create`, {
            //     title: 'Gaming Headphones',
            //     images: data
            // })
            // console.log(product);
            console.log(data);
            setFiles('')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input ref={imagesRef} type="file" multiple name="images" accept="image/*" onChange={handleChangeFiles} />
                <button type="submit">UPLOAD</button>
            </form>
        </div>
    )
}

export default UploadFile