export const Celda = ({ children, index, handleClick, disabled }) => {

    const checkClick = () => {
        handleClick(index)
    }

    return (
        <button className="celda" onClick={checkClick} disabled={disabled}>
            {children}
        </button>
    );
}