<template>
    <div class="cart-main-area section-padding--lg bg--white">
        <div class="container">
            <div class="row">
                <Sidebar :selected="0">
                </Sidebar>
                <div class="col-lg-9 col-12 order-1 order-lg-2 d-none d-md-block">
                    <h3 class="card-title font-weight-normal">Mon Panier ({{ products.length }})</h3>
                    <form action="#">               
                        <div class="table-content wnro__table table-responsive">
                            <table>
                                <thead>
                                    <tr class="title-top">
                                        <th class="product-thumbnail">Image</th>
                                        <th class="product-name">Produit</th>
                                        <th class="product-price">Prix</th>
                                        <th class="product-quantity">Quantité</th>
                                        <th class="product-subtotal">Total</th>
                                        <th class="product-remove">Effacer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td colspan="6" v-if="products.length == 0">
                                        <span class="text text-info">Aucun article dans le panier</span>
                                    </td>
                                    <tr v-else v-for="(product , key) in products" :key="key">
                                        <td class="product-thumbnail">
                                            <router-link :to="'/article /' + product.id ">
                                                <img v-if="product.image != null" :src="SHOPPING.DEV_URL + '' + product.image.split(';')[0].toString()" alt="product images">
                                                <img v-else src="images/product/sm-3/1.jpg" alt="product img">
                                            </router-link>
                                        </td>
                                        <td class="product-name"><a href="#">{{ product.name }}</a></td>
                                        <td class="product-price"><span class="amount">{{ product.price | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true } ) }}</span></td>
                                        <td class="product-quantity text-center">
                                            <input type="number" v-validate="'min_value:1|required'"  :name="'product' + product.id" :class="{'is-danger': errors.has('product' + product.id) }" v-model="cart[key].quantity" min="1">
                                        </td>
                                        <td class="product-subtotal">{{ product.price *  cart[key].quantity | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true } )}}</td>
                                        <td class="product-remove"><button class="btn-submit-sm" @click="removeFromCart(product.id , key)">X</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </form> 
                    <div class="cartbox__btn">
                        <ul class="cart__btn__list d-flex flex-column flex-md-row flex-md-nowrap flex-lg-nowrap justify-content-right">
                            <li><router-link to="/shopping">Poursuivre vos achats</router-link></li>
                            &nbsp;<li v-if="products.length > 0" style="cursor:pointer;"><a @click="checkout">Finaliser Votre commande</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-5 ml-auto">
                        <div class="cartbox__total__area">
                            <div class="cart__total__amount">
                                <span>Montant Total</span>
                                <span>{{ total | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true }) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- panier mobile -->
                <div class="col-12 order-1 d-block d-md-none">
                    <div class="card-header">
                        MON PANIER ({{ products.length }} ARTICLES)
                    </div>
                    <div class="card-body text-center" colspan="6" v-if="products.length == 0">
                        <i class="zmdi zmdi-shopping-cart-plus d-block zmdi-hc-5x" style="color:#4c2b11;"></i>
                        <span class="text text-info" style="color:#ffffff;">Aucun article dans le panier</span>
                    </div>
                    <div v-else class="card-body d-flex flex-column" v-for="(product , key) in products" :key="key">
                        <div class="d-flex">
                            <div class="col-sm-4">
                                <router-link :to="'/article /' + product.id ">
                                    <img v-if="product.image != null" :src="SHOPPING.PUBLIC_URL + '' + product.image.split(';')[0].toString()" alt="product images">
                                    <img v-else src="images/product/sm-3/1.jpg" alt="product img">
                                </router-link>
                            </div>
                            <div class="col-sm-8">
                                <h5 class="card-title font-weight-light">{{ product.name | truncate(50) }}</h5>
                                <div class="price-box d-flex flex-column">
                                    <span class="text-left font-weight-bold" style="color:#4c2b11;">{{ product.price | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true } ) }}</span>
                                    <span class="old_prize text-muted" style="font-size:15px;" v-if="product.old_price">{{ product.old_price | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true } ) }}</span>
                                </div>  
                            </div>
                        </div>
                        <div class="d-flex" style="border-top:1px solid #ccc;border-bottom : 1px solid #ccc; padding: 8px 0;">
                            <div class="product-remove font-weight-light" style="color:#4c2b11;" @click="removeFromCart(product.id , key)"><i class="fa fa-trash fa-2x" style="color:#4c2b11;"></i>&nbsp;SUPPRIMER</div>                            
                            <div class="product-quantity text-center ml-auto">
                                <select v-model="cart[key].quantity">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex" style="padding :8px 0;" v-if="products.length > 0">
                        <span class="font-weight-bold">Montant Total</span>
                        <span class="ml-auto font-weight-bold" style="color:#4c2b11;">{{ total | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true }) }}</span>
                    </div>
                    <router-link to="/shopping/checkout" class="primary-button btn-block" v-if="products.length > 0">
                        FINALISER
                    </router-link>
                    <router-link to="/shopping" class="primary-button btn-block">
                        Poursuivre vos achats
                    </router-link>
                </div>
            </div>
        </div>  
    </div>
</template>
<style scoped>
.btn-submit-sm{
    background: rgb(207, 10, 89) none repeat scroll 0 0;
    border: 0 none;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    text-transform: uppercase;        
}
select{
border: 1px solid #e1e1e1;
color: #898888;
height: 30px;
margin-left: 10px;
padding: 0 10px; 
}
.is-danger{
    background-color : #4c2b11;
}
.cart__btn__list li:hover{
    color : #fff !important;
}
</style>

<script>
import axios from 'axios';  
import Sidebar from '@/components/shopping/Sidebar.vue';
import {API_PREFIX , API_VERSION , SHOPPING} from '@/config'
export default {

	components: {
		Sidebar
	},

    data : function(){
        return{
            cart : [],
            products : [],
            total_price : 0,
            searchText : '',
            SHOPPING : SHOPPING
        }
    },

    mounted (){
        this.getCart();
        this.getProducts();
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

        removeFromCart(productId , key){
            this.cart.splice(key , 1);
            const parsed = JSON.stringify(this.cart);
            localStorage.removeItem('product_id');  
			localStorage.setItem('product_id', parsed);
            this.products.splice(key , 1);
            this.$store.commit('removeFromCart');
            this.$toasted.show('l\'article a été retiré du panier avec succès');
        },

        checkout(){
            this.$validator.validateAll().then(valid => {
                if(valid){
                    localStorage.removeItem('product_id');
                    const parsed = JSON.stringify(this.cart);
                    localStorage.setItem('product_id', parsed);
                    this.$router.push('/shopping/checkout');
                }
            });
        },
		
    }
}
</script>
