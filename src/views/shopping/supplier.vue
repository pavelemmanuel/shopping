<template>
    <div class="cart-main-area section-padding--lg bg--white">
        <vue-progress-bar></vue-progress-bar>    
        <div class="container">
            <div class="row">
                <div class="col-lg-9 col-12 order-1 order-lg-1 card mt-20 mb-20" >
                    <div class="card-body">
                        <h3 class="card-title" style="color:#4c2b11;">Devenez vendeur sur Jours De Joie !</h3>
                        <p class="card-subtitle mb-2 text-muted">Enregistrer et Commencer à Vendre Aujourd’hui sur Jours De Joies.</p>
                        <form action="#" v-on:submit.prevent="store">
                            <div class="form-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">Nom <span class="text-danger">*</span></label>
                                            <input type="text" :class="{'is-danger': errors.has('nom') }" data-vv-as="nom"  v-model="supplier.name" class="form-control" name="nom" v-validate="'required'">
                                            <small class="form-control-feedback text-danger"  v-show="errors.has('nom')"> {{ errors.first('nom') }} </small>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">Numéro(s) de télephone <span class="text-danger">*</span></label>
                                            <the-mask data-vv-as="Numéro(s) de téléphone" :class="{'is-danger': errors.has('tel') }" :mask="['+(###) ## ## ## ## / +(###) ## ## ## ##','+(###) ## ## ## ### / +(###) ## ## ## ###' ]" :masked="true" v-model="supplier.phone_numbers" class="form-control" name="tel" v-validate="'required'" />
                                            <small class="form-control-feedback text-danger"  v-show="errors.has('tel')"> {{ errors.first('tel') }} </small>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">Adresse <span class="text-danger">*</span></label>
                                            <input type="text" data-vv-as="adresse" :class="{'is-danger': errors.has('add') }" v-model="supplier.address" class="form-control" name="add" v-validate="'required'" >
                                            <small class="form-control-feedback text-danger"  v-show="errors.has('add')"> {{ errors.first('add') }} </small>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label class="control-label">Longitude </label>
                                            <input type="text" v-model="supplier.longitude" class="form-control" name="lon" v-validate="''">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label class="control-label">Latitude</label>
                                            <input type="text" v-model="supplier.latitude" class="form-control" name="lat" v-validate="''" >
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">Site web</label>
                                            <input type="text" :class="{'is-danger': errors.has('website') }" data-vv-as="site web" name="website" v-validate="{url: {require_protocol: false }}" v-model="supplier.website" class="form-control" >
                                            <small class="form-control-feedback text-danger"  v-show="errors.has('website')"> {{ errors.first('website') }} </small>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label class="control-label">Compte contribuable</label>
                                            <input type="text" v-model="supplier.cc" class="form-control" >
                                            <small class="form-control-feedback"></small>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label class="control-label">Registre de commerce</label>
                                            <input type="text" v-model="supplier.rcm" class="form-control" >
                                            <small class="form-control-feedback"></small>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">Email <span class="text-danger">*</span></label>
                                            <input type="mail" v-model="user.email" :class="{'is-danger': errors.has('email') }" class="form-control" v-validate="'required|email'" name="email">
                                            <small class="form-control-feedback text-danger"  v-show="errors.has('email')"> {{ errors.first('email') }} </small>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label">Mot de passe <span class="text-danger">*</span></label>
                                            <input type="password" v-model="user.password" :class="{'is-danger': errors.has('password') }" name="password" data-vv-as="mot de passe" v-validate="'required|min:6'" class="form-control">
                                            <small class="form-control-feedback text-danger"  v-show="errors.has('password')"> {{ errors.first('password') }} </small>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                    <input class="input-checkbox" name="createaccount" value="1" type="checkbox" v-model="supplier.tva">
                                    &nbsp;<span>Etes vous exonérer de TVA ?</span>
                                        </div>
                                    </div>
                            </div>
                            <div class="form-actions pt-20">
                                <button type="submit" class="btn-submit">Envoyer</button>
                                &nbsp;<button type="button" class="btn-submit" style="background-color:#e6e6e6;" @click="cancel">Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-3 col-12 order-2 order-lg-2 md-mt-40 sm-mt-40">
					    <div id="accordion" class="checkout_accordion mt--30" role="tablist">
						    <div class="payment">
						        <div class="che__header" role="tab" id="headingOne">
						          	<a class="checkout__title" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
						                <span>Qu'est ce qu'un compte contribuable ?</span>
						          	</a>
						        </div>
						        <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
					            	<div class="payment-body">Le numéro de Compte Contribuable (CC) est un numero unique attribué par la Direction Générale des Impôts (DGI)..</div>
						        </div>
						    </div>
						    <div class="payment">
						        <div class="che__header" role="tab" id="headingTwo">
						          	<a class="collapsed checkout__title" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
							            <span>Qu'est ce qu'un registre de commerce ?</span>
						          	</a>
						        </div>
						        <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
					          		<div class="payment-body">Les personnes physiques ou morales de droit privé comme les personnes de droit public qui se livrent à des opérations commerciales sont immatriculées au "Registre du Commerce et des sociétés" qui est tenu au Greffe des Tribunaux de commerce ou, en l'absence de cette juridiction dans un ressort, par le secrétariat du Tribunal de grande instance. Le Registre est placé la surveillance d'un magistrat commis à cet effet..</div>
						        </div>
						    </div>
						    <div class="payment">
						        <div class="che__header" role="tab" id="headingThree">
						          	<a class="collapsed checkout__title" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
							            <span>Que dois-je utiliser comme nom ?</span>
						          	</a>
						        </div>
						        <div id="collapseThree" class="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
					          		<div class="payment-body">Utiliser le nom de votre entreprise.</div>
						        </div>
						    </div>
					    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    label {
        color: #333;
        display: inline-block;
        font-weight: 500;
        margin: 0 0 8px;
    }
    .btn-submit{
    background: rgb(207, 10, 89) none repeat scroll 0 0;
    border: 0 none;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    height: 40px;
    line-height: 40px;
    padding: 0 25px;
    text-transform: uppercase;
    }

    .form-control:focus {
        border-color: #ebebeb; 
    }

    input[type="text"], input[type="number"], input[type="mail"], input[type="password"],  textarea , select {
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

    .form-control.is-danger{
        border-color : #4c2b11;
    }
</style>
<script>
import axios from 'axios';
import {TheMask} from 'vue-the-mask';
import { SHOPPING , API_PREFIX , API_VERSION } from '@/config';
export default {

    components: {TheMask},
    data : function(){
        return {
            user : {
            email : null,
            password : null,
            },

            supplier: {
                name : null,
                address : null,
                phone_numbers : null,
                latitude : null,
                longitude : null,
                cc : null,
                rcm : null,
                website : null,
                tva : false,
                isactive : false,
                user_id : null
            },
        }
    },
    methods : {
        store : function() {
            let app = this;
            let user = {
                email : app.user.email,
                password : Math.random().toString(36).substring(2),
                role_id :2
            }

            this.$validator.validateAll().then(valid => {
                if(valid){
                app.$Progress.start();
                    axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'users' , user)
                    .then(function(response){
                        app.supplier.user_id = response.data.id;
                        axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'suppliers' , app.supplier)
                        .then(function(response){
                            app.$Progress.finish();
                            app.$router.push({path : '/'} , () => {
                                app.$toasted.success('Votre demande a été prise en compte vous serez contacté bientot');
                            });
                        })
                        .catch(function(error){
                            app.$Progress.finish();
                            alert(error.response.data[0]);
                        })
                    }).catch(error =>{
                        app.$Progress.finish();
                        console.log(error)
                        if(error.response){
                            app.$toasted.error(error.resp)
                        }
                    })            
                }
            });
        },
        cancel(){
            this.$router.push('/')
        }
    }
}
</script>
