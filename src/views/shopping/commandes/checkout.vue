<template>
    <div class="wn__checkout__area section-padding--lg bg__white">
        <div id="overlay" :class="{active : activeOverlay}" @click.self="activeOverlay = false">
            <div class="modal-box">
                <div class="modal-dialog-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Ajouter une nouvelle addresse</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" @click="activeOverlay=false;">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form data-vv-scope="add">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label>Addresse <span class="text-danger">*</span></label>
                                            <div class="form-group">
                                                <input type="text" class="form-control" v-validate="'required'" v-model="location" data-vv-as="ville" name="location" placeholder="Ville" :class="{'is-danger': errors.has('add.location')}">
                                            </div>
                                            <div class="input_box">
                                                <textarea name="exact_location" class="form-control" v-validate="'required'" id="" v-model="exact_location" placeholder="Localisation exacte" cols="30" rows="10" :class="{'is-danger': errors.has('add.exact_location')}"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="control-label">Téléphone <span class="text-danger">*</span></label>
                                                <the-mask data-vv-as="Numéro(s) de téléphone" :class="{'is-danger': errors.has('add.tel') }" v-model="phone_numbers" :mask="['+(###) ## ## ## ##','+(###) ## ## ## ##' ]" :masked="true" class="form-control" name="tel" v-validate="'required'" />
                                                <small class="form-control-feedback text-danger"  v-show="errors.has('add.tel')"> {{ errors.first('add.tel') }} </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button @click="addAddresse" class="btn-block third-button">ENREGISTRER</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-12">
                    <h3>Finaliser votre commande</h3>
                    <div class="holder mt-20">
                        <div class="clearfix"></div>
                        <form action="#" v-on:submit.prevent="store">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="steps-progress pb--30">
                                        <ul class="nav nav-tabs justify-content-between">
                                            <li class="nav-item" style="padding-right:30px;"><a class="nav-link" :class="{active : !next}" @click="stepOne()" data-toggle="tab" href="#step1" data-step="1"><span>01.</span><span>Addresse de livraison</span></a></li>
                                            <li class="nav-item"><a class="nav-link" :class="{disabled : errors.has('selectadd-form.selectadd') , active : next}" @click="stepTwo()" data-toggle="tab" href="#step2" data-step="2"><span>02.</span><span>Moyen de Paiement</span></a></li>
                                        </ul>
                                        <div class="progress">
                                            <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="2" aria-valuemin="1" aria-valuemax="2" v-bind:style="{width: progress}"></div>
                                        </div>
                                    </div>
                                    <div class="tab-content">
                                        <div class="tab-pane fade" :class="{show : !next , active : !next}" id="step1">
                                            <form class="customar__field pb--20" data-vv-scope="selectadd-form">
                                                <div class="input_box pb--20">
                                                    <div class="d-flex space-between">
                                                        <label>Sélectionnez votre addresse<span>*</span></label>
                                                        <label><i class="lnr lnr-plus-circle"></i> <a @click="activeOverlay=true" style="cursor:pointer;"> Ajouter une addresse</a></label>
                                                    </div>
                                                    <select v-validate="'required'" data-vv-as="addresse" name="selectadd" class="select__option" v-model="selectedAddress">
                                                        <option :value="null">Selectionnez une addresse…</option>
                                                        <option v-for="(addresse , key) in addresses" :value="addresse" :key="key">{{ addresse.exact_location}}</option>
                                                    </select>
                                                    <small style="margin:10px;" class="form-control-feedback text-danger"  v-show="errors.has('selectadd-form.selectadd')"> {{ errors.first('selectadd-form.selectadd') }} </small>
                                                </div>
                                                <div class="input_box pb--10">
                                                    <label>Addresse <span>*</span></label>
                                                    <input v-if="selectedAddress" type="text" placeholder="Ville" :value="selectedAddress.location" readonly>
                                                </div>
                                                <div class="input_box pb--20">
                                                    <input type="text" v-if="selectedAddress" placeholder="Addresse Exact" :value="selectedAddress.exact_location" readonly>
                                                </div>
                                                <div class="margin_between">
                                                    <div class="input_box space_between">
                                                        <label>Téléphone <span>*</span></label>
                                                        <input v-if="selectedAddress" type="text" :value="selectedAddress.phone_numbers" readonly>
                                                    </div>
                                                </div>
                                            </form>
                                            <div class="text-right">
                                                <button type="button" @click="stepTwo()" class="third-button step-next" :style="{cursor : errors.has('selectadd-form.selectadd') ? 'not-allowed' : ''}" :disabled="errors.has('selectadd-form.selectadd')">Suivant</button>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" :class="{show : next , active : next}" id="step2">
                                            <div class="tab-pane-inside">
                                                <div>
                                                    <h6 class="fz-14">Quel moyen de paiement souhaitez vous utilisez ?</h6>
                                                    <div class="d-flex flex-column mt--20" >
                                                        <div class="d-flex flex-row pb--20 mb--20" style="border-bottom:1px solid #ccc;">
                                                            <div class="col-2"> 
                                                                <input type="radio" name="pay" id="cash" v-model="payment_method" value="cash">
                                                                <label for="cash"></label>
                                                            </div>
                                                            <div class="pb--20">
                                                                <img src="/img/shopping/cashpay.png" alt="cash pay"/>&nbsp;
                                                                <span class="font-weight-bold">Paiement à la livraison</span>
                                                                <p>Réglez vos achats en espèces directement à la livraison. Nous n'acceptons que le Franc CFA</p>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex flex-row pt--30 mb--20" style="border-bottom:1px solid #ccc;">
                                                            <div class="col-2">
                                                                <input type="radio" name="pay" id="ompay" v-model="payment_method" value="orange">&nbsp;&nbsp;
                                                                <label for="ompay"></label>
                                                            </div>
                                                            <div class="pb--20">
                                                                <img src="/img/shopping/ompay.png" alt="cash pay"/>&nbsp;
                                                                <span class="font-weight-bold">Orange Money</span>
                                                                <p>Payez en toute sécurité à partir de votre compte Orange Money</p>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex flex-row pt--30 mb--20" style="border-bottom:1px solid #ccc;">
                                                            <div class="col-2">
                                                                <input type="radio" name="pay" id="mtnpay" v-model="payment_method" value="mtn">&nbsp;&nbsp;
                                                                <label for="mtnpay"></label>
                                                            </div>
                                                            <div class="pb--20">
                                                                <img src="/img/shopping/mtnpay.png" alt="cash pay"/>&nbsp;
                                                                <span class="font-weight-bold">Momo</span>
                                                                <p>Payez en toute sécurité avec mtn mobile money</p>
                                                                <div v-show="payment_method == 'mtn'">
                                                                    <form class="input_box" data-vv-scope="momo">
                                                                        <label class="font-weight-bold">Votre numéro de Téléphone mtn money <span>*</span></label>
                                                                        <the-mask data-vv-as="Numéro de téléphone" placeholder="+(225) 44 88 20 03" v-model="pay_number" :mask="['+(###) ## ## ## ##']" :masked="false" class="form-control" name="tel" v-validate />
                                                                        <small class="form-control-feedback text-danger"  v-show="errors.has('momo.tel')"> {{ errors.first('momo.tel') }} </small>
                                                                    </form>
                                                                </div>
                                                                <div v-show="payment_method == 'mtn'" class="description fz-13">  <!--<img src="https://static.jumia.ci/cms/BF18/CI_W44_LP_BF18-checkout-paiement_2.png" alt=""/>-->
                                                                    <br>
                                                                    <span class="font-weight-bold">Suivez les étapes suivantes pour finaliser le paiement:</span>
                                                                    <ol style="padding-left :30px; margin-bottom : 20px;" class="text-muted" >
                                                                        <li>1. Saisissez votre numéro MTN dans le champ ci-dessus.</li>
                                                                        <li>2. Cliquez sur <span class="font-weight-bold">CONFIRMER LA COMMANDE</span> ;</li>
                                                                        <li>3. Acceptez la notification reçue sur votre téléphone en entrant le chiffre <b>1 </b>pour vous identifier. (<i>Vous avez une minute pour l'accepter).</i></li>
                                                                        <li>4. Répondez au SMS qui vous est envoyé en composant <b>*133# </b>pour approuver la demande de paiement.(<i>Vous avez 3 minutes pour répondre</i>).</li>
                                                                        <li>5. Confirmer le paiement en saisissant votre code secret MTN Mobile Money dans le menu qui s’ouvre sur votre téléphone.</li>
                                                                    </ol>
                                                                    Si vous n'effectuez pas une de ces étapes, votre commande Jour de joie sera annulée.<br>Le paiement MTN Mobile Money est 100% sécurisé et votre code secret n’est pas communiqué à Jours de joie.<br>
                                                                    <br>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex flex-row pt--30 mb--20" style="border-bottom:1px solid #ccc;">
                                                            <div class="col-2">
                                                                <input type="radio" name="pay" id="xikkapay" v-model="payment_method" value="xikka">&nbsp;&nbsp;
                                                                <label for="xikkapay" ></label>
                                                            </div>
                                                            <div class="pb--20">
                                                                <img src="/img/shopping/xikkapay.png" alt="cash pay" width="100px"  />&nbsp;
                                                                <span class="font-weight-bold">xikka Pay</span>
                                                                <p>Réglez vos achats en espèces directement à la livraison. Nous n'acceptons que les Francs CFA</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button class="third-button btn-block mt--20" type="submit" v-if="cart.length > 0">
                                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        FINALISER LA COMMANDE
                                                    </button>
                                                    <div v-else>
                                                        Vous n'avez aucun produit dans votre panier pour poursuivre cette opération <router-link to="/shopping" class="font-weight-bold">Continuez vos acahats</router-link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-6 col-12 md-mt-40 sm-mt-40">
                    <div class="wn__order__box">
                        <h3 class="onder__title">Votre Commande</h3>
                        <ul class="order__total">
                            <li>Article</li>
                            <li>Total</li>
                        </ul>
                        <ul class="order_product">
                            <li v-for="(product , key) in products" :key="key">
                                <img v-if="product.image != null" width="50px" :src="SHOPPING.DEV_URL + '' + product.image.split(';')[0].toString()" alt="product images">
                                <img v-else src="images/product/sm-3/1.jpg" alt="product img">
                                &nbsp;{{ product.name | truncate(30) }} × {{ cart[key].quantity}}
                                <span>{{ product.price *  cart[key].quantity | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true }) }}</span>
                            </li>
                        </ul>
                        <ul class="total__amount">
                            <li>Montant Total <span>{{ total | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true })}}</span></li>
                        </ul>
                    </div>
                    <div id="accordion3" class="checkout_accordion mt--30" role="tablist">
                        <div class="payment">
                            <div class="che__header" role="tab" id="headingOne">
                                <a class="checkout__title" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <span>Payement cash à la livraison</span>
                                </a>
                            </div>
                            <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion3">
                                <div class="payment-body">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</div>
                            </div>
                        </div>
                        <div class="payment">
                            <div class="che__header" role="tab" id="headingTwo">
                                <a class="collapsed checkout__title" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <span>Orange Money</span>
                                </a>
                            </div>
                            <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion3">
                                <div class="payment-body">Please send your cheque to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</div>
                            </div>
                        </div>
                        <div class="payment">
                            <div class="che__header" role="tab" id="headingThree">
                                <a class="collapsed checkout__title" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <span>Mtn Money</span>
                                </a>
                            </div>
                            <div id="collapseThree" class="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion3">
                                <div class="payment-body">Pay with cash upon delivery.</div>
                            </div>
                        </div>
                        <div class="payment">
                            <div class="che__header" role="tab" id="headingFour">
                                <a class="collapsed checkout__title" data-toggle="collapse" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    <span>PayPal <img src="/images/icons/payment.png" alt="payment images"> </span>
                                </a>
                            </div>
                            <div id="collapseFour" class="collapse" role="tabpanel" aria-labelledby="headingFour" data-parent="#accordion3">
                                <div class="payment-body">Pay with cash upon delivery.</div>
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
  position: fixed;
  width: 100%;
  height: 100%;
  display: none;
  top: 0; 
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0 , 0.2);
  z-index: 20000;
  cursor: crosshair;
}
a.disabled {
    pointer-events: none;
}

#overlay.active{
    display : block;
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
textarea {
    padding : 20px;
    height: 90px;

}
.modal-box{
    position : absolute;
    top : 50%;
    left: 50%;
  transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
}
.form-control.is-danger{
    border-color : #4c2b11;
}
.progress-bar{
    transition: width 0.5s ease-in-out;
}
input[type="checkbox"], input[type="radio"] {
  display: none; }

input[type="checkbox"]:active + label:before, input[type="radio"]:active + label:before {
  transition-duration: 0s; }

input[type="checkbox"] + label, input[type="radio"] + label {
  font-size: 13px;
  font-weight: normal;
  line-height: 24px;
  margin: 0 10px 12px 0;
  min-width: 100px;
  padding-left: 30px;
  position: relative; }

input[type="checkbox"] + label:before, input[type="checkbox"] + label:after, input[type="radio"] + label:before, input[type="radio"] + label:after {
  box-sizing: content-box;
  content: '';
  display: block;
  left: 0;
  position: absolute; }

input[type="checkbox"] + label:before, input[type="radio"] + label:before {
  transition: background-color 0.2s;
  background-color: #fff;
  border-color: #e2e2e2;
  border-style: solid;
  border-width: 1px;
  height: 20px;
  text-align: center;
  top: 1px;
  width: 20px; }

input[type="checkbox"] + label:hover:before, input[type="radio"] + label:hover:before {
  background-color: #f8f8f8; }

input[type="checkbox"] + label:after, input[type="radio"] + label:after {
  transition: transform 0.2 ease-out;
  height: 10px;
  left: 6px;
  top: 7px;
  transform: scale(0);
  transform-origin: 50%;
  width: 10px; }

input[type="radio"] + label:after {
  background-color: #4c2b11; }

input[type="radio"]:checked + label:before {
  animation: borderscale 300ms ease-in;
  background-color: #fff;
  -moz-animation: borderscale 300ms ease-in;
  -webkit-animation: borderscale 300ms ease-in; }

input[type="radio"]:checked + label:after {
  transform: scale(1); }

input[type="radio"] + label:before, input[type="radio"] + label:after {
  border-radius: 50%; }

input[type="checkbox"] + label:after {
  transform: rotate(-45deg) scale(0);
  transition: none;
  background-color: transparent;
  border-color: #000;
  border-style: solid;
  border-width: 0 0 2px 2px;
  height: 4px;
  left: 6px;
  top: 7px;
  width: 9px; }

input[type="checkbox"]:checked + label:before {
  animation: borderscale .2s ease-in;
  -moz-animation: borderscale .2s ease-in;
  -webkit-animation: borderscale .2s ease-in; }

input[type="checkbox"]:checked + label:after {
  transform: rotate(-45deg) scale(1);
  transition: transform 0.2s ease-out;
  content: ''; }
.steps-progress .nav-tabs {
-ms-flex-wrap: nowrap;
    flex-wrap: nowrap; }
@media screen and (max-width: 479px) {
.steps-progress .nav-tabs {
-ms-flex-wrap: wrap;
    flex-wrap: wrap;
margin-bottom: 10px;
border: 0; } }

.steps-progress .nav-tabs:not(.tab-category) > li {
max-width: 25%; }
@media screen and (max-width: 479px) {
    .steps-progress .nav-tabs:not(.tab-category) > li {
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    max-width: 100%;
    width: 100%;
    margin-bottom: 10px; } }

.steps-progress .nav-tabs:not(.tab-category) > li .nav-link {
display: -ms-flexbox;
display: flex;
padding: 10px 0;
font-size: 14px;
line-height: 16px;
font-weight: 600;
text-transform: uppercase;
text-align: inherit;
border: 0;
background-color: transparent;
transition: 0.2s; }
@media screen and (max-width: 479px) {
    .steps-progress .nav-tabs:not(.tab-category) > li .nav-link {
    -ms-flex-align: center;
    -moz-align-items: center;
    align-items: center; } }
.steps-progress .nav-tabs:not(.tab-category) > li .nav-link:hover, .steps-progress .nav-tabs:not(.tab-category) > li .nav-link:focus, .steps-progress .nav-tabs:not(.tab-category) > li .nav-link:active, .steps-progress .nav-tabs:not(.tab-category) > li .nav-link.active {
    padding: 10px 0;
    border: 0;
    background-color: transparent; }
    .steps-progress .nav-tabs:not(.tab-category) > li .nav-link:hover:after, .steps-progress .nav-tabs:not(.tab-category) > li .nav-link:focus:after, .steps-progress .nav-tabs:not(.tab-category) > li .nav-link:active:after, .steps-progress .nav-tabs:not(.tab-category) > li .nav-link.active:after {
    display: none; }
.steps-progress .nav-tabs:not(.tab-category) > li .nav-link:not(.active) {
    opacity: .3; }
.steps-progress .nav-tabs:not(.tab-category) > li .nav-link:hover {
    opacity: 1; }
.steps-progress .nav-tabs:not(.tab-category) > li .nav-link span:first-child {
    position: relative;
    top: 3px;
    padding: 0 8px;
    font-size: 36px;
    font-weight: 400; }
    @media screen and (max-width: 479px) {
    .steps-progress .nav-tabs:not(.tab-category) > li .nav-link span:first-child {
        top: -4px;
        font-size: 30px; } }

.steps-progress .progress {
margin-top: -1px;
height: 4px;
border-radius: 0; }

.steps-progress .progress-bar {
background-color: #4c2b11; }


</style>

<script>
import axios from 'axios';  
import {TheMask} from 'vue-the-mask';
import {API_PREFIX , API_VERSION , SHOPPING , PAYMENT , CARNET_NUPTIAL_URL_API, STATUS_COMMANDE , STATUS_PAYEMENT_PENDING , STATUS_PAYEMENT_SUCCESS , XIKKA_API_KEY,  STATUS_PAYEMENT_DENIED} from '@/config'
export default {

    components: {TheMask},
    data : function(){
        return{
            cart : [],
            products : [],
            total_price : 0,
            location: null,
            exact_location : null,
            phone_numbers : null,
            addresses : [],
            selectedAddress : {},
            activeOverlay : false,
            SHOPPING : SHOPPING,
            payment_method : 'cash',
            next : false,
            pay_number : null,
            progress :'50%'
        }
    },


    mounted (){
        this.getCart();
        this.getProducts();
        this.getAddresses();
    },

    computed : {
        total (){
            this.total_price = 0;
            if(this.products){
                this.products.forEach((element , index) => {
                    this.total_price +=  (element.price * this.cart[index].quantity);
                })
            }
            return Math.round(this.total_price);
        },

        customer_id (){
            return this.$store.state.customer_id;
        }
    },

    methods : {
        getCart(){
            if(localStorage.product_id){
                this.cart = JSON.parse(localStorage.product_id);
            }
        },

        getProducts(){
            let app = this;
            this.$Progress.start();
            app.$Progress.start();
            if(this.cart.length == 0){
                app.$Progress.finish();
            }else{
                app.cart.forEach((element , key) => {
                    axios.get(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'products/' + element.product_id)
                        .then(function(response){
                            app.products.push(response.data);
                            if(key +1  == app.cart.length)
                            app.$Progress.finish();
                        })
                        .catch(function(error){
                            app.$Progress.fail();
                            console.log(error);
                        })
                    
                });
            }
        },

        getAddresses(){
            let app = this;
            const token = localStorage.getItem('token');      
            axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'addressesfiltered', {
                customer_id : app.customer_id
            } , {
              headers: {
                  Authorization: 'Bearer ' + token
              } 
            })
            .then(function(response){
                app.addresses = response.data;
                const selected = app.addresses.filter(addresse => addresse.is_default == 1);
                app.selectedAddress = selected[0];
                app.$Progress.finish();
            })
            .catch(function(error){
                console.log(error);
            })
        },
    
        stepOne(){
            this.progress = '50%';
            this.next = false;
        },

        stepTwo(){
            this.progress = '100%';
            this.next = true;
        },

        store(){
            let app = this;
            app.$Progress.start();
            let token = localStorage.getItem('token');  
            let order_id;
            axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'orders' , {
                customer_id : app.customer_id,
                addresse_id : app.selectedAddress.id,
                current_status : STATUS_COMMANDE
            }, {
              headers: {
                  Authorization: 'Bearer ' + token
              } 
            })
            .then(function(response){
                order_id = response.data.id;
                let offer_id = response.data.id;
                axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'order_status' , {
                    order_id : order_id,
                    status_id : STATUS_COMMANDE
                } , {
                    headers: {
                        Authorization: 'Bearer ' + token
                    } 
                })
                .then(function(res){
                    app.products.forEach((e , index) => {
                        axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'order_specs' , {
                            quantity : app.cart[index].quantity,
                            product_id : e.id,
                            order_id :  order_id
                        } , {
                            headers: {
                                Authorization: 'Bearer ' + token
                            } 
                        })
                        .then(function(resp){
                            if(index == app.products.length -1){
                                localStorage.removeItem('product_id');
                                app.$store.commit('raz');
                                if(app.payment_method == 'mtn'){
                                    app.payMtn(order_id);
                                }else if(app.payment_method == 'xikka'){
                                    app.payXicca(order_id);
                                }else if(app.payment_method == 'cash'){
                                    app.payCash(order_id);
                                }
                            }
                            app.$Progress.finish();       
                        })
                        .catch(function(err){
                            console.log(err);
                            alert('Oups somethig went wrong');
                        })
                    })
                })
                .catch(function(er){
                    console.log(er);
                    alert('Oups la modification de l\'historique des status de la requète a échoué');                   
                })  
            })
            .catch(function(error){
                console.log(error);
                alert('Oups somethings went wrong')
            })
        },



        payMtn(order_id){
            let app = this;
            let token = localStorage.getItem('token');
            axios.post(PAYMENT.DEV_URL + API_PREFIX + API_VERSION + "payment/momo" , {
                MSISDN : app.pay_number,
                Reference : order_id ,
                Amount : app.total,
                MetaData : 'marketplace'
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                } 
            }).then(response => {
                if(response.data.ResponseCode == 1000){
                    axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'order_status' ,{
                        order_id: order_id,
                        status_id : STATUS_PAYEMENT_PENDING
                    } , {
                        headers: {
                            Authorization: 'Bearer ' + token
                        } 
                    }).then(function(){
                        app.$Progress.finish();
                        app.$router.push({path : '/shopping/order/product/show/' + order_id} , () => {
                            app.$toasted.show('Paiement En attente');
                        });   
                    }).catch(function(error){
                        console.log(error);
                    });              
                }else if(response.data.ResponseCode ==529){
                    axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'order_status' ,{
                        order_id: order_id,
                        status_id : STATUS_PAYEMENT_DENIED
                    } , {
                        headers: {
                            Authorization: 'Bearer ' + token
                        } 
                    }).then(function(){
                        app.$Progress.finish();
                        app.$router.push({path : '/shopping/order/product/show/' + order_id} , () => {
                            app.$toasted.show('Paiement effectuer avec succès');
                        });   
                    }).catch(function(error){

                    });                                   
                }else{
                    axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'order_status' ,{
                        order_id: order_id,
                        status_id : STATUS_PAYEMENT_DENIED
                    } ,{
                        headers: {
                            Authorization: 'Bearer ' + token
                        }                     
                    }).then(function(){
                        app.$Progress.finish();
                        app.$router.push({path : '/shopping/order/product/show/' + order_id} , () => {
                            app.$toasted.show('Paiement effectuer avec succès');
                        });   
                    }).catch(function(error){

                    }); 
                }
            }).catch(error => {
                alert('Oups une erreur c\'est produite lors du paiement mtn');
            })
        },

        payXicca(order_id){
            let app = this;
            let token = localStorage.getItem('token');
            axios.post(PAYMENT.DEV_URL + API_PREFIX + API_VERSION + "payment/xikka" , {
                reference : order_id,
                montant : app.total,
            } , {
                headers: {
                    Authorization: 'Bearer ' + token
                } 
            }).then(response => {
                document.location.href = 'https://preprod.xikka.net/paiement_marchands/confirm_from_api?api_key=' + XIKKA_API_KEY + '&request_content=' + response.data;
            }).catch(error => {
                alert('Oups une erreur c\'est produite lors du paiement XC');
            })
        },

        payCash(order_id){
            let app = this;
            let payment_id ;
            let token = localStorage.getItem('token');
            axios.post(PAYMENT.DEV_URL + API_PREFIX + API_VERSION + "payment" , {
                transaction_id : order_id,
                amount : app.total,
                payment_method : 'CASH',
            } , {
                headers: {
                    Authorization: 'Bearer ' + token
                }            
            }).then(response => {
                payment_id = response.data.id;
                axios.put(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'orders/' + order_id , {
                    payment_id : payment_id
                } , {
                    headers : {
                        Authorization: 'Bearer ' + token
                    }
                }).then(response => {
                    app.$router.push({path : '/shopping/order/product/show/' + order_id} , () => {
                        app.$toasted.show('Paiement En attente');
                    }); 
                }).catch(error => {
                    console.log(error);
                })
            }).catch(error => {
                alert('Oups une erreur c\'est produite lors du paiement CASH');
            });
        },

        addAddresse(){
            let app = this;
            const token = localStorage.getItem('token');
            this.$validator.validateAll('add').then(valid => {
                if(valid){
                    axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'addresses', {
                        location : app.location,
                        exact_location : app.exact_location,
                        phone_numbers : app.phone_numbers,
                        is_default : false,
                        customer_id : app.customer_id
                    } , {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }                        
                    }).then(function(response){
                        app.$toasted.success('Addresse ajouté avec succès');
                        app.activeOverlay = false;
                        app.getAddresses();
                    }).catch(function(error){
                        console.log(error);
                        alert('Oups something went wrong');
                    })
                }
            })
        }
    }
}
</script>
