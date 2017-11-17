<template>
    <div>


        <!--查询-->
        <h3>角色配置</h3>
        <el-form :inline="true"  class="demo-form-inline" ref="formInline">
            <el-form-item label="部门名称" prop="departname">
                <el-select v-model="depart" placeholder="请选择" @change="changeDepart" size="small">
                    <el-option
                        v-for="(item,index) in departs"
                        :label="item.departname"
                        :value="item.id"
                    :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="handleSave" size="small">保存</el-button>
                <el-button @click="resetChecked" size="small">清空</el-button>
            </el-form-item>
        </el-form>
        <el-tree :data="dataTree" show-checkbox=""  default-expand-all="" node-key="id" ref="tree" highlight-current :props="defaultProps" class="treePos">
        </el-tree>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                defaultProps: {
                    children: 'children',
                    label: 'rolename'
                },
                //dataTree:[],
                loading: true,
                departs:[],
                depart:'',
            }
        },
        props: ['dataTree','defaultKey','org_id'],

        created: function () {
        },
        mounted: function () {
            this.getSysDepartName();
        },
        components: {

        },

        computed: {
        },
        watch:{
            defaultKey:function(){
                this.$refs.tree.setCheckedNodes(this.defaultKey);
            },
            org_id:function(){
                this.depart = this.org_id;
            }
        },
        methods: {
            handleSave(){
                var oldArr = [];
                var d = this.defaultKey;
                for(var i=0; i<d.length; i++){
                    oldArr.push(d[i].id);
                }//原始数据转数组

                var newArr = this.$refs.tree.getCheckedKeys();
                var addList = [];
                var delList = [];
                if(d.length===0){
                    delList = [];
                    addList = newArr;
                }else{
                    var ar =oldArr.filter(function(n) {
                        return newArr.indexOf(n) != -1
                    });
                    addList =newArr.filter(function(n) {
                        return ar.indexOf(n) === -1
                    });
                    delList =oldArr.filter(function(n) {
                        return ar.indexOf(n) === -1
                    });
                }
                var params = {org_id:this.org_id,delList:delList,addList:addList};
                var _self = this;
                this.$http.post('/system/role/saveroledepart',params).then(function (res) {
                    if(res.data&&res.data.flag){
                        _self.$message({
                            message:'操作成功',
                            type:'success'
                        })
                    }
                }).catch(function (err) {
                    console.log(err)
                })
            },
            getSysDepartName(){
                var _self = this;
                this.$http.get('/api/sysDepartRouter/getsysDepartName').then(function(res){
                    if(res.data&&res.data.flag){
                        _self.departs = res.data.data;
                    }else {
                        _self.$message({
                            message:'查询错误',
                            type:'warning'
                        })
                    }
                }).catch(function (err) {
                    if(err){
                        _self.$message({
                            message:'连接错误',
                            type:'error'
                        })
                    }
                })
            },
            changeDepart(){
                this.$emit('changeDepart',this.depart);
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
            }
        }
    }
</script>

<style scoped>
    .treePos{
        height:498px;
        overflow-y: scroll;
    }
</style>
