<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
      <a class="navbar-brand" href="#"><router-link to="/">Vue Task (Abed Said)</router-link></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#"><router-link to="/">Home</router-link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><router-link to="/google">Google</router-link></a>
      </li>
    </ul>
   </div>
  </div>
</nav>
    <router-view id="routerarea"/>

  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    
  },
  created: function() {
    window.fbAsyncInit = function() {
    FB.init({
      appId      : '141199763323678',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.11'
    });
    
    FB.getLoginStatus(function(response) {
        var vm = this
        if(response.status === 'connected'){
           console.log('logedin')
         } else {
           console.log('not loged')
         }

    });

    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
#routerarea {
  margin-top: 60px;
}
a, a:hover {
  color: #ffffff;
}
</style>
