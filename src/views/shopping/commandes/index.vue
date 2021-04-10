<template lang="fr">
    <div class="cart-main-area section-padding--lg bg--white">
        <vue-progress-bar></vue-progress-bar>    
        <div class="container">
            <div class="row">
                <Sidebar :selected="0">
                </Sidebar>
                <div class="col-lg-9 col-12 order-1 order-lg-2 card mt-20 mb-20 product__info__detailed" >
                        <div class="pro_details_nav nav justify-content-start" role="tablist">
                            <!-- <a class="nav-item nav-link active" data-toggle="tab" href="#init" role="tab">Commandes initiées</a> -->
                            <a class="nav-item nav-link" data-toggle="tab" href="#all" role="tab">Toute vos commandes</a>
                            <!-- <div class="ml-auto d-flex flex-md-nowrap">
                                <p class="font-weight-bold">Trier</p>&nbsp;
                                <select v-model="sort" style="height:30px;">
                                    <option value="all">Toutes les commandes</option>
                                    <option :value="statu.name" v-for="(statu , key) in status">{{ statu.name }}</option>
                                </select>
                            </div> -->
                        </div>
                        <!-- <div class="pro__tab_label tab-pane show fade active" id="init" role="tabpanel">
                            <div class="card-body">
                                <h3 class="card-title">Commandes initiées ({{ articles_start.length }})</h3>
                                <p class="card-subtitle mb-2 text-muted">Vous trouverez ici vos commandes passées depuis la création de votre compte.</p>
                                <div class="alert alert-danger" v-if="articles_start.length == 0"> Aucune Commande</div>
                                <div class="card mt-20 p-x-15" v-else v-for="(article , key ) in orderBy(articles_start , 'created_at' , -1)" :key="key">
                                    <div class="container">
                                        <div class="ribbon red" v-if="article.service_id != null"><span>Service</span></div>
                                        <div class="ribbon blue" v-else><span>Produit</span></div>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <img width="104px" height="104px;" v-if="article.service_id!= null && article.service.image !=null" :src="SHOPPING.DEV_URL + '' + article.service.image.split(';')[0].toString()" alt="product images">
                                                <img width="104px" height="104px;" v-else src="images/product/sm-3/1.jpg" alt="product img">
                                            </div>
                                            <div class="col-md-8 card-text" >
                                                <p v-if="article.service_id !=null">{{ article.service.name }}</p>
                                                <p v-else><span v-for="product in article.products">{{ product.name +' | ' | truncate(30)}}</span></p>
                                                <p class="text-muted">{{ article.created_at | moment("Do-MM-YYYY HH:MM") }}</p>                            
                                                <div class="mt-10" style="vertical-align:bottom;">
                                                    <span class="text-uppercase text-muted" style="color:green;" v-if="article.current_status">{{ article.current_status.name}}</span>
                                                    <router-link v-if="article.service_id != null" :to="'/order/service/show/' + article.id" class="float-right card-link text text-info">Voir les détails</router-link>
                                                    <router-link v-else :to="'/shopping/order/product/show/' + article.id" class="float-right card-link text text-info">Voir les détails</router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <div class="pro__tab_label tab-pane fade show active" id="all" role="tabpanel">
                            <spinner size="medium" line-fg-color="#4c2b11" v-if="!loaded"></spinner>
                            <div class="card-body" v-else>
                                <h3 class="card-title">Toute les Commandes ({{ articles.length }})</h3>
                                <p class="card-subtitle mb-2 text-muted">Vous trouverez ici vos commandes passées depuis la création de votre compte.</p>
                                <div class="alert alert-danger" v-if="articles.length == 0"> Aucune Commande</div>
                                <div class="card mt-20 p-x-15" v-else v-for="(article , key ) in orderBy(articles , 'created_at' , -1)" :key="key">
                                    <div class="container">
                                        <div class="ribbon red" v-if="article.service_id != null"><span>Service</span></div>
                                        <div class="ribbon blue" v-else><span>Produit</span></div>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <img width="104px" height="104px;" v-if="article.service_id!= null && article.service.image !=null" :src="SHOPPING.DEV_URL + '' + article.service.image.split(';')[0].toString()" alt="product images">
                                                <img width="104px" height="104px;" v-else-if="article.products.length > 0 && article.products[0].image !=null" :src="SHOPPING.DEV_URL + '' + article.products[0].image.split(';')[0].toString()" alt="product images">
                                                <img width="104px" height="104px;" v-else src="images/product/sm-3/1.jpg" alt="product img">
                                            </div>
                                            <div class="col-md-8 card-text" >
                                                <p v-if="article.service_id !=null">{{ article.service.name }}</p>
                                                <p v-else><span v-for="product in article.products">{{ product.name +' | ' | truncate(30)}}</span></p>
                                                <p class="text-muted">{{ article.created_at | moment("Do-MM-YYYY HH:MM") }}</p>                            
                                                <div class="mt-10" style="vertical-align:bottom;">
                                                    <span class="text-uppercase text-muted" style="color:green;" v-if="article.current_status">{{ article.current_status.name}}</span>
                                                    <router-link v-if="article.service_id != null" :to="'/shopping/order/service/show/' + article.id" class="float-right card-link text text-info">Voir les détails</router-link>
                                                    <router-link v-else :to="'/shopping/order/product/show/' + article.id" class="float-right card-link text text-info">Voir les détails</router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
select{
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    float: none;
    width: auto;
}
.ribbon {
   position: absolute;
   right: -5px; top: -5px;
   z-index: 1;
   overflow: hidden;
   width: 75px; height: 75px; 
   text-align: right;
}
.ribbon span {
   font-size: 10px;
   color: #fff; 
   text-transform: uppercase; 
   text-align: center;
   font-weight: bold; line-height: 20px;
   transform: rotate(45deg);
   width: 100px; display: block;
   background: #79A70A;
   background: linear-gradient(#9BC90D 0%, #79A70A 100%);
   box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
   position: absolute;
   top: 19px; right: -21px;
}
.ribbon span::before {
   content: '';
   position: absolute; 
   left: 0px; top: 100%;
   z-index: -1;
   border-left: 3px solid #79A70A;
   border-right: 3px solid transparent;
   border-bottom: 3px solid transparent;
   border-top: 3px solid #79A70A;
}
.ribbon span::after {
   content: '';
   position: absolute; 
   right: 0%; top: 100%;
   z-index: -1;
   border-right: 3px solid #79A70A;
   border-left: 3px solid transparent;
   border-bottom: 3px solid transparent;
   border-top: 3px solid #79A70A;
}
.red span {background: linear-gradient(#F70505 0%, #4c2b11 100%);}
.red span::before {border-left-color: #4c2b11; border-top-color: #4c2b11;}
.red span::after {border-right-color: #4c2b11; border-top-color: #4c2b11;}

.blue span {background: linear-gradient(#2989d8 0%, #1e5799 100%);}
.blue span::before {border-left-color: #1e5799; border-top-color: #1e5799;}
.blue span::after {border-right-color: #1e5799; border-top-color: #1e5799;}

</style>

<script>
import Sidebar from '@/components/shopping/Sidebar.vue';
import axios from 'axios';
import Vue2Filters from 'vue2-filters'
import Spinner from 'vue-simple-spinner'
import { API_PREFIX, API_VERSION , SHOPPING } from '@/config.js';
export default {
	components: {
        Sidebar,
		Spinner        
	},

    mixins: [Vue2Filters.mixin],

    data : function(){
        return{
            offers : [],
            orders : [],
            offers_start : [],
            orders_start : [],
            sort: 'all',
            status : [],
            loaded : null,
            SHOPPING : SHOPPING
        }
    },

    mounted(){
        this.getOffers();
        this.getOrders();
    },

    methods : {       
        getOffers(){
            let app = this;
            const token = localStorage.getItem('token');
            app.$Progress.start();
            axios.get(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'customer_offers/' + app.customer_id , {
                headers: {
                    Authorization: 'Bearer ' + token
                }              
            })
            .then(function(response){
                app.offers = response.data;
            })
            .catch(function(error){
                console.log(error);
            })
        },
        getOrders(){
            let app = this;
            const token = localStorage.getItem('token');
            axios.get(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'customer_orders/' + app.customer_id , {
              headers: {
                  Authorization: 'Bearer ' + token
              } 
            })
            .then(function(response){
                app.orders = response.data;
                app.loaded = true;
                app.$Progress.finish();
            })
            .catch(function(error){
                console.log(error); 
            })
        },
        getStatus(){
            let app = this;
            axios.get(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'status/')
                .then(function(response){
                    app.status = response.data;
                })
                .catch(function(error){
                    console.log(error); 
                })          
        }
    },

    computed :{
        articles() {
            let article ;
            article = this.offers.concat(this.orders)
            return article;
        },

        customer_id (){
            return this.$store.state.customer_id;
        }
    }
}
</script>
