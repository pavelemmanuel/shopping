<template>
    <affix>
        <div class="off_canvars_overlay" @click="active = false" :class="{active: active}">
        </div>
        <nav class="mainmenu__nav navbar navbar-expand-md navbar-light bg-light justify-content-center d-none-xs">
            <div class="container d-flex">                
                <ul class="meninmenu d-none d-md-block">
                    <li class="drop"><router-link to="/shopping"><i class="fa fa-bars" style="color:#000; vertical-align:center;"></i>&nbsp;Nos catégories</router-link>
                        <div class="megamenu dropdown">
                            <ul class="item item01">
                                <li :class="[ category.child.length > 0 ? 'label2' : '']" v-for="(category , key) in categories" :key="key"><router-link :to="'/shopping/category/'+ category.id">{{ category.name }}</router-link>
                                    <ul v-if="category.child.length">
                                        <li v-for="(child , key) in category.child" :key="key"><router-link :to="'/shopping/category/' + child.id">{{ child.name }}</router-link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <div class="nav-item d-md-none" style="cursor:pointer;">
                    <span class="lnr lnr-arrow-left-circle fa-2x" @click="active = !active"></span>
                </div>
                <form class="col-8 col-sm-7 col-md-6 col-lg-7" v-on:submit.prevent="search">
                    <div class="input-group" style="flex-wrap:nowrap;">
                        <div class="input-group-prepend d-none d-md-block">
                            <select v-model="categoryId" @change="autoComplete" style="background-color:#f5f5f5;color:#606060;">
                                <option :value="0" >Toutes catégories</option>
                                <template v-for="(category , key)  in categories">
                                    <option :value="category.id" :key="key">{{category.name}}</option>
                                    <template v-for="(child , index) in category.child">
                                        <option :value="child.id" :key="key+ '' +index" v-if="category.child.length > 0">-- {{ child.name }}</option>
                                    </template>
                                </template>
                            </select>
                        </div>
                        <input type="text" v-model="searchText" @keydown="autoComplete" style="background-color:#f5f5f5;color:606060;" placeholder="Rechercher un article..." aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <i class="fa fa-search d-md-none" style="position:absolute; top: 12px; right:12px;color:rgb(207, 10, 89);"></i>
                        <div class="input-group-append">
                            <button type="submit" class="btn-submit d-none d-md-block">CHERCHER</button>
                        </div>
                    </div>
                    <div class="search_content_result shadow" style="z-index:30;" :class="{active : activesearch}">
                        <div class="search_content_header d-flex" style="padding:10px 20px;">
                            <p class="pl-10" style="font-size:12px;" v-if="searchText.length < 2">Nombre de caractères minimum 2</p>
                            <p class="" v-else style="font-size:12px;">Resultat de la recherche pour "{{ searchText }}" ({{ articlesTotal }}) articles ont été trouvées</p>
                            <a class="ml-auto" style="font-size:24px;cursor:pointer;color:#4c2b11;" @click="() => {activesearch = false; searchText = '';}">&times;</a>
                        </div>
                        <hr>
                        <spinner class="mt--20" size="medium" line-fg-color="#4c2b11" v-if="!loaded && searchText.length > 1"></spinner>
                        <div v-else>
                            <div class="card-body text-center" colspan="6" v-if="articles.length == 0 && searchText.length > 1">
                                <span class="text" style="color:#000000;">Aucun article ne correspond à votre recherche</span>
                            </div>
                            <div v-else class="card-body d-flex flex-column" v-for="(article , key) in articles" :key="key">
                                <div class="d-flex">
                                        <div class="col-3">
                                            <router-link @click.native="activesearch=false;" v-if="article.item_type == 'App\\Models\\Product'" :to="'/shopping/product/' + article.item.id ">
                                                <img width="90px;" height="90px;" v-if="article.item.image != null" :src="SHOPPING.DEV_URL + '' + article.item.image.split(';')[0].toString()" alt="product images">
                                                <img v-else src="images/product/sm-3/1.jpg" alt="product img">
                                            </router-link>
                                            <router-link @click.native="activesearch =false;" v-else :to="'/shopping/service/' + article.item.id ">
                                                <img width="90px;" height="90px;" v-if="article.item.image != null" :src="SHOPPING.DEV_URL + '' + article.item.image.split(';')[0].toString()" alt="product images">
                                                <img v-else src="images/product/sm-3/1.jpg" alt="product img">
                                            </router-link>
                                        </div>
                                        <div class="col-9">
                                            <router-link @click.native="activesearch =false;" v-if="article.item_type == 'App\\Models\\Product'" :to="'/shopping/product/' + article.item.id "><h5 class="card-title font-weight-light">{{ article.item.name | truncate(50) }}</h5></router-link>
                                            <router-link @click.native="activesearch =false;" v-else :to="'/shopping/service/' + article.item.id "><h5 class="card-title font-weight-light">{{ article.item.name | truncate(50) }}</h5></router-link>
                                            <div class="price-box d-flex flex-column" v-if="article.item_type == 'App\\Models\\Product'">
                                                <span class="text-left font-weight-bold" style="color:#4c2b11;">{{ article.item.price | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true } ) }}</span>
                                                <span class="old_prize text-muted" style="font-size:15px;" v-if="article.old_price">{{ article.old_price | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true } ) }}</span>
                                                <!-- <div v-if="product.old_price" style="border: 2px solid #4c2b11; color:#4c2b11; font-size:12px; font-weight:700; padding:2px 4px;"> - {{ Math.round(100 - ((product.price *100) / product.old_price)) }} %</div> -->
                                            </div>  
                                        </div>
                                </div>
                            </div>
                            <button v-if="articlesTotal>9" class="btn-submit m-2" type="submit">Voir tout</button>
                        </div>
                    </div>
                </form>
                <div class="d-flex justify-content-between flex-nowrap no-gutters nav-right">
                    <ul class="d-flex meninmenu col d-none d-md-block">
                        <li class="drop"><router-link to="/" class="font-weight-bold  d-none d-md-block"><span class="text-muted">Besoin<br></span> D'aide ?</router-link>
                            <div class="megamenu dropdown">
                                <ul class="item item01">
                                    <li><router-link to="/">Nous contacter</router-link></li>
                                    <li><router-link to="/shopping/supplier">Vendez sur jours de joie</router-link></li>
                                </ul>
                            </div>
                        </li>
                    </ul>&nbsp;&nbsp;
                    <router-link to="/shopping/order" class="d-flex col">
                        <p class="font-weight-bold d-none d-md-block align-self-center"><span class="text-muted">Mes</span> commandes</p>
                        <i class="lnr lnr-file-empty d-md-none" style="color:#000;font-size:20px;"></i>&nbsp;
                    </router-link>&nbsp;&nbsp;
                    <router-link to="/shopping/cart" class="d-flex">
                        <i class="lnr lnr-cart align-self-center" style="color:#000;font-size:20px;"></i>&nbsp;
                        <div class="d-none d-md-block">
                            <p class="font-weight-bold">Mon panier</p>
                            <p class="text-muted">{{ cartNb }} Articles</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </nav>
        <aside class="nav fixed-top" style="background-color:white;z-index:500;" :class="{active : active}">
            <div class="sidebar-heading text-muted"><span style="color:#4c2b11;">Nos Catégories</span></div>
            <div class="list-group list-group-flush" v-for="(category , key) in categories" :key="key">
                <div class="list-group-item list-group-item-action bg-light">
                    <router-link :to="'/shopping/category/'+ category.id" >{{ category.name }}</router-link>
                    <a v-if="category.child.length" class="panel-icon collapsed float-right" data-toggle="collapse" :href="'#collapseTwo'+key"></a>       
                </div>
                <div :id="'collapseTwo'+key" class="panel-collapse collapse in">
                    <div v-for="(child , key) in category.child" :key="key" class="list-group-item list-group-item-action bg-light" style="padding-left :30px;">
                        <li ><router-link :to="'/shopping/category/' + child.id">{{ child.name }}</router-link>
                        </li>
                    </div>
                </div>
            </div>
            <div class="sidebar-heading text-muted"><span style="color:#4c2b11;">Nos Services</span></div>
            <div class="list-group list-group-flush">
                <div class="list-group-item list-group-item-action bg-light">
                    <router-link to="/shopping/supplier" >Devenir vendeur !</router-link>   
                </div>
            </div>
        </aside>
    </affix> 
</template>
<style scoped>
.shadow{
  box-shadow: -21.213px 21.213px 30px 0px rgba(158, 158, 158, 0.3);
}

    @media (max-width: 992px) { 
.search_content_result{
    display: none;
}
    }

    @media (min-width: 992px) { 
.search_content_result{
    overflow: auto;
    height: 100%;
    opacity : 0;
    display: none;
    padding: 15px;
    background: #fff none repeat scroll 0 0;
    height: 20%;
    min-height: 415px;
    overflow-y: scroll;
    padding: 0;
    position: absolute;
    z-index: 2000;
    border: 1px solid #e7e7e7;
    width: 95.8%;
  -webkit-transition: all .25s ease-out;
  -moz-transition: all .25s ease-out;
  -o-transition: all .25s ease-out;
  transition: all .25s ease-out;
}
.search_content_result.active{
    opacity : 1;
    display: block;
}

    }
.search_content_result::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(207, 10, 89); 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #4c2b11; 
}

.off_canvars_overlay {
  width: 100%;  
  height: 100%;
  position: fixed;
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  cursor: crosshair;
  background: #000;
  top: 0;
}
.off_canvars_overlay.active {
  opacity: 0.5;
  visibility: visible;
}
aside {
display: none;
    opacity: 0;
  background: #cecece;
  height: 100vh;
  -webkit-transition: all .25s ease-out;
  -moz-transition: all .25s ease-out;
  -o-transition: all .25s ease-out;
  transition: all .25s ease-out;
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

aside.active {
    display: block;
    opacity: 1;
    width: 80%;
}
.sidebar-heading {
  padding: 1rem 10px;
  font-size: 0.8rem;
  color : #4c2b11;
}

.input-group>.input-group-prepend {
    flex: 0 0 25%;
}
.input-group .input-group-text {
    width: 100%;
}
::placeholder{
    color : #ccc;
}
    .btn-submit{
    background :#4c2b11 none repeat scroll 0 0;
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
    @media (max-width: 992px) { 
        .nav-right{
            font-size:12px;
        }

        input {
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
        }
    }
</style>
<script>
import Affix from 'easy-affix'
import axios from 'axios'
import {API_PREFIX , API_VERSION , SHOPPING } from '@/config'
import Spinner from 'vue-simple-spinner'
export default {
    components: {
        Affix,
        Spinner
    },

    data : function(){
        return {
            active :false,
            activesearch : false,
            categories : [],
            cart : [],
            categoryId : 0,
            searchText : '',
            articles : [],
            articlesTotal : 0,
            SHOPPING : SHOPPING,
            loaded : null
        }
    },

    mounted (){
        this.getCategories();
        this.getCart();
    },

    computed : {
        cartNb (){
            return this.$store.getters.getCart;
        }
    },

    methods : {
        getCart(){
            if(localStorage.getItem("product_id") !== null){
            this.$store.commit('initialise');
            this.cart = JSON.parse(localStorage.getItem('product_id'));
            }
        },
        getCategories(){
            let app = this;
            axios.get(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'root_categories')
            .then(function(response){
                app.categories = response.data; 
            })
            .catch(function(error){
                console.log(error);
            })
        },
        autoComplete(){
            let app = this;
            app.activesearch = true;
            app.loaded = false;
            let filter = {};
            if(this.categoryId !=0){
                filter.category_id = app.categoryId;
            }
			if(this.searchText.length + 1 > 1){
                filter.search = this.searchText;
                axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'articles_pag/9' , filter)
                .then(function(response){
                    app.articles = response.data.data;
                    app.articlesTotal = response.data.total;
					app.loaded = true;
                })
                .catch(function(error){
                    console.log(error);
                })
            }else{
                this.articles = [];
                this.articlesTotal = 0;
            }
        },
        search(){
            this.activesearch = false;
            this.$emit('search' , this.searchText , this.categoryId);
        }
    },
}
</script>


