import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UserContext, { User } from "./UserContext";

import PageLayout from "./components/PageLayout";

import Index from "./pages/index";
import Auth from "./pages/auth";
import HostSetup from "./pages/hostSetup";

import "./styles/global.css";

const App = () => {
    const [user, setUser] = useState<User>();

    return (
        <Router>
            <UserContext.Provider value={user ?? {}}>
                <PageLayout>
                    <Switch>
                        <Route exact path="/">
                            <Index />
                        </Route>
                        <Route path="/auth">
                            <Auth
                                onAuthSuccess={setUser}
                                onAuthFailed={() => {}}
                            />
                        </Route>
		                <Route path="/host" >
		                    <HostSetup />
		                </Route>
                    </Switch>
                </PageLayout>
            </UserContext.Provider>
        </Router>
    );
};

export default App;
