import React, { useContext, useState, useEffect } from "react";
import { useContextNetwork } from "@lespantsfancy/agency/lib/modules/react/useNetwork";

import { Context } from "./../App";

import VirtualCanvas from "./../components/VirtualCanvas";

export function Default() {
	const { dispatch } = useContextNetwork(Context, "network");
	// const { state, dispatch } = useContextNetwork(Context, "network");
	const { state } = useContext(Context);

	return (
		<div style={{
			cursor: cursor,
		}}>
			Test
		</div>
	);
}

export default Default;