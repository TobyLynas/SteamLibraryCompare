<script lang="ts">
    import { getContext, onMount } from "svelte";
    import Fuse from "fuse.js";

    import { userContext, type UserStore } from "../lib/user";
    import type { User as SteamUser } from "../lib/steam";

    import Page from "../components/Page.svelte";
    import SteamAvatar from "../components/SteamAvatar.svelte";

    const user = getContext<UserStore>(userContext);

    let friends: SteamUser[] = [];
    let selectedFriends: SteamUser[] = [];

    // Fuzzy searching
    const fuse = new Fuse(friends, {
        includeScore: true,
        keys: ["displayName", "realName"]
    });

    let searchTerm = "";

    $: filteredFriends = searchTerm
        ? fuse
              .search(searchTerm)
              .filter(result => result.score <= 0.25)
              .map(result => result.item)
        : friends;

    user.subscribe(async user => {
        if (!user) return;

        friends = await user.steamUser?.fetchFriendsList();
        fuse.setCollection(friends);
    });
</script>

<Page title="Choose Friends">
    <div class="choose-friends">
        {#if friends?.length}
            <p>Select friends you want to compare libraries with:</p>
            <div class="choose-friends-filter">
                <div class="choose-friends__search material-icons-pseudo">
                    <input
                        type="text"
                        bind:value={searchTerm}
                        placeholder="Search friends list"
                    />
                </div>
            </div>
            <div class="friends-select">
                <select
                    multiple
                    class="friends-select__select"
                    bind:value={selectedFriends}
                >
                    {#each filteredFriends as friend}
                        <option
                            value={friend}
                            class="friends-select__friend material-icons-pseudo"
                        >
                            <SteamAvatar user={friend} />
                            <span class="friends-select__name">
                                {friend.displayName}
                            </span>
                            {#if friend.realName}
                                <span class="secondary small">
                                    ({friend.realName})
                                </span>
                            {/if}
                        </option>
                    {/each}
                </select>
            </div>
            {selectedFriends}
        {/if}
    </div>

    <div slot="sidebar" />
</Page>

<style>
    .choose-friends {
        --theme-md-icon-size: 18px;
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: var(--theme-spacing-md);
    }

    .choose-friends__search {
        position: relative;
    }
    .choose-friends__search::after {
        color: var(--theme-page-text-secondary);
        content: "search";
        position: absolute;
        right: var(--theme-spacing-md);
        top: 50%;
        transform: translateY(-50%);
    }
    .choose-friends__search > input {
        padding-right: 40px;
    }

    .friends-select {
        flex: 1;
    }
    .friends-select__select {
        appearance: none;
        background: initial;
        border: initial;
        color: inherit;
        font: inherit;
        height: 100%;
        scrollbar-width: none;
        width: 100%;
    }
    .friends-select__friend {
        align-items: center;
        --background-color: var(--theme-friend-background);
        background: var(--background-color)
            linear-gradient(var(--background-color), var(--background-color));
        border-radius: 4px;
        color: inherit;
        display: flex;
        gap: var(--theme-spacing-md);
        height: 32px;
        overflow: hidden;
        padding: initial;
        padding-right: var(--theme-spacing-md);
    }
    .friends-select__friend:not(:first-child) {
        margin-top: var(--theme-spacing-sm);
    }
    .friends-select__friend:checked {
        --background-color: var(--theme-friend-selected-background);
    }
    .friends-select__friend:checked::after {
        content: "done";
        margin-left: auto;
    }
</style>
