<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <el-dialog title="自动采集时间设置" :visible.sync="dialogFormVisible" width="400px">

      <el-form>
        <el-form-item label="选择开始时间" label-width="30%">
          <el-time-select
            v-model="time_set"
            :picker-options="{start: '00:00',step: '00:15',end: '24:00'}"
            placeholder="选择时间"
            style="width: 100%"
          >
          </el-time-select>
        </el-form-item>

        <el-form-item label="选择采集间隔" label-width="30%">
          <el-input v-model="inputGap" placeholder="输入间隔" suffix-icon="xxxx" ></el-input>
        </el-form-item>

        <el-form-item label="选择间隔单位" label-width="30%">
          <el-select
            v-model="value_time_gap"
            placeholder="间隔单位"
            style="width: 100%"
          >
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

    <el-dialog title="编辑地址" :visible.sync="editBaikeUrlVisiable" width="400px">
      <Input v-model="editBaikeUrlInput"></Input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editBaikeUrlVisiable = false">确 定</el-button>
      </div>
    </el-dialog>

    <Tabs type="card">

      <TabPane label="搜索管理">
        <el-card class="box-card">
          <div class="search">

              <el-input
                placeholder="请输入"
                prefix-icon="el-icon-search"
                v-model="input1"
                @keyup.enter.native="startSearch">
              </el-input>

              <el-button type="primary" @click="startSearch">搜索</el-button>
          </div>

          <br>
          <div class="setMargin">

            <CheckboxGroup v-model="checkList">
              <Checkbox label="中医病">
                <span>中医病</span>
              </Checkbox>
              <Checkbox label="西医病">
                <span>西医病</span>
              </Checkbox>
              <Checkbox label="中医证型">
                <span>中医证型</span>
              </Checkbox>
              <Checkbox label="症状">
                <icon type="xx"></icon>
                <span>症状&emsp;</span>
              </Checkbox>
              <Checkbox label="中成药">
                <span>中成药</span>
              </Checkbox>
              <Checkbox label="中草药">
                <span>中草药&emsp;</span>
              </Checkbox>
            </CheckboxGroup>

          </div>
        </el-card>

        <br>
        <div >
        <h3>搜索结果</h3>
          <div class="right">
            <el-button @click="startRefreshAll()" type="primary" size="small" plain>全部更新</el-button>
          </div>
        <el-table class="tableTaskStatus" :data="tableTaskStatus">
          <el-table-column label="来源" prop="jobId" align="center">
            <template slot-scope="scope">

              <span>{{scrapyJobId2Group[scope.row.jobId]}}</span>
              <div v-if="scope.row.jobId==1|scope.row.jobId==10" style="font-size: 12px;color: #2baee9">

                <el-tooltip class="item" effect="light" :content="scope.row.url" placement="top-end">
                  <p @click="editBaikeUrl(scope.row)">[编辑地址]</p>
                </el-tooltip>


<!--                <el-popover-->
<!--                  placement="right"-->
<!--                  width="400"-->
<!--                  trigger="click">-->
<!--                  <Input v-model="scope.row.url"></Input>-->
<!--                  <p @click="getReference">编辑地址</p>-->
<!--                </el-popover>-->
              </div>
            </template>
          </el-table-column>
          <el-table-column label="搜索词" prop="word" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status!=30 & scope.row.status!=20">
                <el-button @click="locationToFrontened(scope.row)" plain>{{scope.row.word}}</el-button>
              </div>
              <div v-else>
                <el-button  plain disabled>{{scope.row.word}}</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="任务组" prop="type" align="center">
            <template slot-scope="scope">
              <span>{{type2ch[scope.row.type]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="status" align="center">
            <template slot-scope="scope">
              <span>{{taskStatus2ch[scope.row.status]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新" prop="jobGroup" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status!=30">
                <el-button @click="startRefresh(scope.row)" type="primary" size="small" plain>启动更新</el-button>
              </div>
              <div v-else>
                <el-button type="primary"  plain disabled>启动更新</el-button>
              </div>
            </template>
          </el-table-column>

        </el-table>
        </div>

      </TabPane>

      <TabPane label="任务状态">
        <div class="search">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input2">
          </el-input>
          <el-button type="primary" @click="startSearchTask">搜索</el-button>
        </div>

        <br>
        <task_status :table-data="tableTaskStatus1" :table-data-title="tableTaskTitle" :tnum="taskTnum" @listenToChildEvent="handleTaskChild"></task_status>
      </TabPane>

      <TabPane label="爬虫设置">
        <div>
          <el-collapse v-model="activeNames" accordion>

            <el-collapse-item title="中医症状库" name="1" class="myfont">
              <el-table
                :data="tableDataZxy"
                stripe
                style="width: 100%">

                <el-table-column
                  label="来源"
                  align="center"
                  width="180">
                  <template slot-scope="scope">
                    <el-button @click="handleClickBaike(scope.row.jobGroup)" type="text">{{scope.row.name}}</el-button>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="totalNum"
                  label="数据总数"
                  align="center"
                  width="120">
                </el-table-column>

                <el-table-column
                  label="配置"
                  align="center"
                  width="200">
                  <template slot-scope="scope">
                    <el-button
                      @click="handleEditContent(scope.row.jobGroup)">编辑配置文件</el-button>
                  </template>
                </el-table-column>

                <el-table-column
                  label="时间设置"
                  align="center"
                  width="200">
                  <template slot-scope="scope">
                    <el-button
                      @click="dialogFormVisible = true">设置采集时间</el-button>
                  </template>
                </el-table-column>

                <el-table-column
                  label="是否自动"
                  align="center"
                  width="160">
                  <template slot-scope="scope">
                    <el-radio v-model=scope.row.status label="1">是</el-radio>
                    <el-radio v-model=scope.row.status label="0">否</el-radio>
                  </template>
                </el-table-column>

                <el-table-column
                  label="立即启动"
                  align="center"
                  width="240">
                  <el-button type="primary" @click="handle_start">立即启动</el-button>
                </el-table-column>

                <el-table-column
                  label="日志"
                  align="center"
                  width="180">
                  <template slot-scope="scope">
                    <el-button type="info" @click="viewLog(scope.row.log)">查看日志</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>


            <el-collapse-item title="中成药库" name="2" class="myfont">
              <el-table
                :data="tableDataPatent"
                stripe
                style="width: 100%">

                <el-table-column
                  label="来源"
                  align="center"
                  width="180">
                  <template slot-scope="scope">
                    <el-button @click="handleClickBaike(scope.row.name)" type="text">{{scope.row.name}}</el-button>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="totalNum"
                  label="数据总数"
                  align="center"
                  width="120">
                </el-table-column>

                <el-table-column
                  label="配置"
                  align="center"
                  width="200">
                  <template slot-scope="scope">
                    <el-button
                      @click="handleEditContent(scope.row.jobGroup)">编辑配置文件</el-button>
                  </template>
                </el-table-column>

                <el-table-column
                  label="时间设置"
                  align="center"
                  width="200">
                  <template slot-scope="scope">
                    <el-button
                      @click="dialogFormVisible = true">设置采集时间</el-button>
                  </template>
                </el-table-column>

                <el-table-column
                  label="是否自动"
                  align="center"
                  width="160">
                  <template slot-scope="scope">
                    <el-radio v-model=scope.row.status label="1">是</el-radio>
                    <el-radio v-model=scope.row.status label="0">否</el-radio>
                  </template>
                </el-table-column>

                <el-table-column
                  label="立即启动"
                  align="center"
                  width="240">
                  <el-button type="primary" @click="handle_start">立即启动</el-button>
                </el-table-column>

                <el-table-column
                  label="日志"
                  align="center"
                  width="180">
                  <template slot-scope="scope">
                    <el-button type="info" @click="viewLog(scope.row.log)">查看日志</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>

            <el-collapse-item title="中草药库" name="3" class="myfont">
              <el-table
                :data="tableDataHerbal"
                stripe
                style="width: 100%">

                <el-table-column
                  label="来源"
                  align="center"
                  width="180">
                  <template slot-scope="scope">
                    <el-button @click="handleClickBaike(scope.row.name)" type="text">{{scope.row.name}}</el-button>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="totalNum"
                  label="数据总数"
                  align="center"
                  width="120">
                </el-table-column>

                <el-table-column
                  label="配置"
                  align="center"
                  width="200">
                  <template slot-scope="scope">
                    <el-button
                      @click="handleEditContent(scope.row.jobGroup)">编辑配置文件</el-button>
                  </template>
                </el-table-column>

                <el-table-column
                  label="时间设置"
                  align="center"
                  width="200">
                  <template slot-scope="scope">
                    <el-button
                      @click="dialogFormVisible = true">设置采集时间</el-button>
                  </template>
                </el-table-column>

                <el-table-column
                  label="是否自动"
                  align="center"
                  width="160">
                  <template slot-scope="scope">
                    <el-radio v-model=scope.row.status label="1">是</el-radio>
                    <el-radio v-model=scope.row.status label="0">否</el-radio>
                  </template>
                </el-table-column>

                <el-table-column
                  label="立即启动"
                  align="center"
                  width="240">
                  <el-button type="primary" @click="handle_start">立即启动</el-button>
                </el-table-column>

                <el-table-column
                  label="日志"
                  align="center"
                  width="180">
                  <template slot-scope="scope">
                    <el-button type="info" @click="viewLog(scope.row.log)">查看日志</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>

          </el-collapse>
        </div>
      </TabPane>

    </Tabs>


    <el-dialog title="百度百科采集目录" :visible.sync="baikeDialogFormVisible" width="100%">
      <template>

        <div class="search">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input22">
          </el-input>
          <el-button type="primary" @click="">搜索</el-button>
        </div>
      </template>

      <br>

      <BaikeUrls :table-data="baikeTableData" :table-data-title="baikeTableData1" :tnum="tnum1" @listenToChildEvent="handleChildMsg"></BaikeUrls>

      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="baikeDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="openMsg()">开始执行</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="notFoundDialogVisible" width="40%">
      <h3>没有搜索到该词，请选择要添加的数据表：</h3>
      <br>

      <el-checkbox-group v-model="checkList2">
        <el-checkbox key="disease_zy" label="中医病"></el-checkbox>
        <el-checkbox key="disease_xy" label="西医病"></el-checkbox>
        <el-checkbox key="symptom_zy" label="中医证型"></el-checkbox>
        <el-checkbox key="symptom_xy" label="症状"></el-checkbox>
        <el-checkbox key="patent" label="中成药"></el-checkbox>
      </el-checkbox-group>

      <span slot="footer" class="dialog-footer">
        <el-button @click="notFoundDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCheckList">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="日志" :visible.sync="viewlogVisible" width="30%">
      <span>{{viewlog}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewlogVisible = false">取 消</el-button>
        <el-button type="primary" @click="viewlogVisible = false">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>


<script>
    import BaikeUrls from '../components/conf_table'
    import task_status from "../components/task_status";
    export default {
        name: 'HelloWorld',
        components:{task_status, BaikeUrls},
        data () {
            return {
                fruit:"",
                searchlist:"",
                searchBases:false,
                viewlogVisible:false,
                editBaikeUrlVisiable:false,
                editBaikeUrlInput:"",
                viewlog:"",
                inputGap:"",
                tableSearchPatentVisable: false ,
                tableSearchSymptomZyVisable: false,
                notFoundDialogVisible: false,
                tableTaskStatusVisable:false,
                tableTaskStatusVisable1:false,
                tnum1:0,
                searchTime:"",
                pageInfo:{
                    page:0,
                    size:10
                },
                tableTaskTitle:[
                    {label:'任务编号',prop:'id'},
                    {label:'搜索词',prop:'word'},
                    {label:'任务组',prop:'jobGroup'},
                    {label:'爬虫任务',prop:'job_id'},
                    {label:'执行状态',prop:'status'},
                    {label:'开始时间',prop:'startTime'},
                    {label:'结束时间',prop:'endTime'}
                ],
                taskTnum:0,
                taskPageInfo:{
                    page:0,
                    size:10
                },
                tableTaskStatus:[],
                tableTaskStatus1:[],
                tableDataSearchPatent:[],
                tableDataSearchSymptomZy:[],
                time_set:'',
                input22:'',
                input1:'',
                input2:'',
                checkList:[],
                checkList2:[],
                baikeDialogFormVisible:false,
                value_time_gap: '',
                baikeTableData: [],
                tableDataZxy:[],
                tableDataPatent:[],
                tableDataHerbal:[],
                tableDataTemp:[
                    {name:"百度百科",totalNum:"500"}
                ],
                baikeTableData1: [
                    {label:'编号',prop:'id',width:'100'},
                    {label:'疾病名称',prop:'info_mc',width:'240'},
                    {label:'URL',prop:'crawler_url',width:'240'}
                ],

                type2ch:{
                    1:"中医病",
                    2:"西医病",
                    3:"中医证型",
                    4:"症状",
                    5:"中成药",
                    6:"中成药"
                },
                scrapyJobId2Group: {
                    1: "百度百科",
                    2: "中西医",
                    3: "中西医",
                    4: "中西医",
                    5: "中西医",
                    6:"药标网",
                    7:"中医药宝典",
                    8:"",
                    9:"",
                    10:"百度百科",
                },
                scrapyJobId2Name:{
                    1:"百度百科",
                    2:"中医症状",
                    3:"西医症状",
                    4:"中医疾病",
                    5:"西医疾病"
                },
                taskStatus2ch:{
                    30:"未找到",
                    10:"已找到，待更新",
                    20:"未找到，待插入",
                    1:"正在执行",
                    11:"没有更新",
                    12:"更新完成",
                    21:"插入完成",
                    40:"未找到该词"
                },
                dbname2ch:{
                    "symptom_zy":"病症证型",
                    "patent":"中药方剂",
                    "herbal":"中草药库"
                },
                time_gap_options:[
                    {
                        label: '月',
                        value: 'MONTH'
                    },
                    {
                        label: '周',
                        value: 'WEEK'
                    },
                    {
                        label: '天',
                        value: 'DAY'
                    }
                ],
                msg: '易一医学健康资料在线更新系统',
                activeNames: ['1'],
                dialogFormVisible: false
            }
        },
        methods:{
            editBaikeUrl(input){
                this.$prompt('请输入地址', '编辑采集地址', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue:input.url
                    // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    // inputErrorMessage: '邮箱格式不正确'
                }).then(({ value }) => {
                    input.url=value;
                    this.$message({
                        type: 'success',
                        message: '采集地址是：: ' + value,
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            //点击词汇跳转到前端界面
            locationToFrontened(rowData){
                //已找到，待更新
                if(rowData.status==10){
                    let baseUrl="";
                    if(rowData.jobId<6){
                        baseUrl='https://ronyun.com/zxydata#/pages/info/info?item=';
                    }
                    else if(rowData.jobId<8){
                        baseUrl='https://ronyun.com/zxydata#/pages/zyfj_info/zyfj_info?item=';
                    }
                    else{

                    }
                    let url=baseUrl+encodeURIComponent(JSON.stringify(rowData.item))+'&type='+this.type2ch[rowData.type];
                    console.log(url);
                    // window.location.href=url;
                    window.open(url);
                }
            },
            //启动某一行数据进行更新
            startRefresh(rowData){
                if(rowData.jobId==1|rowData.jobId==10){
                    var paramstmp={
                        jobId: rowData.jobId,
                        word: rowData.word,
                        status: rowData.status,
                        originId: rowData.originId,
                        type: rowData.type,
                        refreshUrl:rowData.url
                    };
                }
                else{
                    var paramstmp={
                        jobId: rowData.jobId,
                        word: rowData.word,
                        status: rowData.status,
                        originId: rowData.originId,
                        type: rowData.type
                    };
                }

                if(rowData.status!=30) {
                    this.$axios.get('/refresh_task', {
                        params:paramstmp
                    }).then(response => {
                        console.log(response);
                        if (response.data.code != "200") {
                            // this.notFoundDialogVisible = true;
                            alert("启动失败！");
                        } else {
                            this.viewTaskStatus();
                            this.$message({
                                type: "success",
                                message: "任务创建成功！"
                            });
                            setTimeout(() => {
                                this.viewCurrentTaskStatus(response.data.id,rowData)
                            }, 3000);
                            setTimeout(() => {
                                this.viewCurrentTaskStatus(response.data.id,rowData)
                            }, 10000);
                        }
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            //更新所有数据
            startRefreshAll(){
                let i=0;
                for(;i<this.tableTaskStatus.length;i++){
                    this.startRefresh(this.tableTaskStatus[i]);
                }
            },
            getUrlParams(){
                let word=this.$route.params.word;
                let where=this.$route.params.where;
                if(word){
                    this.input1=word;
                    this.checkList=[where];
                    // this.addCheckList();
                }
            },
            viewLog(val){
                this.viewlog=val;
                this.viewlogVisible=true;
            },
            addCheckList(){
                this.notFoundDialogVisible = false;
                let clist = "";
                for (var i = 0; i < this.checkList2.length; i++) {
                    clist += this.checkList2[i] + "/";
                }
                this.$axios.get('/add_search_task',{
                    params:{
                        content: this.input1,
                        chlist: clist
                    }
                }).then(response=>{
                    console.log(response);
                    this.viewTaskStatus();
                    this.searchlist=response.data.idlist;
                    this.$message({
                        type: "success",
                        message: "任务创建成功！"
                    });
                    this.$axios.get('/task_status', {
                        params: {
                            idlist:this.searchlist
                        }
                    }).then(response => {
                        console.log(response);
                        this.viewTaskStatus();
                        this.tableTaskStatus = response.data.result;
                        // setTimeout(this.viewCurrentTaskStatus(),3000);
                        // setTimeout(this.viewCurrentTaskStatus(),3000);
                    });
                }).catch(error=>{
                    console.log(error)
                })
            },
            getTableData1(){
                //
                this.$axios.get('/crawler_info_findall')
                    .then(response=>{
                    this.tableData1=response.data.result;
                    console.log(response)
                  }).catch(error=>{
                      console.log(error)
                  })
            },
            getDbName(){
                this.$axios.get('/get_dbname')
                    .then(response=>{
                        console.log(response);
                        this.tableDataZxy=response.data.zxy;
                        this.tableDataPatent=response.data.patent;
                        this.tableDataHerbal=response.data.herbal;
                    })
            },
            viewTaskStatus(){
                this.$axios.get('/task_status_findall',{
                    params:{
                        page:this.taskPageInfo.page,
                        size:this.taskPageInfo.size
                    }
                }).then(response=>{
                    console.log(response);
                    this.tableTaskStatus1=response.data.result.content;
                    console.log(response.data.result.content);
                    this.taskTnum=response.data.totalNum;
                })
            },
            startSearchTask(){
                if(this.input2==""){
                    this.viewTaskStatus();
                }
                else {
                    this.$axios.get("/task_status_findby_name", {
                        params: {
                            name: this.input2,
                            page: this.taskPageInfo.page,
                            size: this.taskPageInfo.size
                        }
                    }).then(response => {
                        console.log(response);
                        this.tableTaskStatus1 = response.data.result;
                        console.log(response.data.result.content);
                        this.taskTnum = response.data.totalNum;
                    }).catch(error => {
                        console.log(error);
                    })
                }
            },
            viewCurrentTaskStatus(searchList,rowdata){

                this.$axios.get('/task_status', {
                    params: {
                        id: searchList
                    }
                }).then(response => {
                    console.log(response);
                    // this.tableTaskStatus = response.data.result;
                    rowdata.status=response.data.status;
                    this.viewTaskStatus();
                });
            },
            startSearch(){
                if(this.input1==""){
                    this.$alert("请输入内容");
                }
                else {
                    // let clist="";
                    // for (var i = 0; i < this.checkList.length; i++) {
                    //     clist += this.checkList[i] + "/";
                    // }
                    // if(clist==""){
                    //     this.$alert("请选择搜索范围");
                    // }
                    // else{
                    //     this.$axios.get("/search_content",{
                    //         params:{
                    //             content:this.input1,
                    //             chlist:clist
                    //         }
                    //     }).then(response=>{
                    //         console.log(response);
                    //         this.tableTaskStatus=response.data.result;
                    //     })
                    // }
                    var d=new Date();
                    var mytime="";
                    var month=d.getMonth()+1;
                    mytime+=d.getFullYear()+"-"+month+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
                    this.searchTime=mytime;
                    let clist = "";
                    for (var i = 0; i < this.checkList.length; i++) {
                        clist += this.checkList[i] + "/";
                    }
                    if(clist==""){
                        this.$alert("请选择搜索范围");
                    }
                    else {
                        this.$axios.get('/search_content', {
                            params: {
                                content: this.input1,
                                chlist: clist
                            }
                        }).then(response => {
                            console.log(response);
                            if (response.data.code == "404") {
                                // this.notFoundDialogVisible = true;
                                alert("没有找到！");
                            } else {
                                this.viewTaskStatus();
                                this.searchlist=response.data.idList;
                                this.tableTaskStatus=response.data.result;
                                console.log(this.searchlist);
                                // this.viewCurrentTaskStatus();
                            }
                        }).catch(error => {
                            console.log(error)
                        });
                    }
                }
            },
            handleChecklistChange(val){
                console.log(val);
                console.log(this.checkList)
            },
            handleTaskChild(page,size){
                this.taskPageInfo.page=page-1;
                this.taskPageInfo.size=size;
                this.viewTaskStatus();
            },
            handleChildMsg(cnum,psize){
                this.pageInfo.page=cnum-1;
                this.pageInfo.size=psize;
                this.getUrlData()
            },
            getUrlData(){
                this.$axios.get('/baike_url_findall',
                    {
                        params:{
                            page:this.pageInfo.page,
                            size:this.pageInfo.size
                        }
                    }
                )
                    .then(response=>{
                        console.log(response.data)
                        this.baikeTableData=response.data.result.content
                        this.tnum1=response.data.result.totalElements
                        console.log(response.data.result.totalElements)
                    })
                    .catch(error=>{
                        console.log(error)
                    })
            },
            handleClickBaike(val){
                if(val=="百度百科") {
                    this.baikeDialogFormVisible = true
                }
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
            handleEditContent(val){
                // console.log(symptom_values[scope.$index].radio)
                console.log(val);
                window.location.assign('#/config/'+val);
                window.location.reload();
                // this.$router.push({
                //     name:'config'
                //     // params:{
                //     //     jobGroup:val
                //     // }
                // })
            },
            handleEditTime(index,row,str){
                // console.log(symptom_values[scope.$index].radio)
                console.log(str);
                console.log(index,row)
            },
            toggleSelection(rows){
                console.log(rows);
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
        mounted(){
            this.getUrlData();
            this.getTableData1();
            this.getDbName();
            this.getUrlParams();
            this.viewTaskStatus();
        },
        beforeRouteLeave(to,from,next){
            to.meta.keepAlive=true;
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
    font-size: 22px;
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

  .right{
    float:right ;
    width: 30%;
    min-width: 80px;
  }

  .myfont >>> .el-collapse-item__header{
    font-size: 18px;
    font-family: "Microsoft YaHei","Avenir",Helvetica,Arial,sans-serif;
    color: #66b1ff;
    alignment: center;
  }

  .inputSize >>> .el-input__inner{
    width: 100%;
  }

  .el-select-dropdown{
    max-width: 243px;
  }
  .el-select-dropdown__item{
    display: inline-block;
  }
  .el-select-dropdown__item span {
    min-width: 205px;
    display: inline-block;
  }

  .hello{
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    /*height: 100%;*/
  }
  .myform{
    width: 220px;
  }

  .search >>> .el-input{
    width: 30%;
    min-width: 150px;
  }
  .el-icon-search:before{
    left: auto;
  }
  .setMargin >>> .el-checkbox-group{
    margin:16px 15px 5px 5px;
    align-items: center;
    align-content: center;
  }

  .el-checkbox{
    align-items: center;
  }

  @media (max-width: 768px) {
    /*.el-button--primary.is-plain {*/
    /*  width: 9%;*/
    /*  margin-left: 0;*/
    /*  font-size: 1px;*/
    /*}*/
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
    h1{
      font-size: 22px;
    }
    .hello{
      width: 100%;
      margin-left: auto;
      margin-right: auto;
    }
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
