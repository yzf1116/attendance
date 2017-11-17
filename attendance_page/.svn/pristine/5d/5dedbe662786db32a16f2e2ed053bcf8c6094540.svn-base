<template>
  <baidu-map class="bm-view" ak="BC5a336214cb85aee2645a8021d7a6d8" :center="center" @ready="handler">
    <div >
      <div class="searchDiv">
        <label>搜索</label>
        <div style="margin-top: 15px; display: inline-block; margin-left: 10px; width: 420px ">
          <el-input placeholder="请输入地址" v-model="addressInfo.address">
            <el-button slot="append" icon="search" @click="searchAddress"></el-button>
          </el-input>
        </div>
      </div>
      <div class="detailAddrDiv" >
        <label>地址</label>
        <div style="margin-top: 15px; display: inline-block; margin-left: 40px; width: 420px">
          <el-input placeholder="" v-model="addressInfo.Addr" >
          </el-input>
        </div>
        <br>
        <label>详细地址</label>
        <div style="margin-top: 15px; display: inline-block; margin-left: 10px; width: 420px">
          <el-input placeholder="" v-model="addressInfo.detailAddr" >
          </el-input>
        </div>
      </div>
    </div>
  </baidu-map>




</template>
<script>

  import {BaiduMap} from 'vue-baidu-map'
  export default {
    components: {
      BaiduMap
    },
    data () {
      return {
        center: {lng: 0, lat: 0},
        addressInfo:{
          address:'',
          detailAddr:'',
          Addr:'',
          lat:'',
          lng:''
        },

      }
    },
    methods: {
      handler ({BMap, map}) {
        this.mapObj={BMap:BMap,map:map};
        map.centerAndZoom(new BMap.Point(102.72,25.05),8);  // 初始化地图,设置中心点坐标和地图级别
        map.setCurrentCity("昆明");
        map.enableScrollWheelZoom(true);//开启鼠标缩放
        map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));// 左上角，添加比例尺
        map.addControl(new BMap.NavigationControl());//左上角，添加默认缩放平移控件
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
      },
      searchAddress(){
        if(this.addressInfo.address==''){
          return;
        }
        var _this=this;
        var map=this.mapObj.map;
        var BMap=this.mapObj.BMap;
        var myGeo = new BMap.Geocoder();
        var geoc = new BMap.Geocoder();
        map.clearOverlays();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(this.addressInfo.address, function(point){
          if (point) {
            map.centerAndZoom(point, 16);
            _this.marker=new BMap.Marker(point);
            _this.addressInfo.lng=point.lng;
            _this.addressInfo.lat=point.lat;
            geoc.getLocation(point, function(rs){
              var addComp = rs.addressComponents;
              _this.addressInfo.Addr= addComp.street  + addComp.streetNumber;
              _this.addressInfo.detailAddr=addComp.province + addComp.city  + addComp.district  + addComp.street  + addComp.streetNumber;
            });
             map.addOverlay(_this.marker);
            _this.marker.enableDragging();
            _this.marker.addEventListener("dragend", function (e) {
              var pt = e.point;
              _this.addressInfo.lng=pt.lng;
              _this.addressInfo.lat=pt.lat;
              geoc.getLocation(pt, function(rs){
                var addComp = rs.addressComponents;
                _this.addressInfo.Addr= addComp.street  + addComp.streetNumber;
                _this.addressInfo.detailAddr=addComp.province + addComp.city  + addComp.district  + addComp.street  + addComp.streetNumber;
              });
            })
          }else{
            alert("您选择地址没有解析到结果!");
          }
        });
      }
    }
  }



</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

  .bm-view {
    width: 100%;
    height: 500px;
  }
  .searchDiv{
    position:absolute;
    left:5%;
    top:100px;
    background: #fff;
    padding: 20px;
    width: 500px;
  }
  .detailAddrDiv{
    position:absolute;
    left:5%;
    bottom:100px;
    background: #fff;
    padding: 20px;
    width: 500px;
  }


</style>
