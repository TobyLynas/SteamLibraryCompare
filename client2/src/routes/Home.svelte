<script lang="ts">
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    import { push } from "svelte-spa-router";

    import { userContext, type User } from "../lib/user";

    import Button from "../components/Button.svelte";
    import Loader from "../components/Loader.svelte";
    import Page from "../components/Page.svelte";
    import SteamAuth from "../components/SteamAuth.svelte";

    const user = getContext<Writable<User>>(userContext);
</script>

<Page>
    {#if $user}
        {#if !$user.steamUser}
            {#if $user.steamUserError}
                <div class="message message--error">
                    Failed to fetch player summary!
                </div>
            {:else}
                <Loader />
            {/if}
        {:else}
            <p>
                {$user?.steamUser?.displayName}
                <span class="small">[SteamID: {$user?.steamId}]</span>
            </p>

            <Button on:click={() => push("/setup")}>Setup</Button>
        {/if}
    {:else}
        <section class="box intro">
            <h2 class="box__title">Getting Started</h2>

            <p>
                Signing in with your Steam account allows us to automatically
                and fetch your Steam profile information such as your owned
                games and friends list.
            </p>
            <p>
                It does <em><strong>not</strong></em> give us access to your Steam
                account nor does it provide us with any private/personal data.
            </p>
            <p class="small">
                You <em><strong>must</strong></em> have your profile, game details
                and friends list visibility set to public. You can find these under
                "Privacy Settings" when you edit your Steam profile.
            </p>
            <div class="auth">
                <SteamAuth
                    isLarge
                    on:authSuccess={ev => user.set(ev.detail)}
                    on:authFailed={() => console.log("onAuthFailed")}
                />
            </div>
        </section>
    {/if}
</Page>

<style>
    .auth {
        margin-top: 30px;
    }
</style>
