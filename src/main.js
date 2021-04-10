import Vue from 'vue';
import VueRouter from 'vue-router';
import Vue2Filters from 'vue2-filters';
import VueProgressBar from 'vue-progressbar';
import VeeValidate from 'vee-validate';
import Toasted from 'vue-toasted';
import { Validator } from 'vee-validate';
import Fr from 'vee-validate/dist/locale/fr';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueHtmlToPaper from 'vue-html-to-paper';
import 'dropzone/dist/min/dropzone.min.css';
import VueTheMask from 'vue-the-mask';
import ProgressBar from 'vuejs-progress-bar';
import moment from 'moment';
import VueMoment from 'vue-moment';
import ProductZoomer from 'vue-product-zoomer'
import 'moment/locale/fr';

import App from './App.vue';
import router from './router';
import store from './store';

//layout
import Auth from '@/layouts/Auth.vue';
import Shopping from '@/layouts/Shopping.vue';


//common components
import MaskedInput from '@/components/common/inputs/maskedInput';
import SelectInput from '@/components/common/inputs/selectInput';
import TextareaInput from '@/components/common/inputs/textareaInput';
import TextInput from '@/components/common/inputs/textInput';

// Titles
import Title from '@/components/common/titles/Title';
import SubTitle from '@/components/common/titles/SubTitle';

// UI
import spinner from '@/components/common/ui/spinner';

const progressOptions = {
    color: '#b71c1c',
    failedColor: '#874b4b',
    thickness: '3px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 400
    },
    autoRevert: true,
    location: 'top',
    inverse: false,
    autoFinish: false
}

const toastedOptions = {
    position: 'bottom-right',
    duration: 4000,
    action: {
        text: 'Fermer',
        onClick: (e, toastObject) => {
            toastObject.goAway(0);
        }
    },
    className: 'toastColor'
}



Vue.use(VueProgressBar, progressOptions);
Vue.use(VueMoment, { moment });
Vue.use(VueTheMask);
Vue.use(Toasted, toastedOptions);
Vue.toasted.register('brown', (playload) => { return playload.message; }, toastedOptions);
Vue.use(VueRouter);
Vue.use(Vue2Filters);
Vue.use(VeeValidate);
Validator.localize('fr', Fr);
Vue.use(ProgressBar);
Vue.use(ProductZoomer)

Vue.config.productionTip = false;

//layouts
Vue.component('auth', Auth);
Vue.component('marketplace', Shopping);


// common components
Vue.component('masked-input', MaskedInput);
Vue.component('select-input', SelectInput);
Vue.component('textarea-input', TextareaInput);
Vue.component('text-input', TextInput);

//ui
Vue.component('spinner', spinner);

// Titles
Vue.component('big-title', Title);
Vue.component('sub-title', SubTitle);

new Vue({
    mixins: [Vue2Filters.mixin],
    router,
    store,
    render: h => h(App),
}).$mount('#app')