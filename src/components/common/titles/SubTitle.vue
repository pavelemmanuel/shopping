<template>
    <center>
        <h3 :class="(gender == 'M') ? 'man-title' : 'woman-title'">
            {{ label | uppercase }}
        </h3>
        <hr :class="(gender == 'M') ? 'hr-man' : 'hr-woman'">
    </center>
</template>

<style>
    .man-title {
        color: #1565c0;
    }
    .hr-man {
        height:3px;
        width:18%;
        border:none;
        color:#1565c0;
        background-color:#1565c0;
        margin-top:10px;
        margin-bottom:40px;
    }
    .woman-title {
        color:#d00959;
    }
    .hr-woman {
        height:3px;
        width:18%;
        border:none;
        color:#d00959;
        background-color:#d00959;
        margin-top:10px;
        margin-bottom:40px;
    }
</style>

<script>
    export default {
        name: 'SubTitle',
        props: ['label', 'gender'],
        filters: {
            uppercase: function(text) {
                return text.toUpperCase();
            }
        }
    }
</script>