<template>
    <div class="maincontent bg--white pt--80 pb--55">
        <vue-progress-bar></vue-progress-bar>        
        <div class="container">
            <div class="row">
                <div class="col-lg-9 col-12">
                    <div class="wn__single__product">
                        <div class="row">
                            <div class="col-lg-5 col-12">
                                <div class="row">
                                    <div class="col-2 col-sm-3 col-xs-3">
                                        <img class="mb-20" :class="[ selectedThumbs == key ? 'choosedthumbs' : '']" @click="onThumbSelect(key)" :src="SHOPPING.DEV_URL + '' + image" v-for="(image, key) in images" :key="key">
                                    </div>
                                    <div class="col-10 col-sm-9 col-xs-9" v-if="images.length > 0">
                                        <img :src="SHOPPING.DEV_URL + ''+ images[selectedThumbs]" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-7 col-12">
                                <div class="product__info__main">
                                    <h1 class="text-left">{{ service.name }}</h1>
                                    <div class="d-flex">
                                        <star-rating class="align-self-start" v-model="service.rate" :star-size="17" border-color="#4c2b11" :glow="0" :show-rating="false" :readOnly="true">
                                        </star-rating>&nbsp;
                                        <div class="ml-auto">
                                            <p class="text-muted"> Basé sur ({{ nbAvis }}) avis</p>
                                            <router-link :to="'/shopping/order/service/rate/'+ service.id">Ecrire un avis ></router-link>
                                        </div>        
                                    </div>
                                    <hr>
                                    <div class="mt-20 raw-html alert col-lg-12 text-left border border-light"><p>{{ service.description}}</p></div>
                                    <form class="pt-20" v-on:submit.prevent="store" >
                                        <h6 class="mb-20 text-muted" v-if="service.specifications.length > 0">Veuillez remplir le formulaire suivant svp !</h6>
                                        <div class="form-group" v-for="(spec , key) in service.specifications" :key="key">
                                            <label class="control-label">{{ spec.name }} <span style="color:#cf0a59;">{{ parseInt(spec.isrequired) ? '*' : ''}}</span></label>
                                            <input class="form-control" v-if="spec.type == 'number'" type="number" v-model="spec.response" v-validate="parseInt(spec.isrequired) ? 'required' : ''" :name="spec.name">
                                            <input class="form-control" v-else-if="spec.type == 'date'" type="date" v-model="spec.response" v-validate="parseInt(spec.isrequired) ? 'required' : ''" :name="spec.name">
                                            <select v-else-if="spec.type == 'select'" class="form-control" v-model="spec.response" v-validate="parseInt(spec.isrequired) ? 'required' : ''" :name="spec.name">
                                                <option :value="value.toString()" v-for="(value , key) in spec.value.split(';')" :key="key">{{ value.toString() | capitalize }}</option>
                                            </select>
                                            <template v-else-if="spec.type == 'textarea'">
                                                <textarea class="form-control" v-model="spec.response" style="height:100px;" v-validate="parseInt(spec.isrequired) ? 'required' : ''" :name="spec.name"></textarea>
                                            </template>
                                            <input class="form-control" v-model="spec.response" type="checkbox" v-else-if="spec.type == 'checkbox'">
                                            <input class="form-control" v-model="spec.response" v-else type="text" v-validate="parseInt(spec.isrequired) ? 'required' : ''" :name="spec.name" >
                                            <small class="form-control-feedback text-danger"  v-show="errors.has(spec.name)"> {{ errors.first(spec.name) }} </small>
                                        </div>
                                        <button class="btn-submit" type="submit">
                                            Commander
                                        </button>
                                    </form>
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
                                    <p v-html="service.description"></p>
                                </div>
                            </div>
                            <div class="pro__tab_label tab-pane fade" id="nav-review" role="tabpanel">
                                <div class="review__attribute">
                                    <div class="text-center">
                                        <div>
                                            <div class="container pt-20 pb-20">
                                                <div class="text-center">
                                                    <p class="font-weight-bold">Avez vous utilisé cet service ? Qu'en pensez vous ?</p>
                                                    <div class="d-flex justify-content-center">
                                                        <center>
                                                        <star-rating  @current-rating="setRateText" @rating-selected="setRating" v-model="rate" :star-size="20" active-color="#4c2b11" :show-rating="false" class="justify-content-center">
                                                        </star-rating>&nbsp;
                                                            <span style="width:140px;" class="text-muted" >{{ rateText }} !</span>
                                                        </center>
                                                    </div>
                                                    <router-link :to="'/shopping/order/service/rate/' + service.id">
                                                        <button  class="secondary-button" type="submit" style="background-color:#666666;">ECRIRE UN AVIS</button>
                                                    </router-link>
                                                </div>
                                            </div>
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
                                                    <p class="font-weight-normal">{{ rating.customer.last_name}}</p>
                                                    <p class="text-muted">{{ rating.created_at | moment("Do-MM-YYYY HH:MM")}}</p>
                                                </div>
                                                <div class="col-md-3">
                                                    <star-rating :star-size="20" active-color="#4c2b11" :read-only="true" v-model="rating.rate" :show-rating="false"></star-rating>
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
    label {
        color: #333;
        display: inline-block;
        font-weight: 500;
        margin: 0 0 8px;
    }
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
</style>

<script>
import axios from 'axios'
import Sidebar from '@/components/shopping/Sidebar.vue';
import StarRating from 'vue-star-rating';
import Paginate from 'vuejs-paginate';
import {SHOPPING , API_PREFIX , API_VERSION , STATUS_COMMANDE } from '@/config'
export default {

	components: {
        StarRating,
        Sidebar,
        Paginate
    },

    watch: {
        '$route' (to , from){
			this.getService();
		},
	
    },
    
    data : function(){
        return{
            service: {
                specifications : [],
            },
            images : [],
            rate : 0,
            nbAvis : 0,
            comments : [],
            rateText : '',
            selectedThumbs : 0,
			paginate : {
				last_page : 0,
				currentPage : 0,
				perPage : 0,
				total : 0,
				from : 0,
				to :0
			}, 
            SHOPPING : SHOPPING

        }
    },

    mounted : function(){
        this.getService();
    },

    computed : {
        customer_id (){
            return this.$store.state.customer_id;
        }
    },

    methods : {

		filterSide(selectedRange){
            this.$router.push('/')
		},
		
		search(searchText){
            let app = this;
            app.$router.push({name : 'marketplaceindex' , params: { search : searchText}});
        },
        
        getService (){
            let app = this;
            app.$Progress.start();
            let service_id = app.$route.params.service_id;
            var url = SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'services/' + service_id;
            axios.get(url)
            .then(function(response){
                app.service = response.data;
                if(app.service.image){
                    app.images = app.service.image.split(";");
                    app.images.pop();
                }
                app.$Progress.finish();
            })
            .catch(function(error){
                console.log(error);
            })
        },

		paginateClick : function(page){
            let app = this;
            let service_id = app.$route.params.srevice_id;
            axios.get(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'service_comments/'+ product_id +'?page=' + page)
            .then(function(response){
				app.comments = response.data.comments.data;
				app.paginate.currentPage = response.data.comments.current_page;
            })
            .catch(function(error){
                console.log(error);
            })
        },
        
        store(){
            if(!localStorage.getItem('token')){
                window.location.href = '/login';
            }
            let app = this;
            let service_id = app.$route.params.service_id;
            let token = localStorage.getItem('token');
            this.$validator.validateAll().then(valid => {
                if(valid){
                    app.$Progress.start();
                    axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'offers' , {
                        customer_id : app.customer_id,
                        service_id : service_id,
                        current_status : STATUS_COMMANDE
                    } , {
                        headers: {
                            Authorization: 'Bearer ' + token
                        } 
                    })
                    .then(function(response) {
                        let offer_id = response.data.id;
                        axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'req_status' , {
                                offer_id : offer_id,
                                status_id : STATUS_COMMANDE
                            }, {
                                headers: {
                                    Authorization: 'Bearer ' + token
                                } 
                            })
                            .then(function(resp) {
                                app.service.specifications.forEach((spec , index) => {
                                    axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'req_specs' , {
                                            offer_id : offer_id,
                                            specification_id : spec.id,
                                            response : spec.response
                                        }, {
                                            headers: {
                                                Authorization: 'Bearer ' + token
                                            } 
                                        })
                                        .then(function(){
                                            if(index == app.service.specifications.length -1){
                                                app.$Progress.finish();
                                                app.$router.push('/shopping/order/service/show/' + offer_id ,() => {
                                                    app.$toasted.success('Votre commande a été effectué avec success');
                                                });
                                            }
                                        });
                                });
                            })
                            .catch(function(err){
                                app.$Progress.finish();
                                console.log(err);                 
                            });
                    })
                    .catch(function(error){
                        app.$Progress.finish();
                        console.log(error);
                    });
                }
            });
        },

        setRating(){
            let app = this;
            let serviceId = this.$route.params.service_id;
            const token = localStorage.getItem('token');
            axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'service_ratings' , {
                rate : app.rate,
                customer_id : app.customer_id,
                service_id : serviceId
            } , {
              headers: {
                  Authorization: 'Bearer ' + token
              } 
            })
            .then(function(response){
                app.rate = parseInt(response.data[0].rate);
                app.service.rate = parseInt(response.data[1]);
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

