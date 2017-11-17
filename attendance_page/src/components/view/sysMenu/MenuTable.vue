<template>
    <div > <el-row>

        <el-col :span="6">
            <div  class="ws-tree">
                <el-tree
                    :data="treeData"
                    node-key="id"
                    ref="tree2"
                    :default-expand-all="defaultExpandedKeys"
                    :props="defaultProps"
                >
                </el-tree>
            </div>

        </el-col>

        <el-col :span="18">
            <el-table
                :data="sysMenuTableData"
                border
                :height="this.$store.state.gTableHeight"
                @selection-change="handleSelectionChange"
                v-loading="loading"
                style="width: 100%">
                <!--<el-table-column-->
                    <!--type="selection"-->
                <!--&gt;-->
                <!--</el-table-column>-->
                <el-table-column
                    prop="menu_name"
                    label="菜单名称"
                >
                </el-table-column>
                <el-table-column
                    prop="menu_level"
                    label="菜单级别">
                </el-table-column>
                <el-table-column
                    prop="menu_type"
                    label="功能类型"
                    :formatter="test">
                </el-table-column>
                <el-table-column
                    prop="menu_order"
                    label="菜单序号">
                </el-table-column>
                <el-table-column
                    prop="menu_icon"
                    label="菜单图标">
                </el-table-column>
                <el-table-column
                    prop="menu_url"
                    label="菜单路径"
                >
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button
                            size="mini" 
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                        <el-button
                            size="mini"
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
        </el-col>
    </el-row>

    </div>

</template>

<script>
    import paging from '../../common/Paging.vue'
    export default{
         data(){
        return {
            gnlx:[],
            defaultExpandedKeys:true,
            loading: true,
            sysMenuTableData:[],
            tabPage: {
                currentPage: 1,
                pageSize: 10,
                pageSizes: [10, 20, 30, 50]
            },//分页信息
            treeData: [],
            treesysData:[],
            defaultProps: {
                children: 'children',
                label: 'menu_name'
            }

        }
    },
    created(){
        this.gnlx = this.getDicData('gnlx');
        this.getSysMenuList();
        this.getMenuAllList();
    },
    mounted(){
        console.log('mountde')
    },
        components: {
            paging
        },
    computed(){
        console.log('computed')
    },
    watch:{
        myDetail:function(older) {
          console.log(older)
            console.log(this)
            this.$refs.tree2.setCheckedKeys(myDetail)
        }
    },
    methods: {
        getDicData(str){//获取数据字典相关内容
            var dicList = JSON.parse(this.$getStore("gDictionaryList"))
            var filterarray = $.grep(dicList,function(value){
                return value.typegroupcode===str ;//筛选出其中一个，仍为一个数组
            });
            if(filterarray.length>0){//防止前端报错
                return filterarray[0].typeList;
            }
        },
        test(row, colum){//
            var filterarray = $.grep(this.gnlx,function(value){
                return value.typecode==row.menu_type ;//筛选出其中一个，仍为一个数组
            });
            if(filterarray.length>0){
                return filterarray[0].typename;
            }

        },
        sels: [],//表格选中列
        /**
         * 编辑按钮点击事件
         * @params {Number} index  行号
         * @params {Object} row 行对象
         */
        handleEdit(index, row) {
//console.log(row)

            this.$parent.changeDialog(row);

        },
        /**
         * 删除按钮点击事件
         * @params {Number} index   行号
         * @params {Object} row     行对象
         */
        handleDelete(index, row) {
            var _self = this;
            _self.deleteSysUserInfo(row);
        },
        /**
         * 删除部门信息
         * @params {Object} row|rows     行对象
         */
        deleteSysUserInfo(data){
            var _self = this;
            this.$confirm('此操作将永久删除此菜单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _self.$http.post('/system/menu/delsysmenuinfo', data).then(function (res) {
                    if (res.data && res.data.flag) {
                        _self.getSysMenuList();
                        _self.getMenuAllList();
                        _self.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }else{
                        _self.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
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
            this.getSysMenuList();
        },
        /**
         * 切换页码
         * @params {Number} val 页码
         */
        handleCurrentChange(val) {
            this.tabPage.currentPage = val;
            this.getSysMenuList();
        },
        /**
         * 多选框改变选中事件
         * @params {Array} val 当前所有选中行对象数组
         */
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.sels = val;
        },

        getSysMenuList(params){
            var data = {
                page: this.tabPage.currentPage,
                pageSize: this.tabPage.pageSize,
            };
            if (params) {
                data=Object.assign(data, params);
            }
            var _self = this;
            this.$http.get('/system/menu/getsysmenulist', {params: data})
                .then(function (res) {
                    if (res.data && res.data.flag) {
//                        console.log(res.data/)
                        _self.sysMenuTableData = res.data.data.rows;
                        _self.tabPage.totalNum = res.data.data.count;
                        _self.loading=false;
//                        console.log(_self.sysMenuTableData)
                    }else{
                        _self.loading=false;
                        _self.$message({
                            message: res.data.data,
                            type: 'warning'
                        });
                    }
                }).catch(function (error) {
                console.log(error);
                _self.loading=false;
                _self.$message({
                    message: '获取失败',
                    type: 'warning'
                });
            });
        },
        getMenuAllList(){
            var _self = this;
            _self.treeData=[];
            _self.$http.get('/system/menu/getsysmenualllist', {}).then(function (res) {
                if (res.data && res.data.flag) {
                    console.log(res.data.data)
                    _self.treeData=res.data.data
                    console.table(res.data.data)
                } else {
                    _self.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(function (err) {
                console.log(err);
            })
        },


    },
        props: ["myDetail"]
    }
</script>

<style scoped>
    .ws-tree{
        height:500px;
        /*position:absolute;*/
        overflow:auto
    }
</style>
