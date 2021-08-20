import React, { Component } from "react";
import jwt from "jsonwebtoken";

import type { User } from "../UserContext";

import Button from "../components/Button";
import styles from "../styles/auth.module.css";

interface TokenPayload {
    steamId?: string;
}

interface AuthProps {
    onAuthSuccess: (user: User) => void;
    onAuthFailed: () => void;
}
interface AuthState {
    isAuthenticated: boolean;
}

/**
 * Handles user authentication flow.
 */
export default class Auth extends Component<AuthProps, AuthState> {
    state: AuthState = {
        isAuthenticated: false
    };

    popup: Window | null = null;

    constructor(props: AuthProps) {
        super(props);

        this.beginAuth = this.beginAuth.bind(this);
        this.onAuthMessage = this.onAuthMessage.bind(this);
    }

    /**
     * Open a popup window at the server auth endpoint. That page is redirected
     * to Steam's OpenID authentication page, and then back to a return page at
     * our server.
     *
     * The auth token is embedded in a script that sends a cross-window message
     * back to the client app.
     */
    private beginAuth() {
        // Already authenticated
        if (this.state.isAuthenticated) return;

        // Ensure only one popup
        if (this.popup) {
            this.popup.close();
        }

        if (
            !(this.popup = window.open(
                `${process.env.REACT_APP_API_URL}/auth/steam`,
                undefined,
                "width=600, height=700"
            ))
        ) {
            this.props.onAuthFailed();
            return;
        }

        this.popup.focus();
    }

    /**
     * Handles token messages from the popup window. Message origin is checked
     * against the server origin to ensure validity.
     *
     * @param ev Message event
     */
    private onAuthMessage(ev: MessageEvent<{ token: string }>) {
        // Invalid state
        if (this.state.isAuthenticated) return;
        // Only trust messages from the popup (hosted on the server)
        if (ev.origin !== process.env.REACT_APP_API_URL) return;

        const tokenPayload = jwt.decode(ev.data.token) as TokenPayload;
        if (!tokenPayload.steamId) {
            this.props.onAuthFailed();
            return;
        }

        // Ensure closed just in case
        this.popup?.close();
        this.popup = null;

        this.setState({
            isAuthenticated: true
        });

        // Pass user details
        this.props.onAuthSuccess({
            token: ev.data.token,
            steamId: tokenPayload.steamId
        });
    }

    componentDidMount() {
        window.addEventListener("message", this.onAuthMessage);
    }
    componentWillUnmount() {
        window.removeEventListener("message", this.onAuthMessage);

        if (this.popup) {
            this.popup.close();
        }
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
