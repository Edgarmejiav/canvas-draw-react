export const Header = ({clearCanvas}) => {
    return (
        <div className="header">
            <h1>Pizarra</h1>
            <button onClick={clearCanvas}>
                Borrar
            </button>
        </div>
    );
}