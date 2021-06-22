import VirtualCanvas from "./VirtualCanvas";

export function SignatureBox({ ...rest }) {
	return <VirtualCanvas
		width={ 600 }
		height={ 150 }
		style={{
			border: "5px solid #000"
		}}
		{ ...rest }
	/>;
}

export default SignatureBox;