import "./app.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import App from "./App.svelte";

const app = new App({
    target: document.getElementById("app")
});

export default app;
