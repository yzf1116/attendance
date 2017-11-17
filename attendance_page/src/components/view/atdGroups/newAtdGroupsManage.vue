<template>
  <div v-loading="allLoading">
    <el-form class="demo-form-inline" ref="formInline" label-position="right" label-width="100px"
             :rules="this.$validateRule" :model="formInline" @keyup.enter.native="onSearch('formInline')">
      <el-form-item label="考勤组名称:" prop="atd_name">
        <el-input v-model="formInline.atd_name" placeholder="请输入考勤组名称" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="参与考勤人员:">
        <div class="tagclass" @click="chooseDepartOrPlice">
          <el-tag style="margin: 0 3px" :type="item.type" v-for="(item,index) in attendanceClerk.defalut"
                  :key="item.id">
            {{item.name}}



          </el-tag>
        </div>
      </el-form-item>
      <el-form-item label="无需考勤人员:" v-show="unshow">
        <div class="tagclass" @click="unDepartOrPlice">
          <el-tag style="margin: 0 3px" :type="item.type" v-for="(item,index) in unAttendanceClerk.defalut"
                  :key="item.id">
            {{item.name}}



          </el-tag>
        </div>
      </el-form-item>
      <el-form-item label="考勤组负责人:">
        <div class="tagclass" @click="adDepartOrPlice">
          <el-tag style="margin: 0 3px" :type="item.type" v-for="(item,index) in adAttendanceClerk.defalut"
                  :key="item.id">
            {{item.name}}



          </el-tag>
        </div>
        <p class="infoColor">协助管理员分管本考勤组的排班及统计</p>
      </el-form-item>
      <el-form-item label="考勤类型:">
        <el-radio-group v-model="formInline.atdTypeRadio" class="radopclass">
          <el-radio class="radio" :label="1">固定班制 (设置每天考勤时间)</el-radio>
          <el-radio class="radio" :label="2">排班制 (自定义设置考勤时间)</el-radio>
          <el-radio class="radio" :label="3">自由工时（不设置班次，随时打卡）</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="工作日设置:" v-show="formInline.atdTypeRadio==1">
        <span>快捷设置班次</span>
        <el-tag type="success">{{shiftsData.name ? shiftsData.name : '休息'}}</el-tag>
        <span>(选择某一班次)</span>
        <el-button type="text" @click="shiftsChoose">更改班次</el-button>
        <el-table :data="tableData" style="width: 40%">
          <el-table-column :formatter="planWork" label="工作日" width="100">
          </el-table-column>
          <el-table-column :formatter="planTime" label="班次时间段">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="text" @click="clickTableChSchedule(scope.$index, scope.row)">更改班次</el-button>
              <el-button type="mycolor" size="mini" @click="setRest(scope.$index,scope.row)">休息</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!--暂时隐藏-->
      <el-form-item label="特殊日期(固定排班):" v-show="formInline.atdTypeRadio=='011'">
        <div>
          <el-button> 添加</el-button>
          <span class="infoColor">必须打卡的日期</span>
          <el-table :data="needTableData" style="width: 60%">
            <el-table-column prop="date" label="日期" width="120">
            </el-table-column>
            <el-table-column prop="time" label="考勤时间" width="300">
            </el-table-column>
            <el-table-column prop="address" label="操作">
              <template scope="scope">
                <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)">编辑



                </el-button>
                <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)">删除



                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-button> 添加</el-button>
          <span class="infoColor">不用打卡的日期</span>
          <el-table :data="noTableData" style="width: 60%">
            <el-table-column prop="date" label="日期" width="120">
            </el-table-column>
            <el-table-column prop="time" label="考勤时间" width="300">
            </el-table-column>
            <el-table-column prop="address" label="操作">
              <template scope="scope">
                <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)">编辑



                </el-button>
                <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)">删除



                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-form-item>
      <el-form-item label="考勤班次(排班制):" v-show="formInline.atdTypeRadio==2">
        <div class="tagclass" @click="atdShiftClick">
          <el-tag type="primary" v-for="(item,index) in atdShiftsRef" :key="item.id">{{item.name}}</el-tag>
        </div>
      </el-form-item>
      <el-form-item label="考勤方式:">
        <span>根据办公地点考勤（可添加多个考勤地点）</span>
        <span>有效范围</span>
        <el-select v-model="formInline.range" placeholder="请选择" size="small" style="width: 100px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-table :data="atdWayTableData" style="width: 40%">
          <el-table-column label="考勤地址">
            <template scope="scope">
              <p style="font-weight: 600">{{scope.row.location}}</p>
              <p>{{scope.row.address}}</p>
            </template>
          </el-table-column>
          <el-table-column width="100" label="操作">
            <template scope="scope">
              <el-button size="small" type="text" @click="addressHandleEdit(scope.$index, scope.row)">删除



              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-button type="text" @click="addAddressClick">添加考勤地点</el-button>
          （查询地点的经纬度请使用百度地图查看）



        </div>
      </el-form-item>
      <el-form-item label="是否允许外勤">
        <el-switch v-model="formInline.is_field" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="允许迟到分钟数">
        <el-input-number size="small" style="width: 150px;" v-model="formInline.late_minutes"  :min="0" :max="200"></el-input-number>
        <p class="infoColor">最大允许迟到分钟数为200分钟，超过此时间范围系统判定为缺卡,否则系统判定为迟到</p>
      </el-form-item>
      <el-form-item label="提前打卡小时数">
        <el-input-number size="small" style="width: 150px;" v-model="formInline.forth_hours"  :min="0" :max="24"></el-input-number>
        <p class="infoColor">最大允许提前打卡小时数为24小时</p>
      </el-form-item>
      <div style="width:60%;text-align: center  ">
        <el-button type="info" @click="saveAttendInfo">保存设置</el-button>
      </div>
    </el-form>

    <!--Dialog弹窗-->
    <div>
      <!--参与考勤人员-->
      <el-dialog title="参与考勤人员" :visible.sync="dialogVisible" class="groupclass" :close-on-click-modal="false">
        <Police :dialog-visible="dialogVisible" type="attendanceClerk" :data="propData" ref="attendanceClerk"
                @close="dialogClose"></Police>
      </el-dialog>

      <!--不参与考勤人员-->
      <el-dialog title="参与考勤人员" :visible.sync="unDialogVisible" class="groupclass" :close-on-click-modal="false">
        <Police :dialog-visible="unDialogVisible" type="unAttendanceClerk" :data="unPropData" ref="unAttendanceClerk"
                title="不参与考勤人员选择" @close="dialogClose"></Police>
      </el-dialog>
      <!--管理考勤负责人-->
      <el-dialog title="考勤组负责人选择" :visible.sync="adDialogVisible" class="groupclass" :close-on-click-modal="false">
        <Police :dialog-visible="adDialogVisible" type="adAttendanceClerk" :data="adPropData" ref="adAttendanceClerk"
                title="考勤组负责人选择" :fifter="true" @close="dialogClose"></Police>
      </el-dialog>

      <!--考勤班次单选-->
      <el-dialog title="班次选择" :visible.sync="shiftsDialogVisible" :close-on-click-modal="false" class="shiftsTable"
                 size="tiny">
        <el-table v-loading="shiftsLoading" :data="shiftsTableData" ref="shiftsTableData" highlight-current-row
                  @current-change="CurrentChange" :height="300" style="width: 100%;">
          <el-table-column width="55">
            <template scope="scope">
              <el-radio v-model="radio" :label="scope.row.id">
                <span></span>
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column label="考勤地址" prop="name">

          </el-table-column>
          <el-table-column :formatter="dateFormatter" label="考勤时间">

          </el-table-column>
        </el-table>
        <span>当前选中班组：</span>
        <strong v-show="shiftsDialogData.name"
                style="color: #1d90e6">{{shiftsDialogData.name}}—{{dateFormatter(shiftsDialogData)}}</strong>
        <paging @emitsizechange="handleSizeChange" @emitcurrentchange="handleCurrentChange"
                :currentPage="tabPage.currentPage" :pageSizes="tabPage.pageSizes" :pageSize="tabPage.pageSize"
                :total="tabPage.totalNum">
        </paging>
        <span slot="footer" class="dialog-footer">
          <el-button @click="shiftsDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="shiftsDialogClose">确 定</el-button>
        </span>
      </el-dialog>
      <!--排班制考勤班次多选-->
      <el-dialog title="班次选择" :visible.sync="atdShiftDialogVisible" :close-on-click-modal="false" size="tiny">
        <el-table v-loading="atdShiftsLoading" :data="atdShiftDialogTable" ref="atdShiftDialogTable"
                  highlight-current-row @selection-change="atdHandleSelectionChange" :height="300" style="width: 100%;">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="考勤地址" prop="name">
          </el-table-column>
          <el-table-column :formatter="dateFormatter" label="考勤时间">
          </el-table-column>
        </el-table>

        <paging @emitsizechange="atdHandleSizeChange" @emitcurrentchange="atdHandleCurrentChange"
                :currentPage="atdTabPage.currentPage" :pageSizes="atdTabPage.pageSizes" :pageSize="atdTabPage.pageSize"
                :total="atdTabPage.totalNum">
        </paging>
        <span slot="footer" class="dialog-footer">
          <el-button @click="atdShiftDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="atdShiftsDialogClose">确 定</el-button>
        </span>
      </el-dialog>

      <!--考勤地址选择-->
      <el-dialog title="地址选择" :visible.sync="addressDialogVisible" class="addressDialog" :close-on-click-modal="false"
                 top="5%"
                 size="large">
        <my-map ref="addressDialog"></my-map>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addressDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addressDialogClose">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import Police from 'common/TreeChoose.vue'
  import paging from '../../common/Paging.vue'
  import moment from 'moment'
  import myMap from 'common/baiduMap.vue'
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
  import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item";
  export default {
    data() {
      return {
        scheduleType: '',      //考勤类型原数据
        isChTableIndex: '',    //是否是在班制时间表中选择的Index
        allLoading: false,
        addressDialogVisible: false,      //考勤地址Dialog
        scheduleData: [],
        prototypeData: {
          isEdit: false
        },
        pageInfo: {},
        unshow: false,
        atdShiftsRef: [],        //排班制固定时间
        atdShiftsDialogRef: [],
        atdShiftsLoading: false,       //固定班制加载
        atdShiftDialogTable: [],
        atdShiftDialogVisible: false,    //固定班制dialog
        radio: '',             //班组单选按钮(显示效果，无实际交互)
        shiftsData: {},             //固定班制班次选择
        shiftsDialogData: {},    //班组Dialog选择后数据
        atdTabPage: {
          currentPage: 1,
          pageSize: 10,
          pageSizes: [10, 20, 30, 50]
        },//分页信息
        tabPage: {
          currentPage: 1,
          pageSize: 10,
          pageSizes: [10, 20, 30, 50]
        },//分页信息
        shiftsLoading: false,      //考勤班次表格加载
        shiftsTableData: [],
        shiftsDialogVisible: false,    //考勤班次单选

        adDialogVisible: false,
        adAttendanceClerk: {
          defalut: [],
          policeList: [],
        },   //管理考勤负责人
        unDialogVisible: false,
        unAttendanceClerk: {
          defalut: [],
          policeList: [],
        },   //不参与考勤人员数据
        type: '',         //dialog类型
        propData: {},   //父组件传递子组件中间数据
        unPropData: {},
        adPropData: {},
        attendanceClerk: {
          defalut: [],
          policeList: [],
        },      //参与考勤人员数据
        title: '',       //dialog标题
        dialogVisible: false,        //dialo是否显示
        tableData: [{
          week_calendar: 'week1',
          atd_groupid: '',
          atd_scheid: '',
          is_rest: '',
          time: '',

        },
          {
            week_calendar: 'week2',
            atd_groupid: '',
            atd_scheid: '',
            is_rest: '',
            time: '',

          },
          {
            week_calendar: 'week3',
            atd_groupid: '',
            atd_scheid: '',
            is_rest: '',
            time: '',

          },
          {
            week_calendar: 'week4',
            atd_groupid: '',
            atd_scheid: '',
            is_rest: '',
            time: '',

          },
          {
            week_calendar: 'week5',
            atd_groupid: '',
            atd_scheid: '',
            is_rest: '',
            time: '',

          },
          {
            week_calendar: 'week6',
            atd_groupid: '',
            atd_scheid: '',
            is_rest: '',
            time: '',

          },
          {
            week_calendar: 'week7',
            atd_groupid: '',
            atd_scheid: '',
            is_rest: '',
            time: '',
          }],
        needTableData: [{
          date: '2016-12-23',
          time: '班次白班A：07:40-17:00'
        }, {
          date: '2016-12-22',
          time: '班次白班A：07:40-17:00'
        }],
        noTableData: [
          {
            date: '2016-12-23',
            time: '休息'
          }, {
            date: '2016-12-22',
            time: '休息'
          }
        ],
        options: [{
          value: '100',
          label: '100米'
        }, {
          value: '200',
          label: '200米'
        }, {
          value: '300',
          label: '300米'
        }, {
          value: '400',
          label: '400米'
        }, {
          value: '500',
          label: '500米'
        }],
        atdWayTableData: [],
        value: '',
        formInline: {
          atd_name: '',
          atdTypeRadio: 1,      //考勤类型
          range: '100',
          is_field: '0',
          late_minutes:0,
          forth_hours:3
        }
      }
    },
    methods: {
        /**
         *@param row  考勤班次 Table 当前行
         *@param index 考勤班次 Table 下标
         */
      setRest(index, row) {
        for (let item = 0; item < this.tableData.length; item++) {
          if (item == index) {
            this.tableData[item].atd_scheid = '';
            this.tableData[item].is_rest = 1;
            this.tableData[item].time = '';
          }
        }

      },
      /**
       *Table选择班次时间
       *@param index 当前选中下标
       *@param row 当前行数据
       */
      clickTableChSchedule(index, row) {
        this.isChTableIndex = index;
        this.shiftsDialogVisible = true;
        this.getScheduleList();

      },

      /**
       * 考勤班次 格式化工作日
       *@param row 当前行
       *@param column   当前列
       */
      planWork(row, column) {
        let work = '';
        switch (row.week_calendar) {
          case 'week1':
            work = '周一';
            break;
          case 'week2':
            work = '周二';
            break;
          case 'week3':
            work = '周三';
            break;
          case 'week4':
            work = '周四';
            break;
          case 'week5':
            work = '周五';
            break;
          case 'week6':
            work = '周六';
            break;
          case 'week7':
            work = '周日';
            break;
        }
        return work;
      },
      /**
       * 格式化固定班制Table时间显示
       *@param {Object} row
       *@param {Object} column
       */

      planTime(row, column) {
        if (row.time == '') {
          return '休息'
        } else {
          return row.time
        }
      }
      ,

      /********************考勤地址Start************************/
      /**
       * 删除地址信息
       */
      addressHandleEdit(index, row) {
        this.atdWayTableData.splice(index, 1)
      }
      ,

      /**
       * 格式化
       */
      dedupe(array) {
        return Array.from(new Set(array));
      }
      ,
      /**
       *地址选择Dialog 确定事件
       */
      addressDialogClose() {
        console.log(this.$refs.addressDialog.AddresInfo)
        const addlist = Object.assign({}, this.$refs.addressDialog.AddresInfo)
        if (addlist.location !== "" && addlist.address !== "" && addlist.x_point !== "" && addlist.y_point !== "") {
          let isadd = true;
          for (const item of this.atdWayTableData) {
            if (item.x_point == addlist.x_point && item.y_point == addlist.y_point) {
              isadd = false;
            }
          }
          if (isadd) {
            this.atdWayTableData.push({
              location: addlist.location,
              address: addlist.address,
              x_point: addlist.x_point,
              y_point: addlist.y_point
            })
          }

        }
        console.log('yuabas', this.atdWayTableData);
        console.log('asa', this.dedupe(this.atdWayTableData));
        this.addressDialogVisible = false;
      }
      ,
      /**
       * 添加考勤地址Click
       */
      addAddressClick() {
          console.log(this)
//        this.$refs.addressDialog.clearResults;
        this.addressDialogVisible = true;
      }
      ,
      /********************考勤地址End************************/


      /**
       *保存考勤组信息
       */
      saveAttendInfo() {
        console.log(this.formInline)
        var _self = this;
        var parms = {};
        parms = _self.formInline;
        parms.type = parms.atdTypeRadio;

        this.$refs['formInline'].validate((valid) => {
          if (valid) {

            if (_self.prototypeData.isEdit) {//编辑
              parms.id = _self.$route.query.id
              console.log('_self.prototypeData', _self.prototypeData)

              //          console.log('yuan', _self.prototypeData);
              //          console.log('shiftsData', _self.shiftsData)
              //          console.log('adAttendanceClerk', _self.adAttendanceClerk)
              //          console.log('atdShiftsRef', _self.atdShiftsRef)
              //          console.log('attendanceClerk', _self.attendanceClerk)
              console.log('1', _self.prototypeData.attendanceClerk)
              console.log('2', _self.attendanceClerk)
              //考勤人员
              var oldPerson = _self.prototypeData.attendanceClerk.policeList
              var newPerson = _self.attendanceClerk.policeList;
              var ar = oldPerson.filter(function (n) {
                return newPerson.indexOf(n) != -1
              });
              var addPersonList = newPerson.filter(function (n) {
                return ar.indexOf(n) === -1
              });
              var delPersonList = oldPerson.filter(function (n) {
                return ar.indexOf(n) === -1
              });
              console.log('ar', ar)
              console.log('addPersonList', addPersonList)
              console.log('delPersonList', delPersonList)
              parms.addPersonList = addPersonList;
              parms.delPersonList = delPersonList;

              //考勤负责人
              var oldManagerPerson = _self.prototypeData.adAttendanceClerk.policeList;
              var newManagerPerson = _self.adAttendanceClerk.policeList;
              var Managerar = oldManagerPerson.filter(function (n) {
                return newManagerPerson.indexOf(n) != -1
              });
              var addManagerPersonList = newManagerPerson.filter(function (n) {
                return Managerar.indexOf(n) === -1
              });
              var delManagerPersonList = oldManagerPerson.filter(function (n) {
                return Managerar.indexOf(n) === -1
              });

              console.log('Managerar', Managerar)
              console.log('addManagerPersonList', addManagerPersonList)
              console.log('delManagerPersonList', delManagerPersonList)
              parms.addManagerPersonList = _self.adAttendanceClerk.policeList;
              parms.delManagerPersonList = _self.prototypeData.adAttendanceClerk.policeList;


              //班次管理
              if (_self.prototypeData.scheduleType == _self.formInline.atdTypeRadio) {
                parms.scheduleTypeChange = false;
              } else {
                parms.scheduleTypeChange = true;
              }
              switch (parms.type) {
                case 1:
                  parms.scheduleList = _self.tableData;
                  break;
                case 2:
                  parms.scheduleList = _self.atdShiftsRef;
                  break;


              }
//            var oldschedule = [];
//            var newschedule = [];
//            oldschedule = _self.prototypeData.scheduleData
//            console.log('oldschedule', typeof _self.prototypeData.scheduleData)
//            switch (parms.type) {
//              case 1:
//                //                  oldschedule = _self.prototypeData.shiftsData;
//                newschedule = [_self.shiftsData];
//                break;
//              case 2:
//                //                  oldschedule = _self.prototypeData.atdShiftsRef;
//                newschedule = _self.atdShiftsRef;
//                break;
//            }
//            var shiftar = oldschedule.filter(function (n) {
//              return newschedule.indexOf(n) != -1
//            });
//            var addscheduleList = newschedule.filter(function (n) {
//              return shiftar.indexOf(n) === -1
//            });
//            var delscheduleList = oldschedule.filter(function (n) {
//              return shiftar.indexOf(n) === -1
//            });
//            console.log('shiftar', shiftar);
//            console.log('addscheduleList', addscheduleList)
//            console.log('delscheduleList', delscheduleList)
//            var addList = [];
//            for (var item of addscheduleList) {
//              addList.push(item.id)
//            }
//            parms.addscheduleList = addList;
//            parms.delscheduleList = delscheduleList;

              //地址
              var oldAddress = _self.prototypeData.atdWayTableData;
              var newAddress = _self.atdWayTableData;
              var address = oldAddress.filter(function (n) {
                return newAddress.indexOf(n) != -1
              });
              var addAddressList = newAddress.filter(function (n) {
                return address.indexOf(n) === -1
              });
              var delAddressList = oldAddress.filter(function (n) {
                return address.indexOf(n) === -1
              });

              console.log('oldAddress', oldAddress)
              console.log('addAddressList', addAddressList)
              console.log('delAddressList', delAddressList)

              parms.addAddressList = addAddressList;
              parms.delAddressList = delAddressList;

              console.log('parms', parms)

            } else {   //新增

              parms.scheduleData = [];
              switch (parms.type) {
                case 1:
                  // parms.scheduleData.push(_self.shiftsData.id);
                  parms.scheduleData = _self.tableData;
                  break;
                case 2:
                  for (var item of _self.atdShiftsRef) {
                    parms.scheduleData.push(item.id)
                  }
                  break;
              }
              parms.atdWayTableData = _self.atdWayTableData;   //考勤地址
              parms.attendanceClerk = _self.attendanceClerk.policeList; //参与考勤人员
              parms.adAttendanceClerk = _self.adAttendanceClerk.policeList;
            }
            _self.allLoading = true;
            _self.$http.post('/business/attendanceGroup/savegroupinfo', parms)
              .then(function (res) {
                console.log(res)
                if (res.data && res.data.success) {
                  _self.allLoading = false;
                  _self.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  _self.$router.push('atdGroups')
                  //              _self.getScheduleList();
                } else {
                  _self.allLoading = false;
                  _self.$message({
                    message: res.data.msg,
                    type: 'warning'
                  });
                }
              })
              .catch(function (error) {
                _self.allLoading = false;
                console.log(error);
              });


          }
          {
            return false;
          }
        });
      }
      ,
      test() {
        var _self = this;
        console.table(_self.atdShiftDialogTable)
        console.table(_self.atdShiftsRef)
        _self.$refs.atdShiftDialogTable.toggleRowSelection(_self.atdShiftsDialogRef[1])

        //          _self.atdShiftsRef.forEach(row => {
        //            _self.$refs.atdShiftDialogTable.toggleRowSelection(_self.atdShiftsRef[1])
        //          });
      }
      ,


      /**
       * 排班制多选
       */
      atdHandleSelectionChange(val) {
        this.atdShiftsDialogRef = val;
      }
      ,
      /**
       * 获取班组list
       */
      getAtdScheduleList() {
        var _self = this;
        _self.shiftsLoading = true;
        var data = {
          page: this.atdTabPage.currentPage,
          pageSize: this.atdTabPage.pageSize,
        };

        this.$http.get('/business/atdSchedule/getschedulelist', {params: data})
          .then(function (res) {
            if (res.data && res.data.success) {
              var d = res.data.result;
              _self.atdShiftDialogTable = d.rows;
              _self.atdTabPage.totalNum = d.count;
              _self.atdShiftsLoading = false;

            } else {
              _self.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }
          }).catch(function (error) {
          _self.atdShiftsLoading = false;
          console.log(error)
        });
      }
      ,
      /**
       * 排班制考勤班次Dialog关闭事件
       */
      atdShiftsDialogClose() {
        this.atdShiftDialogVisible = false;
        this.atdShiftsRef = Object.assign([], this.atdShiftsDialogRef);
        console.log('atdShiftsRef', this.atdShiftsRef)
      }
      ,
      /**
       * 排班制考勤班次点击选择事件
       */
      atdShiftClick() {
        this.atdShiftDialogVisible = true;
        this.getAtdScheduleList();


      }
      ,

      /**
       * 固定排班弹窗关闭时间
       */
      shiftsDialogClose() {
        this.shiftsDialogVisible = false;
        this.shiftsData = Object.assign({}, this.shiftsDialogData);
        console.log('data', this.shiftsData)
        console.log('22', this.tableData)
        console.log(this.isChTableIndex)
        if (this.shiftsData.id) {
          if (this.isChTableIndex === "") {
            for (var i = 0; i < this.tableData.length; i++) {
              if (i < this.tableData.length - 2) {
                this.tableData[i].time = this.dateFormatter(this.shiftsData);
                this.tableData[i].atd_scheid = this.shiftsData.id;
                this.tableData[i].is_rest = 0;
              } else {
                this.tableData[i].is_rest = 1;
              }
            }
          } else {
            for (var i = 0; i < this.tableData.length; i++) {
              if (i === this.isChTableIndex) {
                console.log('11111112')
                this.tableData[i].time = this.dateFormatter(this.shiftsData);
                this.tableData[i].atd_scheid = this.shiftsData.id;
                this.tableData[i].is_rest = 0;
              }
            }
          }
        }


        console.table(this.tableData)

      }
      ,
      /**
       *班组单选事件
       */
      CurrentChange(currentRow, oldCurrentRow, index) {
        if (currentRow) {     //处理弹窗下次加载后会直执行currentchange方法， currentrow为underfide
          this.radio = currentRow.id
          this.shiftsDialogData = currentRow
        }

        //        console.log(this.shiftsDialogData)

      }
      ,
      /**
       * 切换每页条数
       * @params {Number} val 每页条数
       */
      handleSizeChange(val) {
        this.tabPage.pageSize = val;
        this.getScheduleList();
      }
      ,
      /**
       * 切换页码
       * @params {Number} val 页码
       */
      handleCurrentChange(val) {
        this.tabPage.currentPage = val;
        this.getScheduleList();
      }
      ,

      /**
       * 排班切换每页条数
       * @params {Number} val 每页条数
       */
      atdHandleSizeChange(val) {
        this.atdTabPage.pageSize = val;
        this.getAtdScheduleList();
      }
      ,
      /**
       * 排班切换页码
       * @params {Number} val 页码
       */
      atdHandleCurrentChange(val) {
        this.atdTabPage.currentPage = val;
        this.getAtdScheduleList();
      }
      ,

      /**
       * 格式化时间
       * @row [Object] 但前行数据
       * @column [Object] 当前列
       */
      dateFormatter(row, column) {
        if(row.work_time&&row.off_work_time){
          return row.work_time.substring(0,5)+'-'+row.off_work_time.substring(0,5);
        }else return''
      }
      ,
      /**
       *获取班次信息
       *
       */
      getScheduleList() {
        var _self = this;
        _self.shiftsLoading = true;
        var data = {
          page: this.tabPage.currentPage,
          pageSize: this.tabPage.pageSize,
        };

        this.$http.get('/business/atdSchedule/getschedulelist', {params: data})
          .then(function (res) {
            if (res.data && res.data.success) {
              var d = res.data.result;
              _self.shiftsTableData = d.rows;
              _self.tabPage.totalNum = d.count;
              _self.shiftsLoading = false;
            } else {
              _self.$message({
                message: res.data.data,
                type: 'warning'
              });
            }
          }).catch(function (error) {
          _self.shiftsLoading = false;
          console.log(error)
        });
      }
      ,

      /**
       * 选择班次（单选）
       */
      shiftsChoose() {
        this.shiftsDialogVisible = true;
        this.isChTableIndex = "";
        this.getScheduleList();
      }
      ,
      /**
       *管理考勤负责人选择
       */
      adDepartOrPlice() {
        this.adDialogVisible = true;

        this.adPropData = this.adAttendanceClerk;

        console.log(this.adAttendanceClerk)
      }
      ,

      /**
       *不参与考勤人员选择
       */
      unDepartOrPlice() {
        this.unDialogVisible = true;
        this.unPropData = this.unAttendanceClerk;
      }
      ,
      /**
       * 组织及人员选择dialog关闭
       * @msg [Object] 子组件传递数据
       */
      dialogClose(msg) {
        console.log('msg', msg)
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

      }
      ,

      /**
       * 参与考勤人员选择
       */
      chooseDepartOrPlice() {
        this.dialogVisible = true;
        this.propData = this.attendanceClerk;
        //        this.$refs.adAttendanceClerk.$refs.treeChoose.setCheckedNodes(this.propData);
        console.log('propData', this.propData)
      }
      ,
      /**
       * 通过ID获取考勤组信息
       * @param {String} ID
       */
      getGroupInfo(ID) {
        var _self = this;
        this.$http.get('/business/attendancegroup/getgroupbyid', {params: {id: ID}})
          .then(function (res) {
            if (res.data && res.data.success) {
              var dataInfo = res.data.result[0];
              console.log(dataInfo)
              _self.formInline.atd_name = dataInfo.atd_name;
              _self.formInline.range = dataInfo.range;
              _self.formInline.atdTypeRadio = parseInt(dataInfo.type);
              _self.formInline.is_field = dataInfo.is_field.toString();
              _self.formInline.late_minutes=dataInfo.late_minutes;
              _self.formInline.forth_hours=dataInfo.forth_hours
              console.log(' _self.formInline.is_field', _self.formInline.is_field)
              _self.scheduleType = parseInt(dataInfo.type);
              //              _self.formInline.atdTypeRadio = 2;
              for (var item of dataInfo.pl_people) {
                if (item.responsible === 1) {
                  _self.adAttendanceClerk.policeList.push({
                    id: item.id,
                    name: item.police_name,
                    type: "police",
                    parentid: item.pl_orgid
                  })
                  _self.adAttendanceClerk.defalut.push({
                    id: item.id,
                    name: item.police_name,
                    type: "police",
                    parentid: item.pl_orgid
                  })
                }

                _self.attendanceClerk.policeList.push({
                  id: item.id,
                  name: item.police_name,
                  type: "police",
                  parentid: item.pl_orgid
                })
                _self.attendanceClerk.defalut.push({
                  id: item.id,
                  name: item.police_name,
                  type: "police",
                  parentid: item.pl_orgid
                })
              }


              _self.propData = _self.attendanceClerk;
              _self.adPropData = _self.adAttendanceClerk;
              //              _self.atdShiftsRef=dataInfo.atd_schedule_groups
              switch (parseInt(dataInfo.type)) {
                case 1:
                  _self.scheduleType = 1;
                  dataInfo.atd_schedule_plans.forEach(item => {
                    console.log(item)
                    if (item.atd_schedule) {
                      item.time = _self.dateFormatter(item.atd_schedule)
                    } else {
                      item.time = '';
                    }
                  })
                  _self.scheduleData = dataInfo.atd_schedule_plans
                  _self.tableData = dataInfo.atd_schedule_plans;
                  break;
                case 2:
                  _self.scheduleType = 2;
                  for (var item of dataInfo.atd_schedule_groups) {
                    _self.atdShiftsRef.push(item.atd_schedule);
                    _self.scheduleData.push(item.atd_schedule);
                  }
                  break;
              }

              _self.atdWayTableData = [];

              for (var item of dataInfo.atd_address_groups) {
                _self.atdWayTableData.push(item.atd_address)
              }
              //保存编辑模式下原数据
              _self.prototypeData.adAttendanceClerk = Object.assign([], _self.adAttendanceClerk)     //负责人
              _self.prototypeData.attendanceClerk = Object.assign([], _self.attendanceClerk)     //参与考勤人员
              _self.prototypeData.shiftsData = Object.assign([], _self.shiftsData)     //固定班次
              _self.prototypeData.atdShiftsRef = Object.assign([], _self.atdShiftsRef)     //排班次
              _self.prototypeData.scheduleData = Object.assign([], _self.scheduleData)   //班次
              _self.prototypeData.scheduleType = _self.scheduleType   //班次
              _self.prototypeData.atdWayTableData = Object.assign([], _self.atdWayTableData)     //排班次
            } else {
              _self.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }
          }).catch(function (error) {
          _self.loading = false;
          console.log(error)
        });
      }
    },
    components: {
      ElFormItem, ElButton, myMap, Police, paging
    }
    ,
    created() {
      if (this.$route.query.id) {
        this.getGroupInfo(this.$route.query.id);
        this.prototypeData.isEdit = true;
      }
    }
    ,
    mounted() {
    }
    ,
    updated() {
    }
    ,
  }
</script>

<!-- 添加 "scoped " css作用域只作用于本文件，不作用全局-->
<style>
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
    min-height: 36px;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    padding: 0 5px;
    width: 50%;
    max-height: 100px;
    overflow: auto;
  }

  .radopclass .el-radio {
    display: block;
    padding: 10px;
    margin-left: 0px;
  }

  .infoColor {
    color: rgba(73, 88, 107, 0.65)
  }

  .el-button--mycolor {
    border: none;
    color: #d82732;
    background: 0 0;
    padding-left: 0;
    padding-right: 0;
  }

  /*.shiftsTable .el-table__body tr.current-row > td {*/

  /*background: rgba(80, 191, 255, 0.66)*/

  /*}*/

  .addressDialog .el-dialog__body {
    padding: 10px 20px;
  }
</style>
