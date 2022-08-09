import "./app.css";
import "../public/fonts/inter/inter.css";
import "material-icons/iconfont/material-icons.css";

import App from "./App.svelte";

const app = new App({
    target: document.getElementById("app")
});

export default app;
