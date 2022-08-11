<script lang="ts">
    export let label: string | undefined = undefined;
</script>

<div class="loader" class:loader--labelled={!!label}>
    <div class="loader__spinner" />
    {label ?? "Loading..."}
</div>

<style>
    @keyframes loader {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .loader {
        display: flex;
        gap: var(--theme-spacing-lg);
        font-size: 0;
    }
    .loader--labelled {
        font-size: var(--theme-font-size-lg);
    }
    .loader__spinner {
        animation: 0.5s ease loader infinite;
        border: 6px solid;
        border-color: transparent currentColor;
        border-radius: 50%;
        height: 24px;
        opacity: 0.5;
        width: 24px;
    }
</style>
