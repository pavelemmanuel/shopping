<template>
	<div v-bind:style="{ backgroundImage : bgUrl , height : hauteur +'px'}" :class="bgClass" class="d-flex flex-column justify-content-center" style="margin-top:72px;">
		<div v-if="titre" style="background-color:rgba(255 ,255,255,0.8);width:250px; padding: 20px 0;">
			<h2 style="color:#b71c1c;" class="pl-3 text-center">{{ titre}}</h2>
		</div>
		<!-- <div class="d-flex justify-content-center">
			<div class="d-flex align-items-center justify-content-center" title="rond"
            :style="{marginTop : '-' + mt+ 'px'}"
				style="
				z-index:10000;
				width: 350px; height:350px;
				text-align:center; border-radius: 400px;
				font-size: 35px; color: #b71c1c;
				background-color: white; ">
			<p style="text-align: center;font-family: Vivaldi; font-size:46px; padding-top:185px; ">Jours de joie
			</p>
			</div>
		</div> -->
	</div>
</template>
<style scoped>
    @media(max-width:800px){
        div [title="rond"] {
         /* display: none; */
        border: 1px solid;
        color: black ;
        position: relative;
        top: -200px;
        /*opacity: 0;*/
        /* background-color: blue;  */
      }
    }
</style>

<script>
export default {
    props :{
        titre : {
            type : String,
            default : ''
        },
        bgClass : {
            type: String,
            default : ''
        },

        bgUrl : {
            type : String,
            default : ''
        },

        hauteur :  {
            type : Number,
            default : 400
        },
        mt : {
            type : Number,
            default : 500
        }
    }
}
</script>
