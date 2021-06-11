import React from "react";
import Agency from "@lespantsfancy/agency";
import WS from "@lespantsfancy/agency/lib/modules/websocket/Client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Routes from "./routes/package";

import InputNetwork from "./lib/InputNetwork";
import InputMouse from "./lib/InputMouse";
import InputTouch from "./lib/InputTouch";

export const Context = React.createContext();

const ws = WS.QuickSetup({
    connect: true,

    // url: `ws://localhost:3001`,
    protocol: `ws`,
    host: `localhost`,
    port: 3001,
});

const inputnet = InputNetwork.QuickSetup(window, [ InputMouse, InputTouch ]);

const mainnet = new Agency.Event.Network({}, {
    default: {
		// "*": (msg) => console.log(`[Pre]:`, msg.type, msg.data),
		[ InputMouse.Signal.CLICK ]: (msg) => console.log(`[CLICK]:`, msg.type, msg.data),
        event: function(msg, { ws }) {
			const [ e ] = msg.data;

            ws.sendToServer("event", eventPacker(e));
        },
        update: function(msg, { network }) {
            const [ state ] = msg.data;
            
            network.state = {
                ...network.state,
                history: state,
            };
        },
    },
});
ws.addListener(mainnet, { addToDefaultGlobal: "ws" });
inputnet.addListener(mainnet, { addToDefaultGlobal: "inputnet" });


export function eventPacker(e) {
	switch(e.type) {
		default:
			return {
				type: e.type,
				x: e.clientX,
				y: e.clientY,
				timeStamp: Date.now(),
			}
	};
};

// const listener = mainnet.addListener();
// console.log(listener)


export function App() {		
	return (
        <Context.Provider value={{ network: mainnet }}>
            <Router>
                <Switch>
                    <Route path={ `/` }>
                        <Routes.Default />
                    </Route>
                </Switch>
            </Router>
        </Context.Provider>
	);
};

export default App;