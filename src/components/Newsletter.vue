<template>
    <div class="container c2" style="position:relative;z-index:1000;">
        <div class="row bg-image--contact-3 mt-30" style="min-height:160px;">
            <div class="d-flex flex-column justify-content-center mx-auto" style="width:85%;">
                <div class="row">
                    <div class="col-md-4 mb-3 mt-3">
                        <p class="font-weight-bold">Abonnez vous à notre Newsletter</p>
                        <span class="text-muted">Et restez au fait de l'actualité Jours de Joie</span>
                    </div>
                    <div class="col-md-4 newsletter mb-3">
                        <form action="" data-vv-scope="newsletter-form">
                            <input type="email" class="form-control" placeholder="Email" name="mail" v-validate="'required|email'" v-model="newsletter_email">
                            <small class="form-control-feedback text-danger" v-show="errors.has('newsletter-form.mail')"> {{ errors.first('newsletter-form.mail') }} </small>
                        </form>
                    </div>
                    <div class="col-md-4 mb-3">
                        <button class="btn-submit" @click="newsletter('M')" style="letter-spacing:1px;background-color: #d00959;">HOMME</button>&nbsp;
                        <button class="btn-submit" @click="newsletter('F')" style="letter-spacing:1px;background-color: #d00959;">FEMME</button>
                    </div>
                </div>
            </div>
        </div>
        <div style="height:30px;background-color:white;"></div>
    </div>
</template>
<style scoped>
.newsletter input{
    box-shadow:none !important;
    background: #fff none repeat scroll 0 0;
    border: 1px solid #ebebeb;
    border-radius: 1px;
    box-sizing: border-box;
    font-size: 14px;
    height: 40px;
    line-height: 1.42857;
    outline: medium none;
    padding: 0 9px;
    width: 100%;
}
.btn-submit{
background: #b71c1c none repeat scroll 0 0;
border: 0 none;
color: #fff;
font-size: 14px;
font-weight: 600;
height: 40px;
line-height: 40px;
padding: 0 25px;
text-transform: uppercase;
}
</style>
<script>
import axios from 'axios';
import { CONTACT , API_PREFIX , API_VERSION} from '@/config'

export default {
    name: 'newsletter',
    data(){
        return {
            newsletter_email:'',
        }
    },

    methods : {
        newsletter(value){
            let app =this;
            this.$validator.validateAll('newsletter-form').then(valid => {
                if(valid){
                    app.$Progress.start();
                    axios.post(CONTACT.DEV_URL + API_PREFIX + API_VERSION + 'newsletter',{
                        email : app.newsletter_email,
                        sexe : value
                    })
                    .then(function(response){
                        app.$Progress.finish();
                        app.$toasted.success('Votre demande a été prise en compte');
                    })
                    .catch(function(error){
                        console.log(error);
                    })
                }
            });        
        }
    }
}
</script>

