<template lang="fr">
    <div>
        <div class="container">
            <div class="row">
                <div class="card mt-20 pb-20 mb-20 col-md-8" >
                    <div class="card-body">
						<spinner size="medium" line-fg-color="#4c2b11" v-if="!loaded"></spinner>
                        <div v-else>
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
                            <div class="d-flex">
                                <div class="text-muted">
                                    <h6 class="mb-10">Commande n° {{ offer.id }}</h6>
                                    <p>{{ offer.service.name }}</p>
                                    <p>Effectuée le {{ offer.created_at | moment("Do-MM-YYYY à HH:MM")}}</p>
                                </div>
                                <div class="ml-auto" v-if="invoice.length > 0">
                                    <p class="text-muted">Devis disponible</p>
                                    <router-link :to="'/shopping/order/invoice/' + invoice[0].id">
                                        <button class="btn-submit-sm">Voir Devis</button>
                                    </router-link>
                                </div>
                            </div>
                            <hr class="mb-20 mt-20">
                            <h6 class="mb-10 font-weight-light">Spécifications de la commande</h6>
                            <form class="pt-20" v-on:submit.prevent="store">
                                <div class="form-group" v-for="(spec , key) in offer.specifications" :key="key">
                                    <label class="control-label">{{ spec.name }} : </label>
                                    <input class="form-control" v-model="spec.pivot.response" type="text"  disabled>
                                </div>
                            </form>
                        </div>
                    </div>
                    <a class="text-center" data-toggle="modal" data-target="#exampleModalCenter" style="cursor:pointer;">Besoin d'aide ?</a>
                </div>
                <div class="card mt-20 pb-20 mb-20 col-md-3 offset-md-1" >
                    <div class="card-body">
                        <div>
                            <h3 class="card-title font-weight-normal">Historique</h3>
                        </div>
                        <p class="card-subtitle mb-2 text-muted">L'historique de votre commande.</p>
                        <hr class="mb-20 mt-20 ">
                        <ul class="timeline">
                            <li v-if="offer.status.length ==0">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aucun status
                            </li>
                            <li v-else v-for="statu in offer.status">
                                <a class="ml-30">{{statu.name}}</a>
                                <a href="#" class="float-right text-muted">{{ statu.pivot.created_at | moment("Do-MM-YYYY HH:MM") }}</a>
                            </li>
                        </ul>
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

    .form-control:focus {
        border-color: #ebebeb; 
    }

    input, textarea , select {
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
    z-index: 400;
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
    .btn-submit-sm{
        background: rgb(207, 10, 89) none repeat scroll 0 0;
        border: 0 none;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        height: 30px;
        line-height: 30px;
        padding: 0 25px;
        text-transform: uppercase;        
    }
</style>

<script>
import axios from 'axios';
import { SHOPPING, API_PREFIX , API_VERSION } from '@/config';
import Spinner from 'vue-simple-spinner'
export default {

	components: {
		Spinner
	},

    data : function(){
        return{
            offer : {
                service : {},
                status : []
            },
            invoice : [],
            loaded : null
        }
    },

    mounted(){
        this.getOffer();
    },

    methods : {
        getOffer(){
            let app = this;
            const token = localStorage.getItem('token');
            axios.get(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'offers/' + this.$route.params.offer_id , {
              headers: {
                  Authorization: 'Bearer ' + token
              } 
            })
            .then(function(response){
                app.offer = response.data;
                app.invoice = app.offer.invoices.filter( invoice => invoice.forwarded == 1);
                app.loaded = true;
            })
            .catch(function(error){
                console.log(error);
                app.loaded = true;
            })
        }
    },

}
</script>

