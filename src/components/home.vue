<template>
  <div class="container">
    <div class="jumbotron">
        <h1 class="display-3">{{pageName}}</h1>
        <p class="lead">This simple vue app have the ability to login with facebook and use the google places autocomplete widget</p>
        <hr class="my-4">
        <p >Author: Abed Said, Email: abed.allah.said@gmail.com, Cell: 01008347459 </p>
    
        <p class="lead">
            <a class="btn btn-primary btn-lg" href="#" role="button" v-on:click="login">Login with facebook</a>
        </p>

        <p class="lead" >
            <a class="btn btn-danger btn-lg" href="#" role="button" v-on:click="logout">logout</a>
        </p>

        <p class="lead">
            <a class="btn btn-success btn-lg" href="#" role="button"><router-link to="./google">Google places</router-link></a>
        </p>
        
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'facebook',
  data() {
      return {
          pageName: 'Hello,',
          nameOfUser: '',
          email: '',
      }
  },
  methods: {
        login: function(){
            var vm = this
            FB.login(function (response) {
                if(response.status == "connected"){
                    console.log(response)
                    localStorage.setItem('accessToken', response.authResponse.accessToken)
                    vm.getMyData()
                    vm.$router.push('google') 
                }
            }, {scope: 'public_profile,email'})
        },
        logout: function() {
            FB.logout(function(response){
                console.log(response)
                localStorage.removeItem('name')
                localStorage.removeItem('email')
                localStorage.removeItem('accessToken')
            });
        },
        getMyData: function(){
            var vm = this
            FB.api('/me?fields=name,email', function(response){
                if(response && !response.error){
                    this.nameOfUser = response.name
                    this.email = response.email
                    console.log(this.nameOfUser + " " + this.email)
                    localStorage.setItem('name', response.name)
                    localStorage.setItem('email', response.email)
                }
            })
        },
        connectTolaravelApi: function(){

        }
  },

  

}
</script>

<style scoped>
#map {height:300px;width:500px;}
</style>

