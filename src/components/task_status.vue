<template>
  <div>
    <el-table
      :data="tableData"
      border=""
      tooltip-effect="dark">

      <el-table-column label="任务编号" prop="id" align="center" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="搜索词" prop="word" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.word}}</span>
        </template>
      </el-table-column>
      <el-table-column label="爬虫任务" prop="job_id" align="center">
        <template slot-scope="scope">
          <span>{{scrapyJobId2Name[scope.row.job_id]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务组" prop="jobGroup" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.jobGroup}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态"
                       prop="status"
                       align="center"
                       :filters="[{text:'等待插入',value:'等待插入'},{text:'等待更新',value:'等待更新'},{text:'没有更新',value:'没有更新'},{text:'正在执行',value:'正在执行'},{text:'插入完成',value:'插入完成'},{text:'更新完成',value:'更新完成'}]"
                       :filter-method="filterStatus"
                       filter-placement="bottom-end"
                       :filter-multiple="false">
        <template slot-scope="scope">
          <el-tag :type="statusTagType[scope.row.status]"
                  close-trainsition>
            {{taskStatus2ch[scope.row.status]}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" prop="startTime" align="center" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.startTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" prop="endTime" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.endTime}}</span>
        </template>
      </el-table-column>

<!--      <template v-for="(item,index) in tableDataTitle">-->
<!--        <el-table-column-->
<!--          :key="index"-->
<!--          :prop="item.prop"-->
<!--          :label="item.label"-->
<!--          align="center">-->
<!--        </el-table-column>-->
<!--      </template>-->
    </el-table>


    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="childpg.page"
        :page-sizes="[1,3,5,10,15,20,30,50,100, 200, 300, 400,500,1000]"
        :page-size="childpg.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tnum">
      </el-pagination>
    </div>

  </div>
</template>

<script>
    export default {
        name: "task_status",
        props:["tableData","tableDataTitle","tnum"],
        data(){
            return{
                childpg:{
                    page:1,
                    size:10
                },
                scrapyJobId2Name:{
                    1:"百度百科",
                    2:"中医症状",
                    3:"西医症状",
                    4:"中医疾病",
                    5:"西医疾病"
                },
                taskStatus2ch:{
                    10:"等待更新",
                    20:"等待插入",
                    1:"正在执行",
                    11:"没有更新",
                    12:"更新完成",
                    21:"插入完成"
                },
                statusTagType:{
                    10:"info",
                    20:"info",
                    1:"danger",
                    11:"success",
                    21:"success"
                },
                dbname2ch:{
                    "symptom_zy":"病症证型",
                    "patent":"中药方剂",
                    "herbal":"中草药库"
                },
            }
        },
        methods:{
            filterStatus(value,row){
                return this.taskStatus2ch[row.status] === value;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.childpg.size=val;
                this.$emit('listenToChildEvent',this.childpg.page,this.childpg.size);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.childpg.page=val;
                this.$emit('listenToChildEvent',this.childpg.page,this.childpg.size);
            }
        }
    }
</script>

<style scoped>

</style>
