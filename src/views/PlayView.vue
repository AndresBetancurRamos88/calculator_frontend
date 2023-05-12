<template>
    <SpinnerView v-if="spinner"/>
    <div class="row mt-5">
        <div class="col-lg-4 offset-lg-4">
            <form v-on:submit.prevent="checkForm" class="needs-validation" novalidate>
                <div class="form-group row mb-2">
                    <label for="staticEmail" class="col-sm-3 col-form-label">Operation</label>
                    <div class="col-sm-8">
                        <select id="operation" class="form-control" v-model="operation" required>
                            <option value="">Select an option</option>
                            <option v-for="operation in operations" :key="operation.id" :value="operation.id">{{ operation.type }}</option>
                        </select>
                        <div class="invalid-feedback">
                            Please select one operation
                        </div>
                    </div>
                </div>
                <div class="form-group row mb-2">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Number 1</label>
                    <div class="col-sm-8">
                        <input class="form-control" type="number" placeholder="Number 1" v-model="number1" required>
                        <div class="invalid-feedback">
                            This field is required
                        </div>
                    </div>
                </div>
                <div class="form-group row mb-2">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Number 2</label>
                    <div class="col-sm-8">
                        <input class="form-control" type="number" placeholder="Number 2" v-model="number2" required>
                        <div class="invalid-feedback">
                            This field is required
                        </div>
                    </div>
                </div>
                <div class="form-group row mt-5 text-center">
                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary mb-2">Submit</button>
                    </div>
                </div>
            </form>        
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import SpinnerView from '../components/SpinnerView.vue'
import Swal from 'sweetalert';


export default{
    name: "playView",
    components: {
        SpinnerView
    },
    data() {
        return {
            operations: [],
            operation: "",
            number1: "",
            number2: "",
            username: localStorage.username,
            spinner: false
        };
    },
    computed:{
        baseUrl() {
            return process.env.VUE_APP_BASE_URL;
        },
        getUsername() {
            return this.$store.getters.getUsername;
        },
    },
    mounted(){
        this.getOperations();
    },
    methods: {
        showSweetAlert(message) {
            Swal({
                title: message,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        },

        handleAuthenticationErrors(error) {
            if (error.response.status === 401) {
                localStorage.removeItem('token')
                this.$store.commit('setIsLoggedIn', false);
                this.$store.commit("setUsername", null);
                this.$router.push('/')
            }
        },
        
        async getOperations() {
            try {
                this.spinner = true;
                const response = await axios.get(`${this.baseUrl}calculator/operation/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                    'Content-Type': 'application/json',
                },
                });
                this.operations = response.data;
            } catch (error) {
                this.handleAuthenticationErrors(error);
            } finally {
                this.spinner = false;
            }
        },

        async getCalculation() {
            try {
                this.spinner = true;
                const data = {
                operation: this.operation,
                username: this.getUsername,
                num1: this.number1,
                num2: this.number2,
                };
                const response = await axios.post(
                `${this.baseUrl}calculator/record/`,
                data,
                {
                    headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                    'Content-Type': 'application/json',
                    },
                }
                );
                this.showSweetAlert(`Result is ${response.data.result}`);
            } catch (error) {
                this.handleAuthenticationErrors(error);
            } finally {
                this.spinner = false;
            }
        },

        checkForm(event) {
            event.preventDefault();
            event.target.classList.add('was-validated');
            if (event.target.checkValidity()) {
                this.getCalculation()
            }
        },
    }
}
</script>