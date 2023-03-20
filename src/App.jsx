import {Fragment, useEffect, useRef, useState} from 'react'
import {Header} from "./Header";

function App() {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 2
        canvas.height = (window.innerHeight) * 2
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${(window.innerHeight)}px`

        const ctx = canvas.getContext('2d')
        ctx.scale(2, 2)
        ctx.lineCap = 'round'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 5

        contextRef.current = ctx

    }, [])
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
        const {offsetX, offsetY} = nativeEvent
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }
    const clearCanvas = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    return (<Fragment>
        <Header clearCanvas={clearCanvas}/>
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
