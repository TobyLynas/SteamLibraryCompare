<script lang="ts">
    export let value: any;
    export let disabled: boolean;
</script>

<div class="select material-icons-pseudo" class:select--disabled={disabled}>
    <select {value} {disabled} {...$$restProps} on:change>
        <slot />
    </select>
</div>

<style>
    .select {
        --spacing: 4px;

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
        position: relative;
    }
    .select--disabled {
        opacity: 0.5;
    }
    .select::after {
        content: "\e5c5";
        font-size: var(--theme-md-icon-sm);
        position: absolute;
        right: var(--spacing);
        pointer-events: none;
    }

    .select > select {
        appearance: none;
        background: inherit;
        border: initial;
        color: inherit;
        font: inherit;
        height: 100%;
        padding: 0 var(--spacing);
        padding-right: calc(var(--theme-md-icon-size) + (var(--spacing) * 2));
    }
    .select > select > option {
        font: inherit;
    }

    .select:focus,
    .select:focus-within {
        box-shadow: 0 0 0 0.2rem var(--theme-widget-focus);
        outline: none;
    }
    .select:focus-within *:focus {
        outline: none;
    }
</style>
