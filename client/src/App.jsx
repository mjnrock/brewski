import React from "react";
import Agency from "@lespantsfancy/agency";
import WS from "@lespantsfancy/agency/lib/modules/websocket/Client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ScrollToTop from "./ScrollToTop";
import Routes from "./routes/package";

import stateObj from "./TestStateObj.js"

export const Context = React.createContext();

export function App() {		
	return (
        <Context.Provider value={ stateObj }>
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