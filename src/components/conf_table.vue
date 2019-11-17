<template>

  <div>
  <el-table
    ref="multipleTable"
    :data="tableData"
    :row-key="getRowKeys"
    border
    tooltip-effect="dark"
    align="center"
    @selection-change="handleSelectionChange">

    <el-table-column
      type="selection"
      :reserve-selection="true"
      width="55">
    </el-table-column>

    <template v-for="(item,index) in tableDataTitle">
      <el-table-column
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        align="center">
      </el-table-column>
    </template>
  </el-table>


  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="childpg.cnum"
      :page-sizes="[1,3,5,10,15,20,30,50,100, 200, 300, 400,500,1000]"
      :page-size="childpg.psize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tnum">
    </el-pagination>
  </div>

  </div>
</template>

<script>
    export default {
        name: "BaikeUrls",
        props:["tableData","tableDataTitle","tnum"],
        data() {
            return {
                childpg:{
                    cnum: 1,
                    psize: 10,
                }
            };
        },
        methods:{
            getRowKeys(row){
                return row.id;
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
                console.log(this.multipleSelection);
                this.$emit('listenChildren2',this.multipleSelection)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.childpg.psize=val;
                this.$emit('listenToChildEvent',this.childpg.cnum,this.childpg.psize);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.childpg.cnum=val;
                this.$emit('listenToChildEvent',this.childpg.cnum,this.childpg.psize);
            }
        }
    }
</script>

<style scoped>

</style>
