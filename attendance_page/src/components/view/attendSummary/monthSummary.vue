<template>
    <div>
        <div>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 10px 0;"></div>
            <el-checkbox-group v-model="checkedOpt" @change="handleCheckedOptChange">
                <span class="infoStyle">展示列:</span>
                <el-checkbox v-for="city in optlist" :label="city.key" :key="city.key">{{city.text}}</el-checkbox>
            </el-checkbox-group>
        </div>
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
                <el-button size="mini" type="info" @click="resetForm('formInline')">
                    <icon name="refresh" class="custom-icon"></icon>重置</el-button>
                <!--<span>(选择全体才能导出,报表保留两个月)</span>-->
            </el-form-item>
        </el-form>
        <div class="excelBtn">
            <el-button size="mini" type="primary" @click="exportExcel('formInline')">&nbsp;导出报表&nbsp;</el-button>
        </div>
        <el-table :data="tableData" border :height="this.$store.state.gTableHeight" v-loading="loading" style="width: 100%">
            <el-table-column v-for="col in cols" :prop="col.prop" :label="col.label" :key="col.prop" :formatter="col.format" v-if="showCol(col.prop)||col.show">
                <!--<template v-if="col.children.length>0">
                        <el-table-column
                            v-for="test in col.children"
                            :prop="test.prop"
                            :label="test.label"
                            :key="test.label"
                            :formatter="test.format"
                            v-if="test.show">
                            </el-table-column>
                        </template>-->
            </el-table-column>
        </el-table>
        <paging @emitsizechange="handleSizeChange" @emitcurrentchange="handleCurrentChange" :currentPage="tabPage.currentPage" :pageSizes="tabPage.pageSizes" :pageSize="tabPage.pageSize" :total="tabPage.totalNum">
        </paging>
        <!--参与考勤人员-->
        <el-dialog title="参与考勤人员选择" :visible.sync="dialogVisible" class="groupclass" :close-on-click-modal="false">
            <Police :dialog-visible="dialogVisible" type="attendanceClerk" :data="propData" ref="attendanceClerk" title="参与考勤人员选择" @close="dialogClose"></Police>
        </el-dialog>

    </div>
</template>
<script>
import paging from '../../common/Paging.vue';
import { dateFormat, getCurrentMonthFirst, getCurrentMonthLast } from 'assets/js/date.js'
import Police from '../../common/TreeChoose.vue'
const options = [
    { key: "attendDays", text: "出勤天数" },
    { key: "restDays", text: "休息天数" },
    { key: "workHours", text: "工作时长" },
    { key: "lateNum", text: "迟到次数" },
    { key: "leaveNum", text: "早退次数" },
    { key: "missNum", text: "缺卡次数" },
    { key: "absenteeism", text: "旷工天数" },
    { key: "travelDays", text: "出差天数" },
    { key: "fieldTimes", text: "外勤次数" },
    { key: "overTimeHours", text: "加班时长" },
    { key: "fillCard", text: "补卡次数" },
    { key: "leaveTimes", text: "请假次数" },
   // { key: "leaveHours", text: "请假时长" },
];

const optkey = ['attendDays', 'restDays','workHours','lateNum','leaveNum', 'missNum', 
'absenteeism','travelDays','fieldTimes','overTimeHours','fillCard','leaveTimes'];
const defkey = ['attendDays', 'restDays','lateNum','leaveNum', 'missNum', 'absenteeism','overTimeHours'];

export default {
    data() {
        var validateEndTime = (rule, value, callback) => {//验证结束时间不能大于开始时间
            var startTime = this.formInline.startDate;
            if (!value) {
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
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            attendanceClerk: {
                defalut: [],
                policeList: []
            },      //参与考勤人员数据
            formInline: {
                startDate: getCurrentMonthFirst(),
                endDate: getCurrentMonthLast()
            },
            dialogVisible: false,//组织机构树弹窗
            policeArr: ['allPolice'],
            propData: {},   //父组件传递子组件中间数据
            tableData: [
                {
                    police_name: '张三',
                    org_name: "test",
                    police_code: '2333',
                    job: "中队长",
                    attendDays: "2",
                    restDays: "2",
                    workHours: "30",
                    lateNum: "2",
                    lateHours: "1",
                    leaveNum: "0",
                    leaveHours: "0",
                    missNum: "2",
                    absenteeism: "4",
                },
                {
                    police_name: '张三',
                    org_name: "一中队",
                    police_code: '2333',
                    job: "普通警员",
                    attendDays: "20",
                    restDays: "8",
                    workHours: "167",
                    lateNum: "0",
                    lateHours: "0",
                    leaveNum: "1",
                    leaveHours: "2",
                    missNum: "3",
                    absenteeism: "4",
                }
            ],
            cols: [
                { prop: 'police_name', label: '姓名', show: true },
                { prop: 'police_code', label: '工号', show: true },
                { prop: 'org_name', label: '部门', show: true },
                { prop: 'role_name', label: '职务(角色)', show: true },
                { prop: 'attendDays', label: '出勤天数', show: false },
                { prop: 'restDays', label: '休息天数', show: false },
                { prop: 'workHours', label: '工作时长', show: false },
                { prop: 'lateNum', label: '迟到次数', show: false },
                { prop: 'leaveNum', label: '早退次数', show: false },
                { prop: 'missNum', label: '缺卡次数', show: false },
                { prop: 'absenteeism', label: '旷工天数', show: false },
                { prop: 'travelDays', label: '出差天数', show: false },
                { prop: 'fieldTimes', label: '外勤次数', show: false },
                { prop: 'overTimeHours', label: '加班时长', show: false },
                { prop: 'fillCard', label: '补卡次数', show: false },
                { prop: 'leaveTimes', label: '请假次数', show: false },
            ],
            tabPage: {
                currentPage: 1,
                pageSize: 10,
                pageSizes: [10, 20, 30, 50]
            },//分页信息
            rules: {//验证规则
                startDate: [
                    { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
                ],
                endDate: [
                    { type: 'date', required: true, validator: validateEndTime, trigger: 'change' }
                ],
                range: [
                    { required: true, message: '请选择部门/人员', trigger: ' blur change' }
                ],
            },
            checkAll: true,
            checkedOpt: ['attendDay', 'restDay', 'workHours', 'lateNum', 'leaveNum', 'missNum', 'absenteeism'],
            optlist: options,
            isIndeterminate: true,
            loading: false,
        };
    },

    components: {
        paging, Police
    },
    mounted: function () {
        // this.getAtdSummaryByMonth();
        this.openScreen();
        this.getPlOrgName()

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
        dtformatFun(row, colum) {//时间格式化
            if (row[colum.property] != null) {
                var d = row[colum.property];
                return dateFormat(new Date(d), "hh:mm:ss")
            }
        },
        showCol(prop) {
            var show = true;
            if ($.inArray(prop, this.checkedOpt) == -1) {
                show = false;
            }
            return show;
        },
        /**
         * 表单重置
         * @params {Object} formName 表单名称
         */
        resetForm(formName) {
            //   this.$refs[formName].resetFields();
            this.formInline = {
                startDate: getCurrentMonthFirst(),
                endDate: getCurrentMonthLast()
            };
            this.openScreen();
            this.getAtdSummaryByMonth();
        },
        /**
          *分页获取考勤记录
          *
         */
        getAtdSummaryByMonth(params) {
            var data = {
                page: this.tabPage.currentPage,
                pageSize: this.tabPage.pageSize,
                options: {
                    startDate:dateFormat(new Date(this.formInline.startDate), "yyyy-MM-dd"),
                    endDate:dateFormat(new Date(this.formInline.endDate), "yyyy-MM-dd")
                },
            };
            if (params) {
                data = params;
            }
            data.policeArr = this.policeArr;
            var _self = this;
            this.$http.get('/business/atdstatistics/getAtdSummaryByMonth', { params: data }).then(res => {
                console.log(res);
                if (res.data && res.data.success) {
                    var d = res.data.result;
                    _self.tableData = d.rows;
                    _self.tabPage.totalNum = d.count;
                }
            }).catch(err => {
                if (err) {
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
            this.getAtdSummaryByMonth();
        },
        /**
          * 切换页码
          * @params {Number} val 页码
          */
        handleCurrentChange(val) {
            this.tabPage.currentPage = val;
            this.getAtdSummaryByMonth();
        },
        /**
         * 条件查询
         */
        onSearch(formName) {
            var params = {
                page: this.tabPage.currentPage,
                pageSize: this.tabPage.pageSize,
                options: {
                    startDate:dateFormat(new Date(this.formInline.startDate), "yyyy-MM-dd"),
                    endDate:dateFormat(new Date(this.formInline.endDate), "yyyy-MM-dd")
                },
            }
            this.policeArr = [];
            var d = this.attendanceClerk.policeList;
            console.log(this.attendanceClerk.policeList);
            if (d.length > 0) {
                for (var i in d) {
                    if (d[i].type == 'depart') {
                        this.policeArr = ['allPolice'];
                    } else {
                        this.policeArr.push(d[i].id);
                    }
                }
            }
            var _self = this;
            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    _self.openScreen();
                    _self.getAtdSummaryByMonth(params);
                } else {
                    console.log('提交错误');
                }
            })
        },
        /**
        * 参与考勤人员选择
        */
        chooseDepartOrPlice() {
            this.dialogVisible = true;
            this.propData = this.attendanceClerk;
        },
        /**
         * 组织及人员选择dialog关闭
         * @msg [Object] 子组件传递数据
         */
        dialogClose(msg) {
            switch (msg.type) {
                case 'attendanceClerk':     //参与考勤人员
                    this.dialogVisible = msg.dialogVisible;
                    this.attendanceClerk = msg.CheckedLists;
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
        handleCheckAllChange(event) {
            this.checkedOpt = event.target.checked ? optkey : [];
            this.isIndeterminate = false;
        },
        handleCheckedOptChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.optlist.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.optlist.length;
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
      },
      exportExcel(formName){
        var vm = this;
        this.$refs[formName].validate(function (valid) {
            if (valid) {
                vm.$http.get('/business/atdstatistics/excelSummary').then(function(res){
                    console.log(333);
                })
                // var url = "/business/atdstatistics/excelSummary?test='222'";
                // console.info(url);
                // window.location = url;//这里不能使用get方法跳转，否则下载不成功
            } else {
                console.log('提交错误');
            }
        })
       
      }
    }
};
</script>
<style scoped>
.excelBtn {
    margin: -10px 0 10px 0;
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
    min-width: 180px;
    margin-top: 6px;
    box-sizing: border-box;
}

.el-tag {
    padding: 0 5px;
    height: 18px;
    line-height: 18px;
    font-size: 12px;
}

.infoStyle {
    font-size: 12px;
}
</style>
