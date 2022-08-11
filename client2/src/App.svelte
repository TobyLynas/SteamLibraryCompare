<script lang="ts">
    import Router, { link } from "svelte-spa-router";
    import { setContext } from "svelte";

    import Steam from "./lib/steam";

    import Button from "./components/widgets/Button.svelte";
    import SteamAuth from "./components/SteamAuth.svelte";
    import SteamUser from "./components/SteamUser.svelte";

    import Home from "./routes/Home.svelte";
    import Setup from "./routes/setup/Index.svelte";

    import github32 from "./assets/Github-Mark-32px.png";
    import github64 from "./assets/Github-Mark-64px.png";

    import user, { userContext } from "./user";

    const routes = {
        "/": Home,
        "/setup": Setup,
        "/setup/*": Setup
    };

    setContext(userContext, user);

    const steam = new Steam();

    user.subscribe(async userStore => {
        if (!userStore) return;

        // Set initial user
        if (!$user.steamUser && !$user.steamUserError) {
            try {
                const steamUser = await steam.getUserById(userStore.steamId);
                user.update(user => ({ ...user, steamUser }));
            } catch (err) {
                user.update(user => ({ ...user, steamUserError: true }));
            }
        }
    });

    async function logOutUser() {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
                credentials: "include"
            });
            user.set(undefined);
        } catch (err) {
            // TODO: Handle logout fail
        }
    }
</script>

<div class="site">
    <div class="site-header">
        <div class="site-width">
            <h1 class="site-title">
                <a href="/" use:link>{import.meta.env.VITE_APP_NAME}</a>
            </h1>
            {#if !$user}
                <div class="site-header__auth">
                    <SteamAuth on:authSuccess={ev => user.set(ev.detail)} />
                </div>
            {:else}
                <div class="site-header__user">
                    {#if $user.steamUser}
                        <SteamUser user={$user.steamUser} />
                    {/if}
                    <Button on:click={logOutUser}>Log out</Button>
                </div>
            {/if}
        </div>
    </div>
    <main class="site-content">
        <div class="site-width">
            <Router {routes} />
        </div>
    </main>
    <div class="site-footer">
        <div class="site-width">
            <div>
                <p class="site-footer__copyright">
                    &copy; 2022 {import.meta.env.VITE_APP_NAME}
                </p>
                <p class="small">
                    This app is a community website and is not affiliated with
                    Valve or Steam.
                </p>
            </div>
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
        height: 64px;
        padding: 10px 0;
    }
    .site-title {
        font-weight: 500;
        font-size: var(--theme-font-size-xxlg);
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
        gap: var(--theme-spacing-lg);
    }
    .site-header__auth {
        margin-left: auto;
    }
    .site-header__user {
        display: flex;
        gap: inherit;
        margin-inline-start: auto;
    }

    .site-footer > .site-width {
        align-items: center;
        display: flex;
        gap: var(--theme-spacing-lg);
    }
    .site-footer p {
        margin: var(--theme-spacing-sm);
    }
    .site-footer__copyright {
        color: #b8d6ee;
    }
    .github-link {
        margin-inline-start: auto;
    }
</style>
