<template>
    <div class="pageContent">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout='sizes,prev, pager, next, jumper, ->, total,slot'
            :total="total"
        >
        </el-pagination>
    </div>
</template>
<script>
    export default {
        methods: {
            handleSizeChange(val) {
                this.$emit('emitsizechange', val);//主动触发子组件，然后向父组件传递数据参数
            },
            handleCurrentChange(val) {
                this.$emit('emitcurrentchange', val);
            }
        },
        data() {
            return {
                pagination: {
                    position: 'absolute',
                    marginTop: '20px',
                    bottom: '20px',
                    zIndex: '999'
                }

            };
        },
        props: ['currentPage', 'pageSizes', 'pageSize', 'total']
    }
</script>
<style scoped>
    .pageContent {
        bottom: 20px;
        margin-top: 20px;
    }
</style>
