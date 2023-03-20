export const Header = ({clearCanvas}) => {
    return (
        <>
            <h1>Pizarra</h1>
            <button onClick={clearCanvas}>
                Reiniciar
            </button>
        </>
    );
}