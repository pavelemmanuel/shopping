<template>
    <header style="position:static;">
        <div class="container" style="position: relative;border: solid 1px white;" >
            <div class="header-wrap" style="position: relative;z-index: 100000; ">
                        <div class="collapse navbar-collapse menu-right" id="collapsibleNavbar" style="font-size: 14px;">
                            <ul class="navbar-nav">
                                <li v-if="user != null" class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-user-circle-o" style="font-size:17px;"></i>&nbsp;
                                        <span v-if="user.given_names.length<=7">{{ user.given_names }}</span>
                                        <span v-else-if="user.given_names.length>7">{{ user.given_names.substring(0,7)+"..." }}</span>
                                        <span class="caret"></span>
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a class="dropdown-item" href="javascript:void(0);" @click="goToAccountPage">Mon compte</a>
                                        <a class="dropdown-item" href="javascript:void(0);" @click="goToOrderPage">Mes commandes</a>
                                        <li class="dropdown-divider" style="border-top:1px solid #4c2b11;"></li>
                                        <a class="dropdown-item" href="javascript:void(0);" @click="logout">Déconnexion</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
            </div>
        </div>

    </header>
</template>

<script>
    export default {
        name: 'header',
        data: function() {
            return {
                user: JSON.parse(this.$store.state.user)
            }
        },
        mounted: function() {
            // console.log(this.user);
        },
        computed: {
            userFullname: function() {
                let fullname = null;
                if(this.user != null) {
                    fullname = this.user.last_name + ' ' + this.user.given_names;
                }
                return fullname;
            }
        },
        methods: {
            goToLoginPage: function() {
                this.$router.push('/login');
            },
            goToRegisterPage: function() {
                this.$router.push('/register');
            },
            goToAccountPage: function() {
                this.$router.push('/account');
            },
            goToOrderPage: function() {
                this.$router.push('/shopping/order');
            },
            logout: function() {
                this.$store.dispatch('logout')
                    .then(() => {
                        window.location.href = '/';
                    });
            }
        }
    }
</script>

<style scoped>
    .router-link-exact-active {
        color: #4c2b11;
    }

    .menu-left {
        padding-right: 0 !important;
        padding-left: 0 !important;
    }

    .menu-left a {
        margin-right: 25px;
    }

    .nav-link {
        padding-right: 0 !important;
    }
</style>
