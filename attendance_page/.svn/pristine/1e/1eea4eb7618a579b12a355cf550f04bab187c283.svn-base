<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline" :rules="rules">
            <el-form-item label="考勤日期" prop="startDate">
                <el-date-picker size="mini" v-model="formInline.startDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="至" prop="endDate">
                <el-date-picker size="mini" v-model="formInline.endDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
                </el-date-picker>
            </el-form-item>
            <!--<el-form-item label="部门/全部" prop="range">
                <el-input size="mini" v-model="formInline.range" placeholder="请选择"></el-input>
            </el-form-item>-->
             <el-form-item label="考勤人员:">
                <div class="tagclass" @click="chooseDepartOrPlice">
                <el-tag style="margin: 0 3px" :type="item.type" v-for="(item,index) in attendanceClerk.defalut" :key="item.id">
                    {{item.name}}
                </el-tag>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="primary" icon="search" @click="onSearch('formInline')">查询</el-button>
                <el-button size="mini" type="info" @click="resetForm('formInline')"><icon name="refresh" class="custom-icon"></icon>重置</el-button>
                <!--<span>(选择全体才能导出,报表保留两个月)</span>-->
            </el-form-item>
        </el-form>
        <div class="excelBtn">
          <el-button size="mini" type="primary" @click="onSearch('formInline')">&nbsp;导出报表&nbsp;</el-button>
        </div>
        <el-table class="tabStyle"
            :data="tableData"
            border
            :height="this.$store.state.gTableHeight"
            v-loading="loading"
            style="width: 100%">
            <!--<el-table-column
            v-for="col in cols"
            :prop="col.prop" :label="col.label||col.left +'/'+ col.right" :key="col.prop" :formatter="col.format" :render-header="tabRender">
                <template v-if="col.children.length>0">
                <el-table-column
                    v-for="test in col.children"
                    :prop="test.prop"
                    :label="test.label"
                    :key="test.label"
                    :formatter="test.format">
                    </el-table-column>
                </template>

            </el-table-column>-->
            <template v-for="col in cols">
                <el-table-column
                v-if="col.label"
                :prop="col.prop"
                :label="col.label"
                :key="col.prop"
                :formatter="col.format">
                </el-table-column>
                <el-table-column
                v-else
                :prop="col.prop"
                :label="col.left+'|'+col.right"
                :key="col.prop"
                width="100"
               
                :render-header="tabRender">
                <template scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag>{{scope.row[col.prop].split('-')[0]}}</el-tag>
                        <el-tag>{{scope.row[col.prop].split('-')[1]}}</el-tag>
                    </div>
                
                </template>
                </el-table-column>
            </template>
        </el-table>
        <paging @emitsizechange="handleSizeChange"
          @emitcurrentchange="handleCurrentChange"
          :currentPage="tabPage.currentPage"
          :pageSizes="tabPage.pageSizes"
          :pageSize="tabPage.pageSize"
          :total="tabPage.totalNum">
        </paging>
          <!--参与考勤人员-->
      <el-dialog  title="参与考勤人员选择" :visible.sync="dialogVisible" class="groupclass"
                 :close-on-click-modal="false" >
        <Police :dialog-visible="dialogVisible" type="attendanceClerk" :data="propData" ref="attendanceClerk"
                title="参与考勤人员选择" @close="dialogClose"></Police>
      </el-dialog>

    </div>
</template>
<script>
  import paging from '../../common/Paging.vue';
  import {dateFormat,getweek} from 'assets/js/date.js'
  import Police from '../../common/TreeChoose.vue'

  export default {
    data() {
      var validateEndTime = (rule, value, callback) => {//验证结束时间不能大于开始时间
          var startTime = this.formInline.startDate;
          if(!value){
            callback(new Error('请选择结束时间'));
          }
          setTimeout(() => {
              if (startTime > value) {
                  callback(new Error('结束时间不能小于开始时间'));
              } else {
                  callback();
              }
              ;
          }, 200)
      };
      return {
        loading:false,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        attendanceClerk: {
             defalut: [],
            policeList: []
        },      //参与考勤人员数据
        formInline:{
          startDate:getweek(0),
          endDate:getweek(6)
        },
        dialogVisible:false,//组织机构树弹窗
        policeArr:['allPolice'],
        propData: {},   //父组件传递子组件中间数据
     tableData: [
            {
            police_name: '张警官',
            org_name: '交警一中队',
            code: 'No.0002',
            rolename: '中队长',
            day1: '09:00-18:00',
            day2: '09:00-18:00',
            day3: '09:00-18:00',
            day4: '09:00-18:00',
            day5: '09:00-18:00',
            day6: '09:00-18:00',
            day7: '09:00-18:00',
            day8: '09:00-18:00'}
        ],
        cols: [
            {prop: 'police_name', label: '姓名',children:[]},
            {prop: 'org_name', label: '组织机构',children:[]},
            {prop: 'code', label: '工号',children:[]},
            {prop: 'rolename', label: '职位',children:[]},
            {prop: 'day1',left:"三",right:'07-05'},
            {prop: 'day2',left:"四",right:'07-06'},
            {prop: 'day3',left:"五",right:'07-07'},
            {prop: 'day4',left:"六",right:'07-08'},
            {prop: 'day5',left:"日",right:'07-09'},
            {prop: 'day6',left:"一",right:'07-10'},
            {prop: 'day7',left:"二",right:'07-11'},
            {prop: 'day8',left:"三",right:'07-12'}
        ],
        tabPage: {
            currentPage: 1,
            pageSize: 10,
            pageSizes: [10, 20, 30, 50]
        },//分页信息
        rules: {//验证规则
            startDate: [
                {type: 'date', required: true, message: '请选择开始日期', trigger: 'change'}
            ],
            endDate: [
                {type: 'date', required: true,validator: validateEndTime, trigger: 'change'}
            ],
            range: [
                {required: true, message: '请选择部门/人员', trigger: ' blur change'}
            ],
        },
      };
    },
    components: {
        paging,Police
    },
    mounted:function(){
        this.openScreen();
        this.getAtdListByDate();
        this.getPlOrgName();
    },
    methods: {
    /**
     * 加载动画
     */
    openScreen() {//加载...
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 400);
    },
dateStyle(row, colum){//时间显示
var d = row[colum.property];
d.split('-');
return `<p>${d[0]}</p><p>d[1]</p>`
    //   dtformatFun(row, colum){//时间格式化
    //       if (row[colum.property] != null) {
    //           var d = row[colum.property];
    //           return dateFormat(new Date(d),"hh:mm:ss")

    //       }
      },
      test(row,colum){
          return 333;
      },
      tabRender(h, { column, $index }){
          var d = column.label.split('|');
         return h('div',{class:'test'},
            [
                h('span', {
                attrs: {
                    class:'left',
                }
                },d[0]),
                h('span', {
                attrs: {
                    class:'right',
                }
                },d[1])
            ],
        )
      },
      /**
       * 表单重置
       * @params {Object} formName 表单名称
       */
      resetForm(formName){
        //   this.$refs[formName].resetFields();
         this.formInline = {
            startDate:getweek(0),
            endDate:getweek(6)
        };
          this.openScreen();
          this.getAtdListByDate();
      },
      /**
        *分页获取考勤记录
        *
       */
      getAtdListByDate(params){
        var data = {
            page: this.tabPage.currentPage,
            pageSize: this.tabPage.pageSize,
            options:this.formInline,
        };
        if (params) {
            data = params;
        }
        data.policeArr = this.policeArr;
        var _self = this;
        this.$http.get('/business/atdstatistics/getatdlistbydate',{params:data}).then(res =>{
          console.log(res);

            if(res.data&&res.data.success){
              var d = res.data.result;
              _self.tableData = d.rows;
              _self.tabPage.totalNum = d.count;
            }
        }).catch(err =>{
          if(err){
            console.log(err);
          }
        })

      },
      /**
        * 切换每页条数
        * @params {Number} val 每页条数
        */
      handleSizeChange(val) {
          this.tabPage.pageSize = val;
          this.getAtdListByDate();
      },
      /**
        * 切换页码
        * @params {Number} val 页码
        */
      handleCurrentChange(val) {
          this.tabPage.currentPage = val;
          this.getAtdListByDate();
      },
      /**
       * 条件查询
       */
      onSearch(formName){
        var params = {
            page: this.tabPage.currentPage,
            pageSize: this.tabPage.pageSize,
            options:this.formInline,
        }
        this.policeArr = [];
        var d = this.attendanceClerk.policeList;
        if(d.length>0){
            for(var i in d){
                if(d[i].type=='depart'){
                    this.policeArr = ['allPolice'];
                }else{
                    this.policeArr.push(d[i].id);
                }
            }
        }
        var _self = this;
        this.$refs[formName].validate(function (valid) {
            if (valid) {
                _self.openScreen();
                _self.getAtdListByDate(params);
            } else {
                console.log('提交错误');
            }
        })
    },
       /**
       * 参与考勤人员选择
       */
      chooseDepartOrPlice(){
        this.dialogVisible = true;
        this.propData = this.attendanceClerk;
        console.log(this.propData)
      },
      /**
       * 组织及人员选择dialog关闭
       * @msg [Object] 子组件传递数据
       */
      dialogClose(msg){
        switch (msg.type) {
          case 'attendanceClerk':     //参与考勤人员
            this.dialogVisible = msg.dialogVisible;
            this.attendanceClerk = msg.CheckedLists;
            console.log('test',this.attendanceClerk);
            break;
          case 'unAttendanceClerk':     //不参与考勤人员
            this.unDialogVisible = msg.dialogVisible;
            this.unAttendanceClerk = msg.CheckedLists;
            break;
          case 'adAttendanceClerk':   //考勤组负责人
            this.adDialogVisible = msg.dialogVisible;
            this.adAttendanceClerk = msg.CheckedLists;
            break;
        }

      },
      //默认选中最高组织机构
      getPlOrgName(){
        var _self = this;
        this.$http.get('/business/plOrg/getHighestOrg').then(function (res) {
            if(res.data&&res.data.success){
                var d = res.data.result;
                var arr = [];
                d.forEach(item => {
                    var p = {
                        id:item.id,
                        name:item.org_name,
                        org_code:item.org_code,
                        org_type:item.org_type,
                        parentid:item.parentid,
                        description:item.description,
                        type:'depart'
                    }
                    arr.push(p);
                });
                _self.attendanceClerk.defalut = arr;
                _self.attendanceClerk.policeList = arr;
                _self.policeArr = ['allPolice'];
            }
        }).catch(function (err) {
            if(err){
                console.log(err);
            }
        })
      }
    }
  };
</script>
<style >
  .excelBtn{
    margin:-10px 0 10px 0;
  }
  .el-tag--depart {
    background-color: #20a0ff;
    border-color: rgba(18, 206, 102, .2);
    color: #fbfdff;
  }

  .el-tag--police {
    background-color: rgba(18, 206, 102, .1);
    border-color: rgba(18, 206, 102, .2);
    color: #20a0ff;
  }

  .tagclass {
    min-height: 22px;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    padding: 0 5px;
    line-height: 20px;
    overflow: auto;
    min-width:180px;
    margin-top: 6px;
    box-sizing: border-box;
  }
.el-tag {
    padding: 0 5px;
    height: 18px;
    line-height: 18px;
    font-size: 12px;
}
.tabStyle .test{
    width:100%;
    height:39px;
    position: relative;
}
 .tabStyle .left{
   position: absolute;
   left:5px;
   top:0;
}
 .tabStyle .right{
   position: absolute;
   right:5px;
   bottom:0;

}

</style>
