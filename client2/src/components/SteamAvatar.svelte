<script lang="ts">
    import type { User } from "../lib/steam";
    export let user: User;
</script>

<img
    srcset="{user.avatar.sizes.small} 1x,
            {user.avatar.sizes.medium} 2x,
            {user.avatar.sizes.large} 3x"
    src={user.avatar.sizes.small}
    alt="Steam profile avatar, {user.displayName}"
    height="32"
    width="32"
/>
