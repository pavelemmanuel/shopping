import VueRouter from "vue-router";
import store from './store'

import Login from './views/auth/login.vue';
import Register from './views/auth/register.vue';

//Home



//shopping
import NotFound from '@/views/shopping/notfound.vue';


//shopping
import shoppingIndex from '@/views/shopping/index.vue';
import shoppingSingleproduct from '@/views/shopping/singleproduct.vue';
import shoppingCategory from '@/views/shopping/category.vue';
import shoppingCart from '@/views/shopping/cart.vue';
import shoppingService from '@/views/shopping/service.vue';
import shoppingOrderIndex from '@/views/shopping/commandes/index.vue';
import shoppingOrderProductShow from '@/views/shopping/commandes/products/show.vue';
import shoppingOrderServiceShow from '@/views/shopping/commandes/services/show.vue';
import shoppingOrderProductRate from '@/views/shopping/commandes/products/rate.vue';
import shoppingOrderServiceInvoice from '@/views/shopping/commandes/services/invoice.vue';
import shoppingCategoryAll from '@/views/shopping/categoryall.vue';
import shoppingOrderServiceRate from '@/views/shopping/commandes/services/rate.vue';
import shoppingSupplier from '@/views/shopping/supplier.vue';
import shoppingCheckout from '@/views/shopping/commandes/checkout.vue';
// import shoppingPaymentXikkaSuccess from '@/views/shopping/payment/xikka/success.vue';
// import shoppingPaymentXikkaError from '@/views/shopping/payment/xikka/error.vue';
// import shoppingPaymentMomoSuccess from '@/views/shopping/payment/momo/success.vue';

const routes = [{
        path: '*',
        name: 'notfound',
        component: NotFound
    },

    // Login
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            layout: "auth",
            requiredAuth: false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            layout: "auth",
            requiredAuth: false
        }
    },


    //shopping
    {
        path: '/',
        name: 'marketplaceindex',
        component: shoppingIndex,
        props: true,
        meta: {
            layout: "marketplace",
            requiredAuth: false
        }
    },

    {
        path: '/shopping',
        name: 'marketplaceindex',
        component: shoppingIndex,
        props: true,
        meta: {
            layout: "marketplace",
            requiredAuth: false
        }
    },

    {
        path: '/shopping/category/:category_id',
        name: 'marketplacecategory',
        component: shoppingCategory,
        props: true,
        meta: {
            layout: "marketplace",

        }
    },

    {
        path: '/shopping/product/:product_id',
        name: 'productShow',
        component: shoppingSingleproduct,
        meta: {
            layout: "marketplace",
        }
    },

    {
        path: '/shopping/cart',
        name: 'cart',
        component: shoppingCart,
        meta: {
            layout: "marketplace",
        }
    },


    {
        path: '/shopping/service/:service_id',
        name: 'serviceShow',
        component: shoppingService,
        meta: {
            layout: "marketplace",
        }
    },

    {
        path: '/shopping/order/',
        name: 'orderIndex',
        component: shoppingOrderIndex,
        meta: {
            layout: "marketplace",
            requiredAuth: true
        }
    },

    {
        path: '/shopping/order/product/show/:order_id',
        name: 'orderProductShow',
        component: shoppingOrderProductShow,
        meta: {
            layout: "marketplace",
            requiredAuth: true
        }
    },

    {
        path: '/shopping/order/service/show/:offer_id',
        name: 'orderServiceShow',
        component: shoppingOrderServiceShow,
        meta: {
            layout: "marketplace",
            requiredAuth: true
        }
    },

    {
        path: '/shopping/order/product/rate/:product_id',
        name: 'orderProductRate',
        component: shoppingOrderProductRate,
        meta: {
            layout: "marketplace",
            requiredAuth: true
        }
    },

    {
        path: '/shopping/order/service/rate/:service_id',
        name: 'orderServiceRate',
        component: shoppingOrderServiceRate,
        meta: {
            layout: "marketplace",
            requiredAuth: true
        }
    },
    {
        path: '/shopping/order/invoice/:invoice_id',
        name: 'orderServiceInvoice',
        component: shoppingOrderServiceInvoice,
        meta: {
            layout: "marketplace",
            requiredAuth: true
        }
    },

    {
        path: '/shopping/category',
        name: 'categoryAll',
        component: shoppingCategoryAll,
        meta: {
            layout: "marketplace",
        }
    },

    {
        path: '/shopping/supplier',
        name: 'supplier',
        component: shoppingSupplier,
        meta: {
            layout: "marketplace",
        }
    },

    {
        path: '/shopping/checkout',
        name: 'checkout',
        component: shoppingCheckout,
        beforeEnter: (to, from, next) => {
            if (localStorage.product_id && JSON.parse(localStorage.product_id).length > 0) {
                next();
            } else {
                next('/shopping/cart');
            }
        },
        meta: {
            layout: "marketplace",
            requiredAuth: true
        }
    },

    // {
    //     path: '/payment/xikka/success',
    //     name: 'paymentxikkasuccess',
    //     component: shoppingPaymentXikkaSuccess,
    //     props: true,
    //     meta: {
    //         layout: "marketplace",
    //         requiredAuth: true
    //     }
    // },

    // {
    //     path: '/payment/xikka/error',
    //     name: 'paymentxikkaserror',
    //     component: shoppingPaymentXikkaError,
    //     props: true,
    //     meta: {
    //         layout: "marketplace",
    //         requiredAuth: true
    //     }
    // },

    // {
    //     path: '/payment/momo/success',
    //     name: 'paymentmomosuccess',
    //     component: shoppingPaymentMomoSuccess,
    //     props: true,
    //     meta: {
    //         layout: "marketplace",
    //         requiredAuth: true
    //     }
    // },

];

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiredAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        next('/login');
    } else {
        next();
    }
});

export default router;