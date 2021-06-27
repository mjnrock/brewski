import Network from "@lespantsfancy/agency/lib/event/Network";
// import Network from "../event/Network";

export class Node extends Network {
	constructor(state = {}, modify = {}) {
		super(state, modify);

		this.modify({
			default: {
				$globals: {
					node: this,
				}
			},
		});
	}
};

export class Component {
	constructor(type, state = {}, fns = {}) {
		for(let [ name, fn ] of Object.entries(fns)) {
			this[ name ] = fn;
		}

		this.type = type;
		this.state = state;
	}
}

export default Node;