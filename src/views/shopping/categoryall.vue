<template>
    <div class="cart-main-area section-padding--lg bg--white">
        <vue-progress-bar></vue-progress-bar>
        <div class="container">
            <div class="row">
                <Sidebar :selected="0" v-on:dragend="filterSide" @search="search">
                </Sidebar>
                <div class="col-lg-9 col-12 order-1 order-lg-2 card mt-20 mb-20" >
                    <div class="card-body">
                        <h3 class="card-title">Nos catégories</h3>
                        <p class="card-subtitle mb-2 text-muted">Vous trouverez ici la liste de toutes nos catégories.</p>
                        <hr class="mb-20">
                        <ul class="row">
                            <li class="col-md-4" v-for="(category, key) in categories" :key="key">
                                <router-link :to="'marketplace/' +category.id" style="color:#cfa059; font-size:20px;">{{ category.name }}</router-link>
                                <ul v-if="category.child.length > 0">
                                    <li style="padding-left:20px;" v-for="(child , key) in category.child" :key="key">
                                        <router-link :to="'/shopping/category/' + child.id">{{ child.name }}</router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Sidebar from '@/components/shopping/Sidebar.vue';
import { SHOPPING , API_PREFIX , API_VERSION } from '@/config';
export default {

	components: {
		Sidebar
	},

    data : function(){
        return{
            categories : []
        }
    },

    mounted (){
        this.getCategories();
    },
    methods : {

		filterSide(selectedRange){
            this.$router.push('/')
        },

		search(searchText){
            let app = this;
            app.$router.push('/');
        },

        getCategories(){
            let app = this;
            app.$Progress.start();
            axios.get(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'root_categories')
                .then(function(response){
                    app.categories = response.data;
                    app.$Progress.finish();
                })
        },
    }

}
</script>

