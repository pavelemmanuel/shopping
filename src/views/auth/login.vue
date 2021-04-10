<template>
    <form class="form-horizontal form-material" @submit.prevent="onSubmit">
        <div class="m-t-40">
            <a href="javascript:void(0)">
                <p>KOUA - SHOP</p>
            </a>
        </div>
        <div style="text-align: center;" class="m-t-20 m-b-20">
            <h3>Connexion</h3>
        </div>
        <div class="form-group m-t-10">
            <div class="col-xs-12">
                <input class="form-control" type="email" v-model="user.email" placeholder="Adresse email" required>
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-12">
                <input class="form-control" type="password" v-model="user.password" placeholder="Mot de passe" required>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-md-12">
                <div class="custom-control custom-checkbox">
                    <a href="javascript:void(0)" id="to-recover" class="text-dark pull-right">
                        <i class="fa fa-lock m-r-5"></i> Mot de passe oublié ?
                    </a> 
                </div>     
            </div>
        </div>
        <div class="form-group text-center m-t-20">
            <div class="col-xs-12">
                <button 
                    style="background-color:#b71c1c;color:#fff;" 
                    class="btn btn-lg btn-block text-uppercase btn-rounded" 
                    type="submit"
                >
                    Connexion
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                <a href="javascript:void(0);" class="btn-social btn-facebook"><i class="fa fa-facebook"></i></a>
                <a href="javascript:void(0);" class="btn-social btn-instagram"><i class="fa fa-instagram"></i></a>
                <a href="javascript:void(0);" class="btn-social btn-twitter"><i class="fa fa-twitter"></i></a>
                <a href="javascript:void(0);" class="btn-social btn-google-plus"><i class="fa fa-google"></i></a>
            </div>
        </div>
        <div class="form-group m-b-0 p-t-5">
            <div class="col-sm-12 text-center">
                Pas encore de compte ? <a href="javascript:void(0);" @click="goToRegister" class="text-primary m-l-5"><b>Inscrivez-vous</b></a>
            </div>
        </div>
    </form>
</template>

<style scoped>

</style>

<script>
import { error } from 'util';
    export default {
        name: 'Login',
        data: function() {
            return {
                user: {
                    email: null,
                    password: null
                }
            }
        },
        methods: {
            goToRegister: function() {
                this.$router.push('/register');
            },
            onSubmit: function() {
                this.$store.dispatch('login', this.user)
                    .then((response) => {
                        if(document.referrer.indexOf(location.protocol + "//" + location.host) === 0){
                            window.location.href = document.referrer;
                        }else{
                            window.location.href = '/';
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        if(error.response) {
                            console.log(error.response.data);
                        }
                    });
            }
        }
    }
</script>