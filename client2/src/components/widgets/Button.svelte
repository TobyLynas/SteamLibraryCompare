<script lang="ts">
    export let isGhost = false;
</script>

<button class="button" class:button--ghost={isGhost} {...$$restProps} on:click>
    <slot />
</button>

<style>
    .button {
        align-self: flex-start;
        background-color: var(--theme-widget-background);
        border-radius: 0.4rem;
        border: var(--theme-border) 1px solid;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.35);
        color: var(--theme-widget-text);
        font-family: var(--theme-base-font-family);
        font-size: var(--theme-base-font-size);
        padding: 0 1em;
        height: 32px;
    }
    .button:disabled {
        opacity: 0.5;
    }

    .button--ghost {
        --theme-md-icon-size: var(--theme-md-icon-lg);
        background: initial;
        border: initial;
        box-shadow: initial;
        padding: initial;
        width: 32px;
    }

    .button:hover:not(:disabled) {
        background-color: var(--theme-widget-background-hover);
    }
    .button:active:not(:disabled) {
        background-color: var(--theme-widget-background-active);
    }

    .button:disabled {
        opacity: 0.75;
    }

    .button:focus {
        box-shadow: var(--theme-widget-focus-shadow);
        outline: none;
    }

    .button > img {
    }
</style>
