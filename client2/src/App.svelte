<script lang="ts">
    import Router, { link } from "svelte-spa-router";
    import { setContext } from "svelte";

    import user, { userContext } from "./lib/user";
    import Steam from "./lib/steam";

    import github32 from "./assets/Github-Mark-32px.png";
    import github64 from "./assets/Github-Mark-64px.png";

    import SteamAuth from "./components/SteamAuth.svelte";

    import Home from "./routes/Home.svelte";
    import Setup from "./routes/Setup.svelte";

    const routes = {
        "/": Home,
        "/setup": Setup
    };

    setContext(userContext, user);

    const steam = new Steam();

    user.subscribe(async userStore => {
        if (!userStore) return;

        // Set initial user
        if (!$user.steamUser) {
            const steamUser = await steam.getUserById(userStore.steamId);
            user.update(user => {
                user.steamUser = steamUser;
                return user;
            });
        }
    });
</script>

<div class="site">
    <div class="site-header">
        <div class="site-width">
            <h1 class="site-title">
                <a href="/" use:link>{import.meta.env.VITE_APP_NAME}</a>
            </h1>
            {#if !$user}
                <div class="auth">
                    <SteamAuth
                        on:authSuccess={ev =>
                            user.set({ steamId: ev.detail.steamId })}
                    />
                </div>
            {/if}
        </div>
    </div>
    <main class="site-content">
        <div class="site-width">
            <Router {routes} restoreScrollState={true} />
        </div>
    </main>
    <div class="site-footer">
        <div class="site-width">
            <a
                class="github-link"
                href={import.meta.env.VITE_APP_GH_URL}
                title="Visit GitHub repository"
            >
                <img
                    srcset="{github32} 1x, {github64} 2x"
                    alt="GitHub icon"
                    width="32"
                    height="32"
                />
            </a>
            <div>
                <p class="copyright">&copy; 2022 {import.meta.env.VITE_APP_NAME}</p>
                <p class="small">
                    This app is a community website and is not affiliated with
                    Valve or Steam.
                </p>
            </div>
        </div>
    </div>
</div>

<style>
    .site {
        display: flex;
        flex-direction: column;
        height: 100%;
        margin: 0 auto;
        position: relative;
        align-items: center;
        row-gap: 20px;
    }
    .site-header,
    .site-content,
    .site-footer {
        align-self: stretch;
    }

    .site-header {
        background-color: var(--theme-header-background);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding: 10px 0;
    }
    .site-title {
        font-weight: 500;
        font-size: var(--theme-font-size-xlg);
    }

    .site-content {
        flex-basis: 100%;
    }
    .site-footer {
        background-color: var(--theme-footer-background);
        color: var(--theme-footer-text);
        padding: 10px 0;
    }

    .site-width {
        margin: 0 auto;
        max-width: 1000px;
        padding: 0 20px;
        height: 100%;
        width: 100%;
    }

    .site-header > .site-width {
        align-items: center;
        display: flex;
    }
    .auth {
        margin-left: auto;
    }

    .site-footer > .site-width {
        align-items: center;
        display: flex;
        gap: var(--theme-spacing-lg);
    }
    .copyright {
        color: #b8d6ee;
    }
</style>
