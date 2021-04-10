<template>
    <footer class="footer-area section-gap" style="padding: 15px 0;">
        <div class="container-fluid">
            <div class="row justify-content-center ">
                <div class="footer-top flex-column align-items-center container">
                    <ul class="footer-menu mb-20">
                        <li><router-link class="font-weight-bold" to="/">Accueil</router-link></li>
                        <li><router-link class="font-weight-bold" to="/town-hall">Mairies</router-link></li>
                        <li>
                            <router-link class="font-weight-bold" to="/">
                                Un soucis
                            </router-link>
                        </li>
                        <li>
                            <router-link class="font-weight-bold" to="/shopping">
                                Shopping
                            </router-link>
                        </li>
                        <li>
                            <a class="font-weight-bold" href="javascript:void(0);">
                                Blog
                            </a>
                        </li>
                        <li>
                            <router-link class="font-weight-bold" to="/contact">
                                Contact
                            </router-link>
                        </li>
                    </ul>
                    <div class="container text-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quae, iure nam. Qui nam assumenda <br> laborum incidunt aperiam velit aliquam, 
                        eligendi veniam officia quo eveniet aspernatur officiis fugiat illo molestias natus. 
                    </div>
                    <div class="row no-padding justify-content-center text-center" style="height: auto;">
                        <div class="col-md-12">
                            <div class="row" style="padding-top: 10px;padding-bottom: 10px;">
                                <div class="col-md-4">
                                        <i class="fa fa-envelope fa-2x" style="color: #b71c1c"></i>
                                        &nbsp;&nbsp;
                                        info@joursdejoie.shop
                                </div>
                                <div class="col-md-4">
                                    <i class="fa fa-mobile fa-2x" style="color: #b71c1c"></i>
                                    &nbsp;&nbsp;
                                    (+225) 05 57 28 95 / (+225) 74 50 16 02
                                </div>
                                <div class="col-md-4">
                                    <a href="#" target="_blank" class="btn-social btn-facebook"><i class="fa fa-facebook"></i></a>
                                    <a href="#" target="_blank" class="btn-social btn-instagram"><i class="fa fa-instagram"></i></a>
                                    <a href="#" target="_blank" class="btn-social btn-twitter"><i class="fa fa-twitter"></i></a>
                                    <a href="#" target="_blank" class="btn-social btn-linkedin"><i class="fa fa-linkedin"></i></a>
                                    <a href="#" target="_blank" class="btn-social btn-pinterest"><i class="fa fa-pinterest"></i></a>
                                    <a href="#" target="_blank" class="btn-social btn-youtube"><i class="fa fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="row footer-bottom justify-content-center">
                        <p class="col-lg-8 col-sm-12 footer-text">Copyright &copy; 2019. Tous droits reservés | Make with <i class="fa fa-heart"></i> by <a href="https://paraclet-ci.com" target="_blank">Paraclet</a>.</p>
                    </div>               
                </div>          
            </div>
            
        </div>
    </footer>
</template>

<style scoped>
    @media (min-width:1025px) { .container { width: 70% !important;} }
    @import '/css/social-icon.css';
    .router-link-active {
        color: #b71c1c;
    }
</style>

<script>
    export default {
        name: 'Footer',
        data: function() {
            return {
                //
            }
        },
        methods: {
            socialButton: function() {
                alert('Yo bruuuh');
            }
        }
    }
</script>
