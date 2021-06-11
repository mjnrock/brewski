import React, { useState } from "react";
import { useContextNetwork } from "@lespantsfancy/agency/lib/modules/react/useNetwork";

import { Context } from "./../App";

export function Default() {
	const { state, dispatch } = useContextNetwork(Context, "network");
	const threshold = 1000;

	const [lastEvent, setLastEvent] = useState(0);
	const [events, setEvents] = useState([]);

	function updateEvents(e) {
		const now = Date.now();

		if (now - lastEvent > threshold) {
			setEvents([e]);
		} else {
			setEvents([...events, e]);
		}

		setLastEvent(now);

		dispatch("event", e);
	}

	return (
		<div>
			<button
				onClick={e => {
					setEvents([ DeviceMotionEvent, DeviceOrientationEvent ])
					if (typeof DeviceMotionEvent.requestPermission === "function") {
						DeviceMotionEvent.requestPermission()
						.then(permissionState => {
							if (permissionState === "granted") {
								window.addEventListener("devicemotion", e => {
									setEvents([
										Object.fromEntries(Object.entries(e.acceleration).map(([ k, v ]) => [ k, +v.toFixed(1) ])),
										Object.fromEntries(Object.entries(e.rotationRate).map(([ k, v ]) => [ k, ~~v ])),
									])
								});
								
								// // in the alpha-beta-gamma axes (units in degrees)
								// window.addEventListener("deviceorientation", e => {
								// 	setEvents([
								// 		~~e.alpha,
								// 		~~e.beta,
								// 		~~e.gamma,
								// 	])
								// });
								}
							})
							.catch(console.error);
					}
				}}
			>
				Activate
			</button>
			{JSON.stringify(state)}
			<hr />
			{JSON.stringify(events, null, 2)}
		</div>
	);
	return (
		<>
			<div className="grid grid-cols-1 ml-20 mr-20 bg-gray-300">
				<div
					className="min-h-screen bg-gray-400 border border-gray-900 ring"
					onMouseDown={updateEvents}
					onMouseUp={updateEvents}
					onContextMenu={e => {
						e.preventDefault();
						updateEvents(e);
					}}
					// onMouseMove={ updateEvents }
					onClick={updateEvents}
				>
					{events.length
						? events.map(e => {
								return (
									<div
										key={`${e.type}${e.timeStamp}`}
										className="grid grid-cols-6 gap-4 mt-24 text-xs text-center"
									>
										{Object.entries(e).map(([k, v]) => {
											if (
												typeof v === "object" ||
												typeof v === "function"
											) {
												return null;
											}

											return (
												<div
													key={k}
													className="border border-gray-600"
												>
													<div className="font-bold">
														{k}
													</div>
													<div>{v.toString()}</div>
												</div>
											);
										})}
									</div>
								);
						  })
						: null}
				</div>
			</div>
		</>
	);
}

export default Default;
