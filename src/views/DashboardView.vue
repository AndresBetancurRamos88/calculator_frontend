<template>
  <SpinnerView v-if="spinner"/>
  <div class="row">
    <div class="col-lg-10 offset-lg-1">
      <div class="table-responsive">
        <DataTable
          ref="dataTable"
          class="table table-striped table-bordered display"
          :data="records"
          :columns="columns"
          :options="{ 
            responsive: true, 
            autowidth: false, 
            dom: 'lfrtip', 
            pageLength: 5, 
            lengthMenu: [[5, 10, 15], [5, 10, 15]] 
            }"
        >
          <thead>
            <tr>
              <th>Id</th>
              <th>Creation date</th>
              <th>Operation</th>
              <th>Operation Response</th>
              <th>Amount</th>
              <th>User Balance</th>
              <th>Action</th>
            </tr>
          </thead>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DataTable from "datatables.net-vue3";
import DataTableLib from "datatables.net-bs5";
import "datatables.net-responsive-bs5";
import $ from 'jquery'

import Swal from 'sweetalert';
import SpinnerView from '../components/SpinnerView.vue'

DataTable.use(DataTableLib);

export default {
  name: "DashboardView",
  components: {
    DataTable,
    SpinnerView,
  },
  data() {
    return {
      records: null,
      id: null,
      spinner: false,
      columns: [
        { title: "Id", data: "id" },
        { title: "Creation date", data: "creation_date" },
        { title: "Operation", data: "operation_type" },
        { title: "Operation Response", data: "operation_response" },
        { title: "Amount", data: "amount" },
        { title: "User Balance", data: "user_balance" },
        {
          title: "Action",
          data: "id",
          render: function(data) {
            return `<div class='text-center'><button data-id="${data}" class='btn btn-danger btn-sm' id="delete">Delete</button></div>`;
          },
        },
      ],
    };
  },
  mounted() {
    this.getRecords();
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_BASE_URL;
    },
  },
  created() {
    $(document).on("click", "#delete", (event) => {
      const id =  $(event.target).data("id");
      this.deleteRecord(id)
    });
  },
  methods: {
    showSweetAlert: function(message) {
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

    async getRecords() {
      try {
        this.spinner = true;
        const response = await axios.get(`${this.baseUrl}calculator/record/`, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        });
        this.records = response.data;
      } catch (error) {
        this.handleAuthenticationErrors(error);
      } finally {
        this.spinner = false;
      }
    },
    
    async deleteRecord(id){
      try {
        this.spinner = true;
        const response = await axios.delete(`${this.baseUrl}calculator/record/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
        });
        this.showSweetAlert(response.data.message);
        await this.getRecords();
      } catch (error) {
        this.handleAuthenticationErrors(error);
      } finally {
        this.spinner = false;
      }
    }
  }
};
</script>

<style scoped>
@import "datatables.net-bs5";

.datatable {
  font-size: 12px;
}

.cell-content {
  font-size: 10px;
}

.dataTables_wrapper .dataTables_length,
.dataTables_wrapper .dataTables_info,
.dataTables_wrapper .dataTables_paginate {
  margin-top: 1rem;
}

.dataTables_wrapper .btn-primary {
  background-color: #6c757d;
  border-color: #6c757d;
  font-size: 0.8rem;
  padding: 0.375rem 0.75rem;
}
</style>
