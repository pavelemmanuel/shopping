<template lang="fr">
    <div>
        <div class="container">
            <div class="row" v-if="!isLoading">
                <div class="card mt-20 pb-20 mb-20 col-md-8" >
                    <div class="card-body">
                        <div>
                            <h3 class="card-title font-weight-normal">
                                <router-link to="/order"><i class="fa fa-arrow-left"  style="color:black; font-weight:none;"></i>
                                    <span> </span>
                                </router-link>&nbsp;Détails de la commande
                            </h3>
                            <router-link to="" class="float-right card-link">Voir Plus ></router-link>
                        </div>
                        <p class="card-subtitle mb-2 text-muted">Vous trouverez ici vos commandes passées depuis la création de votre compte.</p>
                        <hr class="mb-20 mt-20 ">
                        <div class="text-muted">
                            <h6 class="mb-10">Commande n° {{ order.id }}</h6>
                            <p>{{ order.products.length }} {{ order.products.length | pluralize('article')}}</p>
                            <p>Effectuée le {{ order.created_at | moment("Do-MM-YYYY à HH:MM")}}</p>
                            <p>Total : {{ totalHT | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true }) }} </p>
                        </div>
                        <hr class="mb-20 mt-20">
                        <h6 class="mb-10 font-weight-light">ARTICLE DANS VOTRE COMMANDE</h6>
                        <div class="alert alert-danger" v-if="order.products.length == 0">Aucun article dans la commande</div>
                        <div class="card mt-20 p-x-15" v-else v-for="(product , key ) in order.products" :key="key">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-3">
                                        <img width="104px" height="104px;" v-if="product.image != null" :src="SHOPPING.DEV_URL + '' + product.image.split(';')[0].toString()" alt="product images">
                                        <img width="104px" height="104px;" v-else src="images/product/sm-3/1.jpg" alt="product img">
                                    </div>
                                    <div class="col-md-8 card-text">
                                        <p class="mb-20">{{ product.name }}</p>
                                        <p class="text-muted">QUANTITE : <span class="font-weight-normal">{{ product.pivot.quantity }}</span></p>
                                        <p class="font-weight-bold">{{ product.price | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true })}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container mt--20">
                            <div class="row">
                                <div class="card col-md" v-if="order.payment">
                                    <div class="card-body">
                                        <h5 class="card-title pb--20" style="border-bottom:1px solid #ccc;">Payement</h5>
                                        <h6 class="fz-15 text-muted">Methode de Paiement</h6>
                                        <p>{{ order.payment.payment_method }}</p>
                                        <h6 class="fz-15 text-muted mt--20">Détails de paiement</h6>
                                        <p><span class="font-weight-bold">Montant : </span>{{ order.payment.amount | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true } ) }}</p>
                                        <p><span class="font-weight-bold">Date : </span>{{ order.payment.created_at |  moment("Do/MM/YYYY HH:MM") }}</p>
                                    </div>
                                </div>
                                <div class="col-md-1" v-if="order.payment"></div>
                                <div class="card col-md" v-if="order.addresse">
                                    <div class="card-body">
                                        <h5 class="card-title pb--20" style="border-bottom:1px solid #ccc;">Livraison</h5>
                                        <p><span class="font-weight-bold">Addresse : </span>{{ order.addresse.location }}</p>
                                        <p><span class="font-weight-bold">Addresse exacte : </span>{{ order.addresse.exact_location }}</p>
                                    </div>
                                </div> 
                            </div>
                        </div>                      
                    </div>
                </div>
                <div class="card mt-20 pb-20 mb-20 col-md-3 offset-md-1" >
                    <div class="card-body">
                        <div>
                            <h3 class="card-title font-weight-normal">Historique</h3>
                        </div>
                        <p class="card-subtitle mb-2 text-muted">L'historique de votre commande.</p>
                        <hr class="mb-20 mt-20 ">
                        <ul class="timeline">
                            <li v-for="statu in order.status" class="pb--20">
                                <a class="ml-30">{{statu.name}}</a>
                                <a href="#" class="float-right text-muted">{{ statu.pivot.created_at | moment("Do-MM-YYYY HH:MM") }}</a>
                            </li>
                        </ul>
                    </div>
                </div>   
            </div>
            <div class="mt-20" v-else>
                <spinner size="medium" line-fg-color="#4c2b11" ></spinner>
            </div>
        </div>
    </div>
    </div>
</template>
<style scoped>
ul.timeline {
    list-style-type: none;
    position: relative;
}
ul.timeline:before {
    content: ' ';
    background: #d4d9df;
    display: inline-block;
    position: absolute;
    left: 29px;
    width: 2px;
    height: 100%;
}
ul.timeline > li {
    margin: 20px 0;
    padding-left: 20px;
}
ul.timeline > li:before {
    content: ' ';
    background: white;
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    border: 3px solid #22c0e8;
    left: 20px;
    width: 20px;
    height: 20px;
    z-index: 400;
}
</style>

<script>
import axios from 'axios';
import { SHOPPING , API_PREFIX, API_VERSION } from '@/config';
import Spinner from 'vue-simple-spinner'
export default {
    components : {
        Spinner
    },

    data : function(){
        return{
            order : {
                products : [],
            },
            total_price : 0,
            SHOPPING : SHOPPING,
            isLoading : true
        }
    },

    mounted(){
        this.getOrder();
    },

    methods : {
        getOrder(){ 
            let app = this;
            app.isLoading = true;
            const token = localStorage.getItem('token');
            axios.get(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'orders/' + app.$route.params.order_id , {
                headers: {
                  Authorization: 'Bearer ' + token
                } 
            })
            .then(function(response){
                app.order = response.data;
                app.isLoading = false;
            })
            .catch(function(error){
                app.isLoading = false;
                console.log(error);
            })
        }
    },

    computed : {
        totalHT (){
            if(this.order.products){
                this.order.products.forEach(element => {
                    this.total_price +=  (element.price * element.pivot.quantity);
                })
            }
            return Math.round(this.total_price);
        },

        tax (){
            return Math.round((this.total_price * this.tva )/100);
        }
    },

}
</script>

