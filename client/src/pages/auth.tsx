import React, { Component } from "react";

import type { User } from "../UserContext";

import Button from "../components/Button";
import styles from "../styles/auth.module.css";

const AUTH_ORIGIN = "http://localhost:9000";
interface AuthMessage {
    token: string;
}

interface AuthProps {
    onAuthSuccess: (user: User) => void;
    onAuthFailed: () => void;
}

interface AuthState {
    isAuthenticated: boolean;
    popup?: Window;
}

/**
 * Handles authentication flow, passing user token back to parent component.
 */
export default class Auth extends Component<AuthProps, AuthState> {
    state: AuthState = {
        isAuthenticated: false
    };

    constructor(props: AuthProps) {
        super(props);

        this.beginAuth = this.beginAuth.bind(this);
        this.onAuthMessage = this.onAuthMessage.bind(this);
    }

    /**
     * Open a popup window at the server auth endpoint.
     */
    private beginAuth() {
        if (this.state.isAuthenticated) {
            return;
        }

        // Ensure only one popup
        if (this.state.popup) {
            this.state.popup.close();
        }

        const popup = window.open(
            `${AUTH_ORIGIN}/auth/steam`,
            undefined,
            "width=600, height=700"
        );
        if (!popup) {
            this.props.onAuthFailed();
            return;
        }

        this.setState({ popup });
        popup.focus();
    }

    private onAuthMessage(ev: MessageEvent<AuthMessage>) {
        // Invalid state
        if (this.state.isAuthenticated || !this.state.popup) {
            return;
        }
        // Only trust messages from the popup (hosted on the server)
        if (ev.origin !== AUTH_ORIGIN) {
            return;
        }

        this.setState({
            isAuthenticated: true,
            popup: undefined
        });
        this.props.onAuthSuccess({
            user: {
                token: ev.data.token
            }
        });
    }

    componentDidMount() {
        window.addEventListener("message", this.onAuthMessage);
    }
    componentWillUnmount() {
        window.removeEventListener("message", this.onAuthMessage);
    }

    render() {
        return (
            <div className={styles.main}>
                <div className={styles.topRow}>
                    <Button
                        text="Sign in through Steam"
                        variant="large"
                        disabled={this.state.isAuthenticated}
                        onClick={this.beginAuth}
                    />
                    <div className={styles.or}>or</div>
                    <div className={styles.profileUrl}>
                        Enter Your Steam profile URL:
                        <input
                            className={styles.input}
                            placeholder="https://steamcommunity.com/profiles/..."
                        ></input>
                    </div>
                </div>
                <p className={styles.bottomRow}>
                    Please ensure your{" "}
                    <strong>
                        game details is set to <em>public</em>
                    </strong>{" "}
                    so we can fetch your game library.
                </p>
            </div>
        );
    }
}
