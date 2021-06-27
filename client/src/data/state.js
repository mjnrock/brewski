import Agency from "@lespantsfancy/agency";
import Node from "./../lib/Node";


const node = new Node({
	grid: {
		origin: [ 0, 0 ],
		width: 10000,
		height: 10000,
		offset: [ 0, 0 ],
	},
	canvas: document.createElement("canvas"),
	screen: {
		canvas: document.createElement("canvas"),
	},
	
	config: {
		movement: {
			isMoving: false,
			lastMove: false,
		},
		scale: {
			isScaling: false,
			scale: 1.0,
		},
	},
});
export default {
	network: mainnet,
	node: node,
};