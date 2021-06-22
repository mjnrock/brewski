import React, { useEffect, useRef } from "react";

export function createCanvas(width, height) {
	const canvas = document.createElement("canvas");

	if(canvas.width !== width || canvas.height !== height) {
		canvas.width = width || canvas.width;
		canvas.height = height || canvas.height;
	}

	return canvas;
}

export function VirtualCanvas({ canvas, width, height, style = {}, ...rest }) {
    const container = useRef(null);

    useEffect(() => {
		let localCanvas = canvas;
		if(!(localCanvas instanceof HTMLCanvasElement)) {
			localCanvas = document.createElement("canvas");
		}

		if(localCanvas.parentNode !== container) {
			if(localCanvas.parentNode) {
				localCanvas.parentNode.removeChild(localCanvas);
			}

			
			container.current.innerHTML = "";
			container.current.appendChild(localCanvas);
		}

		if(localCanvas.width !== width || localCanvas.height !== height) {
			localCanvas.width = width || localCanvas.width;
			localCanvas.height = height || localCanvas.height;
		}
    }, [ container, canvas, height, width ]);

	let size = {};
	if(width && height) {
		size = {
			width,
			height,
		};
	} else {
		size = {
			width: canvas.width,
			height: canvas.height,
		};
	}

    return (
        <div
            className="unset-all"
            ref={ container }
			style={{
				...size,
				...style,
			}}
			{ ...rest }
        />
    )
}

export default VirtualCanvas;