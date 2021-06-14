import React from "react";
import Agency from "@lespantsfancy/agency";
import WS from "@lespantsfancy/agency/lib/modules/websocket/Client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ScrollToTop from "./ScrollToTop";
import Routes from "./routes/package";

export const Context = React.createContext();

// const ws = WS.QuickSetup({
//     connect: true,
//     protocol: `ws`,
//     host: `192.168.86.200`,
//     port: 3001,
// });


const mainnet = new Agency.Event.Network({}, {
	default: {
		// "*": (msg) => console.log(`[Pre]:`, msg.type, msg.data),
		force: (msg, { setState }) => {
			setState(Math.random());
		}
    },
});
// ws.addListener(mainnet, { addToDefaultGlobal: "ws" });

const state = {
	grid: {
		origin: [ 0, 0 ],
		width: 1000,
		height: 1000,
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
};

state.canvas.width = state.grid.width;
state.canvas.height = state.grid.height;

state.screen.canvas.width = window.innerWidth;
state.screen.canvas.height = window.innerHeight;

function drawTransparencyGrid(size = 100, br = 5) {	
	const ctx = state.canvas.getContext("2d");
	for(let x = 0; x < state.grid.width; x += size) {
		for(let y = 0; y < state.grid.height; y += size) {
			if((x / size + y / size) % 2 === 0) {
				ctx.fillStyle = `#ccc`;
			} else {			
				ctx.fillStyle = `#aaa`;
			}

			ctx.fillRect(x, y, size, size);
			
			
			const text = `${ x / size },${ y / size }`;
			const textSize = ctx.measureText(text);
			
			ctx.fillStyle = "#222";
			ctx.font = "16pt Monospace";
			ctx.fillText(text, x + (size / 2) - textSize.width / 2, y + (size / 2));
		}
	}

	for(let i = 0; i < br; i++) {
		ctx.rect(i, i, state.canvas.width - 2 * i, state.canvas.height - 2 * i);
		ctx.stroke();
	}
}

// first draw
drawTransparencyGrid(100, 10);

window.addEventListener("resize", e => {
	state.screen.canvas.width = window.innerWidth;
	state.screen.canvas.height = window.innerHeight;

	drawTransparencyGrid(100, 10);
});

window.addEventListener("keydown", e => {
	if(e.code === "Space" && !!!state.config.movement.isMoving) {
		state.config.movement.isMoving = 1;
	}

	if(e.shiftKey && !state.config.scale.isScaling) {
		state.config.scale.isScaling = true;
	}

});
window.addEventListener("keyup", e => {	
	if(e.code === "Space") {
		state.config.movement.isMoving = false;
		state.config.movement.lastMove = false;
	}

	if(e.shiftKey) {
		state.config.scale.isScaling = false;
	}
});

window.addEventListener("mousewheel", e => {
	if(state.config.scale.isScaling) {
		const oldScale = state.config.scale.scale;

		if(e.deltaY < 0) {
			state.config.scale.scale -= 0.25;
		} else if(e.deltaY > 0) {
			state.config.scale.scale += 0.25;
		}
	
		if(state.config.scale.scale !== oldScale) {
			drawTransparencyGrid(100, 10);
		}

		mainnet.message("force");
	}
});

state.screen.canvas.addEventListener("mousedown", e => {
	if(state.config.movement.isMoving === 1) {
		state.config.movement.isMoving = 2;
	}
});
state.screen.canvas.addEventListener("mousemove", e => {
	if(state.config.movement.isMoving === 2) {
		const [ px, py ] = state.config.movement.lastMove || [ e.clientX, e.clientY ];
		const [ dx, dy ] = [ px - e.clientX, py - e.clientY ];

		
		const [ ox, oy ] = state.grid.offset;
		state.grid.offset = [ ox + dx, oy + dy ];

		state.config.movement.lastMove = [ e.clientX, e.clientY ];

		mainnet.message("force");
	}

	if(e.clientX < 0 || e.clientY < 0 || e.clientX > window.innerWidth || e.clientY > window.innerHeight) {
		if(state.config.movement.isMoving === 2) {
			state.config.movement.isMoving = 1;
			state.config.movement.lastMove = false;
		} else {
			state.config.movement.isMoving = false;
		}
	}
});
state.screen.canvas.addEventListener("mouseup", e => {
	if(state.config.movement.isMoving === 2) {
		state.config.movement.isMoving = 1;
		state.config.movement.lastMove = false;
	} else {
		state.config.movement.isMoving = false;
	}

	state.config.movement.lastMove = false;

	mainnet.message("force");
});

export function App() {		
	return (
        <Context.Provider value={{
			network: mainnet,
			state: state,
		}}>
            <Router>
				<ScrollToTop>
					<Switch>
						<Route path={ `/` }>
							<Routes.Default />
						</Route>
					</Switch>
				</ScrollToTop>
            </Router>
        </Context.Provider>
	);
};

export default App;