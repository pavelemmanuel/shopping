<template>
    <div class="maincontent bg--white pt--80 pb--55">
        <vue-progress-bar></vue-progress-bar>
        <div class="container">
            <div class="row">
                <div class="col-lg-9 col-12">
                    <div class="wn__single__product">
                        <div class="row">
                            <div class="col-lg-6 col-12">
                                <content-loader
                                    :height="307.5"
                                    :width="307.5"
                                    :speed="2"
                                    primaryColor="#f3f3f3"
                                    secondaryColor="#ecebeb"
                                    v-if="!loaded">
                                    <circle cx="168" cy="308" r="1" /> 
                                    <circle cx="152" cy="71" r="0" /> 
                                    <circle cx="101" cy="90" r="0" /> 
                                    <rect x="0.09" y="-1" rx="0" ry="0" width="307.5" height="307.5" /> 
                                    <rect x="228.59" y="172.67" rx="0" ry="0" width="0" height="0" />
                                </content-loader>
                                <div class="row" v-else>
                                    <div class="col-2 col-sm-3 col-xs-3">
                                        <img style="cursor:pointer;" class="mb-20" :class="[ selectedThumbs == key ? 'choosedthumbs' : '']" @click="onThumbSelect(key)" :src="SHOPPING.DEV_URL + '' + image" v-for="(image, key) in images" :key="key">
                                    </div>
                                    <div class="col-10 col-sm-9 col-xs-9" v-if="images.length>0">
                                        <img :src="SHOPPING.PUBLIC_URL + ''+ images[selectedThumbs]" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-12">
                                <div class="product__info__main">
                                    <h1 class="text-left text-capitalize">{{ product.name }}</h1>
                                    <div class="d-flex">
                                            <div class="align-self-start">
                                                <star-rating v-model.number="product.rate" :star-size="17" border-color="#4c2b11" :glow="0" :show-rating="false" :readOnly="true">
                                                </star-rating>&nbsp;
                                            </div>
                                            <div class="ml-auto">
                                                <p class="text-muted"> Basé sur ({{ nbAvis }}) avis</p>
                                                <router-link :to="'/shopping/order/product/rate/'+ product.id">Ecrire un avis ></router-link>
                                            </div>        
                                    </div>
                                    <div class="price-box d-flex">
                                        <span class="text-left">{{ product.price | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true } ) }}</span>
                                        <span class="old_prize text-muted" style="font-size:15px;" v-if="product.old_price">{{ product.old_price | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true } ) }}</span>
                                        <div v-if="product.old_price" style="border: 2px solid #4c2b11; color:#4c2b11; font-size:12px; font-weight:700; padding:2px 4px;"> - {{ Math.round(100 - ((product.price *100) / product.old_price)) }} %</div>
                                    </div>  
                                    <div class="product__overview">
                                        <p class=" text-justify">{{ product.description | truncate(120)}}</p>
                                    </div>
                                    <hr class="mb-10">
                                    <div class="box-tocart">
                                        <div class="d-flex">
                                            <span>Quantité</span>
                                            <input id="qty" data-vv-as="quantité" v-validate="'required|numeric'"  :class="{'is-danger': errors.has('qty') }" class="input-text qty" name="qty" min="1" value="1" title="Qty" v-model="quantity" type="number">
                                            <div>
                                                <button class="tocart btn-submit" @click="addToCart" type="submit" :style="{cursor : errors.any() ? 'not-allowed' : ''}" :disabled="errors.any()" title="Add to Cart">ACHETER</button>
                                            </div>
                                        </div>
                                        <small class="form-control-feedback text-danger"  v-show="errors.has('qty')"> {{ errors.first('qty') }} </small>
                                    </div>
                                    <hr>
                                    <div class="product_meta">
                                        <span class="posted_in">Categorie : 
                                            <router-link :to="'marketplace/' + product.category_id" v-if="product.category != null">{{ product.category.name }}</router-link>
                                            <p v-else>Aucune catégorie</p>
                                        </span>
                                    </div>
                                    <div class="product-share">
                                        <ul>
                                            <li class="categories-title">Partagez :</li>
                                            <li>
                                                <a href="#">
                                                    <i class="icon-social-twitter icons"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="icon-social-tumblr icons"></i>
                                                </a>
                                            </li>
                                        </ul>
									</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product__info__detailed">
                        <div class="pro_details_nav nav justify-content-start" role="tablist">
                            <a class="nav-item nav-link active" data-toggle="tab" href="#nav-details" role="tab">Description</a>
                            <a class="nav-item nav-link" data-toggle="tab" href="#nav-review" role="tab">Avis</a>
                        </div>
                        <div class="tab__container">
                            <div class="pro__tab_label tab-pane fade show active" id="nav-details" role="tabpanel">
                                <div class="description__attribute text-left">
                                    <p v-html="product.description"></p>
                                </div>
                            </div>
                            <div class="pro__tab_label tab-pane fade" id="nav-review" role="tabpanel">
                                <div class="review__attribute">
                                    <div class="container pt-20 pb-20">
                                        <div class="text-center">
                                            <p class="font-weight-bold">Avez vous utilisé cet produit ? Qu'en pensez vous ?</p>
                                            <center>
                                                <star-rating @current-rating="setRateText" @rating-selected="setRating" v-model.number="rate" :star-size="20" active-color="#4c2b11" :show-rating="false" class="justify-content-center">
                                                </star-rating>
                                                <span style="width:140px;" class="text-muted" >{{ rateText }} !</span>
                                            </center>
                                            <router-link :to="'/shopping/order/product/rate/' + product.id">
                                                <button  class="secondary-button" type="submit" style="background-color:#666666;">ECRIRE UN AVIS</button>
                                            </router-link>
                                        </div>
                                    </div>
                                    <p class="text-muted"> Tous les commentaires ({{ paginate.total }})</p>
                                    <div v-if="comments.length == 0">
                                        <hr>
                                        <div class="container pt-20 pb-20">
                                            <div class="row text-center">
                                                <p class="text-muted">Aucun Commentaire</p>
                                            </div>
                                        </div>
                                        <hr>
                                    </div>
                                    <div v-else v-for="(rating , key) in comments" :key="key" >
                                        <hr>
                                        <div class="container pt-20 pb-20">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <p class="font-weight-normal">{{ rating.customer.given_names}}</p>
                                                    <p class="text-muted">{{ rating.created_at | moment("Do-MM-YYYY HH:MM")}}</p>
                                                </div>
                                                <div class="col-md-3">
                                                    <star-rating :star-size="20" active-color="#4c2b11" :read-only="true" v-model.number="rating.rate" :show-rating="false"></star-rating>
                                                </div>
                                                <div class="col-md-6">
                                                    {{ rating.comment | truncate(200) }}
                                                </div>
                                            </div>
                                        </div>
                                        <hr>
                                    </div>
                                    <ul class="wn__pagination float-right">
                                        <paginate
                                        :page-count="paginate.last_page"
                                        :click-handler="paginateClick"
                                        :prev-text="'<'"
                                        :next-text="'>'"
                                        :container-class="'className'"
                                        :hide-prev-next="true">
                                        </paginate>	        					
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Sidebar :selected="0" v-on:dragend="filterSide" :feature="true" @search="search">
                </Sidebar>
            </div>
        </div>
    </div>
</template>
<style scoped>
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
    label {
        color: #333;
        display: inline-block;
        font-weight: 500;
        margin: 0 0 8px;
    }

    .form-control:focus {
        border-color: #ebebeb; 
    }

    .choosedthumbs{
        box-shadow: 2px 2px 2px 1px #4c2b11;
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

    .is-danger{
        border-color : #4c2b11;
    }
</style>

<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'
import Sidebar from '@/components/shopping/Sidebar.vue'
import Paginate from 'vuejs-paginate';
import {API_PREFIX , API_VERSION ,   SHOPPING } from '@/config'
import { ContentLoader } from 'vue-content-loader';
export default {

    components: {
        StarRating,
        Sidebar,
        Paginate,
        ContentLoader
    },

    watch: {
        '$route' (to , from){
			this.getProduct();
		},
	
    },

    data : function(){
        return{
            product: {
            },
            comments : [],
            rate : 0,
            rateText : '',
			paginate : {
				last_page : 0,
				currentPage : 0,
				perPage : 0,
				total : 0,
				from : 0,
				to :0
            },
            selectedThumbs : 0,
            nbAvis : 0,
            images : [],
            product_id : this.$route.params.product_id,
            cart : [],
            quantity : 1,
            SHOPPING : SHOPPING,
            loaded : false,
        }
    },

    mounted : function(){
        this.getProduct();
        this.getComments();
        this.getCart();
    },

    computed : {
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

		filterSide(selectedRange){
            this.$router.push('/')
        },

		search(searchText){
            let app = this;
            app.$router.push({name : 'marketplaceindex' , params: { search : searchText}});
        },
        
		getCart(){
			if(localStorage.getItem("product_id") !== null)
			this.cart = JSON.parse(localStorage.getItem('product_id'));
        },
        
        getProduct (){
            let app = this;
            app.$Progress.start();
            let product_id = app.$route.params.product_id;
            var url = SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'products/' + product_id;
            axios.get(url)
            .then(function(response){
                app.product = response.data;
                if(app.product.image){
                    app.images = app.product.image.split(";");
                    app.images.pop();
                    app.loaded = true;              
                }
                app.$Progress.finish();
            })
            .catch(function(error){
                console.log(error);
            })
        },

        getComments (){
            let app = this;
            let product_id = app.$route.params.product_id;
            axios.get(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'product_comments/'+ product_id)
                .then(function(response){
                    app.nbAvis = response.data.nbavis;
                    app.comments = response.data.comments.data;
                    app.paginate.last_page = response.data.comments.last_page;
                    app.paginate.currentPage = response.data.comments.current_page;
                    app.paginate.perPage = response.data.comments.per_page;
                    app.paginate.total = response.data.comments.total;
                    app.paginate.from = response.data.comments.from;
                    app.paginate.to = response.data.comments.to;
                })
                .catch(function(error){
                    console.log(error);
                })
        },

		paginateClick : function(page){
            let app = this;
            let product_id = app.$route.params.product_id;
            axios.get(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'product_comments/'+ product_id +'?page=' + page)
            .then(function(response){
				app.comments = response.data.comments.data;
				app.paginate.currentPage = response.data.comments.current_page;
            })
            .catch(function(error){
                console.log(error);
            })
		},

		addToCart(){
            let productId = parseInt(this.$route.params.product_id);
            let cart_id = [];
            let exist = true;
            this.cart.forEach(element => {
                cart_id.push(element.product_id);
            });
			if(!cart_id.includes(productId)){
                exist = false;
				this.cart.push({product_id : productId , quantity : this.quantity});
				const parsed = JSON.stringify(this.cart)
                localStorage.setItem('product_id', parsed);
                this.$store.commit('addToCart');
			}
			this.$router.push({path : '/shopping/cart'}, () => {
                if(exist){
                    this.$toasted.show('Le produit existe déjà');
                }
            });
		},

        getCategories(){
            let app = this;
            axios.get(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'categories')
            .then(function(response){
                app.categories = response.data; 
            })
            .catch(function(error){
                console.log(error);
            })
        },
        
        setRating(){
            let app = this;
            let productId = this.$route.params.product_id;
            axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'ratings' , {
                rate : app.rate,
                customer_id : app.customer_id,
                product_id : productId
            })
            .then(function(response){
                app.rate = parseInt(response.data[0].rate);
                app.product.rate = parseInt(response.data[1]);
            })
            .catch(function(error){
                console.log(error);
            })
        },

        onThumbSelect(key){
            this.selectedThumbs = key;
        },

        setRateText(currentRate){
            switch(currentRate){
                case 0 :
                    this.rateText ='';
                    break;
                case 1 :
                    this.rateText = 'Je déteste';
                    break;
                case 2 :
                    this.rateText = 'Je n\'aime pas';
                    break;
                case 3 :
                    this.rateText = 'J\'ai un avis mitigé';
                    break;
                case 4 :
                    this.rateText = 'J\'aime';
                    break;
                case 5 :
                    this.rateText = 'J\'adore'
                    break;
                default :
                    return '';
            }  

        }
    },

}
</script>

