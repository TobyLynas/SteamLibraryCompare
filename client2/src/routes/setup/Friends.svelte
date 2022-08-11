<script lang="ts">
    import { getContext, tick } from "svelte";
    import Fuse from "fuse.js";

    import type { User as SteamUser } from "../../lib/steam";

    import Button from "../../components/widgets/Button.svelte";
    import Select from "../../components/widgets/Select.svelte";
    import Loader from "../../components/Loader.svelte";
    import SteamAvatar from "../../components/SteamAvatar.svelte";

    import { userContext, type UserStore } from "../../user";
    const user = getContext<UserStore>(userContext);

    import type { SetupStore } from "./Index.svelte";
    const setupData = getContext<SetupStore>("setupData");

    let isFriendsError = false;

    // Fuzzy searching
    const fuse = new Fuse($setupData.friends, {
        includeScore: true,
        keys: ["displayName", "realName"]
    });

    // Need element ref to dynamically resize
    let chooseFriendsSelect: HTMLSelectElement;

    async function updateFriends(newFriends: SteamUser[]) {
        $setupData.friends = newFriends;
        fuse.setCollection($setupData.friends);

        await tick();

        // Resize select element to fit contents
        chooseFriendsSelect.style.height = `${chooseFriendsSelect.scrollHeight}px`;
    }

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

    function sortFriends(friendA, friendB) {
        switch (sortType) {
            case SortType.Name:
                return friendA.displayName.localeCompare(friendB.displayName);
            case SortType.DateJoined:
                return friendA.createdAt - friendB.createdAt;
            case SortType.LastOnline:
                return friendB.lastLoggedOffAt - friendA.lastLoggedOffAt;
        }
    }

    /** Sort friends array when sort type changes. */
    function onSortTypeChanged(ev: Event) {
        sortType = parseInt((ev.target as HTMLSelectElement).value);
        $setupData.friends.sort(sortFriends);

        if (sortOrder === SortOrder.Descending) {
            $setupData.friends.reverse();
        }

        updateFriends($setupData.friends);
    }

    /** Reverse friends array if sort order changes. */
    function onSortOrderChanged(ev: Event) {
        sortOrder =
            sortOrder === SortOrder.Ascending
                ? SortOrder.Descending
                : SortOrder.Ascending;

        updateFriends($setupData.friends.reverse());
    }

    $: filteredFriends = searchTerm
        ? fuse
              .search(searchTerm)
              .filter(result => result.score <= 0.25)
              .map(result => result.item)
        : $setupData.friends;

    user.subscribe(async user => {
        if (!user?.steamUser) return;

        try {
            updateFriends(
                (await user.steamUser?.fetchFriendsList()).sort(sortFriends)
            );
        } catch (err) {
            isFriendsError = true;
        }
    });
</script>

<div class="choose-friends">
    {#if $setupData.friends?.length}
        <p>Select friends you want to compare libraries with:</p>
        <div class="choose-friends__filter">
            <div class="choose-friends__search">
                <input
                    type="text"
                    placeholder="Search friends list"
                    bind:value={searchTerm}
                />
                <div class="bi bi-search" />
            </div>
            <div class="choose-friends__sort">
                <label class="small" for="sortType">Sort by:</label>
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
                <Button
                    isGhost
                    on:click={onSortOrderChanged}
                    aria-label="Order by"
                    title={sortOrder === SortOrder.Ascending
                        ? "Ascending"
                        : "Descending"}
                >
                    {#if sortOrder === SortOrder.Ascending}
                        <div class="bi bi-sort-up" />
                    {:else if sortOrder === SortOrder.Descending}
                        <div class="bi bi-sort-down" />
                    {/if}
                </Button>
            </div>
        </div>
        <div class="friends-select">
            <select
                multiple
                class="friends-select__select"
                bind:value={$setupData.selectedFriends}
                bind:this={chooseFriendsSelect}
            >
                {#each filteredFriends as friend}
                    <option
                        class="friends-select__friend"
                        value={friend}
                        selected={$setupData.selectedFriends.includes(friend)}
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
                        <i class="friends-select__check bi bi-check2" />
                    </option>
                {/each}
            </select>
        </div>

        <div class="choose-friends__navigation">
            <Button disabled={!$setupData.selectedFriends.length}>Next</Button>
        </div>
    {:else if isFriendsError}
        <div class="message message--error">Failed to fetch friends list!</div>
    {:else}
        <div class="choose-friends__loader">
            <Loader label="Fetching friends list" />
        </div>
    {/if}
</div>

<style>
    .choose-friends {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: var(--theme-spacing-md);
    }
    .choose-friends__loader {
        margin: var(--theme-spacing-lg);
        margin-top: var(--theme-spacing-xlg);
    }

    .choose-friends__filter {
        align-items: center;
        display: flex;
        gap: var(--theme-spacing-lg);
    }

    .choose-friends__search {
        align-items: center;
        display: flex;
        flex: 1;
        position: relative;
    }
    .choose-friends__search > input {
        padding-right: calc(
            var(--theme-md-icon-size) + (var(--theme-spacing-md) * 2)
        );
    }
    .choose-friends__search > .bi-search {
        color: var(--theme-page-text-secondary);
        position: absolute;
        right: var(--theme-spacing-md);
    }

    .choose-friends__sort {
        align-items: center;
        display: flex;
        gap: var(--theme-spacing-sm);
    }

    .friends-select__select {
        appearance: none;
        background: initial;
        border: initial;
        color: inherit;
        font: inherit;
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
    .friends-select__check {
        margin-inline-start: auto;
        display: none;
    }
    .friends-select__friend:checked .friends-select__check {
        display: initial;
    }

    .choose-friends__navigation {
        display: flex;
        justify-content: end;
        margin-top: var(--theme-spacing-md);
    }

    .message {
        margin: var(--theme-spacing-md) 0;
    }
</style>
