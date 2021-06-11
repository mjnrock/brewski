import React from "react";
import Agency from "@lespantsfancy/agency";
import WS from "@lespantsfancy/agency/lib/modules/websocket/Client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Routes from "./routes/package";

export const Context = React.createContext();

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

const ws = WS.QuickSetup({
    connect: true,
    protocol: `ws`,
    host: `192.168.86.200`,
    port: 3001,
});

const mainnet = new Agency.Event.Network({}, {
    default: {
		// "*": (msg) => console.log(`[Pre]:`, msg.type, msg.data),
		motion: function(msg, { network }) {
			console.log(`[Motion]:`, msg.type, msg.data);

			network.state = msg.data;
		},
		orientation: function(msg, { network }) {
			console.log(`[Orientation]:`, msg.type, msg.data);
            
            network.state = msg.data;
		},
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