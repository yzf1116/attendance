<template>

</template>

<script>
  /**
   * 下载excel
   * @param data 数据 格式 {header：{},body:[]} header：表头 body是表中字段数据
   *@param tableTitle 表格标题 不用标题设置为null
   * @param fileName 导出文件名
   * @param style 表格样式 格式{color:'',fillColor:'',border:{style:'dashed',color:'000000'}
   * border (可选参数) excel 边框样式 格式{style:'dashed',color:'000000'} style border样式 （none无边框，dotted ：点状边框。
   * dashed ：虚线。thin 	实线。double:双线。) color 颜色值为十六进制值的颜色（比如 ff0000）
   * tip (可选参数) 提示样式  title（可选参数）标题样式 ，header:（可选参数）表头样式
   *
   * color(可选参数，默认为黑色)  字体颜色 格式{color：'000000'}颜色值为十六进制值的颜色（比如 ff0000）
   * fillColor (可选参数，默认为白色)
   *
   */

  import xlsx from 'static/js/xlsx.js';
  import FileSaver from 'static/js/FileSaver.js';
  export default {
    data() {
      return {

      }
    }    ,
    components: {},
    computed: {},
    created: function () {

    },
    methods: {
      formatData(data,fileName,style){
        var tip=data.tip;
        var header=data.header;
        var body=data.body;
        var title=data.title;
        var color=style.color||'000000';
        var border=style.border||{style:'thin',color:'DADCDD'};
        var tipStyle=style.tip;
        var headerStyle=style.header;
        var titleStyle=style.title;
        var bodyStyle=style.body;
        var fillColor=style.fillColor||'ffffff';
        var ass_data=data.ass_data||[];
        var file = new xlsx.File();
        var sheet =file.addSheet('Sheet1');
        if(tip!=null){
          var tipRow = sheet.addRow();
          var tipCell=tipRow.addCell();
          tipRow.setHeightCM(0.8);
          tipCell.value=tip.field_name;
          tipCell.style.align.v = 'top';
          tipCell.style.align.h = 'left';
          tipCell.hMerge =header.length-1;
          tipCell.vMerge = 0;

          this.border(tipCell,{style:border.style,color:border.color})
          this.fillColor(tipCell,fillColor)
          tipCell.style.font.color=color;
          if(tipStyle){
            if(tipStyle.border){
              this.border(tipCell,{style:tipStyle.border.style,color:tipStyle.border.color})
            }
            if(tipStyle.fillColor){
              this.fillColor(tipCell,tipStyle.fillColor)
            }
            if(tipStyle.color){
              tipCell.style.font.color=tipStyle.color;
            }
          }
          sheet.row(0).height=160
        }

        if(title!=null){
          var headerRow = sheet.addRow();
          var hc=headerRow.addCell();
          hc.value=title.field_name;
          hc.style.align.v = 'center';
          hc.style.align.h = 'center';
          hc.hMerge =header.length-1;
          hc.vMerge = 0;
          this.border(hc,{style:border.style,color:border.color})
          this.fillColor(hc,fillColor)
          hc.style.font.color=color;
          if(titleStyle){
            if(titleStyle.border){
              this.border(hc,{style:titleStyle.border.style,color:titleStyle.border.color})
            }
            if(titleStyle.fillColor){
              this.fillColor(hc,titleStyle.fillColor)
            }
            if(titleStyle.color){
              hc.style.font.color=titleStyle.color;
            }
          }
        }
        if(header.length>0){
          var row = sheet.addRow();
          for(var i=0;i<header.length;i++){
            var cell=row.addCell();
            cell.value=header[i].field_name;
            cell.style.align.v = 'center';
            cell.style.align.h = 'center';
            this.border(cell,{style:border.style,color:border.color})
            this.fillColor(cell,fillColor)
            cell.style.font.color=color;
            sheet.col(i).width = 23;
            if(headerStyle){
              if(headerStyle.border){
                this.border(cell,{style:headerStyle.border.style,color:headerStyle.border.color})
              }
              if(headerStyle.fillColor){
                this.fillColor(cell,headerStyle.fillColor)
              }
              if(headerStyle.color){
                cell.style.font.color=headerStyle.color;
              }
            }
            if(header[i].is_required==1){
              cell.style.font.color = 'ff0000';
            }

          }

        }
        if(body!=undefined&&body.length>0){
          for(var i=0;i<body.length;i++){
            var row = sheet.addRow();
            for(var j=0;j<header.length;j++){
              var cell=row.addCell();
              if(header[j].association_type==1){
                this.stringJoin(cell,ass_data[header[j].field],body[i][header[j].map_field],header[j].association_field,header[j].association_parent_field,body[i][header[j].field])
              }else if(header[j].association_type==2){
                this.stringReplace(cell,ass_data[header[j].field],body[i][header[j].field],header[j].association_field,header[j].association_parent_field,body[i][header[j].field])
              }else{

                cell.value=body[i][header[j].field];
              }

              cell.style.align.v = 'center';
              cell.style.align.h = 'center';
              this.border(cell,{style:border.style,color:border.color})
              this.fillColor(cell,fillColor)
              cell.style.font.color=color;
              if(bodyStyle){
                if(bodyStyle.border){
                  this.border(cell,{style:bodyStyle.border.style,color:bodyStyle.border.color})
                }
                if(bodyStyle.fillColor){
                  this.fillColor(cell,bodyStyle.fillColor)
                }
                if(bodyStyle.color){
                  cell.style.font.color=bodyStyle.color;
                }

                if(bodyStyle.rows){
                  var bg=(i%2==0)?bodyStyle.rows.odd:bodyStyle.rows.even;
                  this.fillColor(cell,bg)
                }else if(bodyStyle.cols){
                  var bg=(j%2==0)?bodyStyle.cols.odd:bodyStyle.cols.even;
                  this.fillColor(cell,bg)
                }else{
                  this.fillColor(cell,bodyStyle.fillColor)
                }

              }
            }
          }
        }

        file.saveAs('blob')
          .then(function(content) {
            FileSaver(content, fileName);
          });
      },
      border(cell,borderStyle) {
        var style=borderStyle.style||'thin';
        var color=borderStyle.color||'DADCDD';
        cell.style.border.top = style;
        cell.style.border.topColor = color;
        cell.style.border.left = style;
        cell.style.border.leftColor = color;
        cell.style.border.bottom = style;
        cell.style.border.bottomColor = color;
        cell.style.border.right = style;
        cell.style.border.rightColor = color;
      },
      fillColor(cell,color){
        cell.style.fill.patternType = 'solid';
        cell.style.fill.fgColor = color||'ff0000';//背景颜色
      },
      stringJoin(cell,obj,id,field,fieldParent,str){
        if(!id){
          cell.value=str;
          return;
        }
        if(!obj[id]){
          cell.value=str;
          return ;
        }
        var ids=obj[id][fieldParent];
        str=obj[id][field]+'-'+str;
        if(obj[ids]){

          this.stringJoin(cell,obj,ids,field,fieldParent,str)
        }else{
          cell.value=str;
        }

      },
      stringReplace(cell,obj,id,field,fieldParent,str){
        if(!id){
          cell.value=str;
          return;
        }
        if(!obj[id]){
          cell.value='';
          return ;
        }
        var ids=obj[id][fieldParent];
        str=obj[id][field];
        cell.value=str;

      }

    }
  }
</script>
