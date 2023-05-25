import { useEffect, useRef } from "react";
const useCickOutside = (callback, exceptElement) => {
    const ref = useRef()
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target) && !exceptElement.contains(e.target)) {
                callback()
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [ref, exceptElement])
    return ref
}

export default useCickOutside