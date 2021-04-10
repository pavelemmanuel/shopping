<template>
    <form class="form-horizontal form-material" @submit.prevent="onSubmit">
        <div class="m-t-40">
            <a href="javascript:void(0)">
                <p>KOUA - SHOP</p>
            </a>
        </div>
        <div style="text-align: center;" class="m-t-20 m-b-20">
            <h3>Inscription</h3>
        </div>
        <div class="form-group m-t-10">
            <div class="col-xs-12">
                <select v-model="user.civility" class="form-control" required>
                    <option value="Monsieur" selected>Monsieur</option>
                    <option value="Madame">Madame</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-12">
                <input v-model="user.given_names" class="form-control" type="text" placeholder="Prénoms" required>
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-12">
                <input v-model="user.last_name" class="form-control" type="text" placeholder="Nom" required>
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-12">
                <input v-mask="['(+###) ## ## ## ## ## ']" v-model="user.phone_numbers" class="form-control" type="text" placeholder="Nº de téléphone" required>
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-12">
                <input v-model="user.dob" class="form-control" type="date" placeholder="Date de naissance" required>
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-12">
                <input v-model="user.email" class="form-control" type="email" placeholder="Adresse email" required>
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-12">
                <input v-model="user.password" class="form-control" type="password" placeholder="Mot de passe" required>
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-12">
                <input v-model="user.password_confirmation" class="form-control" type="password" placeholder="Confirmation de mot de passe" required>
            </div>
        </div>
        <div class="form-group text-center m-t-20">
            <div class="col-xs-12">
                <button 
                    style="background-color:#b71c1c;color:#fff;" 
                    class="btn btn-lg btn-block text-uppercase btn-rounded" 
                    type="submit"
                >
                    Inscription
                </button>
            </div>
        </div>
    </form>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    export default {
        name: 'Register',
        components: {
            Datepicker
        },
        data: function() {
            return {
                user: {
                    civility: null,
                    last_name: null,
                    given_names: null,
                    phone_numbers: null,
                    email: null,
                    password: null,
                    password_confirmation: null,
                    dob: null,
                }
            }
        },
        methods: {
            onSubmit: function() {
                this.$store.dispatch('register', this.user)
                    .then((response) => {
                        console.log(response.data);
                        this.$router.push('/login');
                    })
                    .catch((error) => {
                        console.log(error);
                        if(error.response) {
                            console.log(error.response.data);
                        }
                    });
            },
            goToLogin: function() {
                this.$router.push('/login');
            }
        }
    }
</script>