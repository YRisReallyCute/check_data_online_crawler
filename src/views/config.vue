<template>
  <div class="Test1">
    <h1>{{msg}}</h1>

    <el-tabs type="border-card">
<!--      <el-tab-pane label="采集目录配置">-->

<!--&lt;!&ndash;        <h2>选择采集数据</h2>&ndash;&gt;-->

<!--        <div class="search">-->

<!--          <el-input-->
<!--            placeholder="请输入内容"-->
<!--            prefix-icon="el-icon-search"-->
<!--            v-model="input1"-->
<!--            @keyup.enter.native="searchUrl(input1)"-->
<!--          >-->
<!--          </el-input>-->

<!--          <el-button type="primary" @click="searchUrl(input1)">搜索</el-button>-->
<!--        </div>-->

<!--&lt;!&ndash;        <template>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-row :gutter="20">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-col :span="6" :offset="9"><div class="grid-content bg-purple">&ndash;&gt;-->
<!--&lt;!&ndash;              <el-input&ndash;&gt;-->
<!--&lt;!&ndash;                placeholder="请输入内容"&ndash;&gt;-->
<!--&lt;!&ndash;                prefix-icon="el-icon-search"&ndash;&gt;-->
<!--&lt;!&ndash;                v-model="input1"&ndash;&gt;-->
<!--&lt;!&ndash;                @keyup.enter.native="searchUrl(input1)"&ndash;&gt;-->
<!--&lt;!&ndash;              >&ndash;&gt;-->
<!--&lt;!&ndash;              </el-input>&ndash;&gt;-->
<!--&lt;!&ndash;            </div></el-col>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-row>&ndash;&gt;-->
<!--&lt;!&ndash;        </template>&ndash;&gt;-->

<!--        <br>-->

<!--        <BaikeUrls :table-data="baikeTableData" :table-data-title="baikeTableData1" :tnum="tnum1" @listenToChildEvent="handleChildMsg1" @listenChildren2="handleChildUrlMsg"></BaikeUrls>-->

<!--        <div style="margin-top: 20px">-->
<!--          <el-button @click="urlDialogFormVisible = true">新增数据</el-button>-->

<!--          <el-dialog title="新增待爬取数据" :visible.sync="urlDialogFormVisible">-->
<!--            <el-form :model="urlForm">-->
<!--              <el-form-item label="待爬取疾病名称" label-width="120px">-->
<!--                <el-input v-model="urlForm.name" auto-complete="off"></el-input>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--            <div slot="footer" class="dialog-footer">-->
<!--              <el-button @click="urlDialogFormVisible = false">取 消</el-button>-->
<!--              <el-button type="primary" @click="putUrlData">确 定</el-button>-->
<!--            </div>-->
<!--          </el-dialog>-->

<!--          <el-button @click="handleDone()">选择完成</el-button>-->
<!--        </div>-->
<!--      </el-tab-pane>-->

      <el-tab-pane label="标题-属性配置">
<!--        <h2>标题-属性配置</h2>-->
        <div class="search">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="inputColName">
          </el-input>
          <el-button type="primary" @click="getTitleData">搜索</el-button>
        </div>
        <br>
        <BaikeUrls :table-data="baikeTableDataTitle" :table-data-title="baikeTableData2" :tnum="tnum2" @listenToChildEvent="handleChildMsg2" @listenChildren2="handleChildDeleteMsg"></BaikeUrls>

        <div style="margin-top: 20px">
          <el-button @click="openDelete">删除选中行</el-button>
          <el-button @click="dialogFormVisible = true">新增标题</el-button>

          <el-dialog title="添加标题" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
              <el-form-item label="添加标题" label-width="30%" class="myform" >
                <el-input v-model="form.title" auto-complete="false" suffix-icon="xxxx"></el-input>
              </el-form-item>
              <el-form-item label="对应属性" label-width="30%" class="myform">
                <el-select v-model="form.col" placeholder="请选择对应属性" style="width: 100%" value="xxx">
                  <template v-for="item in colNames">
                   <el-option :label="item" :value="item"></el-option>
                  </template>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="putTitleData">确 定</el-button>
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
    import BaikeUrls from '../components/conf_table'
    export default{
      name: 'Test1',
      components:{BaikeUrls},
      data() {
        return{
            msg: '易一医学健康资料在线更新系统',
            jobGroup:this.$route.params.jobGroup,
            input1: "",
            inputColName:"",
            tnum1:0,
            tnum2:0,
            deleteID:"",
            confUrlData:[],
            baikeTableData: [],
            baikeTableDataTitle: [],
            colNames:[],
            baikeTableData1: [
              {label:'编号',prop:'id',width:'100'},
              {label:'疾病名称',prop:'info_mc',width:'240'},
              {label:'URL',prop:'crawler_url',width:'240'}
            ],
            baikeTableData2: [
              {label:'编号',prop:'id',width:'100'},
              {label:'标题',prop:'title',width:'240'},
              {label:'属性',prop:'name',width:'240'}
            ],
            multipleSelection:[],
            pageInfoUrl:{
                page:0,
                size:10
            },
            pageInfoTitle:{
                page:0,
                size:10
            },
            dialogFormVisible: false,
            urlDialogFormVisible:false,
            form: {
              title:'',
              col:''
            },
            urlForm:{
                name:''
            },
        }
    },

    methods:{
        searchUrl(val){
            this.$axios.get('/search_content_all',{
                params:{
                    content:val,
                    page:this.pageInfoUrl.page,
                    size:this.pageInfoUrl.size
                }
            }).then(response=>{
                console.log(response);
                this.baikeTableData=response.data.result;
                this.tnum1=response.data.result.totalNums
            }).catch(error=>{
                console.log(error)
            })
        },
        handleChildMsg1(cnum,psize){
            this.pageInfoUrl.page=cnum-1;
            this.pageInfoUrl.size=psize;
            this.getUrlData()
        },
        handleChildMsg2(cnum,psize){
            this.pageInfoTitle.page=cnum-1;
            this.pageInfoTitle.size=psize;
            this.getTitleData()
        },
        handleChildDeleteMsg(multiMsg){
            console.log("deleteID");
            var temp="";
            for(var i=0;i<multiMsg.length;i++){
                temp+=multiMsg[i].id+"/";
                this.deleteID=temp;
            }
            console.log(this.deleteID);
        },
        handleChildUrlMsg(multiMsg){
            this.confUrlData = multiMsg;
        },
        getUrlData(){
            this.$axios.get('/baike_url_findall',
            // this.$axios.get('https://ronyun.com/xybz/conf/baike_url_findall',
                {
                    params:{
                        page:this.pageInfoUrl.page,
                        size:this.pageInfoUrl.size
                    }
                }
            )
                .then(response=>{
                    console.log(response.data);
                    this.baikeTableData=response.data.result.content;
                    this.tnum1=response.data.result.totalElements
                })
                .catch(error=>{
                    console.log(error)
                })
        },
        getTitleByName(){
            this.$axios.get('/title_findByName',
                {
                    params:{
                        page:this.pageInfoTitle.page,
                        size:this.pageInfoTitle.size,
                        jobGroup:this.jobGroup,
                        name:this.inputColName
                    }
                }
            )
                .then(response=>{
                    console.log(response.data);
                    this.baikeTableDataTitle=response.data.result.content;
                    this.tnum2=response.data.result.totalElements
                })
                .catch(error=>{
                    console.log(error)
                })
        },
        getTitleData(){
          // this.$axios.get('https://ronyun.com/xybz/conf/baike_title_findall')
            this.$axios.get('/title_findByName',
                {
                    params:{
                        page:this.pageInfoTitle.page,
                        size:this.pageInfoTitle.size,
                        jobGroup:this.jobGroup,
                        name:this.inputColName
                    }
                }
            )
              .then(response=>{
                  console.log(response.data);
                  this.baikeTableDataTitle=response.data.result.content;
                  this.tnum2=response.data.result.totalElements
              })
              .catch(error=>{
                  console.log(error)
              })
        },
        putUrlData(){
            this.urlDialogFormVisible = false;
            if(this.urlForm.name==""){
                alert("请输入数据！")
            }
            else {
                // this.$axios.post('https://ronyun.com/xybz/conf/baike_title_add')
                let postData = this.$qs.stringify({
                    name:this.urlForm.name
                });
                this.$axios({
                    url: '/baike_url_add',
                    method: 'post',
                    data: postData
                }).then(response=>{
                        console.log(response);
                    this.getUrlData();
                    this.$message({
                        type:'success',
                        message:'操作成功！'
                    })
                }).catch(error=>{
                        console.log(error);
                    this.$message.error('操作失败！')
                })
            }
        },
        putTitleData(){
            this.dialogFormVisible = false;
            if(this.form.title=="" || this.form.col==""){
                alert("请输入数据！")
            }
            else{
                let postData = this.$qs.stringify({
                    jobGroup:this.jobGroup,
                    title:this.form.title,
                    col:this.form.col.spell("first","low"),
                    name:this.form.col
                });
                console.log(postData);

                this.$axios({
                    url:'/baike_title_add',
                    method:'post',
                    data:postData,
                    header:{
                        "Content-Type":"application/x-www-form-urlencoded"
                    }
                }).then(response=>{
                    console.log(response);
                    this.getTitleData();
                    if(response.data.code=="200") {
                        this.$message({
                            type: 'success',
                            message: '操作成功！'
                        })
                    }
                    else{
                        this.$message.error('操作失败！');
                    }
                }).catch(error=>{
                    console.log(error);
                    this.$message.error('操作失败！')
                });
            }
        },
        handleDone(){
          let postparams = {
            list:this.confUrlData
          };
          this.$axios({
              url:'/baike_url_update',
              method:'post',
              data:postparams
          }).then(response=>{
              console.log(response);
          }).catch(error=>{
              console.log(error);
          });
          this.$router.push("/")
        },
        toggleSelection(rows){
          console.log("toggleSelection");
          console.log(rows);
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        getColNames(){
            this.$axios.get('/getCols',
                {
                    params:{
                        jobGroup:this.jobGroup
                    }
                }
            )
            .then(response=>{
                this.colNames=response.data.result;
                console.log(this.colNames);
            }).catch(error=>{
                console.log(error);
            });
        },
        handleSelectionChange(val){
            console.log("handleSelectionChange");
          console.log(val);
          this.multipleSelection = val;
        },
        openDelete(){
            console.log("deleteID"+this.deleteID);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = this.$qs.stringify({
              list:this.deleteID
            });
          console.log(params);
          this.$axios(
              {
                  url:'/title_delete',
                  params:{
                      deleteList:this.deleteID,
                      jobGroup:this.jobGroup
                  },
              }
          ).then(response=>{
              console.log(response);
              if(response.data.code==200){
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.deleteID="";
                this.getTitleData();
              }
              else{
                  this.$message.error("操作失败！");
              }
          }).catch(error=>{
              console.log(error);
              this.$message.error("操作失败！");
          });

        }).catch(() => {
          // this.console.log()
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
    mounted(){
        this.getUrlData();
        this.getTitleData();
        this.getColNames();
    },
    beforeRouteLeave(to,from,next){
      to.meta.keepAlive=true;
      next()
    },
  }

</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

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

  .search >>> .el-input{
    width: 30%;
  }

  @media (max-width: 768px) {
    .el-button--primary.is-plain {
      width: 9%;
      margin-left: 0;
      font-size: 1px;
    }
    .el-button--medium.is-round {
      padding: 5px 2px;
    }
    .el-icon-d-arrow-right {
      display: none;
    }
    .el-popover {
      width: 90%;
    }
  }


  /* 小屏幕（平板，大于等于 768px） */

  @media (min-width: 768px) and (max-width: 991px) {
    .el-button--primary.is-plain {
      margin-left: 0;
      font-size: 12px;
    }
    .el-button--medium.is-round {
      padding: 10px 10px;
    }
    .el-icon-d-arrow-right {
      display: none;
    }
    .el-popover {
      width: 90%;
    }
  }


  /* 中等屏幕（桌面显示器，大于等于 992px） */

  @media (min-width: 992px) and (max-width: 1367px) {
    .el-button--primary.is-plain {
      margin-left: 0;
      font-size: 12px;
    }
    .el-button--medium.is-round {
      padding: 10px 10px;
    }
    .el-popover {
      width: 70%;
    }
  }


  /* 中等屏幕（桌面显示器，大于等于 992px） */

  @media (min-width: 1368px) and (max-width: 2500px) {
    .el-button--primary.is-plain {
      margin-left: 2px;
      font-size: 14px;
    }
    .el-popover {
      width: 900px;
    }
    /* .el-button--medium.is-round {
    padding: 10px 10px;
  } */
  }
</style>
