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
	},
};

state.canvas.width = state.grid.width;
state.canvas.height = state.grid.height;

state.screen.canvas.width = window.innerWidth;
state.screen.canvas.height = window.innerHeight;

window.addEventListener("resize", e => {
	state.screen.canvas.width = window.innerWidth;
	state.screen.canvas.height = window.innerHeight;
	
	const ctx = state.canvas.getContext("2d");
	for(let x = 0; x < state.grid.width; x += 100) {
		for(let y = 0; y < state.grid.height; y += 100) {
			if((x / 100 + y / 100) % 2 === 0) {
				ctx.fillStyle = `#ccc`;
			} else {			
				ctx.fillStyle = `#aaa`;
			}

			ctx.fillRect(x, y, 100, 100);


			const text = `${ x / 100 },${ y / 100 }`;
			const size = ctx.measureText(text);

			ctx.fillStyle = "#222";
			ctx.font = "16pt Monospace";
			ctx.fillText(text, x + 50 - size.width / 2, y + 50);
		}
	}
});

window.addEventListener("keydown", e => {
	if(e.code === "Space" && !!!state.config.movement.isMoving) {
		state.config.movement.isMoving = 1;
	}
});
window.addEventListener("keyup", e => {
	if(e.code === "Space") {
		state.config.movement.isMoving = false;
		state.config.movement.lastMove = false;
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
		console.log(ox, oy, dx, dy)

		mainnet.message("force");
	}
});
state.screen.canvas.addEventListener("mouseup", e => {
	if(state.config.movement.isMoving === 2) {
		state.config.movement.isMoving = 1;
	} else {
		state.config.movement.isMoving = false;
	}

	state.config.movement.lastMove = false;
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