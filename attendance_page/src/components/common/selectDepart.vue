<template>
  <div class="selectDepart">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false">
      <el-row :gutter="20">
        <el-col :span="12">
          <p class="departTitle">选择部门与人员</p>
          <div class="surround" v-loading="loading">
            <el-input
              placeholder="搜索"
              icon="search"
              v-model="searchInfo"
              @click="search"
              @keyup.enter.native="search"
            ></el-input>
            <div style="font-size: 13px;color: #48576a; padding: 10px">
            <span class="optionsList" v-for="(item,index) in breadOptions" @click="checkparent(item)" :key="item.id">
              {{item.name}}
              <span style="color: #bfcbd9" v-if="index<(breadOptions.length-1)">></span>
            </span>
            </div>
            <div style="padding: 10px">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
             <span>
               全选
             </span>
              </el-checkbox>
              <div style="margin: 15px 0;"></div>
              <div v-if="parentList.length<1" style="color:#97a8be;font-size: 14px;text-align: center">
                <span>没有相关数据，请返回上一级</span>
              </div>
              <el-checkbox-group v-model="CheckedLists" @change="handleCheckedListsChange" size="small">
                <div style="display: block;" v-for="item in parentList" :key="item.id">
                  <el-checkbox :label="item" :id="item.id" :key="item.id"
                               :disabled='(type=="adAttendanceClerk"&&item.type=="depart")?true:false'
                               style="margin: 5px 0">
                    <span :style="styleObject"
                          v-show="item.show==false">{{item.name.substring(0, 1)}}</span><span>{{item.name}}</span>
                  </el-checkbox>
                  <span style="float: right;" :class="[checkColor,item.disabled?uncheckbox:'']" v-show="item.show"
                        @click="nextDpeart(item)">
                <icon name="folder-open-o"></icon>
                <el-button type="text" size="small" :disabled="item.disabled"> 下级</el-button>
              </span>
                </div>
              </el-checkbox-group>
            </div>

          </div>

        </el-col>
        <el-col :span="12">
          <p class="departTitle">已选部门与人员</p>

          <div class="surround">
            <ul v-for="(item,index) in CheckedLists" :key="index" class="checklist">
              <li>
                <span :style="styleObject"
                      v-show="item.show==false">{{item.name.substring(0, 1)}}</span><span>{{item.name}}</span>
                <span style="float: right">
                <el-button size="mini" type="danger" @click="deleteList(index)">删除</el-button>
              </span>

              </li>
            </ul>
          </div>

        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog(0)">取 消</el-button>
    <el-button type="primary" @click="closeDialog(1)">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";

  export default {
    data() {
      return {
        checkColor: 'checkColor',     //未选中checkbox 时样式
        uncheckbox: 'uncheckbox',     //选中后checkbox 时样式
        loading: false,               //加载遮罩
        rightInfo: [],
        searchInfo: '',               //查询名称
        checkAll: true,                 //是否全选
        CheckedLists: this.data,            //选择数据集合
        parentList: {},               //列表数据源
        isIndeterminate: true,        //设置 indeterminate 状态，只负责样式控制
        breadOptions: [               // 头部导航列表
          {
            id: '1',
            name: '通讯录'     //默认出事查询根
          }
        ],
        parentID: '',
        styleObject: {
          background: 'rgba(21, 144, 234, 0.73)',
          padding: '5px',
          'border-radius': '15px',
          color: '#fff',
          margin: '0 5px 0 0'
        }
      }
    },
    methods: {
      /**
       * 关闭dialog
       * @value 关闭状态 0 取消 1 确定
       */
      closeDialog(value){
        if (value == 0) {
          console.log(this.data)
          if (this.data.length == 0) {
            this.CheckedLists = [];
          } else {
            console.log('dasdas')
            this.CheckedLists = this.data;
          }

        }
        var obj = Object.assign([], this.CheckedLists)
        this.$emit('close', {
          dialog: value,
          dialogVisible: false,
          CheckedLists: obj,
          type: this.type
        });
        var params = {
          org_type: 1
        }
        this.getPlOrgName(params);
      },
      /**
       * 删除右侧选择数据
       *  @param index  当前节点数据下标
       */
      deleteList(index){
        var _self = this;
        console.log(index, _self.CheckedLists)
//        _self.CheckedLists.baoremove(index)
        for (var x = 0; x < _self.parentList.length; x++) {
          if (_self.parentList[x].id == _self.CheckedLists[index].id) {
            _self.parentList[x].disabled = false;
          }
        }
        _self.CheckedLists.splice(index, 1);

        console.log('_self.CheckedLists', _self.CheckedLists)
//        _self.CheckedLists=_self.CheckedLists.remove(index)
//        console.log(_self.CheckedLists.baoremove(index))
      },
      /**
       * 生成随机颜色
       */
      getRandomColor(){
        return 'red'
//        return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6);
      },
      /**
       * 通过用户名查询组织机构
       * @param item  当前节点数据
       */
      search(){
        var _self = this;
        if (this.searchInfo != undefined && this.searchInfo != '' && this.searchInfo != null) {
          _self.loading = true;
          this.$http.get('/business/plOrg/getplorgbytype', {
            params: {
              org_name: this.searchInfo
            }
          }).then(function (res) {
              if (res.data && res.data.success) {
                var data = res.data.result;
                data.forEach(item => item.show = true);
                data.forEach(item => item.disabled = false);
                data.forEach(item => item.type = 'depart');

                _self.parentList = data
                _self.loading = false;
                _self.parentListAndCheckList();
                _self.getPoliceByName();
              } else {
                _self.loading = false;
                _self.$message({
                  message: '查询失败',
                  type: 'warning'
                });
              }
            }
          ).catch(function (err) {
            console.log(err);
            _self.loading = false;

          })
        }

      },
      /**
       * 通过用户名查询警员信息
       * @param item  当前节点数据
       */
      getPoliceByName(){
        var _self = this;
        var params = {
          police_name: this.searchInfo
        }
        if (this.searchInfo != undefined && this.searchInfo != '' && this.searchInfo != null) {
          _self.loading = true;
          this.$http.get('/business/PoliceManage/findpolicedata', {
            params: params
          }).then(function (res) {
              if (res.data && res.data.flag) {
                if (res.data.flag) {
                  var data = res.data.data || [];
                  data.forEach(item => item.show = false);
                  data.forEach(item => item.disabled = false);
                  data.forEach(item => item.type = 'police');
                  _self.parentList = _self.parentList.concat(data);
                  _self.parentListAndCheckList();
                  _self.loading = false;
                } else {
                  _self.loading = false;
                  _self.$message({
                    message: res.data.msg,
                    type: 'warning'
                  });
                }

              } else {
                _self.loading = false;
                _self.$message({
                  message: '查询错误',
                  type: 'warning'
                });
              }
            }
          ).catch(function (err) {
              console.log(err);
              _self.loading = false;
            }
          )
        }

      },

      /**
       * 获取警员信息
       * @param item  当前节点数据
       */
      getPoliceInfo(item){
        var _self = this;
        var params = {
          id: item.id
        }
        _self.loading = true;
        this.$http.get('/business/PoliceManage/findpolicedata', {
          params: params
        }).then(function (res) {
            if (res.data && res.data.flag) {
              var data = res.data.data || [];

              data.forEach(item => item.show = false);
              data.forEach(item => item.disabled = false);
              data.forEach(item => item.type = 'police');
              _self.parentList = _self.parentList.concat(data);
              _self.parentListAndCheckList();
              _self.loading = false;
            } else {
              _self.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }
          }
        ).catch(function (err) {
            console.log(err);
            _self.loading = false;
          }
        )
      },

      /**
       * 选择父节点
       * @param item  当前节点数据
       */
      checkparent(item){
        var params = {
          parentid: item.id
        }
        this.nextDpeart(item);
      },
      /**
       * 获取子节点数据
       * @param item  当前节点数据
       */
      nextDpeart(item){
        var _self = this;
        var typeparms = {
          parentid: item.id
        }

        _self.getPlOrgName(typeparms, item);


      },

      /**
       * 全选操作
       * @param event 数据集
       */
      handleCheckAllChange(event)
      {
//        console.log(event)
        var _self = this;
        var count = [];
        var nameList = [];

        this.parentList.forEach(item => count.push(item));

//        this.parentList.forEach(item => nameList.push(item.name));
        this.CheckedLists = event.target.checked ? count : [];
        for (var x = 0; x < _self.parentList.length; x++) {
          if (event.target.checked) {
            _self.parentList[x].disabled = true;

          } else {
            _self.parentList[x].disabled = false;

          }

        }
        this.isIndeterminate = false;
      }
      ,
      /**
       * 单选操作
       * @param value
       */
      handleCheckedListsChange(value)
      {
        var _self = this;
        for (var x = 0; x < _self.parentList.length; x++) {
          _self.parentList[x].disabled = false;
          for (var y = 0; y < value.length; y++) {
            if (_self.parentList[x].id == value[y].id) {
              _self.parentList[x].disabled = true;
            }
          }
        }
        this.rightInfo = value
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.parentList.length;
        console.log('value',value)
        console.log('value',value.length)
        console.log('checkall', this.parentList.length)
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.parentList.length;
      }
      ,
      parentListAndCheckList(){
        var _self = this;
        for (var x in _self.parentList) {
          for (var y in _self.CheckedLists) {
            if (_self.parentList[x].id == _self.CheckedLists[y].id) {
              _self.parentList[x] = _self.CheckedLists[y]
            }
          }
        }
      },
      /**
       *获取组织机构信息
       * @param params  查询参数
       * @param type
       */
      getPlOrgName(params, parent)
      {
        var _self = this;
        _self.loading = true;
        _self.isIndeterminate = true;
        this.$http.get('/business/plOrg/getplorgbytype', {
          params: params
        }).then(function (res) {
            if (res.data && res.data.success) {

              var data = res.data.result;
              data.forEach(item => item.show = true);
              data.forEach(item => item.disabled = false);
              data.forEach(item => item.type = 'depart');
              _self.parentList = data;
              _self.parentListAndCheckList();
              if (parent) {
                var num = null;
//              console.log('parent',parent)
                for (var x = 0; x < _self.breadOptions.length; x++) {
                  if (_self.breadOptions[x].id == parent.id) {
//                    console.log('bread' + x + ':', _self.breadOptions[x].id, 'parent:', parent.id)
                    num = x
                  }
                }
                if (num != null) {
                  _self.breadOptions = _self.breadOptions.slice(0, num + 1)
                } else {
                  _self.breadOptions.push(parent)
                }
                _self.getPoliceInfo(parent)
              }
              _self.loading = false;

            } else {
              _self.$message({
                message: res.data.data,
                type: 'warning'
              });
              _self.loading = false;
            }
          }
        ).catch(function (err) {
          console.log(err);
          _self.loading = false;

        })
      }


    },
    components: {ElButton}
    ,
    created()
    {
      var params = {
        org_type: 1
      }
      this.getPlOrgName(params);
    }
    ,
    mounted()
    {

    }
    ,
    watch: {
      data(){
        console.log('watch Data')
        this.CheckedLists = Object.assign([], this.data);
        console.log('CheckedLists', this.CheckedLists)
        var params = {
          org_type: 1
        }
        this.getPlOrgName(params);
      }

    },
    updated()
    {
      console.log('udata:CheckedLists', this.CheckedLists)
      console.log('udata:parentList', this.parentList)
//      this.CheckedLists=Object.assign([],this.data);
    }
    ,
    props: ['dialogVisible', 'title', 'data', 'type']
  }
</script>

<!-- 添加 "scoped " css作用域只作用于本文件，不作用全局-->
<style>
  .selectDepart .el-dialog__body {
    padding: 10px 20px;
  }

  .surround {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    height: 350px;
    overflow: auto;
  }

  .departTitle {
    padding: 10px;
  }

  .checkColor {
    color: #0190fe;
  }

  .optionsList {
    cursor: pointer;
  }

  .optionsList:hover {
    color: #20a0ff;
  }

  .uncheckbox {
    color: #bfcbd9;
  }

  .checklist {
    padding: 5px;
    list-style: none;
  }
</style>
