import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ScrollToTop from "./ScrollToTop";
import Routes from "./routes/package";

import stateObj from "./data/state";

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