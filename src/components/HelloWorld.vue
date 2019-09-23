<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <el-dialog title="自动采集时间设置" :visible.sync="dialogFormVisible" width="30%">
      <el-form>
        <el-form-item label="选择开始时间" label-width="120px">
          <el-time-select
            v-model="time_set"
            :picker-options="{start: '00:00',step: '00:15',end: '24:00'}"
            placeholder="选择时间"
            class="myform">
          </el-time-select>
        </el-form-item>

        <el-form-item label="选择采集间隔" label-width="120px">
          <el-select
            v-model="value_time_gap"
            placeholder="请选择时间间隔"
            class="myform">
            <el-option
              v-for="item in time_gap_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>


    <el-collapse v-model="activeNames" accordion>

      <el-collapse-item title="中医症状 symptom_zy" name="1" class="myfont">
          <el-table
            :data="tableData1"
            stripe
            style="width: 100%">

            <el-table-column
              label="来源"
              align="center"
              width="180">
              <template slot-scope="scope">
              <el-button @click="handleClickBaike()" type="text">{{scope.row.date}}</el-button>
            </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="数据总数"
              align="center"
              width="180">
            </el-table-column>

            <el-table-column
              label="配置"
              align="center"
              width="180">
              <template slot-scope="scope">
                <el-button
                  @click="handleEditContent(scope.$index, scope.row)">编辑配置文件</el-button>
              </template>
            </el-table-column>

            <el-table-column
              label="时间设置"
              align="center"
              width="180">
              <template slot-scope="scope">
                <el-button
                  @click="dialogFormVisible = true">设置采集时间</el-button>
              </template>
            </el-table-column>

            <el-table-column
              label="是否自动"
              align="center"
              width="240">
              <template slot-scope="scope">
                <el-radio v-model=scope.row.radio label="1">是</el-radio>
                <el-radio v-model=scope.row.radio label="2">否</el-radio>
              </template>
            </el-table-column>

            <el-table-column
              label="立即启动"
              align="center"
              width="180">
              <el-button type="primary" @click="handle_start">立即启动</el-button>
            </el-table-column>

            <el-table-column
              label="日志"
              align="center"
              width="180">
              <el-button type="info">查看日志</el-button>
            </el-table-column>
          </el-table>
      </el-collapse-item>


      <el-collapse-item title="中成药 patent" name="2" class="myfont">
          <el-table
            :data="tableData2"
            stripe
            style="width: 100%">

            <el-table-column
              prop="date"
              label="来源"
              align="center"
              width="180">
              <template slot-scope="scope">
                <el-button @click="handleClickBaike()" type="text">{{scope.row.date}}</el-button>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="数据总数"
              align="center"
              width="180">
            </el-table-column>

            <el-table-column
              prop="name"
              label="配置"
              align="center"
              width="180">
              <template slot-scope="scope">
                <el-button
                  @click="handleEditContent(scope.$index, scope.row, patent_values[scope.$index])">编辑配置文件</el-button>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="时间设置"
              align="center"
              width="180">
              <template slot-scope="scope">
                <el-button
                  @click="dialogFormVisible = true">设置采集时间</el-button>
              </template>
            </el-table-column>

            <el-table-column
              label="是否自动"
              align="center"
              width="240">
              <template slot-scope="scope">
                <el-radio v-model=scope.row.radio label="1">是</el-radio>
                <el-radio v-model=scope.row.radio label="2">否</el-radio>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="立即启动"
              align="center"
              width="180">
              <el-button type="primary">立即启动</el-button>
            </el-table-column>

            <el-table-column
              prop="name"
              label="日志"
              align="center"
              width="180">
              <el-button type="info">查看日志</el-button>
            </el-table-column>

          </el-table>
      </el-collapse-item>


      <el-collapse-item title="中草药 herbal" name="3" class="myfont">
          <el-table
            :data="tableData3"
            stripe
            style="width: 100%">

            <el-table-column
              prop="date"
              label="来源"
              align="center"
              width="180">
              <template slot-scope="scope">
                <el-button @click="handleClickBaike()" type="text">{{scope.row.date}}</el-button>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="数据总数"
              align="center"
              width="180">
            </el-table-column>

            <el-table-column
              prop="name"
              label="配置"
              align="center"
              width="180">
              <template slot-scope="scope">
                <el-button
                  @click="handleEditContent(scope.$index, scope.row, herbal_values[scope.$index])">编辑配置文件</el-button>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="时间设置"
              align="center"
              width="180">
              <template slot-scope="scope">
                <el-button
                  @click="dialogFormVisible = true">设置采集时间</el-button>
              </template>
            </el-table-column>

            <el-table-column
              label="是否自动"
              align="center"
              width="240">
              <template slot-scope="scope">
                <el-radio v-model=scope.row.radio label="1">是</el-radio>
                <el-radio v-model=scope.row.radio label="2">否</el-radio>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="立即启动"
              align="center"
              width="180">
              <el-button type="primary">立即启动</el-button>
            </el-table-column>

            <el-table-column
              prop="name"
              label="日志"
              align="center"
              width="180">
              <el-button type="info">查看日志</el-button>
            </el-table-column>

          </el-table>
      </el-collapse-item>


      <el-collapse-item title="其他" name="4" class="myfont">
      </el-collapse-item>
    </el-collapse>

    <el-dialog title="百度百科采集目录" :visible.sync="baikeDialogFormVisible" width="40%">
      <template>
        <el-row :gutter="20">
          <el-col :span="12" :offset="6"><div class="grid-content bg-purple">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input22">
            </el-input>
          </div></el-col>
        </el-row>
      </template>
      <el-table
        ref="multipleTable"
        :data="baikeTableData"
        border=""
        tooltip-effect="dark"
        align="center"
        @selection-change="handleSelectionChange">

        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <template v-for="(item,index) in baikeTableData1">
          <el-table-column
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="center">
          </el-table-column>
        </template>
      </el-table>

      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="baikeDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="openMsg()">开始执行</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      time_set:'',
      input22:'',
      baikeDialogFormVisible:false,
      value_time_gap: '',
      baikeTableData: [
        {
          "id": 1,
          "info_mc": "上热下寒",
          "url": "https://baike.baidu.com/item/%E4%B8%8A%E7%83%AD%E4%B8%8B%E5%AF%92"
        },
        {
          "id": 2,
          "info_mc": "上热下寒证",
          "url": "https://baike.baidu.com/item/%E4%B8%8A%E7%83%AD%E4%B8%8B%E5%AF%92%E8%AF%81"
        },
        {
          "id": 3,
          "info_mc": "上焦",
          "url": "https://baike.baidu.com/item/%E4%B8%8A%E7%84%A6"
        }
      ],
      baikeTableData1: [
        {label:'编号',prop:'id',width:'100'},
        {label:'疾病名称',prop:'info_mc',width:'240'},
        {label:'URL',prop:'url',width:'240'}
      ],
      time_gap_options:[
        {
          label: '一天',
          value: '1'
        },
        {
          label: '三天',
          value: '3'
        },
        {
          label: '一周',
          value: '7'
        },
        {
          label: '一个月',
          value: '30'
        },{
          label: '两个月',
          value: '60h'
        },{
          label: '三个月',
          value: '90'
        }
      ],
      msg: '在线爬虫设置',
      activeNames: ['1'],
      tableData1: [{
        date: '百度百科',
        name: '1000',
        radio:'2'
      }, {
        date: '中医症状',
        name: '2000',
        radio:'2'
      }, {
        date: '西医症状',
        name: '3000',
        radio:'2'
      }, {
        date: '中医疾病',
        name: '4000',
        radio:'2'
      },{
        date: '西医疾病',
        name: '2000',
        radio:'2'
      }
      ],

      tableData2: [{
        date: '药标网',
        name: '1000',
        radio:'2'
      }, {
        date: '中医药宝典',
        name: '2000',
        radio:'2'
      }],

      tableData3: [{
        date: '药标网',
        name: '2000',
        radio:'2'
      }, {
        date: '中医药宝典',
        name: '20000',
        radio:'2'
      }],
      dialogFormVisible: false
    }
  },
  methods:{
    handleClickBaike(){
      this.baikeDialogFormVisible=true
    },
    openMsg(){
      this.baikeDialogFormVisible=false
      this.$message({
        message: '已经启动',
        type: 'success'
      });
    },
    handleChange(val){
      console.log(val)
    },
    handle_start(){
      this.$confirm('确定立即启动爬虫？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已经启动!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    func(){
      console.log(this.radio)
    },
    handleEditContent(index,row){
      // console.log(symptom_values[scope.$index].radio)
      console.log(index,row)
      this.$router.push("/Test1")
    },
    handleEditTime(index,row,str){
      // console.log(symptom_values[scope.$index].radio)
      console.log(str)
      console.log(index,row)
    },
    toggleSelection(rows){
      console.log(rows)
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val){
      // console.log(val)
      this.multipleSelection = val
    }
  },
  beforeRouteLeave(to,from,next){
    to.meta.keepAlive=true
    next()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.myfont >>> .el-collapse-item__header{
  font-size: 18px;
  font-family: "Avenir",Helvetica,Arial,sans-serif;
  color: #66b1ff;
  alignment: center;
}

.hello{
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
.myform{
  width: 220px;
}
</style>
