<template>
	<div>
        <section id="wrapper" class="login-register login-sidebar" style="background-image:url(/auth-assets/images/background/login-register.jpg);">
            <div class="login-box card">
                <div class="card-body">
                    <slot />
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>

<script>
    export default {
        name: 'auth',
        created: function() {
            var style1 = document.createElement('link');
            style1.type='text/css';
            style1.rel='stylesheet';
            style1.href='/auth-assets/css/login-register-lock.css';
            document.getElementsByTagName('head')[0].appendChild(style1);

            var style2 = document.createElement('link');
            style2.type='text/css';
            style2.rel='stylesheet';
            style2.href='/auth-assets/css/style.css';
            document.getElementsByTagName('head')[0].appendChild(style2);
        }
    }
</script>