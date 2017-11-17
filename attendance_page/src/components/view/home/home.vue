<template>
    <div style="width:100%;height:100%">
        <IEcharts :resizable=false :option="option" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
    </div>
</template>

<script type="text/babel">
import IEcharts from 'vue-echarts-v3/src/full.vue';
export default {
    name: 'view',
    components: {
        IEcharts
    },
    props: {
    },
    data: () => ({
        loading: false,
        option: {

            title: {
                text: '动态数据',
                subtext: '纯属虚构'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#283b56'
                    }
                }
            },
            legend: {
                data: ['最新成交价', '预购队列']
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { readOnly: false },
                    restore: {},
                    saveAsImage: {}
                }
            },
            dataZoom: {
                show: false,
                start: 0,
                end: 100
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    data: (function () {
                        var now = new Date();
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                },
                {
                    type: 'category',
                    boundaryGap: true,
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(len + 1);
                        }
                        return res;
                    })()
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    name: '价格',
                    max: 30,
                    min: 0,
                    boundaryGap: [0.2, 0.2]
                },
                {
                    type: 'value',
                    scale: true,
                    name: '预购量',
                    max: 1200,
                    min: 0,
                    boundaryGap: [0.2, 0.2]
                }
            ],
            series: [
                {
                    name: '预购队列',
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(Math.round(Math.random() * 1000));
                        }
                        return res;
                    })()
                },
                {
                    name: '最新成交价',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 0;
                        while (len < 10) {
                            res.push((Math.random() * 10 + 5).toFixed(1) - 0);
                            len++;
                        }
                        return res;
                    })()
                }
            ]

        }
    }),
    methods: {
        onReady(instance) {
            console.log(instance);
        },
        onClick(event, instance, echarts) {
            console.log(arguments);
        }
    },
    created() {

    },
    mounted() {

    }
};
</script>

<style scoped>
.echarts {
    width: 400px;
    height: 400px;
}
</style>