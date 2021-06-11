export const InputTouch = {
	Flag: 1 << 2,
	Signal: {
		CANCEL: "InputTouch:TouchCancel",
		END: "InputTouch:TouchEnd",
		MOVE: "InputTouch:TouchMove",
		START: "InputTouch:TouchStart",
	},
	Events: [
		"touchcancel",
		"touchend",
		"touchmove",
		"touchstart",
	],
	EventMap: new Map(),
};
Object.keys(InputTouch.Signal).forEach((key, i) => {
	InputTouch.EventMap.set(InputTouch.Events[ i ], key);
	InputTouch.EventMap.set(key, InputTouch.Events[ i ]);
});

export default InputTouch;