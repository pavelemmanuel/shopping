<template>
    <div>
        <div class="text-center">
            <p class="big-title">{{ label }}</p>
            <img class="big-title-image" src="/img/nuptial-notebook/icones.png">
        </div>
    </div>
</template>

<style>
    .big-title {
        font-size:29px;
        font-weight:bold;
        color:#d00959;
    }

    .big-title-image {
        width: 100px;
        height: auto;
        padding-top: 10px;
    }
</style>


<script>
    export default {
        name: 'Title',
        props: ['label']
    }
</script>