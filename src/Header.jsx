export const Header = ({clearCanvas}) => {
    return (
        <div>
        <h1>Demo canvas para dibujar</h1>
            <button onClick={clearCanvas}>
                Reiniciar
            </button>
        </div>
    );
}