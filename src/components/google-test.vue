<template>
  <div class="container">
      <h1>Search Google places</h1>

      <div class="form-group">
        <input v-on:keyup="getSugg" type="text" class="form-control" id="" aria-describedby="emailHelp" placeholder="Enter a place">
      </div>

      <div v-if="googleData.length > 0">
        <h3>The suggested places</h3>
        <ul class="list-group">

          <li class="list-group-item d-flex justify-content-between align-items-center" v-for="prediction in googleData">
            {{prediction.description}}
          </li>
          
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'google',
  data(){
    return {
      apiKey: 'AIzaSyB-2uJbAs_25-DIsNjaaHwR4qSnrqD1nDM',
      enteredValue: '',
      googleData: []
    }
  },
  methods: {
    getSugg : function(e){
          this.enteredValue = e.target.value
          this.$http.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+this.enteredValue+"&key="+this.apiKey)
          .then(function(response){
            this.googleData = response.data.predictions
            //console.log(this.googleData)
          })
      },
  }
}
</script>

<style scoped>

</style>

