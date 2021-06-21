import React, { useContext, useState, useEffect } from "react";
import { useContextNetwork } from "@lespantsfancy/agency/lib/modules/react/useNetwork";

import { Context } from "./../App";

import VirtualCanvas from "./../components/VirtualCanvas";

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
			{/* <VirtualCanvas canvas={ state.canvas } style={{
				backgroundColor: "#ccc",
				overflow: "hidden",
			}} /> */}
			<div style={{
				//FIXME	Let react only put in HTML if it's within the current viewport (based on offset) [ potentially synergize with html2canvas on scrubbing, instead of moving the DOM -- store cached image of current state, rerender HTML on click if "locked", via "**" handlers ]
				position: "absolute",
				color:"#FF0",
				zIndex: 1,
				fontSize: "16pt",
				left: -state.grid.offset[ 0 ],
				top: -state.grid.offset[ 1 ],
				width: window.innerWidth,
				height: window.innerHeight,
				backgroundColor: "transparent",
				pointerEvents: "none",
				userSelect: "none",
			}}>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut quasi rem praesentium quo, corporis eaque assumenda quas inventore fuga ratione soluta quidem qui, iste nihil harum nemo, accusantium sunt quisquam.
				Blanditiis iste itaque molestias distinctio asperiores veritatis nesciunt, modi nihil quasi repellendus! Molestias ad eligendi eveniet ipsum aperiam distinctio. Officiis ipsa quo reiciendis fugiat adipisci nihil, nostrum nam culpa nulla?
				Tempore quas blanditiis unde suscipit voluptatum eveniet modi, excepturi vel rerum sint. Quo fuga asperiores ipsa eius officiis similique possimus? Laboriosam optio maiores alias quia magnam eum, voluptate nostrum odio.
				Similique sit quas enim nesciunt, perspiciatis inventore et dolorum voluptas vel! Recusandae voluptate minima, eligendi hic iusto, similique deleniti quidem ab ut cumque, fuga id. Labore, accusamus. Illum, perferendis excepturi.
				Eligendi expedita vero qui harum perspiciatis consequuntur eaque repellat error animi voluptatibus reiciendis earum, minus architecto dolores ad officiis in suscipit molestiae porro temporibus, quis exercitationem necessitatibus sint est. A!
				Exercitationem ab blanditiis sed accusantium? Omnis, perspiciatis animi temporibus distinctio tenetur laborum sint, eum reiciendis nam totam fugit incidunt sequi, saepe dolorum ipsum quod id minus veritatis dicta natus maxime?
				Sunt molestiae tenetur sequi minima possimus, consectetur cumque nam? Excepturi, perferendis nam? Nisi laudantium vero delectus maxime sit quia. Quibusdam eaque ad quas soluta, animi aut facilis quae? Cum, laudantium.
				Suscipit quia sapiente ab accusamus fugiat illo voluptate, saepe iste dolorem architecto, corporis dolore asperiores aliquid et? Consequatur, beatae eveniet et praesentium deleniti, amet consequuntur similique aut, sed molestiae accusantium.
				Deserunt labore impedit voluptates nemo autem animi modi. Adipisci eius eveniet officia, sapiente, voluptatem ex, aliquid doloremque et maxime in quod repudiandae dolorum vitae natus. Nulla temporibus nam eaque laborum?
				Quaerat doloremque facere rem consectetur eos repellendus laborum laudantium labore delectus ratione voluptatibus nesciunt cumque obcaecati optio aliquid dolores, cum nulla, quo pariatur molestias. Iusto dolor incidunt velit in autem?
			</div>
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