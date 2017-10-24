<template>
  <div class='abc'>
     <!-- {{name}}  -->
    <!-- <el-button type="primary">主要按钮</el-button> -->
    <router-view></router-view>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        name:'open亮音000'
      }
    },
    methods: {
        
    }
    }
  
</script>
<style>
  .abc{
    color: green;
  }
</style>

