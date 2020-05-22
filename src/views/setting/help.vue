<template>
  <div class="container">
    <el-row :gutter="10" type="flex" justify="center" style="margin-left: 0;margin-right: 0;" align="middle" class="my-row">
    <el-col :span="6" :xs="{span:0}"> 
      <div class="info">
        <img class="logo" src="//image.sleen.top/logo.png" style="height: 64px;"/>
        <p style="margin-top:8px;font-size:32px;font-weight:bold;color:#fff;">  
          哩嗑客户端
        </p>
        <p style="margin-top:8px;font-size:24px;color:white;">内容`收集&分享`社区</p>
        <img class="logo" src="//image.sleen.top/ercode.png" style="height: 80px;margin-top: 22px;"/>
      </div>
    </el-col>

    <el-col :span="6" :xl="{span:4}" :lg="{span:4}" :md="{span:6}" :sm="{span:6}" :xs="{span:12}">
      <img class="preview" src="//image.sleen.top/ppabc.png" />
      <div class="info2">
      <p style="font-size:32px;font-weight:bold;color:#fff;margin-top: 2px;">哩嗑</p>
      <img class="logo" src="//image.sleen.top/ercode.png" style="height: 80px;margin-top:0px;"/>
    </div>
    </el-col>


    
  </el-row>  
  <div style="position:absolute;width:100%;bottom:2%;">
      <p style="margin:0px;">Copyright © 2020 Like 联系我：<a href="mailto:help@xiusl.com">help@xiusl.com</a></p>
  </div>
  </div>
  
</template>

<script>
  import 'element-ui/lib/theme-chalk/display.css';
  export default {
    name: 'help',
  }
</script>

<style scoped>

* {
  margin: 0;
}
.container {
  background: url('https://cdn.pixabay.com/photo/2020/05/05/17/52/sky-5134180_1280.jpg');
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
}
.preview {
  width: 100%;
}
.info2 {
    display: none;
  }
  .my-row {
    margin-top: 64px;
  }
@media screen and (max-width: 1200px) {
  .info {
    display: block;
  }
  .info2 {
    display: none;
  }
  .my-row {
    margin-top: 48px;
  }
}
@media screen and (max-width: 768px) {
  .info {
    display: none;
  }
  .info2 {
    display: block;
  }
  .my-row {
    margin-top: 8px;
  }
}
@media screen and (min-width: 768px) and (max-width: 1200px) {
  .info {
    display: block;
  }
  .info2 {
    display: none;
  }
  .my-row {
    margin-top: 12px;
  }
}
@media screen and (min-width: 500px) and (max-width: 768px) {
  .info {
    display: block;
  }
  .info2 {
    display: none;
  }
  .my-row {
    margin-top: 0px;
  }
}

</style>
