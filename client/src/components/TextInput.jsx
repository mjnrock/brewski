import { useEffect, useState } from "react";
import VirtualCanvas, { createCanvas } from "./VirtualCanvas";

export function TextInput({ ...rest }) {
	const [ canvas, setCanvas ] = useState(createCanvas(600, 150));
	const [ state, setState ] = useState({
		isSelecting: false,
		selected: "",
	});
	const ctx = canvas.getContext("2d");
	

	const text = `This is some text`;
	const fontSize = 15;

	const textWidth = ctx.measureText(text).width;
	const fontHeight = fontSize;

	
	useEffect(() => {
		console.log(JSON.stringify(state, null, 2))
	}, [ state ]);

	useEffect(() => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if(state.isSelecting) {
			ctx.fillStyle = `rgb(97, 144, 181)`;
			ctx.fillRect(...state.isSelecting, state.selected.length / text.length * textWidth, fontSize);
		}

		ctx.fillStyle = `#000`;
	
		ctx.font = `${ fontSize }px sans-serif`;
		ctx.fillText(text, 100, 100);
	}, [ ctx, fontSize, text, canvas, state ]);

	const box = {
		left: 100,
		right: 100 + textWidth,
		top: 100,
		bottom: 100 + fontHeight,
	};
	
	canvas.onmousedown = e => {
		const { x, y } = e;

		if(!state.isSelecting) {
			setState({
				...state,
				isSelecting: [ x, y ],
			});
		}
	};
	canvas.onmousemove = e => {
		const { x, y } = e;

		if(
			(x >= box.left
			&& x <= box.right
			&& y >= box.top
			&& y <= box.bottom)
			|| state.isSelecting
		) {
			canvas.style.cursor = "text";
		} else {
			canvas.style.cursor = "default";
		}

		if(state.isSelecting) {
			const [ ox, oy ] = state.isSelecting;
			const [ dx, dy ] = [ x - ox, y - oy ];
			const pox = (ox - box.left) / textWidth;
			const px = (x - box.left) / textWidth;
			
			console.log(ox, box.left, textWidth)
			console.log(pox, px)
			
			const il = Math.ceil(Math.max(0, text.length * Math.min(1, pox)));
			const ir = Math.ceil(Math.max(0, text.length * Math.min(1, px)));
			let selected = text.slice(il, ir - il);
			console.log(selected)

			setState({
				...state,
				selected,
			});
		}
	};
	canvas.onmouseup = e => {
		const { x, y } = e;

		if(state.isSelecting) {
			setState({
				...state,
				isSelecting: false,
			});
		}
	};

	return <VirtualCanvas
		canvas={ canvas }
		style={{
			border: "5px solid #000"
		}}
		{ ...rest }
	/>;
}

export default TextInput;