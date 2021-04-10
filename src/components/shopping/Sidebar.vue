<template>
    <div class="col-lg-3 col-12 order-2 order-lg-1 md-mt-40 sm-mt-40">
        <div class="shop__sidebar">
            <aside class="wedget__categories poroduct--cat" v-if="$route.query.search || $route.query.price || $route.query.sort || $route.query.rating">
                <h3 class="wedget__title">Votre Recherche</h3>
                <ul class="font-weight-italic">
                    <li v-if="$route.query.search">Terme : 
                        <span class="label label-info text-muted">{{$route.query.search | truncate(20)}}
                        </span>
                        <button class="float-right btn-submit-sm" @click="removeSearch()">&times;</button>
                    </li>
                    <li v-if="$route.query.price">Prix : <span class="label label-info text-muted">{{$route.query.price}}</span>
                        <button class="float-right btn-submit-sm" @click="removePrice()">&times;</button>
                    </li>
                    <li v-if="$route.query.sort">
                        Trie : <span class="text-muted">{{ sort }}</span>
                        <button class="float-right btn-submit-sm" @click="removeSort()">&times;</button>
                    </li>
                    <li v-if="$route.query.rating">
                        Classement : <span class="text-muted">{{ $route.query.rating }} étoiles</span>
                        <button class="float-right btn-submit-sm" @click="removeRating()">&times;</button>
                    </li>
                </ul>
            </aside>
            <div class="shop-features-style4" style="margin:0 0 30px;" v-if="feature">
                <a href="#" class="shop-feature">
                    <div class="shop-feature-icon"><i class="zmdi zmdi-money-box" style="font-weight:200;"></i></div>
                    <div class="shop-feature-text">
                        <div class="text1">Paiement électronique</div>
                        <div class="text2">Paiement cash, Mobile Money ...</div>
                    </div>
                </a><a href="#" class="shop-feature">
                    <div class="shop-feature-icon"><i class="lnr lnr-phone"></i></div>
                    <div class="shop-feature-text">
                        <div class="text1">SERVICE CLIENT</div>
                        <div class="text2">Paiement Orange Money, MTN Money</div>
                    </div>
                </a><a href="#" class="shop-feature">
                    <div class="shop-feature-icon"><i class="lnr lnr-checkmark-circle"></i></div>
                    <div class="shop-feature-text">
                        <div class="text1">Conforme à l'original</div>
                        <div class="text2">Article 100% Garantie</div>
                    </div>
                </a>
            </div>
            <spinner size="tiny" line-fg-color="#4c2b11" v-if="!loaded"></spinner>
            <aside v-else class="wedget__categories poroduct--cat">
                <h3 class="wedget__title">Catégories</h3>
                <ul v-for="(category , key) in categories" :key="key">
                    <li><router-link :to="'/shopping/category/' + category.id">{{ category.name }}</router-link>
                        <a  v-if="category.child.length > 0" class="panel-icon collapsed float-right" data-toggle="collapse" :href="'#collapseOne'+key"></a>
                    </li>
                    <div :id="'collapseOne'+key" class="panel-collapse collapse in">
                        <ul style="padding-left :30px;">
                            <li v-for="(child , key) in category.child" :key="key"><router-link :to="'/shopping/category/' + child.id">{{ child.name }}</router-link>
                            </li>
                        </ul>
                    </div>
                </ul>
                <div class="text-right">
                    <router-link to="/shopping/category">Voir toutes les catégories ></router-link>
                </div>
            </aside>
            <aside class="wedget__categories poroduct--cat" v-if="rate">
                <h3 class="wedget__title">Classement</h3>
                <ul class="rating d-flex justify-content-center" @click="filterRating(5)" style="cursor:pointer;">
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li>5 étoiles</li>
                </ul>
                <ul class="rating d-flex justify-content-center" @click="filterRating(4)" style="cursor:pointer;">
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li>4 étoiles</li>
                </ul>
                <ul class="rating d-flex justify-content-center" @click="filterRating(3)" style="cursor:pointer;">
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li>3 étoiles</li>
                </ul>
                <ul class="rating d-flex justify-content-center" @click="filterRating(2)" style="cursor:pointer;">
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li>2 étoiles</li>
                </ul>
                <ul class="rating d-flex justify-content-center" @click="filterRating(1)" style="cursor:pointer;">
                    <li class="on"><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li>1 étoiles</li>
                </ul>
            </aside>
        </div>
    </div>
</template>

<style scoped>
h3{
    font-family:Century Gothic;
}

.btn-submit-sm{
    background: #4c2b11 none repeat scroll 0 0;
    border: 0 none;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;        
}

.btn-submit-sm-2{
    background: #9e9e9e none repeat scroll 0 0;
    border: 0 none;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    height: 40px;
    line-height: 30px;
    padding: 0 25px;
    text-transform: uppercase;        
}

.panel-icon:before {
    float: right !important;
    font-family: FontAwesome;
    content:"\f068";
    padding-right: 5px;
}
.panel-icon.collapsed:before {
    float: right !important;
    content:"\f067";
}

.rating:hover{
    background-color: #e6e6e6;
}
</style>

<script>
import axios from 'axios';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css'
import {SHOPPING , API_PREFIX , API_VERSION } from '@/config'
import Spinner from 'vue-simple-spinner'
export default {
    props : {
        selected : Number,
        max : Number,
        rate : Boolean,
        feature : Boolean
    },

	components: {
        VueSlider,
		Spinner
    },
    
    data : function(){
        return {
            searchText : '',
            selectedRange : [0 , 0],
            categories : [],
            cart : [],
            collapsed : [],
            loaded : null
        }
    },

    mounted (){
        this.getCategories();
        this.getCart();
    },

    methods : {

		getCart(){
			if(localStorage.getItem("product_id") !== null)
			this.cart = JSON.parse(localStorage.getItem('product_id'));
        },
        
        getCategories(){
            let app = this;
            axios.get(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'root_categories')
            .then(function(response){
                app.categories = response.data; 
                app.loaded = true;
            })
            .catch(function(error){
                console.log(error);
            })
        },

        removeSearch(){
            let query = Object.assign({}, this.$route.query);
            delete query.search;
            this.$router.replace({ query });
        },

        removePrice(){
            let query = Object.assign({}, this.$route.query);
            delete query.price;
            this.$router.replace({ query });
        },

        removeSort(){
            let query = Object.assign({}, this.$route.query);
            delete query.sort;
            this.$router.replace({ query });
        },

        removeRating(){
            let query = Object.assign({}, this.$route.query);
            delete query.rating;
            this.$router.replace({ query });
        },

        filterRating(value){
			this.$router.push({ query: Object.assign({}, this.$route.query, { rating : value  }) });
        }
    },

    computed : {
        searchPlaceholder (){
            if(this.selected==0){
                return 'Rechercher un produit, un service'
            }else if(this.selected ==1){
                return 'Rechercher un produit'
            }else{
                return 'Rechercher un service'
            }
        },

        sort (){
            let query = this.$route.query.sort;
            if(query == 'price-asc'){
                return 'Prix croissant';
            }else if(query == 'price-desc'){
                return 'Prix décroissant'
            }else if(query == 'rating'){
                return 'Les mieux notés';
            }else if(query =='date'){
                return 'Prix croissant';
            }
        }
    }
}
</script>
