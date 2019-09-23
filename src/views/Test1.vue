<template>
  <div class="Test1">


    <el-tabs type="border-card">
      <el-tab-pane label="采集目录配置">

        <h2>选择采集数据</h2>

        <template>
          <el-row :gutter="20">
            <el-col :span="6" :offset="9"><div class="grid-content bg-purple">
              <el-input
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="input21">
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

        <div style="margin-top: 20px">
          <el-button >新增数据</el-button>
          <el-button @click="handleDone()">选择完成</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="标题-属性配置">
        <h2>标题-属性配置</h2>

        <el-table
          ref="multipleTable"
          :data="baikeTableDataTileToCol"
          border=""
          tooltip-effect="dark"
          align="center"
          @selection-change="handleSelectionChange">

          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <template v-for="(item,index) in baikeTableData2">
            <el-table-column
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center">
            </el-table-column>
          </template>
        </el-table>

        <div style="margin-top: 20px">
          <el-button @click="open_delete">删除选中行</el-button>
          <el-button @click="dialogFormVisible = true">新增标题</el-button>

          <el-dialog title="添加标题" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
              <el-form-item label="添加标题" label-width="120px" class="myform">
                <el-input v-model="form.title" auto-complete="false"></el-input>
              </el-form-item>
              <el-form-item label="对应属性" label-width="120px" class="myform">
                <el-select v-model="form.col" placeholder="请选择对应属性">
                  <template v-for="item in symptom_cols">
                   <el-option :label="item.label" :value="item.value"></el-option>
                  </template>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>


          <el-button @click="handleDone()">配置完成</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="其他">其他</el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>
  export default({
    name: 'Test1',
    data() {
      return{
        input21: '',
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
        baikeTableDataTileToCol: [
          {
            "id": 1,
            "title": "名词",
            "col": "info_mc"
          },
          {
            "id": 2,
            "title": "名词解释",
            "col": "info_mcjs"
          },
          {
            "id": 3,
            "title": "临床表现",
            "col": "info_lcbx"
          }
        ],
        baikeTableData1: [
          {label:'编号',prop:'id',width:'100'},
          {label:'疾病名称',prop:'info_mc',width:'240'},
          {label:'URL',prop:'url',width:'240'}
        ],
        baikeTableData2: [
          {label:'编号',prop:'id',width:'100'},
          {label:'标题',prop:'title',width:'240'},
          {label:'属性',prop:'col',width:'240'}
        ],
        multipleSelection:[],
        dialogFormVisible: false,
        form: {
          title:'',
          col:''
        },
        symptom_cols: [
          {
            label: '名词解释',
            value: 'info_mcjs'
          },
          {
            label: '临床表现',
            value: 'info_lcbx'
          },
          {
            label: '别名',
            value: 'info_bm'
          },
          {
            label: '英文名称',
            value: 'info_ywmc'
          },
          {
            label: '分科',
            value: 'info_fk'
          },
          {
            label: '多发人群',
            value: 'info_dfrq'
          },
          {
            label: '发病部位',
            value: 'info_fbbw'
          },
          {
            label: '西医病名',
            value: 'info_xybm'
          },
          {
            label: '病因病机',
            value: 'info_bybj'
          },
          {
            label: '鉴别诊断',
            value: 'info_jbzd'
          },
          {
            label: '辨证施治',
            value: 'info_bzsz'
          },
          {
            label: '方剂',
            value: 'info_fj'
          },
          {
            label: '针灸疗法',
            value: 'info_zjlf'
          },
          {
            label: '预防保健',
            value: 'info_yfbj'
          },
          {
            label: '饮食疗法',
            value: 'info_yslf'
          },
          {
            label: '推拿疗法',
            value: 'info_tnlf'
          },
          {
            label: '外敷外治',
            value: 'info_wfwz'
          },
          {
            label: '护理',
            value: 'info_hl'
          },
          {
            label: '预后',
            value: 'info_yh'
          },
          {
            label: '其他',
            value: 'info_qt'
          }
        ]
      }
    },
    methods:{
      handleDone(){
        this.$router.push("/")
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
      },
      open_delete(){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },


    beforeRouteLeave(to,from,next){
      to.meta.keepAlive=true
      next()
    }

  })

</script>

<style scoped>
  .el-select .el-input
  {
    width: 130px;
  }
  .el-input__inner{
    width: 30%;
  }
  .my_search{
    width:30%;
    align-content: center;
  }
</style>
