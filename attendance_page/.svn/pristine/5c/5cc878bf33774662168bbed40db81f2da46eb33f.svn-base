<template>
  <div>
  
    <div class="tabPosition" v-loading="loading">
      <!--表单-->
      <!--查询-->
      <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline" @keyup.enter.native="onSearch('formInline')">
                                                          <el-form-item label="机构名称" prop="org_name">
                                                            <el-input size="mini" v-model="filterText" placeholder="机构名称"></el-input>
                                                          </el-form-item>
                                                          <el-form-item>
                                                            <el-button size="mini" type="primary" icon="search" @click="onSearch('formInline')">查询</el-button>
                                                            <el-button size="mini" type="info" @click="clearSearch">
                                                              <icon name="refresh" class="custom-icon"></icon>
                                                              重置
                                                    
                                                            </el-button>
                                                    
                                                          </el-form-item>
                                                          <el-form-item style="margin-left: 30px">
                                                            <el-button size="mini" type="success" icon="plus" @click="handleAdd">新增</el-button>
                                                            <el-button size="mini" type="danger" icon="delete" @click="handleDelete">删除</el-button>
                                                          </el-form-item>
                                                        </el-form> -->
  
      <el-row :gutter="20">
        <el-col :span="6">
          <div style="height: 40px;">
            <el-button style="margin-top:15px;" size="small" type="success" icon="plus" @click="handleAdd">新增</el-button>
            <el-button size="small" type="danger" icon="delete" @click="handleDelete">删除</el-button>
          </div>
          <div style="margin-top:15px">
            <el-input style="margin-bottom:10px;" size="small" v-model="filterText" placeholder="检索组织机构"></el-input>
          </div>
          <div class="ws-tree">
            <el-tree :data="orgTreeData" default-expand-all :expand-on-click-node="false" node-key="id" ref="orgTree" highlight-current :filter-node-method="filterNode" :props="defaultProps" @node-click="treeChoose">
            </el-tree>
          </div>
  
        </el-col>
        <el-col :span="18">
          <el-tabs v-model="activeName">
            <el-tab-pane label="组织机构信息" name="orgInfo">
              <el-form :model="ruleForm" :rules="this.$validateRule" ref="ruleForm" label-width="110px" style="width: 50%">
                <el-form-item label="机构名称" prop="org_name">
                  <el-input size="small" v-model="ruleForm.org_name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="上级机构" prop="parentdepartid">
                                                                        <el-input v-model="ruleForm.parentdepartid"></el-input>
                                                                    </el-form-item> -->
                <el-form-item label="组织机构编码" prop="org_code">
                  <el-input size="small" v-model="ruleForm.org_code"></el-input>
                </el-form-item>
                <el-form-item label="组织机构类型" prop="org_type">
                  <el-select size="small" v-model="ruleForm.org_type" placeholder="请选择" @change="selectParent">
                    <el-option v-for="(item,index) in zzjglx" :label="item.typename" :value="item.typecode" :key="index">
                    </el-option>
                  </el-select>
                </el-form-item>
  
                <el-form-item label="父级机构" prop="" v-show="parentItem">
                  <el-select size="small" v-model="ruleForm.parentid" placeholder="请选择">
                    <el-option v-for="item in parentOptions" :key="item.id" :label="item.name+'    ['+item.org_code+']'" :value="item.id">
                    </el-option>
                  </el-select>
  
                </el-form-item>
  
                <el-form-item label="描述" prop="description">
                  <el-input size="small" type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>
              </el-form>
              <div style="width: 50%;text-align: center">
                <el-button size="small" type="primary" @click="submitForm('ruleForm')">修改</el-button>
  
              </div>
            </el-tab-pane>
            <el-tab-pane label="警员信息" name="personInfo">
              <el-form :inline="true" :model="policeFormInline" class="demo-form-inline" ref="policeFormInline">
                <el-form-item label="警员姓名" prop="police_name">
                  <el-input size="small" v-model="policeFormInline.police_name" placeholder="请输入警员姓名"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="primary" icon="search" @click="policeOnSearch('policeFormInline')">
                    查询
                  </el-button>
                  <el-button size="small" type="info" @click="resetForm('policeFormInline')">
                    <icon name="refresh" class="custom-icon"></icon>
                    重置
                  </el-button>
                  <el-button size="small" type="success" icon="plus" @click="onAdd">新增</el-button>
                  <el-button size="small" type="success" icon="plus" @click="handleBindPolice">添加已有警员</el-button>
                  <el-button size="small" type="success" icon="setting" @click="setCharge">设置为主管</el-button>
                </el-form-item>
              </el-form>
              <el-table :data="policeTableData" ref=policeTable @selection-change="policeHandleSelectionChange" highlight-current-row border :height="400">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="police_name" label="警员姓名" min-width="200">
                </el-table-column>
  
                <el-table-column prop="cardid" label="证件号" min-width="250">
                </el-table-column>
                <el-table-column prop="code" label="编号" min-width="150">
                </el-table-column>
                <el-table-column label="操作" min-width="150">
                  <template scope="scope">
                    <el-button size="mini" type="warning" @click="handleUnbundling(scope.$index, scope.row)">解绑
  
                    </el-button>
                    <el-button v-show="scope.row.is_charge==1" type="danger" size="mini" @click='unCharge(scope.$index,scope.row)'>取消主管</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!--分页 -->
              <paging @emitsizechange="handleSizeChange" @emitcurrentchange="handleCurrentChange" :currentPage="tabPage.currentPage" :pageSizes="tabPage.pageSizes" :pageSize="tabPage.pageSize" :total="tabPage.totalNum">
              </paging>
  
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
  
    </div>
    <!--<div class="treePosition">-->
    <!--<rights-Tree :dataTree="dataTree" :defaultKey="defaultKey" :org_id="org_id" @changeDepart="getRoleByDepart"></rights-Tree>-->
    <!--</div>-->
    <!--dialog-->
    <!--组织机构新增-->
    <el-dialog v-bind:title="formTitle" v-model="dialogInfo" :close-on-click-modal="false" v-on:close="resetForm('ruleForm')" size="tiny">
      <el-form :model="ruleForm" :rules="this.$validateRule" ref="ruleForm" label-width="110px">
        <el-form-item label="机构名称" prop="org_name">
          <el-input size="small" v-model="ruleForm.org_name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="上级机构" prop="parentdepartid">
                                                                <el-input v-model="ruleForm.parentdepartid"></el-input>
                                                            </el-form-item> -->
        <el-form-item label="组织机构编码" prop="org_code">
          <el-input size="small" v-model="ruleForm.org_code"></el-input>
        </el-form-item>
        <el-form-item label="组织机构类型" prop="org_type">
          <el-select size="small" v-model="ruleForm.org_type" placeholder="请选择" @change="selectParent">
            <el-option v-for="(item,index) in zzjglx" :label="item.typename" :value="item.typecode" :key="index">
            </el-option>
          </el-select>
        </el-form-item>
  
        <el-form-item label="父级机构" prop="" v-show="parentItem">
          <el-select size="small" v-model="ruleForm.parentid" placeholder="请选择">
            <el-option v-for="item in parentOptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
  
        </el-form-item>
  
        <el-form-item label="描述" prop="description">
          <el-input size="small" type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogInfo=false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--绑定警员信息-->
    <police-dialog :orgId="pitchData.id" :policeDialog="policeDialog" @close="closeDialog"></police-dialog>
    <!--新增警员信息-->
    <el-dialog title="警员新增" v-model="policeDialogEdit" :close-on-click-modal="false" :close-on-press-escape="false" v-on:close="resetForm('policeForm')">
      <el-form :model="policeForm" :rules="this.$validateRule" ref="policeForm" label-width="100px">
        <el-form-item label="警员姓名" prop="police_name">
          <el-input size="small" v-model="policeForm.police_name"></el-input>
        </el-form-item>
  
        <el-form-item label="身份证号" prop="cardid">
          <el-input size="small" v-model="policeForm.cardid"></el-input>
        </el-form-item>
  
        <el-form-item label="工号" prop="code">
          <el-input size="small" v-model="policeForm.code"></el-input>
        </el-form-item>
  
        <el-form-item label="手机号码" prop="phone">
          <el-input size="small" v-model="policeForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker v-model="policeForm.birth" type="date" placeholder="选择日期" @change="onAge" style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <!--<el-input size="small" v-model="policeForm.age"></el-input>-->
          <el-select size="small" v-model="policeForm.age" style="width:100%">
            <el-option v-for="(item ,index) in ages" :label="item" :value="item" :key="index"></el-option>
  
          </el-select>
        </el-form-item>
  
        <el-form-item label="性别" prop="gender">
          <el-radio size="small" class="radio" v-model="policeForm.gender" label="男">男</el-radio>
          <el-radio size="small" class="radio" v-model="policeForm.gender" label="女">女</el-radio>
        </el-form-item>
  
        <el-form-item label="初始登录密码" prop="password">
          <el-input size="small" v-model="policeForm.password"></el-input>
        </el-form-item>
        <el-form-item label="警员状态" prop="status">
          <el-select size="small" v-model="policeForm.status" style="width:100%">
            <!--<el-option v-for="item in status" :label="item.label" :value="item.label"-->
            <!--:key="item.label"></el-option>-->
            <el-option label="在职" value="1"></el-option>
            <el-option label="休假" value="2"></el-option>
            <el-option label="离职" value="3"></el-option>
          </el-select>
        </el-form-item>
  
        <el-form-item label="备注信息" prop="remarks">
          <el-input size="small" type="textarea" v-model="policeForm.remarks"></el-input>
        </el-form-item>
  
        <!--<el-form-item label="头像" style="width:30%">-->
        <!--<el-upload-->
        <!--class="avatar-uploader"-->
        <!--action="http://localhost:3008/business/policemanage/saveinfoimage"-->
        <!--:show-file-list="false"-->
        <!--:on-success="handleAvatarSuccess" name="file1">-->
        <!--<img v-if="image.src" :src="image.src" class="avatar">-->
        <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        <!--</el-upload>-->
        <!--</el-form-item>-->
  
        <el-form-item label="头像" style="width:30%">
          <div @click='chooseImg'>
            <img v-if="image.src" :src="image.src" class="avatar">
            <img v-else class="avatar img_src">
  
            <!--<el-input v-model="policeForm.imgsrc" class="input_file"></el-input> prop="imgsrc"-->
            <input id="upload_img" type="file" name="file1" @change="onFileChange" class="input_file" accept="image/gif,image/jpeg,image/jpg,image/png" />
          </div>
  
        </el-form-item>
  
        <!--<el-form-item label="头像" style="width:30%">-->
        <!--<el-input id="upload_img" type="file" name="file1" @change="onFileChange" class="input_file" accept="image/*"></el-input>-->
        <!--</el-form-item>-->
  
        <!--<el-form-item label="头像" style="width:30%">-->
        <!--<input id="upload_img" type="file" :src="image.src" name="file1" @change="onFileChange"/>-->
  
        <!--</el-form-item>-->
  
        <el-form-item>
          <div style="float: right">
            <el-button size="mini" @click="policeDialogEdit=false">取 消</el-button>
            <el-button size="mini" type="primary" @click="policeSubmitForm('policeForm')">确 定</el-button>
          </div>
        </el-form-item>
      </el-form>
  
    </el-dialog>
  </div>
</template>

<script>
import paging from '../../common/Paging.vue'
import policeDialog from 'view/plOrg/police.vue'

export default {
  data() {
    return {
      checkPoliceList:[],
      multipleSelection: [],   //Tree table 复选后集合
      image: {},//图片流预览图片
      ServerimageUrl: 'http://localhost:3008/',//后台地址
      orgs: [],
      ages: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 56, 47, 48, 49, 50,
        51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
        71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
        91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
        101, 102, 103, 104, 105, 106, 107, 108, 109, 110
      ],
      policeForm: {           //警员表单信息新增
        police_name: '',
        cardid: '',
        code: '',
        phone: '',
        birth: '',
        age: null,
        gender: '男',
        remarks: '',
        pl_orgid: '',
        atd_groupid: ''
      },
      policeDialogEdit: false,     //表单编辑
      policeDialog: false,   //已有警员信息Dialog
      pitchData: {},   //当前选中的唯一一条数据
      policeFormInline: {
        police_name: ''
      },
      policeTableData: [],   //警员table
      activeName: 'orgInfo',
      filterText: '',
      orgTreeData: [],
      isShow: false,   //是否显示警员table
      isChooseid: '',
      tablewidth: 24,    //默认组织机构表格宽度
      parentItem: false,
      parentOptions: [],
      value: '',
      PlOrgTableData: [],//部门列表数组
      sels: [],//表格选中列
      tabPage: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50]
      },//分页信息
      loading: false,
      formInline: {//查询表单对象
        org_name: ''
      },
      dialogInfo: false,//模态框是否显示标识
      ruleForm: {},//新增表单数据
      formTitle: '',//新增编辑模态框title
      tunnelList: [],//隧道下拉
      zzjglx: [],//组织机构类型列表
      dataTree: [],//角色树
      defaultKey: [],//选中项
      defaultProps: {
        children: 'children',
        label: 'org_name'
      },
      org_id: ''//选中部门id
    }
  },
  created: function () {

  },
  mounted: function () {
    this.zzjglx = this.getDicData('jwzzjglx');
    this.getPlOrgList();
    this.getPlOrgListToTree();
    //            this.getSysRoles();
  },
  components: {
    paging, policeDialog
  },
  computed: {},
  methods: {
    async unCharge(index, row) {
      const _self = this;
      const params = {
        policeList: [row.id]
      }
      try {
        const next = await this.$confirm('此操作将解除该警员与角色绑定,是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
         const policeRes = await _self.$http.post('/business/plorg/uncharge', params);
        if (policeRes && policeRes.data.success) {
          _self.$message({
            message: policeRes.data.msg,
            type: 'success'
          });
          _self.policeOnSearch();
        } else {
          _self.$message({
            message: policeRes.data.msg,
            type: 'warning'
          });
        }

      } catch (e) {
        console.log(e)
      }

 
    },

    /**
     * 设置警员为主管
     */
    async setCharge() {
      const _self = this;
      const params = {
        policeList: _self.multipleSelection
      }
      if (_self.multipleSelection.length > 0) {
        try {
          const policeRes = await _self.$http.post('/business/plorg/setcharge', params);
          if (policeRes && policeRes.data.success) {
            _self.$message({
              message: policeRes.data.msg,
              type: 'success'
            });
            _self.policeOnSearch();
          } else {
            _self.$message({
              message: policeRes.data.msg,
              type: 'warning'
            });
          }
        } catch (err) {
          _self.$message({
            message: err,
            type: 'warning'
          });
        }

      } else {
        _self.$message({
          message: '请选择警员',
          type: 'warning'
        });
      }
    },
    /**
     * 警员Table设置选择事件
     * @param {Array} val
     */
    policeHandleSelectionChange(val) {

      //设置单选
      //     val.forEach((row, index) => {
      //   if (index === val.length - 1) return;
      //   this.$refs.policeTable.toggleRowSelection(row, false);
      // })
      const idList = val.map(item => {
        return item.id
      })
      console.warn(idList)
      this.multipleSelection = idList;
    },

    /**
     *清除选中项
     */
    clearSearch() {
      this.filterText = "";
    },
    /********************警员Start**********************/
    /**
     * 保存信息无图片
     *@param {Object} data  图片信息
     */
    _savePoliceInfo(data) {
      var _self = this

      _self.$http.post('/business/policemanage/addoreditpolice', data)
        .then(function (res) {
          if (res.data && res.data.success) {
            _self.policeDialogEdit = false;
            _self.$message({
              message: '提交成功',
              type: 'success'
            });
            _self.policeOnSearch();
          } else {
            _self.$message({
              message: res.data.msg,
              type: 'warning'
            });
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    /**
     * 保存带图片上传
     *@param {Object} data  图片信息
     */
    _savePoliceAndImg(data) {
      var _self = this

      var formData = new FormData()
      var file = document.getElementById("upload_img").files[0]


      formData.append('file', file) //file就是图片或者文件

      var _self = this
      $.each(_self.policeForm, function (i, val) {
        if (val != null) {
          formData.append(i, val)
        }
      })
      _self.$http.post('/business/policemanage/saveinfoimage', formData).then(function (res) {
        if (res.data && res.data.flag) {
          _self.policeDialogEdit = false
          _self.$message({
            message: '提交成功',
            type: 'success'
          });
          _self.policeOnSearch()
        } else {
          _self.$message({
            message: res.data.msg,
            type: 'warning'
          });
        }
      }).catch(function (err) {
        console.log(err);
      })
    },
    /**
     * 编辑保存信息删除头像
     *@param {Object} data  图片信息
     */
    _savePoliceRemoveImg(data) {
      var _self = this
      this.$http.post('/business/policemanage/saveinforemoveimg', data).then(function (res) {
        if (res.data && res.data.success) {
          _self.dialogEdit = flase
          _self.policeOnSearch()
          _self.$message({
            message: '操作成功',
            type: 'success'

          })

        } else {
          _self.$message({
            message: res.data.msg,
            type: 'warning'
          })
        }
      }).catch(function (err) {
        console.log(err);
      })
    },
    /**
     * 保存警员表单
     * @param formName 表单名称
     *
     */
    policeSubmitForm(formName) {
      var _self = this
      var params = _self.policeForm;
      console.log(params.birth)
      _self.policeForm.pl_orgid = this.pitchData.id;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          params.police_name = params.police_name.trim().replace(/\s/g, "")
          console.log(params)
          if (params.id != undefined) {
            var str = "/upload/image/"
            if (params.sys_annex != null) {
              var imgpath = params.sys_annex.realpath

              if (_self.image.src) {

                if (_self.image.src.indexOf(str) > 0) {
                  console.log("111111111")
                  _self._savePoliceInfo(params)  //无头像更新
                } else {
                  console.log("2222222")
                  _self._savePoliceAndImg(params) //有头像更新
                }
              } else {
                console.log("33333333")
                _self._savePoliceRemoveImg(params)
              }
            } else {
              if (_self.image.src) {
                console.log("444444444")
                _self._savePoliceAndImg(params)

              } else {
                console.log("5555555")
                _self._savePoliceInfo(params)
              }
            }
          } else {
            if (_self.image.src) {
              console.log("6666666")
              _self._savePoliceAndImg(params)
            } else {
              console.log("777777777")
              _self._savePoliceInfo(params)
            }
          }
        } else {
          console.log('提交错误');
          return false;
        }
      });
    },
    /**
     *新增警员
     */
    onAdd() {
      this.policeDialogEdit = true;
      this.image = {}
      this.policeForm = Object.assign({}, {
        police_name: '',
        cardid: '',
        code: '',
        password: '123456',
        status: '在职',
        phone: '',
        gender: '男',
        birth: '',
        age: null,
        remarks: '',
        pl_orgid: '',
        atd_groupid: ''
      })


    },
    /**
     * 创建图片
     *@param files  文件路径
     */
    createImage(files) {

      var vm = this

      for (let file of files) {
        let reader = new FileReader();
        reader.onload = function (e) {
          // Render thumbnail.
          vm.image = { src: e.target.result }
        };
        // Read in the image file as a data URL.
        reader.readAsDataURL(file);

      }
    },
    removeImg() {
      $('#upload_img').val('')
      this.image = {}
    },
    /**
     * 图片选择change事件
     *
     */
    onFileChange(e) {
      var _self = this
      var files = e.target.files || e.dataTransfer.files
      const isImg = files[0].type.substr(0, 5)
      const isLt2M = files[0].size / 1024 / 1024 < 2
      if (isImg != 'image') {
        this.$message.error('只能上传图片！')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过2M！')
      }
      if (isImg === 'image' && isLt2M) {
        if (!files.length) return
        this.createImage(files)
      }
      return isImg === 'image' && isLt2M

    },
    /**
     * 自动计算年龄
     *
     */
    onAge() {
      var _self = this

      var date = new Date()
      var br = new Date(_self.policeForm.birth)
      var birthday_year = br.getFullYear()
      var year = date.getFullYear()
      var userage = year - birthday_year;
      _self.policeForm.age = userage
    },
    /**
     *警员新增 图片选择
     */
    chooseImg() {
      $('input[type=file]').trigger('click')
      return false
    },

    /****************************警员End*******************************/
    /**
     * 解除组织机构绑定
     *@param {String} index  当前行index
     *@row {Object} index 选中行数据
     */
    handleUnbundling(index, row) {
      var params = {
        policeid: row.id
      };
      var _self = this;
      this.$confirm('此操作将解除该警员与角色绑定,是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _self.$http.post('/business/plorg/unbundrg', params).then(function (res) {
          if (res.data && res.data.success) {
            _self.$message({
              message: '操作成功',
              type: 'success'
            })
            _self.policeOnSearch();
          } else {
            _self.$message({
              message: '删除失败',
              type: 'error'
            })
          }
        }).catch(function (err) {
          console.log(err)

        })
      }).catch((e) => {
        console.log(e)
      })

    },

    /**
     *
     * 关闭已有警员Dialog
     */
    closeDialog(d) {
      this.policeDialog = d.dialog;
      if (d.status) {
        this.policeOnSearch();
      }
    },
    /**
     * 添加已有警员
     */
    handleBindPolice() {
      this.policeDialog = true;
    },

    /**
     *警员搜索信息
     */
    policeOnSearch() {
      const _self = this;
      let policeList = [];
      policeList = _self.setOrgIdList(policeList, _self.pitchData);//获取选中节点父子节点id集合
      _self.getPoliceListByOrgId(policeList)   //默认查询第一条组织机构警员信息
    },
    /**
     *获取当前节点及其下子节点的所有id集合
     *@param {Arry} list 保存于数组对象中的id集合
     *@param {Object} data    选中的数据原形
     */
    setOrgIdList(list, data) {
      list.push(data.id)
      if (data.children.length > 0) {
        for (let item of data.children) {
          this.setOrgIdList(list, item)
        }
      }
      return list
    },

    /**
     * 通过orgTd查询警员信息
     *@param {String} orgId
     */
    async getPoliceListByOrgId(idList) {
      const data = {
        page: this.tabPage.currentPage,
        pageSize: this.tabPage.pageSize,
        police_name: this.policeFormInline.police_name,
        pl_orgid: idList
      };
      try {
        const _self = this;
        _self.loading = true;
        const callBackData = await _self.$http.get('/business/policemanage/policelistdata', { params: data });
        if (callBackData.data.success) {   //查询成功
          const result = callBackData.data.result;
          _self.tabPage.totalNum = result.count
          _self.policeTableData = result.rows
          console.log(result)
          _self.loading = false;
        } else {
          _self.$message({
            message: res.data.msg,
            type: 'warning'
          });
          _self.loading = false;
        }
      } catch (err) {
        console.log('choose', err)
        _self.loading = false;
      }
    },

    /**
     * 编辑模式绑定数据
     *@param {Object} row 选中编辑行数据
     */
    bindEditInfo(row) {
      const _self = this;
      _self.ruleForm = Object.assign({}, row);
      _self.selectParent(_self.ruleForm.org_type)
    },
    /**
     *树信息过滤
     *@param {String} value 当前输入值
     *@param {Objcet} data 树数据原形
     */
    filterNode(value, data) {
      if (!value) return true;
      return data.org_name.indexOf(value) !== -1;
    },

    /**
     *树节点点击事件
     *@param {Object} element  传递给 data 属性的数组中该节点所对应的对象
     *@param {Objcet} node   节点对应的 Node
     *@param {Objcet} vm    节点组件本身
     */
    treeChoose(element, node, vm) {
      this.checkPoliceList=[];
      this._self.pitchData = element;
      this.policeFormInline.police_name = '';
      this.bindEditInfo(element);
      // let policeList = [];
      // policeList = this.setOrgIdList(policeList, element);//获取选中节点父子节点id集合
      this.checkPoliceList=this.setOrgIdList(this.checkPoliceList, element);//获取选中节点父子节点id集合
      this.getPoliceListByOrgId(this.checkPoliceList);
    },
    /**
     * 组合组织机构信息构建树结构信息
     *@param {Object} data 组织机构信息
     */
    toTreeData(data) {
      var pos = {};
      var tree = [];
      var i = 0;
      while (data.length != 0) {
        if (data[i].parentid == '1') {
          tree.push({
            id: data[i].id,
            org_code: data[i].org_code,
            org_name: data[i].org_name,
            org_type: data[i].org_type,
            parentid: data[i].parentid,
            description: data[i].description,
            children: []
          });
          pos[data[i].id] = [tree.length - 1];
          data.splice(i, 1);
          i--;
        } else {
          var posArr = pos[data[i].parentid];
          if (posArr != undefined) {

            var obj = tree[posArr[0]];
            for (var j = 1; j < posArr.length; j++) {
              obj = obj.children[posArr[j]];
            }

            obj.children.push({
              id: data[i].id,
              org_code: data[i].org_code,
              org_name: data[i].org_name,
              org_type: data[i].org_type,
              parentid: data[i].parentid,
              description: data[i].description,
              children: []
            });
            pos[data[i].id] = posArr.concat([obj.children.length - 1]);
            data.splice(i, 1);
            i--;
          }
        }
        i++;
        if (i > data.length - 1) {
          i = 0;
        }
      }
      return tree;
    },

    /**
     * 格式转树状结构
     * @param   {Array}      原数据
     * @param   {String}    id的字符串
     * @param   {String}    父id的字符串
     * @param   {String}    children的字符串
     * @return  {Array}     数组
     */
    transData(a, idStr, pidStr, chindrenStr) {
      var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;
      for (; i < len; i++) {
        hash[a[i][id]] = a[i];
      }
      for (; j < len; j++) {
        var aVal = a[j], hashVP = hash[aVal[pid]];
        if (hashVP) {
          !hashVP[children] && (hashVP[children] = []);
          hashVP[children].push(aVal);
        } else {
          r.push(aVal);
        }
      }
      return r;
    },
    /**
     *查询组织结构信息(树)
     */
    async getPlOrgListToTree(parms) {
      try {
        const _self = this;
        let parm = {};
        if (parms) {
          parm = parms
        }
        const callBackData = await _self.$http.get('/business/plOrg/getallplorglist', { params: parm });
        if (callBackData.data.success) {   //查询成功
          const result = callBackData.data.result;
          _self.orgTreeData = _self.toTreeData(result);
          //            console.log(result.length)
          if (result.length > 0) {
            _self.orgTreeData = _self.transData(result, 'id', 'parentid', 'children');
          }
          console.log(_self.orgTreeData.length)
          if (_self.orgTreeData.length > 0) {
            _self.pitchData = _self.orgTreeData[0];

          }
          let policeList = [];
          console.log(_self.pitchData.id)
          if (_self.pitchData.id) {
            console.log(_self.pitchData, '2333')
            _self.bindEditInfo(_self.pitchData);//编辑默认选中第一条数据
            policeList = _self.setOrgIdList(policeList, _self.pitchData);//获取选中节点父子节点id集合
          }
          console.log(policeList.length, '2222')
          if (policeList.length > 0) {
            _self.getPoliceListByOrgId(policeList)   //默认查询第一条组织机构警员信息
          }
        } else {
          _self.$message({
            message: res.data.msg,
            type: 'warning'
          });
        }
      } catch (err) {
        console.log('choose', err)
      }


    },
    choosePolice(index, row) {
      console.log(row)
      if (this.isChooseid == "") {
        this.isChooseid = row.id;
        this.tablewidth = 12;
        this.isShow = true;
      } else {
        if (this.isChooseid == row.id) {
          if (this.tablewidth == 12) {
            this.tablewidth = 24;
            this.isShow = false;
          } else {
            this.tablewidth = 12
            this.isShow = true;
          }
        } else {
          this.isChooseid = row.id;
          this.tablewidth = 12
          this.isShow = true;
        }


      }
    },

    /**
     * 通过id查询关联与组织机构的人员
     *@param {Object} data 选择行数据
     */
    getOrgForPersonList(data) {
      let _self = this;
      let orgList = [];
      data.forEach(item => orgList.push(item.id))
      _self.$http.get('/business/plOrg/getorgforpersonlist', {
        params: {
          orgIdList: orgList
        }
      }).then(function (res) {
        if (res.data && res.data.success) {
          if (res.data.result > 0) {
            _self.$confirm('当前选中组织机构有' + res.data.result + '个下一级,请先删除下级在进行操作', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(function () {
            }).catch(function (err) {
              console.log(err);
            });
          } else {
            _self.deletePlOrgInfo({ params: data })
          }
        }
      }).catch(function (err) {
        console.log(err);
      })

    },

    /**
     * 格式化表格组织机构显示效果
     *@param {Object} row  当前行数据
     *@param {Object} colum  当前列数据
     */
    tableformatter(row, column) {
      var _self = this;
      var data = $.grep(_self.zzjglx, function (value) {
        return value.typecode == row.org_type
      });
      return data[0].typename
    },


    /**
     *查询父级机构信息
     *@param  {String} val 父级机构org_type 级别
     */
    selectParent(val) {
      if (val) {
        if (val === '1') {
          this.parentItem = false;
          //            this.ruleForm.parentid = 1;
        } else {
          this.parentItem = true;
          this.getplOrgName(val - 1);
        }
      } else {
        this.parentItem = false;
      }

    },

    /**
     *通过组织机构级别（类型）查询当前级别信息
     *@param {String} org_type   父级机构org_type 级别
     */
    getplOrgName(org_type) {
      var _self = this;
      this.$http.get('/business/plOrg/getplorgbytype', {
        params: {
          org_type: org_type
        }
      }).then(function (res) {
        if (res.data && res.data.success) {
          var data = res.data.result;
          //            var options = [];
          //            for (var i in data) {
          //              options.push({
          //                value: data[i].id,
          //                label: data[i].org_name
          //              })
          //            }
          _self.parentOptions = data;
        }
      }).catch(function (err) {
        console.log(err);
      })
    },

    //


    /**
     *获取字典信息
     *@param {Object} str 字典编码
     */
    getDicData(str) {//获取数据字典相关内容
      var dicList = JSON.parse(this.$getStore("gDictionaryList"))
      var filterarray = $.grep(dicList, function (value) {
        return value.typegroupcode === str;//筛选出其中一个，仍为一个数组
      });
      if (filterarray.length > 0) {//防止前端报错
        return filterarray[0].typeList;
      }
    },

    /**
     * 获取组织机构信息（分页）
     *@param {Object} params   查询条件
     */
    async getPlOrgList(params) {
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
      this.$http.get('/business/plorg/getplorglist', { params: data })
        .then(function (res) {
          if (res.data && res.data.success) {
            var d = res.data.result;
            _self.PlOrgTableData = d.rows;
            _self.tabPage.totalNum = d.count;
            _self.loading = false;
          }
        }).catch(function (error) {
          _self.loading = false;
          console.log(error)
        });
    },
    /**
     * 查询 根据机构名称模糊查询
     * @params {String} formName 进行验证
     */
    onSearch(formName) {
      var params = {
        org_name: this.filterText
      }
      var _self = this;
      _self.getPlOrgListToTree(params);

    },
    /**
     * 点击新增按钮
     */
    handleAdd() {
      this.dialogInfo = true;
      this.formTitle = "新增部门信息";
      this.ruleForm = Object.assign({}, {
        org_name: '',
        org_code: '',
        parentid: '',
        org_type: undefined,
        description: ''
      });//初始化
    },
    /**
     * 保存部门信息
     * @params {String} formName 用于验证
     */
    submitForm(formName) {
      var _self = this;
      var params = _self.ruleForm;
      if (params.org_type == 1) {
        params.parentid = 1
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _self.$http.post('/business/plorg/saveplorginfo', params)
            .then(function (res) {
              if (res.data && res.data.success) {
                _self.dialogInfo = false;
                _self.$message({
                  message: '提交成功',
                  type: 'success'
                });
                _self.getPlOrgListToTree();
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
     * 表单重置
     * @params {Object} formName 表单名称
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
      if (formName == 'formInline') {
        this.getPlOrgList();
      }
      if (formName == 'policeFormInline') {
        this.policeOnSearch();
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
      this.ruleForm = Object.assign({}, row);
      this.selectParent(this.ruleForm.org_type)
    },

    /*******绑定角色end******/
    /**
     * 删除按钮点击事件
     * @params {Number} index   行号
     * @params {Object} row     行对象
     */
    handleDelete() {
      var _self = this;
      //        _self.getOrgForPersonList([this.pitchData])
      _self.deletePlOrgInfo(this.pitchData);
    },
    /**
     * 删除部门信息
     * @params {Object} row|rows     行对象
     */
    deletePlOrgInfo(data) {
      var _self = this;
      this.$confirm('此操作将永久删除选择组织机构, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(function () {
        _self.$http.post('/business/plorg/deleteplorginfo', data).then(function (res) {
          if (res.data && res.data.success) {
            _self.$message({
              message: '删除成功',
              type: 'success'
            });
            _self.getPlOrgListToTree();
          } else {
            _self.$message({
              message: res.data.msg,
              type: 'warning'
            });
          }
        }).catch(function (err) {
        })
      }).catch(function (err) {
      });
    },
    /**
     * 切换每页条数
     * @params {Number} val 每页条数
     */
    handleSizeChange(val) {
      this.tabPage.pageSize = val;
      // this.getPlOrgListToTree();
      this.getPoliceListByOrgId(this.checkPoliceList);
    },
    /**
     * 切换页码
     * @params {Number} val 页码
     */
    handleCurrentChange(val) {
      this.tabPage.currentPage = val;
      // this.getPlOrgListToTree();
      this.getPoliceListByOrgId(this.checkPoliceList);
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
        _self.getOrgForPersonList(arr)
        //          _self.deletePlOrgInfo({params: arr});
      } else {
        _self.$message({
          message: '请选择部门',
          type: 'warning'
        });
      }

    }

  },
  watch: {
    filterText(val) {
      this.$refs.orgTree.filter(val);
    }
  }

}
</script>

<style scoped>
.el-select {
  width: 100%;
}

.showpolice {
  animation: slideInRight 1s 0.7s 1 both
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.hidepolice {
  animation: slideOutRight 1s 0s 1 both
}

@keyframes slideOutRight {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(100%, 0, 0);
  }
}

.chwidth {
  transition: width 0.7s;
  -moz-transition: width 0.7s;
  /* Firefox 4 */
  -webkit-transition: width 0.7s;
  /* Safari and Chrome */
  -o-transition: width 0.7s;
  /* Opera */
}

.tabPosition {
  float: left;
  width: 100%;
}

.treePosition {
  margin-top: -25px;
  position: absolute;
  right: -25%;
  width: 25%;
  min-width: 280px;
  float: right;
  display: none;
}

.ws-tree {
  height: 500px;
  /*position:absolute;*/
  overflow: auto
}

.input_file {
  display: none;
}



























/*img{*/


/*width:150px;*/


/*height:150px;*/


/*}*/

.el-upload {
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 108px;
  line-height: 108px;
  text-align: center;
}

.avatar {
  width: 108px;
  height: 108px;
  display: block;
}

.img_src {
  background-image: url('../../../assets/img/default.jpg');
  background-size: 108px 108px;
}

.removeIcon {
  position: absolute;
  z-index: 99;
  right: 2px;
  top: 2px;
  background-color: ghostwhite;
}

.el-dialog .el-form .el-form-item {
  width: 90%
}
</style>
