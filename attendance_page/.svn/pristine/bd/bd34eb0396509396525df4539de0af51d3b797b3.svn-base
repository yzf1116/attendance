<template>
  <div>
    <!--查询-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
      <!--<el-form-item label="审批类型" prop="template_name">-->
        <!--<el-select v-model="formInline.template_name" placeholder="请选择">-->
          <!--<el-option-->
            <!--v-for="(item, index) in templateList"-->
            <!--:key="item.id"-->
            <!--:label="item.template_name"-->
            <!--:value="item.template_name">-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item label="审批名称" prop="review_name">
        <el-input v-model="formInline.review_name" placeholder="审批名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" icon="search" @click="onSearch('formInline')">查询</el-button>
        <el-button size="mini" type="info" @click="resetForm('formInline')">
          <icon name="refresh" class="custom-icon"></icon>
          重置
        </el-button>
        <el-button size="mini" type="danger" icon="delete" @click="batchRemove">批量删除</el-button>
        <!--<el-button type="success" icon="plus" @click="handleAdd">新增</el-button>-->
      </el-form-item>
    </el-form>

    <!--表格-->
    <el-table
      :data="allApproveList"
      border
      :height="this.$store.state.gTableHeight"
      v-loading="tableLoading"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="45"
      >
      </el-table-column>
      <el-table-column
        prop="personid"
        label="申请人"
      >
      </el-table-column>
      <el-table-column
        prop="review_type"
        label="审批类型">
      </el-table-column>
      <el-table-column
        prop="approverids"
        label="审批人">
      </el-table-column>
      <el-table-column
        prop="create_date"
        label="申请日期">

      </el-table-column>
      <el-table-column
        prop="review_code"
        label="审批编码">

      </el-table-column>
      <el-table-column
        prop="status"
        label="审批状态">

      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">

      </el-table-column>


      <el-table-column label="操作" width="210">
        <template scope="scope">
          <!--<el-button-->
          <!--size="small"-->
          <!--@click="handleEdit(scope.$index, scope.row)">编辑-->
          <!--</el-button>-->

          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <paging @emitsizechange="handleSizeChange"
            @emitcurrentchange="handleCurrentChange"
            :currentPage="tabPage.currentPage"
            :pageSizes="tabPage.pageSizes"
            :pageSize="tabPage.pageSize"
            :total="tabPage.totalNum"
    >
    </paging>
    <!--dialog-->
    <el-dialog v-bind:title="formTitle" v-model="dialogEdit" :close-on-click-modal="false"
               :close-on-press-escape="false"
               v-on:close="resetForm('ruleForm')" style="width:100%">


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit=false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
  import detailForm   from '../../common/detailForm.vue';
  import paging       from '../../common/Paging.vue';
  import {dateFormat} from '../../../assets/js/date'

  export default {
    data() {
      return {
        status: true,
        approveListData: [{
          approver: '',
          content: '',
          send_person: '',
          review_date: '',
          approval_status: '',
          remarks: ''

        }], //审批列表列表数组
        sels: [], //表格选中列
        tabPage: {
          currentPage: 1,
          pageSize: 10,
          pageSizes: [10, 20, 30, 50]
        }, //分页信息
        formInline: { //查询表单对象
          review_name:'',

        },
        dialogEdit: false,//编辑模态
        dialogInfo: false, //详情模态框是否显示标识
        formTitle: '',//新增编辑模态框title

        tableLoading: false,

        detailArr: [],//详情数组
        zw: [],//职位数组
        grgz: [],//工人工种数组
        image: {},//图片流预览图片
        btnShow: false,//图片移除按钮是否显示
        ServerimageUrl: 'api/',//后台地址
        overTimeList:[],   //加班审批列表
        travelList:[],    //出差审批列表
        leaveList: [],    //请假审批列表
        fillCardList:[],     //补卡审批列表
        allApproveList:[], //全部审批列表
        policeData:[],
        templateList:[],
        approve:[]

      }
    },
    //四个单独的数据库表；我们没有所要的依据来查询，只能每个表单独查询，前端设置，还是后端设置。
    created: async function () {
        let vm = this;
      await vm._policeListData();
      await vm.getTemplateList();
      await vm.getReviewRecord();
    },
    mounted: function () {

    },
    components: {
      detailForm, paging
    },
    computed: {},
    methods: {
      getDicData(str){//获取数据字典相关内容
        let dicList = JSON.parse(this.$getStore("gDictionaryList"));
        let filterarray = $.grep(dicList, function (value) {
          return value.typegroupcode === str;//筛选出其中一个，仍为一个数组
        });
        if (filterarray.length > 0) {//防止前端报错
          return filterarray[0].typeList;
        }
      },
      //性别显示转换
      formatSex: function (row, column) {
        console.log(column);
        return row.gender === "男" ? '男' : row.gender === "女" ? '女' : '未知';
      },
      formatStatus: function (row, column) {
        console.log(column);
        return row.status === "0" ? '禁用' : row.status === "1" ? '1' : '启用';
      },
      chooseImg(){
        $('input[type=file]').trigger('click');
        return false
      },

      /**
       *
       * 移动端提交审批申请以后会产生一条审批记录，数据保存在审批记录里，
       * 同时要把这条审批申请发送给审批人和抄送人，审批人审批通过还是拒绝后的信息更新数据库里审批记录的状态
       * 审批通过还是拒绝信息要发送给移动端，
       *
       *
       */

      /**
       *  工作内容: 移动端读取审批文件和审批申请信息保存的接口；
       *           审批列表功能: 审批列表的查询、重置删除和批量删除
       *           移动端审批状态更新接口
       *
       *  2017年07月25日
       *           数据库更改导致业务逻辑的修改
       *
       */
      async getReviewRecord() {   //以后还有获取自定义审批记录
        let vm = this;
        console.log(vm.formInline.review_name);
        let data = {      //查询条件
          page: vm.tabPage.currentPage,
          pageSize: vm.tabPage.pageSize,
          review_name: vm.formInline.review_name
        };
        vm.$http.get('/business/approve/getapply',{params:data}).then(function (res) {
          console.log('所有审批记录',res);
          vm.allApproveList = res.data.result.rows;
          vm.tabPage.totalNum = res.data.result.count;
          for (let i = 0; i < vm.allApproveList.length; i++) {    //申请人id姓名转换
            for (let j = 0; j < vm.policeData.length; j++) {
              if (vm.allApproveList[i].personid === vm.policeData[j].id) {
                vm.allApproveList[i].personid = vm.policeData[j].police_name
              }
              if (vm.allApproveList[i].approverids === vm.policeData[j].id) {
                vm.allApproveList[i].approverids = vm.policeData[j].police_name
              }
            }
            //审批状态的判断
            if (vm.allApproveList[i].status === 1) {
              vm.allApproveList[i].status = '审核中';
            }
            if (vm.allApproveList[i].status === 2) {
              vm.allApproveList[i].status = '审核通过';
            }
            if (vm.allApproveList[i].status === 3) {
              vm.allApproveList[i].status = '拒绝';
            }
          }
          for (let i = 0; i < vm.allApproveList.length; i++) {
            for (let j = 0; j < vm.templateList.length; j++) {
              console.log(vm.allApproveList[i].templateid === vm.templateList[j].id);
              if (vm.allApproveList[i].templateid === vm.templateList[j].id) {
                vm.allApproveList[i].templateid = vm.templateList[j].template_name;
              }
            }
          }
        }).catch(function (err) {
          console.log(err)
        });
      },
      //查询所有警员作id转换
      _policeListData(){
        let vm = this;
        vm.$http.get('/business/approve/getallpolice').then(function (res) {
          if (res.data.result && res.data.success) {
            vm.policeData = res.data.result
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      getTemplateList(){
         let vm = this;
         vm.$http.get('/system/template/getalltemplate').then(function(res){
             console.log('模板类型',res);
             if(res.data.success && res.data.result){
                  vm.templateList = res.data.result;
             }
         }).catch(function(err){
             console.log(err)
         })
      },
      //获取加班审批记录
      getOverTimeList(){
        let vm = this;
        let data = {
          page: this.tabPage.currentPage,
          pageSize: this.tabPage.pageSize,
          remark: this.formInline.approver
        };
        vm.$http.get('/business/approve/getovertimelist',{params:data}).then(function(res){

          if(res.data.success &&res.data.result){
            vm.overTimeList = res.data.result.rows;
            vm.tabPage.totalNum = res.data.result.count;
            for (let i = 0; i < vm.overTimeList.length; i++) {
              for (let j = 0; j < vm.policeData.length; j++) {
                if (vm.overTimeList[i].personid === vm.policeData[j].id) {
                  vm.overTimeList[i].personid = vm.policeData[j].police_name
                }
                if (vm.overTimeList[i].approveid === vm.policeData[j].id) {
                  vm.overTimeList[i].approveid = vm.policeData[j].police_name
                }

              }
              if (vm.overTimeList[i].review_status === 0) {
                vm.overTimeList[i].review_status = '待审批';
              }
              if (vm.overTimeList[i].review_status === 1) {
                vm.overTimeList[i].review_status = '进行中';
              }
              if (vm.overTimeList[i].review_status === 2) {
                vm.overTimeList[i].review_status = '已通过';
              }
              if (vm.overTimeList[i].review_status === 3) {
                vm.overTimeList[i].review_status = '已拒绝';
              }
            }
            for (let i = 0; i < vm.overTimeList.length; i++) {
              for (let j = 0; j < vm.templateList.length; j++) {
                console.log(vm.overTimeList[i].templateid === vm.templateList[j].id);
                if (vm.overTimeList[i].templateid === vm.templateList[j].id) {
                  vm.overTimeList[i].templateid = vm.templateList[j].template_name;
                }
              }
            }
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      //获取出差审批记录
      getTravelList(){
        let vm = this;
        let data = {
          page: this.tabPage.currentPage,
          pageSize: this.tabPage.pageSize,
          remark: this.formInline.approver
        };

        vm.$http.get('/business/approve/gettravellist',{params:data}).then(function(res){

          if(res.data.success &&res.data.result){
            vm.travelList = res.data.result.rows;
            vm.tabPage.totalNum = res.data.result.count;
            for (let i = 0; i < vm.travelList.length; i++) {
              for (let j = 0; j < vm.policeData.length; j++) {
                if (vm.travelList[i].personid === vm.policeData[j].id) {
                  vm.travelList[i].personid = vm.policeData[j].police_name
                }
                if (vm.travelList[i].approveid === vm.policeData[j].id) {
                  vm.travelList[i].approveid = vm.policeData[j].police_name
                }

              }
              if (vm.travelList[i].review_status === 0) {
                vm.travelList[i].review_status = '待审批';
              }
              if (vm.travelList[i].review_status === 1) {
                vm.travelList[i].review_status = '进行中';
              }
              if (vm.travelList[i].review_status === 2) {
                vm.travelList[i].review_status = '已通过';
              }
              if (vm.travelList[i].review_status === 3) {
                vm.travelList[i].review_status = '已拒绝';
              }
            }
            for (let i = 0; i < vm.travelList.length; i++) {
              for (let j = 0; j < vm.templateList.length; j++) {
                console.log(vm.travelList[i].templateid === vm.templateList[j].id);
                if (vm.travelList[i].templateid === vm.templateList[j].id) {
                  vm.travelList[i].templateid = vm.templateList[j].template_name;
                }
              }
            }
          }
        }).catch(function(err){
          console.log(err);
        })
      },

      //获取请假审批记录
      getLeaveList(){
        console.log('请假');
        let vm = this;
        let data = {
          page: this.tabPage.currentPage,
          pageSize: this.tabPage.pageSize,
          remark: this.formInline.approver
        };
        vm.$http.get('/business/approve/getleavelist', {params: data}).then(function (res) {

          if (res.data.success && res.data.result) {
            vm.leaveList = res.data.result.rows;
            vm.tabPage.totalNum = res.data.result.count;
            console.log('警员',vm.policeData);
            for (let i = 0; i < vm.leaveList.length; i++) {
              for (let j = 0; j < vm.policeData.length; j++) {

                if (vm.leaveList[i].personid === vm.policeData[j].id) {
                  vm.leaveList[i].personid = vm.policeData[j].police_name
                }
                if (vm.leaveList[i].approveid === vm.policeData[j].id) {
                  vm.leaveList[i].approveid = vm.policeData[j].police_name
                }

              }
              if (vm.leaveList[i].review_status === 0) {
                vm.leaveList[i].review_status = '待审批';
              }
              if (vm.leaveList[i].review_status === 1) {
                vm.leaveList[i].review_status = '进行中';
              }
              if (vm.leaveList[i].review_status === 2) {
                vm.leaveList[i].review_status = '已通过';
              }
              if (vm.leaveList[i].review_status === 3) {
                vm.leaveList[i].review_status = '已拒绝';
              }
            }
            for (let i = 0; i < vm.leaveList.length; i++) {
              for (let j = 0; j < vm.templateList.length; j++) {
                console.log(vm.leaveList[i].templateid === vm.templateList[j].id);
                if (vm.leaveList[i].templateid === vm.templateList[j].id) {
                  vm.leaveList[i].templateid = vm.templateList[j].template_name;
                }
              }
            }

            vm.approve = vm.leaveList;
            vm.tabPage.totalNum = vm.approve.length;
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      //获取补卡审批记录
      async getFillCardList(){

        let vm = this;
        let data = {
          page: this.tabPage.currentPage,
          pageSize: this.tabPage.pageSize,
          remark: this.formInline.approver
        };
        vm.$http.get('/business/approve/getfillcardlist',{params:data}).then(function(res){

          if(res.data.success && res.data.result){
            vm.fillCardList = res.data.result.rows;
            vm.tabPage.totalNum = res.data.result.count;
            for (let i = 0; i < vm.fillCardList.length; i++) {
              for (let j = 0; j < vm.policeData.length; j++) {
                if (vm.fillCardList[i].personid === vm.policeData[j].id) {
                  vm.fillCardList[i].personid = vm.policeData[j].police_name
                }
                if (vm.fillCardList[i].approveid === vm.policeData[j].id) {
                  vm.fillCardList[i].approveid = vm.policeData[j].police_name
                }

              }
              if (vm.fillCardList[i].review_status === 0) {
                vm.fillCardList[i].review_status = '待审批';
              }
              if (vm.fillCardList[i].review_status === 1) {
                vm.fillCardList[i].review_status = '进行中';
              }
              if (vm.fillCardList[i].review_status === 2) {
                vm.fillCardList[i].review_status = '已通过';
              }
              if (vm.fillCardList[i].review_status === 3) {
                vm.fillCardList[i].review_status = '已拒绝';
              }
            }
            for (let i = 0; i < vm.fillCardList.length; i++) {
              for (let j = 0; j < vm.templateList.length; j++) {
                console.log(vm.fillCardList[i].templateid === vm.templateList[j].id);
                if (vm.fillCardList[i].templateid === vm.templateList[j].id) {
                  vm.fillCardList[i].templateid = vm.templateList[j].template_name;
                }
              }
            }
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      /**
       * 查询 根据用户名模糊查询
       * @params {String} formName 进行验证
       */
      onSearch(formName) {
        let params = this.formInline;
        params.page = 1;
        params.pageSize = this.tabPage.pageSize;
        this.tabPage.currentPage = 1;//每次查询默认第一页
        let vm = this;
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            vm.getReviewRecord();
          } else {
            return console.log('提交错误');
          }
        });
      },
      /**
       * 点击新增按钮
       */
//      handleAdd() {
//        let userData = JSON.parse(this.$getStore('userData'));
//        console.log(userData);
//        let params = {
//          create_user: userData.user_name
//        };
//        return params
//      },


      /**
       * 表单重置
       * @params {Object} formName 表单名称
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
        if (formName === 'formInline') {
          console.log('重置呀');
          console.log(this.formInline);
          this.getReviewRecord()
        }
      },
      /**
       * 编辑按钮点击事件
       * @params {Number} index  行号
       * @params {Object} row 行对象
       */
      handleEdit(index, row) {
        console.log(row);
        return index
      },
      /**
       * 删除按钮点击事件
       * @params {Number} index   行号
       * @params {Object} row     行对象
       */
      handleDelete(index, row) {
        console.log(index);
        let vm = this;
        vm.delApproveRecord(row);
      },
      /**
       * 批量删除操作
       */
      batchRemove(){
        let vm = this;
        let arr = vm.sels;
        if (arr.length > 0) {
          vm.delApproveRecord({params: arr});
        } else {
          vm.$message({
            message: '请勾选审批信息',
            type: 'warning'
          });
        }
      },
      /**
       * 删除审批信息
       * @params {Object} row|rows     行对象
       */
      delApproveRecord(data) {
        let vm = this;
        let params = data;
        this.$confirm('此操作将永久删除该审批信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.$http.post('/business/approve/delapproverecord', params).then(function (res) {
            console.log(res);
            if (res.data && res.data.success) {
              vm.$message({
                message: '删除成功',
                type: 'success'
              });
              vm.getReviewRecord();
            }
          }).catch(function (err) {
            console.log(err);
          })
        }).catch(() => {

        });
      },
      /**
       * 切换每页条数
       * @params {Number} val 每页条数
       */
      handleSizeChange(val) {
        this.tabPage.pageSize = val;
        this.getReviewRecord();
      },
      /**
       * 切换页码
       * @params {Number} val 页码
       */
      handleCurrentChange(val) {
        this.tabPage.currentPage = val;
        this.getReviewRecord();
      },
      /**
       * 多选框改变选中事件
       * @params {Array} val 当前所有选中行对象数组
       */
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.sels = val;
      },
      closeDetail(msg){
        this.dialogInfo = msg;
      },

    }
  }
</script>
<style>

</style>

