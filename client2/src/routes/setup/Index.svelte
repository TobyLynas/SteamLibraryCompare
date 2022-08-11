<script lang="ts" context="module">
    import type { User } from "../../lib/steam";

    export interface SetupData {
        friends: User[];
        selectedFriends: User[];
    }
    export type SetupStore = Writable<SetupData>;
</script>

<script lang="ts">
    import { getContext, setContext } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import Router, { push } from "svelte-spa-router";

    import { userContext, type UserStore } from "../../user";

    import Page from "../../components/Page.svelte";
    import SteamUser from "../../components/SteamUser.svelte";

    import Friends from "./Friends.svelte";

    const prefix = "/setup";
    const routes = {
        "/friends": Friends
    };

    const setupData = setContext(
        "setupData",
        writable<SetupData>({
            friends: [],
            selectedFriends: []
        })
    );

    const user = getContext<UserStore>(userContext);
    if (!$user?.steamUser) {
        push("/");
    } else {
        push(`${prefix}/friends`);
    }
</script>

<Page title="Setup">
    <Router {routes} {prefix} />

    <div slot="sidebar">
        {#if $setupData.selectedFriends.length}
            <ul class="selected-friends">
                {#each $setupData.selectedFriends as friend}
                    <li>
                        <SteamUser user={friend} showLastOnline />
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</Page>

<style>
    .selected-friends {
        display: flex;
        flex-direction: column;
        gap: var(--theme-spacing-md);
        list-style: none;
    }
</style>
