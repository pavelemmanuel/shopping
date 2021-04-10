<template>
    <div :id="'print_content' + key">
        <div class="container" style="width:80%;">
            <div class="row">
                <div class="card mt-20 pb-20 mb-20 col-md-12" >
                    <div class="card-body">
                        <div>
                            <h3 class="card-title font-weight-normal">
                                <router-link to="/order"><i class="fa fa-arrow-left"  style="color:black; font-weight:none;"></i>
                                    <span> </span>
                                </router-link>&nbsp;Détails de la facture
                            </h3>
                        </div>
                        <p class="card-subtitle mb-2 text-muted">Vous trouverez ici vos commandes passées depuis la création de votre compte.</p>
                        <hr class="mb-20 mt-20 ">
                        <div class="d-flex">
                            <div class="text-muted">
                                <h6 class="mb-10">Facture n° {{ invoice.id }}</h6>
                                <p>Recu le {{ invoice.created_at | moment("Do/MM/YYYY HH:MM") }}</p>
                            </div>
                            <div class="ml-auto" v-if="invoice.length > 0">
                                <p class="text-muted">Devis disponible</p>
                                <router-link :to="'/shopping/order/invoice/' + invoice[0].id">
                                    <button class="btn-submit-sm">Voir Devis</button>
                                </router-link>
                            </div>
                        </div>
                        <hr class="mb-20 mt-20">
                        <h6 class="mb-10 font-weight-light">Spécifications du devis</h6>
                        <form action="#">               
                            <div class="table-content wnro__table table-responsive">
                                <table>
                                    <thead>
                                        <tr class="title-top">
                                            <th class="text-center">#</th>
                                            <th>Désignation</th>
                                            <th class="text-right">Quantité</th>
                                            <th class="text-right">Prix Unitaire</th>
                                            <th class="text-right">Total (FCFA)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item , key) in invoice.items" :key="key">
                                            <td class="text-center">{{key + 1}}</td>
                                            <td>{{ item.name }}</td>
                                            <td class="text-right">{{ item.quantity }}</td>
                                            <td class="text-right"> {{ item.price  | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true })}}</td>
                                            <td class="text-right">{{ parseInt(item.price) * parseInt(item.quantity) | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true }) }}</td>
                                            <template v-if="invoice.requested && item.message !=null" class="noprint">
                                                <th>{{ item.message}}</th>
                                            </template>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                        <div class="pull-right">
                            <p>Sous - Montant total: {{ totalHT | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true }) }}</p>
                            <p>TVA ({{tva}}%) : {{ tax | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true }) }} </p>
                            <div class=" mt-20">
                                    <div class="cart__total__amount">
                                        <span>Total :</span>&nbsp;
                                        <span>{{ totalHT + tax | currency('FCFA' , 0 , { thousandsSeparator: ' ' , symbolOnLeft: false , spaceBetweenAmountAndSymbol: true }) }}</span>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <a class="text-center" data-toggle="modal" data-target="#exampleModalCenter" style="cursor:pointer;">Besoin d'aide ?</a>
                </div>
            </div>
        </div>	
    </div>
</template>
<script>
import { SHOPPING , API_PREFIX , API_VERSION , TVA_ID } from '@/config';
import axios from 'axios';
    export default {

        data : function(){
            return{
				invoice: {
				},
				total_price : 0,
                tva : null,
            }
        },

		mounted : function(){
				this.getInvoice();
				this.getTva();
			},

		computed : {
			totalHT (){
				if(this.invoice.items){
					this.invoice.items.forEach(element => {
						this.total_price +=  (element.price * element.quantity);
					})
				}
				return Math.round(this.total_price);
			},

			tax (){
				return Math.round((this.total_price * this.tva )/100);
			},
		},

		methods : {

			getTva(){
				let app = this;
				axios.get(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'params/' + TVA_ID)
					.then(function(response){
						app.tva = response.data.value;
					})
					.catch(function(error){
						console.log(error);
						alert('Oups ! something went wrong while getting TVA');
					})
			},

			getInvoice (){
				let app = this;
				let invoice_id = app.$route.params.invoice_id;
				var url = SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'invoices/' + invoice_id;
				axios.get(url)
				.then(function(response){
						app.invoice = response.data;
				})
				.catch(function(error){
						console.log(error);
				})
			},


			print (){
				window.print();
			},
			cancel(){
				var uri = "/admin/request/show/" + this.$route.params.request_id;
				this.$router.push(uri);
			}

		}
    }
</script>
