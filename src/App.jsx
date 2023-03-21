import {Fragment, useEffect, useRef, useState} from 'react'
import {Header} from "./Header";

function App() {
    const [color, setColor] = useState('#000000');

    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    let canvas = canvasRef.current
    useEffect(() => {
        canvas = canvasRef.current
        canvas.width = window.innerWidth * 2
        canvas.height = (window.innerHeight) * 2
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${(window.innerHeight)}px`

        const ctx = canvas.getContext('2d')
        ctx.scale(2, 2)
        ctx.lineCap = 'round'
        ctx.lineWidth = 5
        contextRef.current = ctx

    }, [])
    useEffect(() => {
        const ctx = canvas.getContext('2d')

        ctx.strokeStyle = color

    }, [color])
    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)


    }
    const finishDrawing = () => {
        contextRef.current.closePath()

        setIsDrawing(false)
    }
    const draw = ({nativeEvent}) => {
        if (!isDrawing) {
            return
        }
        if (nativeEvent.touches) { // mobile
            const {clientX, clientY} = nativeEvent.touches[0];
            contextRef.current.lineTo(clientX, clientY)
            contextRef.current.stroke();
        } else { // desktop
            const {offsetX, offsetY} = nativeEvent;
            contextRef.current.lineTo(offsetX, offsetY);

            contextRef.current.stroke();
        }
    }
    const clearCanvas = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    const handleChangeColor = (event) => {
        setColor(event.target.value);
    }

    return (<Fragment>
        <Header clearCanvas={clearCanvas}/>
        <input style={{position: "absolute", bottom: 10}} type="color" value={color} onChange={handleChangeColor}/>

        <canvas
            className={'canvas'}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={finishDrawing}
            onTouchMove={draw}
            ref={canvasRef}
        >

        </canvas>

    </Fragment>)
}

export default App
