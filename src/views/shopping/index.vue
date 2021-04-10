<template>
	<div class="page-shop-sidebar left--sidebar bg--white section-padding--lg">
		<vue-progress-bar></vue-progress-bar>
		<div class="container">
			<div class="row">
				<Sidebar :selected="parseInt(selected)" :max="parseInt(max)" :rate="true">
				</Sidebar>
				<div class="col-lg-9 col-12 order-1 order-lg-2">
					<div class="row">
						<div class="col-lg-12">
							<span class="font-weight-bold" style="letter-spacing:1px; font-size:15px;" v-if="$route.query.search">RESULTAT DE LA RECHERCHE : <span class="font-weight-normal text-muted"> '{{$route.query.search | truncate(20) }}'</span></span>
							<span class="font-weight-bold" style="letter-spacing:1px; font-size:15px;" v-if="$route.query.price">de : 
								<span class="font-weight-normal text-muted">
								'{{$route.query.price.split('-')[0] | currency('' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true } ) }}
								à {{$route.query.price.split('-')[1] | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true } ) }}'
								</span>
							</span>
							<div class="shop__list__wrapper d-flex flex-wrap flex-md-nowrap flex-column flex-md-row justify-content-md-between">
								<p>Affichage {{ paginateArt.from }} - {{ paginateArt.to}} de {{ paginateArt.total }}</p>								
								<form v-if="$route.query.search" class="d-flex justify-content-between" @submit.prevent="filter">
									<input type="number" v-model="selectedRange[0]" style="width:83px; height:26px;" placeholder="FCFA 0">
									<div class="align-self-center" id="slider-range" style="width:150px;">
										<vue-slider v-model="selectedRange" :min="0" :max="max" @drag-end="filter"/>
									</div>
									<input type="number" v-model="selectedRange[1]" style="width:83px;height:26px;" :max="max" placeholder="FCFA 0">&nbsp;
									<button type="submit" class="btn-submit-sm-2" style="height:26px;">GO</button>
								</form>
								<div class="d-flex flex-md-nowrap">
									<p class="font-weight-bold">Trier</p>
									<select v-model="sort">
										<option value="date">Nouveautés</option>
										<option value="price-asc">Prix croissant</option>
										<option value="price-desc">Prix décroissant</option>
										<option value="rating">Mieux notés</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					<div class="tab__container">
						<div class="tab-pane fade show active" id="nav-grid" role="tabpanel">
							<spinner size="medium" line-fg-color="#4c2b11" v-if="!loaded"></spinner>
							<div class="row" v-else>
								<div v-if="articles.length == 0" class="text-center m-auto">
									<div style="padding :0 100px ;border : 1px solid #4c2b11; color :#4c2b11;">Oups aucun article n'a été trouvé </div>
									<h6 class="pt-40 mb-20">Conseils d'utilisation de la barre de recherche</h6>
									<div>						
										<ul class="text-left text-muted">
											<li>** Vérifiez que vous n'avez pas fait de faute de frappe : "Bageus" au lieu de "Bageus"</li>	
											<li>** Essayez avec un autre mot clé ou synonyme</li>
											<li>** Essayez d'effectuer une recherche plus générale, vous pourrez ensuite filtrer les résultats obtenus</li>
										</ul>
									</div>
									<hr class="m-3">	
									<p>Toujours aucun résultat? Appelez nous au <span class="font-weight-bold">74 50 16 02</span> ou envoyez nous un email <span class="font-weight-bold">jdj@paraclet</span></p>
									<p class="font-weight-bold">Ou retournez simplement sur notre page d'accueil en <router-link to="marketplace" class="text-muted">cliquant ici</router-link></p>
								</div>
								<div v-else v-for="(article, key) in articles" :key="key" class="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
									<div class="product__thumb">
										<router-link v-if="article.item_type == 'App\\Models\\Product'" :to="'/shopping/product/' + article.item.id ">
											<a class="first__img">
												<img v-if="article.item.image != null" :src="SHOPPING.PUBLIC_URL + article.item.image.split(';')[0].toString()" alt="product images">
												<img v-else src="/images/books/2.jpg" alt="product images">
											</a>
										</router-link>
										<router-link v-else :to="'/shopping/service/' + article.item.id ">
											<a class="first__img">
												<img v-if="article.item.image != null" :src="SHOPPING.PUBLIC_URL + article.item.image.split(';')[0].toString()" alt="product images">
												<img v-else src="/images/books/2.jpg" alt="product images">
											</a>
										</router-link>
										<div class="hot__box" v-if="article.item_type == 'App\\Models\\Product'">
											<span class="hot-label" >Produit</span>
										</div>
										<div class="hot__box color--2" v-else>
											<span class="hot-label">Service</span>
										</div>
									</div>
									<div class="product__content content--center">
										<h4><router-link :to="'/shopping/product/' + article.item.id ">{{ article.item.name }}</router-link></h4>
										<ul class="prize d-flex">
											<li v-if="article.item_type == 'App\\Models\\Product'">{{ article.item.price | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true } ) }}</li>
											<li v-if="article.item.old_price" class="old_prize">{{ article.item.old_price | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true } ) }}</li>
										</ul>
										<div class="action">
											<div class="">
												<ul class="add_to_links">
													<li class="btn" style="background-color: #4c2b11; color:white;" v-if="article.item_type == 'App\\Models\\Product'"><a @click="addToCart(article.item.id)"><i class="bi bi-shopping-bag4" style="color:white;"></i>&nbsp;&nbsp;Acheter !</a></li>
													<li v-else class="btn" style="background-color: #4c2b11; color:white;"><router-link style="color:white;" class="cart" :to="'/shopping/service/' + article.item.id" ><i class="bi bi-shopping-bag4"></i>&nbsp;&nbsp;Commander!</router-link></li>													
												</ul>
											</div>
										</div>
										<div class="d-flex justify-content-center">
											<star-rating :active-color="'#4c2b11'"  :rating="parseInt(article.item.rate)" :star-size="17" border-color="#4c2b11" :glow="0" :show-rating="false" :readOnly="true">
											</star-rating>&nbsp;
										</div>
									</div>
								</div>
							</div>
							<ul class="wn__pagination">
								<paginate
								:page-count="paginateArt.last_page"
								:click-handler="paginateArtClick"
								:prev-text="'<'"
								:next-text="nextButton"
								:container-class="'className'"
								:hide-prev-next="true">
								</paginate>	  
							</ul>
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

	.hot__box {
		background: #4c2b11 none repeat scroll 0 0;
		color: #fff;
		display: inline-block;
		font-size: 10px;
		font-weight: 600;
		left: 0;
		line-height: 15px;
		min-width: 55px;
		padding: 4px 10px;
		position: absolute;
		text-align: center;
		text-transform: uppercase;
		top: 0px;
		z-index: 3;
	}

	.product .product__thumb .hot__box.color--2 {
		background: #9e9e9e none repeat scroll 0 0; 
	}

	.product .product__thumb .hot__box.color--2::after {
		border-color: transparent transparent transparent #9e9e9e;
	}

	.product .product__thumb .hot__box.color--3 {
		background: #3cc8df none repeat scroll 0 0; 
	}

	.product .product__thumb .hot__box.color--3::after {
		border-color: transparent #3cc8df transparent transparent;
		border-right: 6px solid #3cc8df;
	}

	.product .product__thumb .hot__box.color--4 {
		background: #da7187 none repeat scroll 0 0;
	}

	.product .product__thumb .hot__box.color--4::after {
		border-color: transparent #da7187 transparent transparent;
		border-right: 6px solid #da7187; 
	}

	.product .product__thumb .hot__box::after {
		-moz-border-bottom-colors: none;
		-moz-border-left-colors: none;
		-moz-border-right-colors: none;
		-moz-border-top-colors: none;
		border-color: transparent transparent transparent #4c2b11;
		border-image: none;
		border-style: solid;
		border-width: 6px;
		content: "";
		margin-top: -6px;
		position: absolute;
		right: -11px;
		top: 50%;
	}

	.add_to_links{
		cursor: pointer;
	}

	.checkoutbtn {
		background: #000 none repeat scroll 0 0;
		color: #fff;
		display: block;
		padding: 10px 0;
		font-size: 14px;
		text-transform: uppercase;
		border-radius: 5px;
		font-weight: 700;
		transition: 0.4s;
	}

	.checkoutbtn:hover {
		background: #4c2b11 none repeat scroll 0 0;
		color: #fff;
	}

	select, input{
		border: 1px solid #e1e1e1;
		color: #898888;
		height: 30px;
		margin-left: 10px;
		padding: 0 10px; 
	}

    .btn-submit {
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
	
    .btn-submit-sm-2{
        background: #9e9e9e none repeat scroll 0 0;
        border: 0 none;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        height: 30px;
        text-transform: uppercase;        
    }
</style>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css'
import Paginate from 'vuejs-paginate';
import StarRating from 'vue-star-rating'
import axios from 'axios';
import Sidebar from '@/components/shopping/Sidebar.vue';
import { API_PREFIX , API_VERSION , SHOPPING } from '@/config.js';
import Spinner from 'vue-simple-spinner'
export default {

	components: {
		VueSlider,
		Paginate,
		StarRating,
		Sidebar,
		Spinner
	},

    watch: {
        '$route' (to , from){
            this.getCart();
			this.getArticles();
			this.getOuterValue();
		},
	
    },

    data : function(){
        return{
			nextButton : '<i class="zmdi zmdi-chevron-right"></i>',
			prevButton : '<i class="zmdi zmdi-chevron-left"></i>',
			articles : [],
			cart : [],
			selected : 0,
			max : null,
			selectedRange : [0 , 0],
			paginateArt : {
				last_page : 0,
				currentPage : 0,
				perPage : 0,
				total : 0,
				from : 0,
				to :0
			},
			SHOPPING : SHOPPING,
			loaded : null
        }
    },

    mounted (){
		this.getCart();
		this.getArticles();
	},

    methods : {
		getCart(){
			if(localStorage.getItem("product_id") !== null)
			this.cart = JSON.parse(localStorage.getItem('product_id'));
		},

		getOuterValue(){
			let app= this;
			let filter = {};
			if(this.$route.query.search) {
				filter.search = this.$route.query.search;
			}
			if(this.$route.query.rating) {
				filter.rating = this.$route.query.rating;
			}
            axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'products_max_price' , filter)
            .then(function(response){
				app.max = response.data;
				app.selectedRange[1] = app.max;
            })
            .catch(function(error){
                console.log(error);
            })
		},

		getArticles(){
			let app = this;
			let filter = {}
			app.$Progress.start();  
			if(this.$route.query.search){
				filter.search = this.$route.query.search
			}
			if(this.$route.query.price){
				let price = this.$route.query.price.split("-");
				filter.min = price[0];
				filter.max = price[1];
			}
			if(this.$route.query.sort){
				filter.sort = this.$route.query.sort;
			}
			if(this.$route.query.rating){
				filter.rating = this.$route.query.rating;
			}
            axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'articles_pag/9' , filter)
				.then(function(response) {
					app.articles = response.data.data;
					app.loaded = true;
					app.paginateArt.last_page = response.data.last_page;
					app.paginateArt.currentPage = response.data.current_page;
					app.paginateArt.perPage = response.data.per_page;
					app.paginateArt.total = response.data.total;
					app.paginateArt.from = response.data.from;
					app.paginateArt.to = response.data.to;
					app.$Progress.finish();
				})
				.catch(function(error){
					app.$Progress.fail();
					console.log(error);
				});		
		},
		
		paginateArtClick(page){
			let app = this;
			app.$Progress.start();
			let filter = {};
			if(this.$route.query.search) {
				filter.search = this.$route.query.search
			}
			if(this.$route.query.price) {
				let price = this.$route.query.price.split("-");
				filter.min = price[0];
				filter.max = price[1];
			}
			if(this.$route.query.sort) {
				filter.sort = this.$route.query.sort;
			}
			if(this.$route.query.rating) {
				filter.rating = this.$route.query.rating;
			}
            axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'articles_pag/9?page=' + page , filter)
            .then(function(response){
				app.articles = response.data.data;
				app.paginateArt.currentPage = response.data.current_page;
				app.$Progress.finish();
            })
            .catch(function(error){
				app.$Progress.fail();
                console.log(error);
            })			
		},

		addToCart(productId) {
			let cart_id = [];
			let exist = true;
            this.cart.forEach(element => {
                cart_id.push(element.product_id);
            });
			if(!cart_id.includes(productId)){
				exist = false;
				this.cart.push({product_id : productId , quantity : 1});	
				const parsed = JSON.stringify(this.cart)
				localStorage.setItem('product_id', parsed);
				this.$store.commit('addToCart');
			}
			this.$router.push({path : '/shopping/cart'}, () => {
                if(exist){
                    this.$toasted.show('Le produit existe déjà dans le panier');
                }
            });
		},

		filter(){
			let price = this.selectedRange[0] + '-' + this.selectedRange[1];
			this.$router.push({ query: Object.assign({}, this.$route.query, { price : price  }) });
		},

	},

	computed : {
		sort : {
			get (){
				if(this.$route.query.sort){
					return this.$route.query.sort;
				}else{
					return 'date';
				}
			},
			set (newValue){
				this.$router.push({ query: Object.assign({}, this.$route.query, { sort : newValue  }) });
			}
		}
	}
}
</script>

