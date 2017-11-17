<template>
  <div class="mapContent">
    <baidu-map class="bm-view" ak="BC5a336214cb85aee2645a8021d7a6d8" :zoom="zoom" :center="center" @ready="handler"
               @click="mapClick">
      <div class="searchDiv">
        <div style="margin-top: 15px; display: inline-block; margin-left: 10px; width: 420px ">
          <bm-auto-complete v-model="keyword">
            <el-input placeholder="输入可进行精确查找" style="width: 300px;">
            </el-input>
          </bm-auto-complete>
          <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location" :panel="false"
                           :pageCapacity=1 ref="localsearch"
                           @searchcomplete="searchcomplete"
          ></bm-local-search>
        </div>

      </div>
      <div class="detailAddrDiv" >
        <el-input v-model="AddresInfo.location" placeholder="地址名称" ></el-input>
        <el-input v-model="AddresInfo.address" :disabled="true" placeholder="地址详情" style="margin-top: 10px;"></el-input>
      </div>


    </baidu-map>
  </div>
</template>

<script>
  import {BaiduMap, BmLocalSearch, BmAutoComplete, bmControl} from 'vue-baidu-map'
  export default {
    components: {
      BaiduMap,
      BmAutoComplete,
      bmControl,
      BmLocalSearch
    },
    data () {
      return {
        AddresInfo: {
          location: '',
          address: '',
          x_point: '',
          y_point: '',
        },

        center: {lng: 0, lat: 0},
        zoom: 10,
        location: '昆明',
        keyword: '',

      }
    },

    methods: {

      /**
       * 百度地图初始化方法
       * @param BMap 百度地图 BMap 核心类
       * @param map  百度地图 map 实例
       */
      handler ({BMap, map}) {
        this.mapObj = {BMap: BMap, map: map};
        map.centerAndZoom(new BMap.Point(102.72, 25.05), 12);  // 初始化地图,设置中心点坐标和地图级别
        map.setCurrentCity("昆明");
        map.enableScrollWheelZoom(true);//开启鼠标缩放
        map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));// 左上角，添加比例尺
        map.addControl(new BMap.NavigationControl());//左上角，添加默认缩放平移控件
      },
      /**
       * 设置百度地图缩放
       * @param level  缩放级别
       */
      addZoom (level) {
        this.zoom = level
      },

      /**
       *百度地图检索完成后的回调函数
       * @param result [Array] 回调结果
       */
      searchcomplete(result){
        if (result && result.vr.length > 0) {
          this.AddresInfo.location = result.vr[0].title;
          this.AddresInfo.address = result.vr[0].address;
          this.AddresInfo.x_point = result.vr[0].point.lat;
          this.AddresInfo.y_point = result.vr[0].point.lng;
        } else {
          this.AddresInfo.location = '';
          this.AddresInfo.address = '';
          this.AddresInfo.x_point = '';
          this.AddresInfo.y_point = '';

        }

      },
      /**
       * 百度地图 清除检索结果
       */
      clearResults(){
        this.$refs.localsearch.clearResults()
      },
      /**
       * 百度地图Click 事件
       * @param value  点击获取坐标信息
       */
      mapClick(value){
        const map = this.mapObj.map;
        const _slef = this;
        map.clearOverlays();
        let geoc = new BMap.Geocoder();
        let point = '';
        geoc.getLocation(value.point, (res) => {
//          if (res.surroundingPois.length > 0) {
//            point = res.surroundingPois[0].point;
//            _slef.AddresInfo.location = res.surroundingPois[0].title;
//            _slef.AddresInfo.address = res.surroundingPois[0].address;
//            _slef.AddresInfo.x_point = res.surroundingPois[0].point.lat;
//            _slef.AddresInfo.y_point = res.surroundingPois[0].point.lng;
//          } else {
            point = res.point;
            _slef.AddresInfo.location = res.address;
            _slef.AddresInfo.address = res.address;
            _slef.AddresInfo.x_point = res.point.lat;
            _slef.AddresInfo.y_point = res.point.lng;
//          }

          map.centerAndZoom(point);
          const marker = new BMap.Marker(point);
          map.addOverlay(marker);            //增加点
        });

      }
    },
    watch: {
      /**
       *监听keyword的值，当值为''时，情况地址对象
       */
      keyword(){
        if (this.keyboard == '') {
          this.AddresInfo.location = '';
          this.AddresInfo.address = '';
          this.AddresInfo.x_point = '';
          this.AddresInfo.y_point = '';
        }
      }
    }
  }
</script>

<style>
  /****必要设置***/
  .mapContent .tangram-suggestion-main {
    z-index: 99999;
  }

  .bm-view {
    width: 100%;
    height: 450px;
  }

  .searchDiv {
    position: absolute;
    left: 5%;
    top: 10%;
    border-radius: 2px 0 0 2px;
  }

  .detailAddrDiv {
    position: absolute;
    left: 0%;
    bottom: 60px;
    padding: 10px;
    background: #fff;
    width: 300px;
  }
</style>
