<template>
        <div id="overlay" :class="{active : contact.activeOverlay}" @click.self="activeOverlay = false">
            <div class="newsletter-box">
                <div class="row no-gutters">
                    <div class="col-md-5 bg-image--newsletter">

                    </div>
                    <div class="col-md-7">
                        <div class="card" style="border-radius:0px;border:none;">
                            <div class="card-body" style="opacity:0.9;">
                                <div>
                                    <h1 style="letter-spacing:2px;color:#d00959;">Rejoindre La Newsletter</h1>
                                    <p style="font-size:16px;" class="text-muted">Et restez au fait de l'actualité KOUA-SHOPPING</p>
                                </div>
                                <div>
                                    <form id="contact-form" v-on:submit.prevent="newsletter" data-vv-scope="contact-form">
                                        <div class="single-contact-form space-between pb-25">
                                            <input type="text" style="padding:0;" :class="{'is-danger': errors.has('contact-form.email') }" name="email" placeholder="E-mail" data-vv-as="Email" v-model="contact.email" v-validate="'required|email'">
                                            <small style="margin:10px;" class="form-control-feedback text-danger"  v-show="errors.has('contact-form.email')"> {{ errors.first('contact-form.email') }} </small>
                                        </div>
                                        <div class="single-contact-form space-between pb-25">
                                            <select name="sexe" v-validate="'required'" v-model="contact.sexe" :class="{'is-danger': errors.has('contact-form.sexe') }">
                                                <option :value="null" disabled selected hidden>Sexe</option>
                                                <option value="M">Homme</option>
                                                <option value="F">Femme</option>
                                            </select>
                                            <small style="margin:10px;" class="form-control-feedback text-danger"  v-show="errors.has('contact-form.sexe')"> {{ errors.first('contact-form.sexe') }} </small>
                                        </div>
                                        <div class="text-center">
                                            <button class="tocart btn-submit" type="submit" style="background-color: #d00959;">S'ABONNER</button>
                                        </div>
                                    </form>                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<style scoped>
#overlay {
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  display: none;
  top: 0; 
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0 , 0.5); /* Black background with opacity */
  z-index: 20000; /* Specify a stack order in case you're using a different order for other elements */
  cursor: crosshair; /* Add a pointer on hover */
}

#overlay.active{
    display : block;
}
.newsletter-box{
    position : absolute;
    top : 50%;
    left: 50%;
  transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
}
.single-contact-form.space-between input {
    margin: 0 10px;
}

.single-contact-form input, .single-contact-form select {
    border: 1px solid #c1c1c1;
    border-radius: 0;
    height: 42px;
    outline: medium none;
    padding: 0 0px;
    width: 100%;
    border-bottom: 1px solid #c1c1c1;
    border-left: 0;
    border-right: 0;
    border-top: 0;
}
.single-contact-form textarea {
    background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
    border: 1px solid #c1c1c1;
    border-bottom: 1px solid #c1c1c1;
    border-radius: 0;
    max-width: 100%;
    padding: 10px;
    height: 100px;
    padding: 0px;
    border-left: 0;
    border-right: 0;
    border-top: 0;
    width: 100%;
    outline: none;
}

.single-contact-form input::placeholder{
    color : #b71c1c;
    font-weight: bold;
}

.single-contact-form textarea::placeholder{
    color : #b71c1c;
    font-weight: bold;
    line-height: 50px;
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
import { CONTACT} from '@/config'
export default {
    name: 'newsletter-box',
    data: function() {
        return {
            contact: {
                activeOverlay: 0,
                email: null,
                sexe: null
            }
        }
    },
    methods : {
        newsletter(value){
            let app = this;
            this.$validator.validateAll('newsletter-form').then(valid => {
                if(valid){
                    app.$Progress.start();
                    axios.post(CONTACT.DEV_URL + 'newsletter',{
                        email : app.email,
                        sexe : app.sexe
                    })
                    .then(function(response){
                        app.$Progress.finish();
                        app.activeOverlay = false;
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

