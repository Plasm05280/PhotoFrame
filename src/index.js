import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Croppie } from "croppie";

//import App from "./App";
const croppieOptions = {
	showZoomer: true,
	enableOrientation: true,
	mouseWheelZoom: "ctrl",
	viewport: {
		width: 300,
		height: 200,
		type: "square"
	},
	boundary: {
		width: "50vw",
		height: "50vh"
	}
};

const croppie = document.getElementById("croppie");
let c = new Croppie(croppie, croppieOptions);

function App() {
  // STATES
  let [isFileUploaded, setisFileUploaded] = React.useState(false);
  let [result, setResult] = React.useState(null)

	//REF
	let file = React.createRef();
	let image = React.useRef();

	let OnFileUpload = (e) => {
		setisFileUploaded(true);
		let Reader = new FileReader();
		Reader.readAsDataURL(file.current.files[0]);
		Reader.onload = () => {
			c.bind({ url: Reader.result });
		};
		Reader.onerror = function (error) {
			console.log("Error: ", error);
		};
		// console.log(file.current.files[0])
	};

	let OnResult = (e) => {
		c.result("blob").then((data) => {
      console.log(data)
    })
	};
	return (
		<div className="App">
			<input type="file" id="files" ref={file} onChange={OnFileUpload}></input>
			<img ref={image} alt="Result"></img>
			<button onClick={OnResult}>Telecharger</button>
		</div>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	rootElement
);
