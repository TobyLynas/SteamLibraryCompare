<script lang="ts">
    export let hasAutoMargin = false;
</script>

<div class="loader" class:hasAutoMargin>Loading...</div>

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
        animation: 0.5s ease loader infinite;
        border: 6px solid;
        border-color: transparent currentColor;
        border-radius: 50%;
        font-size: 0;
        height: 24px;
        opacity: 0.5;
        width: 24px;
    }
    .hasAutoMargin {
        margin: 0 auto;
    }
</style>
