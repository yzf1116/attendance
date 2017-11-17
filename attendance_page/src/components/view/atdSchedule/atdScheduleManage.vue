<template>
  <div>
    <!--查询-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline" @keyup.enter.native="onSearch('formInline')">
      <el-form-item label="班次名称" prop="org_name">
        <el-input v-model="formInline.name" size="mini" placeholder="班次名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" icon="search" @click="onSearch('formInline')">查询</el-button>
        <el-button size="mini" type="info" @click="resetForm('formInline')">
          <icon name="refresh" class="custom-icon"></icon>
          重置
        </el-button>
      </el-form-item>
      <el-form-item style="margin-left: 30px;">
        <el-button size="mini" type="success" icon="plus" @click="handleAdd">新增</el-button>
        <el-button size="mini" type="danger" icon="delete" @click="batchRemove">批量删除</el-button>
  
      </el-form-item>
    </el-form>
    <!--表单-->
    <el-table :data="atdScheduleTableData" border v-loading="loading" :height="this.$store.state.gTableHeight" @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column prop="name" label="班次名称" sortable>
      </el-table-column>
      <el-table-column prop="work_time" label="上班时间">
      </el-table-column>
      <el-table-column prop="off_work_time" label="下班时间">
      </el-table-column>
      <el-table-column prop="hours" label="工作时长">
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <!--<el-button-->
          <!--size="small"-->
          <!--@click="handleRole(scope.$index, scope.row)">查看角色-->
          <!--</el-button>-->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <paging @emitsizechange="handleSizeChange" @emitcurrentchange="handleCurrentChange" :currentPage="tabPage.currentPage" :pageSizes="tabPage.pageSizes" :pageSize="tabPage.pageSize" :total="tabPage.totalNum">
    </paging>
  
    <el-dialog v-bind:title="formTitle" v-model="dialogInfo" :close-on-click-modal="false" v-on:close="resetForm('form')" size="tiny">
  
      <el-form :model="form" :rules="this.$validateRule" ref="form" label-width="110px">
        <el-form-item label="班次名称" prop="atdSchedule_name">
          <el-input v-model="form.atdSchedule_name"></el-input>
        </el-form-item>
  
        <!-- <el-form-item label="上级机构" prop="parentdepartid">
                    <el-input v-model="form.parentdepartid"></el-input>
                </el-form-item> -->
        <el-form-item label="上班时间" prop="atdSchedule_work_time">
          <el-time-select v-model="form.atdSchedule_work_time" style="width: 100%" :editable="false" :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '23:30'
          }" placeholder="选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item prop="atdSchedule_off_work_time" label="下班时间">
          <el-time-select v-model="form.atdSchedule_off_work_time" style="width: 100%" :editable="false" :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '23:30'
          }" placeholder="选择时间">
          </el-time-select>
  
        </el-form-item>
        <span style="color: #bbb">合计工作时长 {{hours }}</span>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInfo=false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  
  </div>
</template>

<script>
import paging from '../../common/Paging.vue'
import moment from 'moment'
import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item";
import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
export default {
  data() {
    return {

      form: {
        atdSchedule_name: '',
        atdSchedule_work_date: '',
        atdSchedule_off_work_time: '',
      },
      is_crossday: 0,
      formTitle: '',//新增编辑模态框title
      dialogInfo: false,
      atdScheduleTableData: [],//班次列表数组
      sels: [],//表格选中列
      tabPage: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50]
      },//分页信息
      loading: false,
      formInline: {
        name: ''
      }
    }
  },
  methods: {

    /**
     *查询关联考勤组班次信息
     * @param {Object} data
     */
    getScheduleForGroupList(data) {
      console.log(data)
      var _self = this;
      var idList = [];

      data.forEach(item => idList.push(item.id))
      this.$http.get('/business/atdSchedule/getscheduleforgrouplist', {
        params: { scheduleList: idList }
      }).then(function (res) {
        console.log(res)
        if (res.data && res.data.success) {
          if (res.data.result > 0) {
            _self.$confirm('当前选中班次有关联考勤组, 是否继续删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(function () {
              _self.deleteScheduleInfo({ params: data })
            }).catch(function (err) {
              console.log(err);
            });
          } else {
            _self.deleteScheduleInfo({ params: data })
          }
        } else {
          _self.$message({
            message: res.data.result,
            type: 'warning'
          });
        }
      }
        ).catch(function (err) {
          console.log(err);

        }
        )
    },

    /**
     * 查询 根据机构名称模糊查询
     * @params {String} formName 进行验证
     */
    onSearch(formName) {
      var params = this.formInline;
      params.page = 1;
      params.pageSize = this.tabPage.pageSize;
      this.tabPage.currentPage = 1;//每次查询默认第一页
      var _self = this;
      _self.$refs[formName].validate((valid) => {
        if (valid) {
          _self.getScheduleList(params);

        } else {
          console.log('提交错误');
        }
      });
    },
    /**
     * 删除按钮点击事件
     * @params {Number} index   行号
     * @params {Object} row     行对象
     */
    handleDelete(index, row) {
      var _self = this;
      //        _self.deleteScheduleInfo(row);
      _self.getScheduleForGroupList([row])
    },
    /**
     * 删除部门信息
     * @params {Object} row|rows     行对象
     */
    deleteScheduleInfo(data) {
      var _self = this;
      _self.loading = true;
      _self.$http.post('/business/atdSchedule/deletescheduleinfo', data).then(function (res) {
        if (res.data && res.data.success) {
          _self.$message({
            message: '删除成功',
            type: 'success'
          });
          _self.loading = false;
          _self.getScheduleList();
        } else {
          _self.$message({
            message: res.data.msg,
            type: 'warning'
          });
          _self.loading = false;
        }
      }).catch(function (err) {
        _self.loading = false;
        console.log(err);
      })

    },
    /**
     * 切换每页条数
     * @params {Number} val 每页条数
     */
    handleSizeChange(val) {
      this.tabPage.pageSize = val;
      this.getScheduleList();
    },
    /**
     * 切换页码
     * @params {Number} val 页码
     */
    handleCurrentChange(val) {
      this.tabPage.currentPage = val;
      this.getScheduleList();
    },
    /**
     * 多选框改变选中事件
     * @params {Array} val 当前所有选中行对象数组
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.sels = val;
    },
    /**
     * 批量删除操作
     */
    batchRemove() {
      var _self = this;
      var arr = _self.sels;
      if (arr.length > 0) {
        console.log(arr)

        _self.getScheduleForGroupList(arr)
        //          _self.deleteScheduleInfo({params: arr});
      } else {
        _self.$message({
          message: '请选择班次',
          type: 'warning'
        });
      }

    },
    /**
     * 编辑按钮点击事件
     * @params {Number} index  行号
     * @params {Object} row 行对象
     */
    handleEdit(index, row) {
      this.dialogInfo = true;
      this.formTitle = "编辑部门信息";
      var newrow = {
        id: row.id,
        atdSchedule_name: row.name,
        atdSchedule_work_time: row.work_time,
        atdSchedule_off_work_time: row.off_work_time,
        //          atdSchedule_work_time: moment(row.work_time).format('YYYY-MM-DD HH:mm:ss'),
        //          atdSchedule_off_work_time: moment(row.off_work_time).format('YYYY-MM-DD HH:mm:ss'),
      }
      this.form = Object.assign({}, newrow);
      console.log(this.form)
    },
    /**
     * 点击新增按钮
     */
    handleAdd() {
      this.dialogInfo = true;
      this.formTitle = "新增班组";
      this.form = Object.assign({}, {
        atdSchedule_name: '',
        work_time: '',
        atdSchedule_work_time: undefined,
        atdSchedule_off_work_time: undefined
      });//初始化
      console.log(this.form)
    },
    /**
     * 表单重置
     * @params {Object} formName 表单名称
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
      if (formName == 'formInline') {
        this.formInline.name = ''
        this.getScheduleList();
      }
    },
    dateFormatter(row, column) {
      return moment(row.work_time).format('H:mm');
    },
    dateFormatter2(row, column) {
      return moment(row.off_work_time).format('H:mm');
    },
    /**
     * 保存班次信息
     * @params {String} formName 用于验证
     */
    submitForm(formName) {
      var _self = this;
      var parms = {}
      if (_self.form.id) {
        parms.id = _self.form.id;
      }
      parms.name = _self.form.atdSchedule_name;
      parms.work_time = _self.form.atdSchedule_work_time + ':00';
      parms.off_work_time = _self.form.atdSchedule_off_work_time + ':00';
      parms.hours = _self.hours;
      parms.is_crossday = _self.is_crossday;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _self.$http.post('/business/atdSchedule/savescheduleinfo', parms)
            .then(function (res) {
              console.log(res)
              if (res.data && res.data.flag) {
                _self.dialogInfo = false;
                _self.$message({
                  message: '提交成功',
                  type: 'success'
                });
                _self.getScheduleList();
              } else {
                _self.$message({
                  message: res.data.msg,
                  type: 'warning'
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log('提交错误');
          return false;
        }
      });
    },

    /**
     * 获取班次信息
     * @param params
     * @returns {Promise.<void>}
     */
    async getScheduleList(params) {
      var _self = this;
      _self.loading = true;
      var data = {
        page: this.tabPage.currentPage,
        pageSize: this.tabPage.pageSize,
        org_name: this.formInline.org_name
      };
      if (params) {
        data = params;
      }
      this.$http.get('/business/atdSchedule/getschedulelist', { params: data })
        .then(function (res) {
          if (res.data && res.data.success) {
            var d = res.data.result
            d.rows.forEach(item => {
              item.work_time = item.work_time.substring(0, 5);
              item.off_work_time = item.off_work_time.substring(0, 5)
            });
            _self.atdScheduleTableData = d.rows;
            _self.tabPage.totalNum = d.count;
            _self.loading = false;
          }
        }).catch(function (error) {
          _self.loading = false;
          console.log(error)
        });
    },

  },
  components: {
    ElButton, ElFormItem, paging
  },
  created() {
    console.log('created')
    this.getScheduleList();
  },
  mounted() {
    console.log('mounted')
  },
  updated() {
    console.log('updated')
  },
  computed: {
    hours: function () {
      var _self = this;
      console.log(_self.form.atdSchedule_off_work_time, '12312312')
      if (this.form.atdSchedule_off_work_time !== '' && this.form.atdSchedule_work_time !== '' && this.form.atdSchedule_off_work_time !== undefined && this.form.atdSchedule_work_time !== undefined) {
        var scor = (new Date(moment('2017-01-01 ' + _self.form.atdSchedule_off_work_time + ':00').format('YYYY-MM-DD HH:mm:ss'))).getTime() - (new Date(moment('2017-01-01 ' + _self.form.atdSchedule_work_time + ':00').format('YYYY-MM-DD HH:mm:ss'))).getTime()
        console.warn(scor)
        if (scor < 0) {
          this.is_crossday = 1
        } else {
          this.is_crossday = 0
        }
        var relDate = (new Date(moment('2017-01-21 ' + _self.form.atdSchedule_off_work_time + ':00').format('YYYY-MM-DD HH:mm:ss'))).getTime() - (new Date(moment('2017-01-01 ' + _self.form.atdSchedule_work_time + ':00').format('YYYY-MM-DD HH:mm:ss'))).getTime()
        var leave1 = relDate % (24 * 3600 * 1000);
        var hours = Math.floor(leave1 / (3600 * 1000));
        var leateave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leateave2 / (60 * 1000))
        return hours + '小时' + minutes + '分钟'
      } else {
        return 0
      }

    },

  }
}
</script>

<!-- 添加 "scoped " css作用域只作用于本文件，不作用全局-->
<style scoped>

</style>
