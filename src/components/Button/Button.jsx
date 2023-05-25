import './Button.css'
const Button = ({ children, handleClick = () => null, className, type }) => {
    const onClick = (e) => {
        handleClick()
        const span = document.createElement('span');
        span.classList.add('clicked')
        span.style.top = e.clientY - e.currentTarget.getBoundingClientRect().top + 'px'
        span.style.left = e.clientX - e.currentTarget.getBoundingClientRect().left + 'px'
        e.currentTarget.appendChild(span)
    }
    return (
        <button type={type || 'button'} className={`button ${className}`} onClick={onClick}>{children}</button>
    )
}

export default Button