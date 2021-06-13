import React, { useContext, useState, useEffect } from "react";
import { useContextNetwork } from "@lespantsfancy/agency/lib/modules/react/useNetwork";

import { Context } from "./../App";

import VirtualCanvas from "./../components/VirtualCanvas";

export function Default() {
	const { dispatch } = useContextNetwork(Context, "network");
	const { state } = useContext(Context);

	useEffect(() => {
		const ctx = state.screen.canvas.getContext("2d");

		// ctx.clearRect(
		// 	0, 0,
		// 	state.screen.canvas.width,
		// 	state.screen.canvas.height
		// );

		ctx.drawImage(
			state.canvas,
			...state.grid.offset,
			state.screen.canvas.width,
			state.screen.canvas.height,
			0, 0,
			state.screen.canvas.width,
			state.screen.canvas.height
		);
	});

	return (
		<div style={{
			overflow: "hidden",
		}}>
			{/* <VirtualCanvas canvas={ state.canvas } style={{
				backgroundColor: "#ccc",
				overflow: "hidden",
			}} /> */}
			<VirtualCanvas canvas={ state.screen.canvas } />
		</div>
	);
}

export default Default;