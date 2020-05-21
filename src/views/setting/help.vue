<template>
    <el-row :gutter="10" class="container">
        <el-col :lg="3" :xl="1" :span="8" :offset="6"> 
        <img class="logo" src="//image.sleen.top/logo.png" style="height: 80px;"/>
        <p style="height:80px;line-height:80px;font-size:32px;font-weight:bold;color:#fff;">哩嗑客户端</p>
        <p style="font-size:24px;color:white;">内容 "收集&分享" 社区</p>

        </el-col>
        <el-col  :lg="9" :xl="11" :span="4">
      <img class="preview" src="//image.sleen.top/ppabc.png" />
        </el-col>

    <div style="position:absolute;width:100%;bottom:2%;">
      <p style="margin:0px;">Copyright © 2020 Like    联系我：<a href="mailto:help@xiusl.com">help@xiusl.com</a></p>
    </div>
    </el-row>  
</template>

<script>
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
}
.preview {
  width: 240px;
  border-radius:30px;
}
</style>
