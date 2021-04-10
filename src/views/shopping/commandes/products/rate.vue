<template>
    <div class="maincontent bg--white pt--80 pb--55">
        <vue-progress-bar></vue-progress-bar>
        <div class="container">
            <div class="d-flex">
                <router-link :to="'/shopping/product/' + product.id" class="btn-submit-sm" style="background-color : #9e9e9e; color :white;">Retour a la page produit</router-link>
                <h6 class="ml-auto text-muted">Votre Avis sur ce produit</h6>
            </div>
            <hr style="margin : 25px 0;">
            <div class="row">
                <div class="col-md-4 col-12">
                    <div>
                        <img v-if="product.image != null" :src="SHOPPING.DEV_URL + '' + product.image.split(';')[0].toString()" alt="product images">
                        <img v-else src="images/product/2.jpg" alt="product images">
                    </div>
                </div>
                <div class="col-md-8 col-12">
                    <div class="product__info__main">
                        <h1 class="text-left">{{ product.name }}</h1>
                        <div class="d-flex">
                                <star-rating class="align-self-start" v-model="product.rate" :star-size="17" border-color="#4c2b11" :glow="0" :show-rating="false" :readOnly="true">
                                </star-rating>&nbsp;                                
                        </div>
                        <form class="pt-20" v-on:submit.prevent="setRating">
                            <div class="review_form_field">
                                <div class="input__box">
                                    <span>Notez cet produit (*) :</span>
                                    <div class="d-flex">
                                        <star-rating v-model="rate" :star-size="20" active-color="#4c2b11" :show-rating="false" @current-rating="setRateText">
                                        </star-rating>
                                        <span class="text-muted" >{{ rateText }} !</span>
                                    </div>
                                </div>
                                <div class="input__box">
                                    <span>Laissez un commentaire :</span>
                                    <textarea  v-model="comment"></textarea>
                                </div>
                                <div class="pt-20">
                                    <button type="submit" class="btn-submit-sm float-right">ENVOYER COMMENTAIRE</button>
                                </div>
                            </div>
                        </form>
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
    </div>
</template>
<style scoped>

    .btn-submit-sm{
        background: rgb(207, 10, 89) none repeat scroll 0 0;
        border: 0 none;
        color: #fff;
        font-size: 12px;
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

    textarea {
        height : 100px;
    }
        @media (min-width:1025px) { .container { width: 60% !important;} }
</style>

<script>
import axios from 'axios'
import { SHOPPING, API_PREFIX , API_VERSION } from '@/config';
import StarRating from 'vue-star-rating'
export default {

    components: {
        StarRating,
    },
    data : function(){
        return{
            product: {
                ratings : [],
            },
            rate : 0,
            rateText:'',
            comment : '',
            images : [],
            SHOPPING : SHOPPING
        }
    },

    mounted : function(){
        this.getProduct();
    },

    computed : {
        customer_id (){
            return this.$store.state.customer_id;
        }
    },

    methods : {
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
                }
                app.$Progress.finish();
            })
            .catch(function(error){
                console.log(error);
            })
        },  
        
        setRating(){
            let app = this;
            app.$Progress.start();
            let productId = this.$route.params.product_id;
            const token =localStorage.getItem('token');
            axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'ratings' , {
                rate : app.rate,
                customer_id : app.customer_id,
                product_id : productId,
                comment : app.comment
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                } 
            })
            .then(function(response){
                app.$Progress.finish();
                app.$router.push('/shopping/product/'+ productId);
            })
            .catch(function(error){
                alert('Oups something went wrong');
            })
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

