<template>
    <div>
        Vous serez redirigé dans un instant ...
    </div>
</template>
<script>
import axios from 'axios';
import {SHOPPING , API_PREFIX  ,API_VERSION ,STATUS_PAYEMENT_SUCCESS , XIKKA_API_KEY,  STATUS_PAYEMENT_DENIED} from '@/config'
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
            let code_retour = this.$route.query.code_retour;
            const token = localStorage.getItem('token');
            axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'order_status' ,{
                order_id: order_id,
                status_id : STATUS_PAYEMENT_DENIED
            } , {
                headers : {
                    Authorization: 'Bearer ' + token
                }
            }).then(function(){
                app.$Progress.finish();
                app.$router.push({path : '/shopping/order/product/show/' + order_id} , () => {
                    if(code_retour == 101){
                        app.$toasted.error("Le solde de votre compte xikka est insuffisant");
                    }else{
                        app.$toasted.error("Le solde de votre compte xikka est insuffisant");
                    }
                });   
            }).catch(function(error){
                console.log(error);
            });  
        }
    }
}
</script>

