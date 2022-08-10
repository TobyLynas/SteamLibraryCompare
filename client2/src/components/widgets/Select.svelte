<script lang="ts">
    export let value: any;
    export let disabled: boolean;
</script>

<div class="select" class:select--disabled={disabled}>
    <select {value} {disabled} {...$$restProps} on:change>
        <slot />
    </select>
    <i class="bi bi-chevron-down" />
</div>

<style>
    .select {
        align-items: center;
        background-color: var(--theme-widget-background);
        border-radius: 4px;
        border: var(--theme-border) 1px solid;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.35);
        color: var(--theme-widget-text);
        display: inline-flex;
        font-family: var(--theme-base-font-family);
        font-size: var(--theme-base-font-size);
        height: 32px;
        overflow: hidden;
        padding-inline-end: var(--theme-spacing-md);
    }
    .select--disabled {
        opacity: 0.5;
    }

    .select > select {
        --icon-width: calc(var(--theme-spacing-md) + var(--theme-md-icon-size));
        appearance: none;
        background: inherit;
        border: initial;
        color: inherit;
        font: inherit;
        height: 100%;
        padding-inline-start: var(--theme-spacing-sm);
        padding-inline-end: calc(var(--icon-width) + var(--theme-spacing-md));
        margin-right: calc(0px - var(--icon-width));
    }

    .select:focus,
    .select:focus-within {
        box-shadow: var(--theme-widget-focus-shadow);
        outline: none;
    }
    .select:focus-within *:focus {
        outline: none;
    }

    .bi {
        color: var(--theme-page-text-secondary);
        pointer-events: none;
    }
</style>
