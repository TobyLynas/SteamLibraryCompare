import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import UserContext, { User } from "./UserContext";

import PageLayout from "./components/PageLayout";

import Index from "./pages/index";
import Auth from "./pages/auth";
import HostSetup from "./pages/hostSetup";
import SelectFriends from "./pages/SelectFriends";

import "material-icons/iconfont/material-icons.css";
import "./styles/global.css";

const App = () => {
    const history = useHistory();
    const [user, setUser] = useState<User>();

    return (
        <UserContext.Provider value={user}>
            <PageLayout>
                <Switch>
                    <Route exact path="/">
                        <Index />
                    </Route>
                    <Route path="/auth">
                        <Auth
                            // Set user and redirect to index
                            onAuthSuccess={user => {
                                setUser(user);
                                history.push("/setup/friends");
                            }}
                            onAuthFailed={() => {}}
                        />
                    </Route>
                    <Route path="/setup/friends">
                        <SelectFriends />
                    </Route>
                </Switch>
            </PageLayout>
        </UserContext.Provider>
    );
};

export default App;
