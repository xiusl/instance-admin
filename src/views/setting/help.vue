<template>
  <div class="container">
    <div class="mask"> 
    </div>
    <div class="content" style="display:flex;flex-direction:row;">
      
      <div style="display: flex;flex-direction:column;">
      <div style="display: flex;margin-top:80px;" class="">
        <img class="logo" src="//image.sleen.top/logo.png" style="height: 80px;"/>
        <p style="height:80px;line-height:80px;margin:0;margin-left:20px;font-size:32px;font-weight:bold;color:#fff;">哩嗑客户端</p>
      </div>
      <div>
        <p style="font-size:24px;color:white;margin-top:32px;">一个 "收集&分享" 社区</p>
      </div>
      </div>

      <img class="preview" src="//image.sleen.top/ppabc.png" />
    </div>


    <div style="position:absolute;width:100%;bottom:2%;">
      <p style="margin:0px;">Copyright © 2020 Like    联系我：<a href="mailto:help@xiusl.com">help@xiusl.com</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'help',
}
</script>

<style scoped>
.container {
  background: url('https://cdn.pixabay.com/photo/2020/05/05/17/52/sky-5134180_1280.jpg');
  width: 100%;
  height: 100%;
  position: absolute;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.mask {
  position:absolute;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
}
.content {
  position: absolute;
  left: 30%;
  top: 12%;
}
.content .logo {
  width: 80px;
  border-radius: 12px;
}
.content .preview {
  width: 240px;
  margin-left: 100px;
  border-radius:30px;
}
</style>
