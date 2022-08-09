<script lang="ts">
    export let title = "";
</script>

<div class="page">
    <div class="page__content">
        {#if title}
            <header class="page__header">
                <h2 class="page__title">{title}</h2>
            </header>
        {/if}

        <slot />
    </div>

    <div class="page__sidebar">
        <slot name="sidebar" />
    </div>
</div>

<style>
    .page {
        display: flex;
        gap: var(--theme-spacing-lg);
        height: 100%;
        width: 100%;
    }

    .page__header {
        border-bottom: 1px solid var(--theme-title-text);
        padding-bottom: 4px;
    }
    .page__title {
        color: var(--theme-title-text);
        font-size: 28px;
        text-transform: uppercase;
        font-weight: 600;
    }

    .page__content {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .page__sidebar {
        --width: 300px;
        /*background-color: var(--theme-page-accent);*/
        flex-basis: var(--width);
        max-width: var(--width);
    }

    @media (max-width: 700px) {
        .page {
            flex-direction: column;
        }
        .page__sidebar {
            flex-basis: initial;
            max-width: initial;
        }
    }
</style>
