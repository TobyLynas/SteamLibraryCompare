<script lang="ts">
    import { formatDistanceToNow } from "date-fns";

    import type { User } from "../lib/steam";
    import SteamAvatar from "./SteamAvatar.svelte";

    export let user: User;
    export let showLastOnline = false;

    $: formattedTime =
        user.lastLoggedOffAt &&
        formatDistanceToNow(new Date(user.lastLoggedOffAt * 1000), {
            addSuffix: true
        });
</script>

<div class="steam-user">
    <SteamAvatar {user} />
    <div class="steam-user__meta">
        <span
            class="steam-user__name"
            class:steam-user__name--large={!showLastOnline}
            >{user.displayName}</span
        >
        {#if user.realName}
            <span class="steam-user__real-name small secondary"
                >({user.realName})</span
            >
        {/if}
        {#if showLastOnline && formattedTime}
            <div class="steam-user__since small secondary">
                Last online {formattedTime}
            </div>
        {/if}
    </div>
</div>

<style>
    .steam-user {
        align-items: center;
        display: flex;
        gap: var(--theme-spacing-md);
    }
    .steam-user__name--large {
        font-size: var(--theme-font-size-lg);
    }
</style>
