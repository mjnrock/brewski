export const InputMouse = {
	Flag: 1 << 1,
	Signal: {
		AUX_CLICK: "InputMouse:AuxiliaryClick",
		CLICK: "InputMouse:Click",
		CONTEXT_MENU: "InputMouse:ContextMenu",
		DBL_CLICK: "InputMouse:DoubleClick",
		MOUSE_DOWN: "InputMouse:MouseDown",
		MOUSE_ENTER: "InputMouse:MouseEnter",
		MOUSE_LEAVE: "InputMouse:MouseLeave",
		MOUSE_MOVE: "InputMouse:MouseMove",
		MOUSE_OUT: "InputMouse:MouseOut",
		MOUSE_OVER: "InputMouse:MouseOver",
		MOUSE_UP: "InputMouse:MouseUp",
	},
	Events: [
		"auxclick",
		"click",
		"contextmenu",
		"dblclick",
		"mousedown",
		"mouseenter",
		"mouseleave",
		"mousemove",
		"mouseout",
		"mouseover",
		"mouseup",
	],
	EventMap: new Map(),
};
Object.keys(InputMouse.Signal).forEach((key, i) => {
	InputMouse.EventMap.set(InputMouse.Events[ i ], key);
	InputMouse.EventMap.set(key, InputMouse.Events[ i ]);
});

export default InputMouse;