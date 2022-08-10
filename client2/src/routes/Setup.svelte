<script lang="ts">
    import { getContext, onMount } from "svelte";
    import Fuse from "fuse.js";

    import { userContext, type UserStore } from "../lib/user";
    import type { User as SteamUser } from "../lib/steam";

    import Button from "../components/Button.svelte";
    import Loader from "../components/Loader.svelte";
    import Page from "../components/Page.svelte";
    import Select from "../components/Select.svelte";
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

    enum SortType {
        Name,
        DateJoined,
        LastOnline
    }
    enum SortOrder {
        Ascending,
        Descending
    }

    let sortType = SortType.Name;
    let sortOrder = SortOrder.Ascending;

    /** Sort friends array when sort type changes. */
    function onSortTypeChanged(ev: Event) {
        sortType = parseInt((ev.target as HTMLSelectElement).value);
        friends.sort((friendA, friendB) => {
            switch (sortType) {
                case SortType.Name:
                    return friendA.displayName.localeCompare(
                        friendB.displayName
                    );
                case SortType.DateJoined:
                    return friendA.createdAt - friendB.createdAt;
                case SortType.LastOnline:
                    return friendB.lastLoggedOffAt - friendA.lastLoggedOffAt;
            }
        });

        if (sortOrder === SortOrder.Descending) {
            friends.reverse();
        }

        friends = friends;
        fuse.setCollection(friends);
    }

    /** Reverse friends array if sort order changes. */
    function onSortOrderChanged(ev: Event) {
        let prevSortOrder = sortOrder;
        sortOrder = parseInt((ev.target as HTMLSelectElement).value);
        if (sortOrder !== prevSortOrder) {
            friends = friends.reverse();
            fuse.setCollection(friends);
        }
    }

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
            <div class="choose-friends__filter">
                <div class="choose-friends__search material-icons-pseudo">
                    <input
                        type="text"
                        bind:value={searchTerm}
                        placeholder="Search friends list"
                    />
                </div>
                <div class="choose-friends__sort">
                    <label for="sortType">Sort by:</label>
                    <Select
                        value={sortType}
                        on:change={onSortTypeChanged}
                        id="sortType"
                        title="Sort type"
                        disabled={!!searchTerm.length}
                    >
                        <option value={SortType.Name}>Name</option>
                        <option value={SortType.DateJoined}>Date joined</option>
                        <option value={SortType.LastOnline}>Last online</option>
                    </Select>
                    <label for="sortOrder" hidden aria-hidden="false"
                        >Order by:</label
                    >
                    <Select
                        bind:value={sortOrder}
                        on:change={onSortOrderChanged}
                        id="sortOrder"
                        title="Sort order"
                        disabled={!!searchTerm.length}
                    >
                        <option value={SortOrder.Ascending}>Asc</option>
                        <option value={SortOrder.Descending}>Desc</option>
                    </Select>
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

            {#if selectedFriends.length}
                <ul>
                    {#each selectedFriends as friend}
                        <li>{friend.displayName}</li>
                    {/each}
                </ul>
            {/if}

            <Button disabled={!selectedFriends.length}>Next</Button>
        {:else}
            <div class="choose-friends__loader">
                <Loader />
            </div>
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
    .choose-friends__loader {
        margin: var(--theme-spacing-lg);
    }

    .choose-friends__filter {
        align-items: center;
        display: flex;
        gap: var(--theme-spacing-lg);
    }

    .choose-friends__search {
        position: relative;
        flex: 1;
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
