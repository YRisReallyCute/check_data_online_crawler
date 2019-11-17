<template>

<div >
  <BaikeUrls :table-data="tableData" :table-data-title="tableDataTitle"></BaikeUrls>
</div>

</template>


<script>
  import BaikeUrls from '../components/conf_table'
  export default {
      name: "table_test",
      components:{BaikeUrls},
      data(){
        return{
            tableDataTitle: [
                {label:'编号',prop:'id',width:'100'},
                {label:'疾病名称',prop:'info_mc',width:'240'},
                {label:'URL',prop:'crawler_url',width:'240'}
            ],
            tableData: []
        }
      },
      mounted(){
          this.getAjax();
      },
      methods:{
          getAjax(){
              this.$axios.get('https://ronyun.com/xybz/conf/baike_url_findall')
                  .then(response=>{
                      console.log(response.data)
                      console.log(response.data.result)
                      this.tableData=response.data.result
                  })
                  .catch(function (error) {
                      console.log(error)
                  })
          }
      }
  }
</script>


<style scoped>

</style>
