import Agency from "@lespantsfancy/agency";

export class InputNetwork extends Agency.Event.Network {
	constructor(state = {}, modify = {}, target, inputObject) {
		super(state, modify);

		this.target = target;
		this.mask = 0;

		if(Array.isArray(inputObject)) {
			this._bind(InputNetwork.MergeInputObjects(...inputObject));
		} else {
			this._bind(inputObject);
		}
	}

	_bind(inputObject) {
		const signals = Object.keys(inputObject.Signal);
		for(let [ type, std ] of inputObject.EventMap.entries()) {
			if(!signals.includes(type)) {
				if(this.target instanceof HTMLElement) {
					this.target[ `on${ type }` ] = (...args) => this.message(inputObject.Signal[ std ], ...args);
				} else {
					this.target.addEventListener(type, (...args) => this.message(inputObject.Signal[ std ], ...args));
				}
			}
		}


		this.mask = inputObject.Flag;
	}

	static MergeInputObjects(...inputObjects) {
		const obj = {
			Flag: 0,
			Signal: {},
			Events: [],
			EventMap: new Map(),
		};
	
		for(let inputObject of inputObjects) {
			for(let [ key, value ] of Object.entries(inputObject)) {
				if(value instanceof Map) {
					obj[ key ] = new Map([ ...obj[ key ], ...value ]);
				} else if(typeof value === "object") {
					obj[ key ] = {
						...(obj[ key ] || {}),
						...value,
					}
				} else {
					obj[ key ] = Agency.Util.Bitwise.add(obj[ key ], value);
				}
			}
		}
	
		return obj;
	}

	static QuickSetup(target, inputObject, modify = {}, state = {}) {
		return new InputNetwork({
			...state,
		}, {
			default: {
				"**": (msg, { broadcast }) => {
					broadcast(msg);
				},
			},
			...modify,
		}, target, inputObject);
	};
};

export default InputNetwork;