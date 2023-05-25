import axios from "axios";
export const uploadFiles = (FileList) => {
    if (!FileList) return []
    const fileNames = []
    let formData = new FormData();
    for (let file of FileList) {
        let fileName = Date.now() + Math.round(Math.random() * 100) + '.' + file.name.split('.').pop()
        fileNames.push(fileName)
        let newFile = new File([file], fileName)
        formData.append('images[]', newFile)
    }
    try {
        axios.post(import.meta.env.VITE_UPLOAD, formData)
    } catch (error) {
        console.log(error)
    }
    console.log(fileNames);
    return fileNames
}