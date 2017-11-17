<template>
    <div class="dicDiv">
        <div class="leftDiv">
            <!--toolButton-->
            <!--查询-->
            <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
                <el-form-item>
                    <el-button type="success" icon="plus" @click="handleAdd">新增</el-button>
                    <el-button type="danger" icon="delete" @click="batchRemove">批量删除</el-button>
                </el-form-item>
            </el-form>

            <!--左侧table-->
            <el-table :data="leftTableData" border @selection-change="handleSelectionChange" style="width: 100%" tooltip-effect="dark">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="table_name" label="表名">
                </el-table-column>
              <el-table-column prop="field_name" label="描述">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                        <el-button size="small" @click="toViewType(scope.$index, scope.row)">查看详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--  分页  -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tabPage.currentPage" :page-sizes="tabPage.pageSizes" :page-size="tabPage.pageSize" layout='sizes,prev, pager, next, jumper, ->, total,slot' :total="tabPage.totalNum" :style="pagination">
            </el-pagination>

            <!--左侧form-->
            <el-dialog title="表格导出录入" v-model="dialogInfo" size="tiny">
                <el-form :model="ruleForm" :rules="this.$validateRule" ref="ruleForm" label-width="100px" class="new_ruleForm">
                    <el-form-item label="表名" prop="table_name">
                        <el-input v-model="ruleForm.table_name" v-bind:disabled="disabledTableName"></el-input>
                    </el-form-item>
                  <el-form-item label="描述" prop="field_name">
                    <el-input v-model="ruleForm.field_name"></el-input>
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

                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogInfo=false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="rightDiv">
            <RightTable ref="rightChild"></RightTable>
        </div>

    </div>
</template>

<script>
import RightTable from './excelRightTable.vue'
import paging from '../../common/Paging.vue'
export default {
    data() {
        return {
            leftTableData: [], //左侧table
            tabPage: {
                currentPage: 1,
                pageSize: 5,
                pageSizes: [5, 10, 15, 20]
            },//分页信息
            pagination: {  //分页样式
                position: 'fixed',
                bottom: '20px'
            },
            formData: [],    //表单数据

            dialogInfo: false, //模态框是否显示标识
            ruleForm: {//新增表单数据
            },
            formInline: {//查询输入框的对象
                typegroupname: ''
            },
            multipleSelection: [],  //多选框选中的数据
          exportoptions:[{
            value: 1,
            label: '导出'
          },
            {
              value: 0,
              label: '不导出'
            }],
          disabledTableName:'false'
        }
    },
    created: function () {
        this.getListData();

    },
    components: {RightTable, paging},
    computed: {},
    methods: {
        async getListData(params) {
            var _self = this;
            var data = {
                page: this.tabPage.currentPage,
                pageSize: this.tabPage.pageSize,
                typegroupname: this.formInline.typegroupname,
                td_type:2
            };
            if (params) {
                data = params;
            }
            this.$http.get('/tools/excel/exporttablelist', { params: data })
                .then(function (ret) {
                    if (ret.data.status === true) {
                        var d = ret.data.data;
                        _self.leftTableData = d.rows;
                        _self.tabPage.totalNum = d.count;
                    }

                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        handleAdd() {
            this.dialogInfo = true;
  this.disabledTableName=false;
            this.ruleForm = Object.assign({}, {});
        },
        handleEdit(index, row) {
            this.dialogInfo = true;
            this.disabledTableName=true;
            this.ruleForm = Object.assign({}, row);
        },
        submitForm(formName) {
            var _self = this;
            var data = _self.ruleForm;
            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    _self.$submitForm('/tools/excel/addorupdateexcel', data, function (ret) {
                        if (ret.data.status === true) {
                            _self.getListData();
                        }
                    })
                } else {
                    return false;
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
            _self.$deleteOne('/tools/excel/deleteexcel', { id: row.id }, function (ret) {
                if (ret.data.status === true) {
                    _self.getListData();
                    var rightChild = _self.$refs.rightChild;
                    rightChild.getListData();

                }
            });


        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        batchRemove() {
            var _self = this;
            var ids = [];
            var arr = _self.multipleSelection;
            for (var i = 0; i < arr.length; i++) {
                ids.push(arr[i].id);
            }
            _self.$deleteBatch('/tools/excel/deleteexcel', { ids: ids }, function (ret) {
                _self.getListData();
                var rightChild = _self.$refs.rightChild;
                rightChild.getListData();
                if (ret.data.status === false) {
                    _self.$message({
                        message: ret.data.msg,
                        type: 'warning'
                    });
                } else {
                    _self.$message({
                        message: ret.data.msg,
                        type: 'success'
                    });
                }
            })


        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        toViewType(index, row) {
            this.changeStyle();//移动动画
            var rightChild = this.$refs.rightChild;//获取子组件实例
            rightChild.groupId = row.id;
            rightChild.getListData();//调用子组件的方法
        },
        /**
         * 切换每页条数
         * @params {Number} val 每页条数
         */
        handleSizeChange(val) {
            this.tabPage.pageSize = val;
            this.getListData();
        },
        /**
         * 切换页码
         * @params {Number} val 页码
         */
        handleCurrentChange(val) {
            this.tabPage.currentPage = val;
            this.getListData();
        },
        changeStyle() {
            $('.leftDiv').css('width', '60%');
            $(".rightDiv").css('right', '-35%').css('display', 'block').animate({ right: '10px' }, "slow");
        }
    }
}
</script>

<style scoped>
.new_ruleForm {
    width: 400px;
}

.leftDiv {
    float: left;
    width: 100%;
}

.rightDiv {
    margin-top: 20px;
    position: absolute;
    right: -35%;
    width: 35%;
    float: right;
    display: none;
}

</style>

