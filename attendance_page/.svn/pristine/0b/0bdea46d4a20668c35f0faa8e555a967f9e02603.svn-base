<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
            <el-form-item label="菜单名称">
                <el-input size="mini" v-model="formInline.menu_name" placeholder="菜单名称"   @keyup.enter.native="onSearch"></el-input>
            </el-form-item>
            <el-form-item label="功能类型">
                <el-select size="mini" v-model="formInline.menu_type" placeholder="功能类型">
                    <el-option v-for="(item,index) in gnlx" :label="item.typename" :value="item.typecode" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="primary" icon="search" @click="onSearch">查询</el-button>
                <el-button size="mini" type="info" @click="resetForm('formInline')"><icon name="refresh" class="custom-icon"></icon>重置</el-button>
                <el-button size="mini" type="success" icon="plus" @click="handleAdd">新增</el-button>
            </el-form-item>
        </el-form>
        <el-dialog v-bind:title="formTitle" v-model="dialogEdit" :close-on-click-modal="false"
                   v-on:close="resetForm('ruleForm')" size="tiny">
            <el-form :model="ruleForm" :rules="this.$validateRule" ref="ruleForm" label-width="100px">
                <el-form-item label="菜单名称" prop="menu_name">
                    <el-input size="small" v-model="ruleForm.menu_name"></el-input>
                </el-form-item>
                <el-form-item label="菜单级别" prop="menu_level">
                    <el-select size="small" v-model="ruleForm.menu_level" placeholder="菜单级别" @change="subChange">
                        <el-option v-for="(item,index) in cdjb" :label="item.typename" :value="item.typecode" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="父级菜单" prop="parent_menu_id" v-show="topShow">
                    <el-select size="small" v-model="ruleForm.parent_menu_id" placeholder="父级菜单">
                        <el-option
                            v-for="(item,index) in topSub"
                            :label="item.menu_name"
                            :value="item.id"
                        :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="功能类型" prop="menu_type">
                    <el-select size="small" v-model="ruleForm.menu_type" placeholder="功能类型">
                        <el-option v-for="(item,index) in gnlx" :label="item.typename" :value="item.typecode" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单序号" prop="menu_order">
                    <el-input size="small" v-model="ruleForm.menu_order"></el-input>
                </el-form-item>
                <el-form-item label="菜单路径" prop="menu_url">
                    <el-input size="small" v-model="ruleForm.menu_url"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" prop="menu_icon">
                    <el-input size="small" v-model="ruleForm.menu_icon"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogEdit=false">取 消</el-button>
                <el-button size="mini" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
        <MenuTable :myDetail="childinfo" ref="menuData"></MenuTable>


    </div>
</template>
<script>
    import paging from 'common/Paging.vue';
    import MenuTable from "view/sysMenu/MenuTable.vue"
    export default{
        data(){
            return {
                gnlx: [],
                cdjb: [],
                dialogVisible: false,
                topShow: false,
                topSub: [],
                childinfo: [3],
                dialogEdit: false,
                formTitle: '',
                ruleForm: {//新增表单数据
                    menu_icon: '',
                    menu_name: '',
                    menu_type: '',
                    menu_url: '',
                    menu_order: '',
                    menu_level: '',
                    parent_menu_id: ''
                },
                formInline: {
                    menu_name: '',
                    menu_type: ''
                }
            }
        },
        created(){
           this.gnlx = this.getDicData('gnlx');
           this.cdjb = this.getDicData('cdjb');

        },
        mounted(){
            console.log('mounted')
        },
        computed(){
            console.log('computed')
        },
        methods: {
            getDicData(str){//获取数据字典相关内容
                var dicList = JSON.parse(this.$getStore("gDictionaryList"))
                var filterarray = $.grep(dicList, function (value) {
                    return value.typegroupcode === str;//筛选出其中一个，仍为一个数组
                });
                if (filterarray.length > 0) {//防止前端报错
                    return filterarray[0].typeList;
                }
            },
            onSearch(){
                this.$refs.menuData.getSysMenuList(this.formInline);
            },
            /**
             * 点击新增按钮
             */
            handleAdd(){

                var _self = this;
                this.dialogEdit = true;
                this.formTitle = '新增菜单';
                this.$http.get('/system/menu/getsysmenulevel', {})
                    .then(function (res) {
                        if (res.data && res.data.flag) {
                            _self.topSub = res.data.data

//                                    }
                        } else {
                            _self.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }

                    })
                    .catch(function (error) {
                        _self.$message({
                            message: '请求错误',
                            type: 'error'
                        });
//                        console.log(error);
                    });
                this.ruleForm.id = '';
//                this.ruleForm = Object.assign({}, {direction:undefined,status:undefined,tunnelid:undefined,dev_type:undefined,position:undefined});
            },

            resetForm(formName) {

                this.$refs[formName].resetFields();
                this.$refs.menuData.getSysMenuList();
//                console.log(this.ruleForm)
            },
            subChange(){
                var _self = this;
                console.log('change：', _self.ruleForm)
                if (_self.ruleForm.menu_level == 1) {
                    _self.topShow = true;
                } else {
                    _self.topShow = false;
                    _self.ruleForm.parent_menu_id = undefined;
                }
            },
            /**
             * 保存用户信息
             * @params {String} formName 用于验证
             */
            submitForm(formName){
                var _self = this;
                var params = _self.ruleForm;
//                params.menu_order=Number(this.ruleForm.menu_type);
                console.log('params:', params)
                this.$refs[formName].validate(function (valid) {
                    if (valid) {
                        _self.$http.post('/system/menu/savesysmenuinfo', params)
                            .then(function (res) {
                                if (res.data && res.data.flag) {
                                    _self.dialogEdit = false;

                                    _self.$refs.menuData.getSysMenuList();
                                    _self.$refs.menuData.getMenuAllList();
                                    _self.$message({
                                        message: '操作成功',
                                        type: 'success'
                                    });
//                                    }
                                } else {
                                    _self.$message({
                                        message: res.data.msg,
                                        type: 'error'
                                    });
                                }

                            })
                            .catch(function (error) {
                                _self.$message({
                                    message: '请求错误',
                                    type: 'error'
                                });
//                                console.log(error);
                            });

                    } else {
//                        console.log('提交错误');
                        return false;
                    }
                });
            },
            changeDialog(parms){
                this.dialogEdit = true;
                this.formTitle = '编辑菜单';

                this.ruleForm = Object.assign({}, parms);
                if (parms.menu_level != null) {
                    this.ruleForm.menu_level = (parms.menu_level).toString();
                }
                if (parms.menu_type != null) {
                    this.ruleForm.menu_type = (parms.menu_type).toString();
                }
//                if(parms.menu_order!=null){
//                    this.ruleForm.menu_order=Number(parms.menu_type);
//                }

            }

        },
        components: {
             paging, MenuTable
        },
    }

</script>
<style scoped>

</style>
