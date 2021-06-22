import React, { useContext, useState, useEffect } from "react";
import { useContextNetwork } from "@lespantsfancy/agency/lib/modules/react/useNetwork";

import { Context } from "./../App";

import VirtualCanvas from "./../components/VirtualCanvas";
import TextInput from "./../components/TextInput";

export function Default() {
	const { dispatch } = useContextNetwork(Context, "network");
	// const { state, dispatch } = useContextNetwork(Context, "network");
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
			state.screen.canvas.width * state.config.scale.scale,
			state.screen.canvas.height * state.config.scale.scale,
			0, 0,
			state.screen.canvas.width,
			state.screen.canvas.height
		);
	});

	let cursor = "default";
	if(state.config.movement.isMoving === 2) {
		cursor = "grabbing";
	} else if(state.config.movement.isMoving) {
		cursor = "grab";
	}

	return (
		<div style={{
			cursor: cursor,
		}}>
			<TextInput
				value={ `Lorem ipsum dolor` }
				onChange={ e => console.log(e) }
				// style={{
				// 	position: "absolute",
				// 	zIndex: 1,
				// }}
			/>
			
			<VirtualCanvas
				canvas={ state.screen.canvas }
				style={{
					position: "absolute",
					zIndex: 0,
				}}
			/>

		</div>
	);
}

export default Default;