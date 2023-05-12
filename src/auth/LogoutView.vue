<template>
    <SpinnerView v-if="spinner"/>
    <div>
    </div>
</template>

<script>
import axios from 'axios';
import SpinnerView from '../components/SpinnerView.vue'
import Swal from 'sweetalert';

export default {
    name: 'MyComponent',
    components: {
        SpinnerView
    },
    data: function(){
        return {
            spinner: false
        }
    },
    computed:{
        baseUrl() {
            return process.env.VUE_APP_BASE_URL;
        },
    },
    mounted(){
        this.logout();
    },
    methods: {
        showSweetAlert: message =>
            Swal({
                title: message,
                icon: 'success',
                confirmButtonText: 'OK'
            }),

        async logout() {
            try {
                this.spinner = true;
                const response = await axios.post(
                `${this.baseUrl}logout/`,
                {},
                {
                    headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                    },
                }
                );
                this.showSweetAlert(response.data.message)
            } catch (error) {
                this.$router.push('/')
            } finally {
                localStorage.removeItem('token')
                this.$store.commit('setIsLoggedIn', false);
                this.$store.commit("setUsername", null);
                this.$router.push('/')
                this.spinner = false;
            }
        },
    }
};
</script>