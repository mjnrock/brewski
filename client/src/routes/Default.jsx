import React, { useState } from "react";
import { useContextNetwork } from "@lespantsfancy/agency/lib/modules/react/useNetwork";

import { Context } from "./../App";

export function Default() {
    const { state, dispatch } = useContextNetwork(Context, "network");
	const threshold = 1000;

	const [ lastEvent, setLastEvent ] = useState(0);
	const [ events, setEvents ] = useState([]);

	function updateEvents(e) {
		const now = Date.now();

		if(now - lastEvent > threshold) {
			setEvents([ e ]);
		} else {
			setEvents([
				...events,
				e,
			]);
		}
		
		setLastEvent(now);

		dispatch("event", e);
	}

	function onMouseDown(e) {
		updateEvents(e);
	};
	function onMouseUp(e) {		
		updateEvents(e);
	};
	function onMouseMove(e) {
		updateEvents(e);
	};
	function onMouseCancel(e) {
		updateEvents(e);
	};
	function onMouseEnter(e) {
		updateEvents(e);
	};
	function onMouseLeave(e) {
		updateEvents(e);
	};
	function onDragStart(e) {
		updateEvents(e);
	};
	function onDragEnd(e) {
		updateEvents(e);
	};
	function onClick(e) {
		updateEvents(e);
	};
	function onDoubleClick(e) {		
		updateEvents(e);
	};
	function onContextMenu(e) {
		e.preventDefault();
		
		updateEvents(e);
	};
	function onGotMouseCapture(e) {
		updateEvents(e);
	};
	function onLostMouseCapture(e) {		
		updateEvents(e);
	};

	function onEvent(e) {		
		updateEvents(e);
	};

    return (
		<>
			<div className="grid grid-cols-1 ml-20 mr-20 bg-gray-300">
				<div
					className="min-h-screen bg-gray-400 border border-gray-900 ring"
					onMouseDown={ onMouseDown }
					onMouseUp={ onMouseUp }
					onContextMenu={ onContextMenu }
					// onMouseMove={ onMouseMove }
					// onMouseCancel={ onMouseCancel }
					// onMouseEnter={ onMouseEnter }
					// onMouseLeave={ onMouseLeave }
					// onDragStart={ onDragStart }
					// onDragEnd={ onDragEnd }
					onClick={ onClick }
					onDoubleClick={ onDoubleClick }
					onTouchStart={ onEvent }
					onTouchEnd={ onEvent }
					// onGotMouseCapture={ onGotMouseCapture }
					// onLostMouseCapture={ onLostMouseCapture }
				>
					{
						events.length ? (				
							events.map(e => {
								return (
									<div key={ `${ e.type }${ e.timeStamp }` } className="grid grid-cols-6 gap-4 mt-24 text-xs text-center">
										{						
											Object.entries(e).map(([ k, v ]) => {
												if(typeof v === "object" || typeof v === "function") {
													return null;
												}
												
												return (
													<div key={ k } className="border border-gray-600">
														<div className="font-bold">{ k }</div>
														<div>{ v.toString() }</div>
													</div>
												);
											})
										}
									</div>
								);
							})
						) : null
					}
				</div>
			</div>
		</>
    );
};

export default Default;



// {
// 	events.length ? (				
// 		events.map(e => {
// 			return (
// 				<div class="grid gap-4 grid-cols-6 mt-24 text-center">
// 					{						
// 						Object.entries(e).map(([ k, v ]) => {
// 							if(typeof v === "object" || typeof v === "function") {
// 								return null;
// 							}
							
// 							return (
// 								<div key={ k } className="border border-gray-600">
// 									<div className="font-bold">{ k }</div>
// 									<div>{ v.toString() }</div>
// 								</div>
// 							);
// 						})
// 					}
// 				</div>
// 			);
// 		})
// 	) : null
// }