<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import * as jose from "jose";

    import type { User } from "../lib/user";

    export let isLarge = false;

    let isAuthenticated = false;
    let popup: Window | null = null;

    const dispatch = createEventDispatcher<{
        authSuccess: User;
        authFailed: undefined;
    }>();

    interface TokenPayload {
        steamId?: string;
    }

    /**
     * Open a popup window at the server auth endpoint. That page is redirected
     * to Steam's OpenID authentication page, and then back to a return page at
     * our server.
     *
     * The auth token is embedded in a script that sends a cross-window message
     * back to the client app.
     */
    function beginAuth() {
        // Already authenticated
        if (isAuthenticated) return;

        // Ensure only one popup
        popup?.close();

        if (
            !(popup = window.open(
                `${import.meta.env.VITE_API_URL}/auth/steam`,
                undefined,
                "width=600, height=700"
            ))
        ) {
            dispatch("authFailed");
            return;
        }

        popup.focus();
    }

    /**
     * Handles token messages from the popup window. Message origin is checked
     * against the server origin to ensure validity.
     *
     * @param ev Message event
     */
    function onAuthMessage(ev: MessageEvent<{ token: string }>) {
        // Only trust messages from the popup (hosted on the server)
        if (ev.origin !== import.meta.env.VITE_API_URL) return;

        // Prevent duplicate handling if multiple Auth components are mounted.
        ev.stopImmediatePropagation();

        // Invalid state
        if (isAuthenticated) return;

        const tokenPayload = jose.decodeJwt(ev.data.token) as TokenPayload;
        if (!tokenPayload.steamId) {
            dispatch("authFailed");
            return;
        }

        // Ensure closed just in case
        popup?.close();
        popup = null;

        isAuthenticated = true;

        // Pass user details
        dispatch("authSuccess", {
            steamId: tokenPayload.steamId,
            steamUserError: false
        });
    }

    onMount(() => {
        window.addEventListener("message", onAuthMessage);

        return () => {
            window.removeEventListener("message", onAuthMessage);
            popup?.close();
        };
    });
</script>

<button class="sits-button" disabled={isAuthenticated} on:click={beginAuth}>
    <img
        srcset={isLarge
            ? "/sits_new@2x.png 1x, /sits_new@3x.png 2x"
            : "/sits_new.png 1x, /sits_new@2x.png 2x, /sits_new@3x.png 3x"}
        alt="Sign in through Steam"
    />
</button>

<style>
    .sits-button {
        appearance: none;
        background: initial;
        border: initial;
        cursor: pointer;
        padding: initial;
    }
    .sits-button > img {
        max-width: 100%;
        min-height: 23px;
        object-fit: contain;
    }
</style>
