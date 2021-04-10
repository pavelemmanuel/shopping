<template>
  <div>
    <vue-progress-bar></vue-progress-bar>
    <Header></Header>
    <Nav @search="search"></Nav>
    <Breadcrumb></Breadcrumb>
    <div class="wrapper shadow" id="wrapper"  style="">
      <slot/>
      <div style="background-color:white; height:80px;position:relative;z-index:5;"></div>
    </div>
    <Footer></Footer>
  </div>
</template>
<style scoped>
.half-circle {
    height: 190px;
    width: 380px;
    background-color:white;
    border-bottom-left-radius: 240px;
    border-bottom-right-radius: 240px;
    box-shadow: 1px 15px 15px 0px rgb(226, 226, 226);
}
</style>

<script>
import Header from '@/components/shopping/Header.vue';
import Breadcrumb from '@/components/shopping/Breadcrumb.vue';
import Nav from '@/components/shopping/Nav.vue'
import Footer from '@/components/Footer.vue';
export default {
  name: 'app',
  components: {
    Header,
    Breadcrumb,
    Footer,
    Nav
  },

  methods : {
    search(searchText , categoryId){
      let app = this;
      if(categoryId ==0 ){
        app.$router.push({name : 'marketplaceindex' , query: { search : searchText}});
      }else{
        app.$router.push({ name : 'category' , params : { category_id : categoryId} ,query : { search : searchText}});
      }
    }
  },

  mounted(){
    this.$store.dispatch('get_customer_info')
    .then((response) => {
    })
    .catch((error) => {
        console.log(error);
        if(error.response) {
            console.log(error.response.data);
        }                           
    })
  }
}
</script>
