import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserProvider from "./providers/UserProvider";
import { SnackbarProvider } from "notistack";
import Slide from "@mui/material/Slide";

ReactDOM.render(
	<React.StrictMode>
		<SnackbarProvider
			anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			maxSnack={1}
			TransitionComponent={Slide}>
			<UserProvider>
				<App />
			</UserProvider>
		</SnackbarProvider>

	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
