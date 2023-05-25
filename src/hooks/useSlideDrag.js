import React from 'react'

const useSlideDrag = () => {
    const ref = React.useRef()
    React.useEffect(() => {
        if (!ref.current) return
        let startX, scrollLeft, isDown = false
        ref.current.style.userSelect = "none";
        const start = e => {
            isDown = true
            ref.current.style.cursor = 'grab'
            startX = e.pageX || e.touches[0].pageX - slider.offsetLeft
            scrollLeft = ref.current.scrollLeft
        }
        const end = () => {
            isDown = false
            ref.current.style.cursor = 'pointer'
        }
        const moving = (e) => {
            if (!isDown) return
            e.preventDefault()
            let x = e.pageX || e.touches[0].pageX - slider.offsetLeft
            let dist = x - startX
            ref.current.scrollLeft = scrollLeft - dist
        }
        ref.current.addEventListener('mousedown', start)
        ref.current.addEventListener('touchstart', start)
        ref.current.addEventListener('mousemove', moving)
        ref.current.addEventListener('touchmove', moving)
        ref.current.addEventListener('mouseup', end)
        ref.current.addEventListener('mouseleave', end)
        ref.current.addEventListener('touchend', end)
        // return () => {
        //     ref.current.removeEventListener('mousedown', start)
        //     ref.current.removeEventListener('mousemove', moving)
        //     ref.current.removeEventListener('mouseup', end)
        //     ref.current.removeEventListener('mouseleave', end)
        // }
        //! ERROR MOUSEUP EVENT IN FIRE
    }, [])
    return ref
}

export default useSlideDrag