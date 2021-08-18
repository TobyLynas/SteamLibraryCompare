import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PageLayout from "./components/PageLayout";

import Index from "./pages/index";
import Auth from "./pages/auth";
import HostSetup from "./pages/hostSetup";

import "./styles/global.css";

const App = () => (
    <Router>
        <PageLayout>
            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route path="/auth">
                    <Auth />
                </Route>
                <Route path="/host" >
                    <HostSetup />
                </Route>
            </Switch>
        </PageLayout>
    </Router>
);

export default App;
