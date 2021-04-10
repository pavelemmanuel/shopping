<template>
    <div class="text-center">
        Vous serez redirigé dans un instant ...
    </div>
</template>
<script>
import axios from 'axios';
import {SHOPPING , PAYMENT , API_PREFIX , API_VERSION ,STATUS_PAYEMENT_SUCCESS , XIKKA_API_KEY,  STATUS_PAYEMENT_DENIED} from '@/config'
export default {
    data : function(){
        return {

        }
    },

    mounted (){
        this.changeStatus();
    },

    methods : {
        changeStatus(){
            let app = this;
            let order_id = this.$route.query.order_id;
            let payment_id = this.$route.query.p_id;
            let token = localStorage.getItem('token');
            
            axios.post(SHOPPING.DEV_URL + API_PREFIX +  API_VERSION + 'order_status' ,{
                order_id: order_id,
                status_id : STATUS_PAYEMENT_SUCCESS
            }, {
                headers : {
                    Authorization: 'Bearer ' + token
                }
            }).then(function(){
                app.$Progress.finish();
                axios.put(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'orders/' + order_id , {
                    payment_id :payment_id
                }, {
                    headers : {
                        Authorization: 'Bearer ' + token
                    }                   
                }).then(function(response){
                    app.$router.push({path : '/shopping/order/product/show/' + order_id} , () => {
                        app.$toasted.success('Paiement Effectué avec succès');
                    });  
                }).catch(function(error){
                    alert('Oups ! something went wrong');
                })
            }).catch(function(error){
                alert('Oups something went wrong')
            });  
        }
    }
}
</script>

