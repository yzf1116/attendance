<template>
    <div class="typeValueDiv">
        <div class="addBtn">
            <el-button type="success" size="small" icon="plus" @click="handleAdd">新增</el-button>
        </div>
        <!--table-->
        <el-table :data="tableData"
                  border
                  style="width: 100%"
                  tooltip-effect="dark" >
            <el-table-column
                prop="field"
                label="字段名称">
            </el-table-column>
            <el-table-column
                prop="field_name"
                label="字段描述" :show-overflow-tooltip="true">
            </el-table-column>
          <el-table-column
            prop="is_export"
            label="导出状态" :formatter="formatter">
          </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button
                        size="small"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--form-->
        <el-dialog title="字段录入" v-model="dialogInfo" size="tiny">
            <el-form :model="ruleForm" :rules="this.$validateRule" ref="ruleForm" label-width="100px"
                     class="new_ruleForm">
                <el-form-item label="字段" prop="field">
                    <el-input v-model="ruleForm.field" size="large"></el-input>
                </el-form-item>
                <el-form-item label="字段描述" prop="field_name">
                    <el-input v-model="ruleForm.field_name" type="textarea" :rows="3" size="large"></el-input>
                </el-form-item>
              <el-form-item label="字段类型" prop="td_type">
                <el-select v-model="ruleForm.td_type" placeholder="请选择" @change="changeTdtype">
                  <el-option
                    v-for="item in tdoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="导出状态" prop="is_export">
                <el-select v-model="ruleForm.is_export" placeholder="请选择">
                  <el-option
                    v-for="item in exportoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="填写状态" prop="is_required"  >
                <el-select v-model="ruleForm.is_required" v-bind:disabled="disabled_required" placeholder="请选择">
                  <el-option
                    v-for="item in requiredoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="关联类型" prop="association_type" >
                <el-select v-model="ruleForm.association_type" v-bind:disabled="disabledAss_type" @change="changeAssoctype" placeholder="请选择">
                  <el-option
                    v-for="item in assocoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="映射字段" prop="map_field">
                <el-input v-model="ruleForm.map_field"  size="large" v-bind:disabled="disabledMap_field"></el-input>
              </el-form-item>
              <el-form-item label="关联表" prop="association_table">
                <el-input v-model="ruleForm.association_table"  size="large" v-bind:disabled="disabledAss_table"></el-input>
              </el-form-item>
              <el-form-item label="关联字段" prop="association_field">
                <el-input v-model="ruleForm.association_field"  size="large" v-bind:disabled="disabledAss_field" ></el-input>
              </el-form-item>
              <el-form-item label="关联父级字段" prop="association_parent_field">
                <el-input v-model="ruleForm.association_parent_field" v-bind:disabled="disabledAss_pField" size="large"></el-input>
              </el-form-item>
              <el-form-item label="排序" prop="order">
                <el-input v-model="ruleForm.order"  size="large"></el-input>
              </el-form-item>
            </el-form>


            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogInfo=false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                tableData: [],
                formData: [],    //表单
                dialogInfo: false, //模态框是否显示标识
                ruleForm: {//新增表单数据
                },
                groupId: '',
              tdoptions:[{
                value: 1,
                label: '提示'
              },
                {
                  value: 3,
                  label: '列'
                }],
          exportoptions:[{
                value: 1,
                label: '导出'
              },
                {
                  value: 0,
                  label: '不导出'
                }],
              requiredoptions:[{
                value: 1,
                label: '必填'
              },
                {
                  value: 0,
                  label: '可选填'
                }],
              assocoptions:[{
                value: 0,
                label: '无关联'
              },
                {
                  value: 1,
                  label: '——关联'
                },
                {
                  value: 2,
                  label: '一对一关联'
                }],
              disabledAss_pField:false,
              disabledAss_field:false,
              disabled_required:false,
              disabledMap_field:false,
              disabledAss_type:false,
              disabledAss_table:false,
            }
        },
        components: {},
        computed: {},
        methods: {
            getListData(){
                var _self = this;
                _self.$getList('/tools/excel/findexporttablelist', {groupId: this.groupId,td_type:{$ne: 2
                }}, function (ret) {
                    if (ret.data.status === true) {
                        _self.tableData = ret.data.data;

                    } else {
                        _self.$message({
                            message: '获取数据失败',
                            type: 'warning'
                        });
                        return false;
                    }
                })

            },
            handleAdd(){
                this.dialogInfo = true;
              this.changeTdtype(3);
              this.changeAssoctype(1);
                this.ruleForm = Object.assign({}, {});

            },
            handleEdit(index, row){
                this.dialogInfo = true;
              this.changeTdtype(row.td_type);
              this.changeAssoctype(row.association_type);
                this.ruleForm = Object.assign({}, row);
            },
            handleDelete(index, row) {
                var _self = this;
                _self.$deleteOne('/tools/excel/deleteexcel', {id: row.id}, function (ret) {
                    if (ret.data.status === true) {
                        _self.getListData();
                    }
                });


            },
            onSearch(){
            },
            submitForm(formName){
                var _self = this;
                var data = _self.ruleForm;
                var groupId = _self.groupId;
                data.typegroupid = groupId;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _self.$submitForm('/tools/excel/addorupdateexcel', data, function (ret) {
                            if (ret.data.status === true) {
                                _self.getListData();
                            } else {
                                _self.$message({
                                    message: '获取数据失败',
                                    type: 'warning'
                                });
                                return false;
                            }
                        })
                    } else {
                        console.log('提交错误');
                        return false;
                    }
                });


            },
            resetForm(formName){
                this.$refs[formName].resetFields();
            },
          changeTdtype(e){
            console.log(1)
            if(e==1){
              this.disabled_required=true;
              this.disabledAss_type=true;
              this.disabledAss_table=true;
              this.disabledMap_field=true;
              this.disabledAss_field=true;
              this.disabledAss_pField=true;
            }else if(e==3){
              this.disabled_required=false;
              this.disabledAss_type=false;
              this.disabledMap_field=false;
              this.disabledAss_table=false;
              this.disabledAss_field=false;
              this.disabledAss_pField=false;
            }
          },
          changeAssoctype(e){
            if(e==0){
              this.disabledAss_table=true;
              this.disabledMap_field=true;
              this.disabledAss_field=true;
              this.disabledAss_pField=true;
            }else if(e==1){
              this.disabledAss_table=false;
              this.disabledAss_field=false;
              this.disabledMap_field=false;
              this.disabledAss_pField=false;
            }else if(e==2){
              this.disabledAss_table=false;
              this.disabledAss_field=false;
              this.disabledAss_pField=true;
              this.disabledMap_field=true;
            }
          },

          formatter(row, column) {
            console.log(column,row)
            if(row.is_export==0){
              return '不导出';
            }else if(row.is_export==1){
              return '导出';
            }

          }


        }
    }
</script>
<style scoped>
    /*.typeValueDiv{*/
    /*min-width: 350px;*/
    /*!*margin-top: 40px;*!*/
    /*width: 45%;*/
    /*float: right;*/

    /*}*/
    .typeTitle span {
        font-size: 13px;
    }

    .addBtn {
        margin-bottom: 10px;
    }
    .typeValueDiv .el-table .cell {
      overflow:hidden;text-overflow:ellipsis; -o-text-overflow:ellipsis;white-space:nowrap;width:100%;
    }

</style>
