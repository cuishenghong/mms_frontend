<template>
  <b-container fluid class="p-4">
    <b-row>
      <b-col sm="3" v-for="item in list" v-bind:key="item.index">
        <b-img thumbnail fluid :src="item.strCategoryThumb" v-bind="mainProps"></b-img>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios"

export default {
  name: 'HelloWorld',
  data() {
    return {
      mainProps: {
        class: 'mb-2'
      },
      list: []
    }
  },
  mounted() {
    axios
        .get("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(response => {
        this.list = response.data.categories
      })
        .catch(err => {
        console.log(err)
      })
  }
}
</script>