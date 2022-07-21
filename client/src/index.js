import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from 'react-router-dom'
import App from "./App";

const container = document.getElementById("root");

// create a root
const root = ReactDOM.createRoot(container);

// render app to root
root.render(
    <Router>
        <App />
    </Router>
);
