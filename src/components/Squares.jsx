import { useRef, useEffect } from "react";

const Squares = ({
    borderColor = "#999",
    squareSize = 40,
    resetTrigger = false, // New prop to control when to reset animation
}) => {
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
    const numSquaresX = useRef(0);
    const numSquaresY = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        // Resize the canvas when window is resized
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
            numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const drawGrid = () => {
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let x = 0; x < canvas.width; x += squareSize) {
                for (let y = 0; y < canvas.height; y += squareSize) {
                    ctx.strokeStyle = borderColor;
                    ctx.strokeRect(x, y, squareSize, squareSize);
                }
            }

            // Draw a background gradient
            const gradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2,
            );
            gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
            gradient.addColorStop(1, "#060606");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        // Update grid by continuously calling the drawGrid function
        const updateAnimation = () => {
            drawGrid();
            requestRef.current = requestAnimationFrame(updateAnimation);
        };

        // Start the animation
        requestRef.current = requestAnimationFrame(updateAnimation);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [borderColor, squareSize, resetTrigger]); // Depend on resetTrigger prop to trigger reset

    return (
        <canvas
            ref={canvasRef}
            className="z-0 w-full h-full border-none block absolute top-0 left-0 bg-[#1c1c1c]"
        ></canvas>
    );
};

export default Squares;