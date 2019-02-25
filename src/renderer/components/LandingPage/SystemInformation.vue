<template>
  <div class="system-information">
    <!--electron: {{ electron }}<br />
    name: {{ name }}<br />
    node: {{ node }}<br />
    path: {{ path }}<br />
    platform: {{ platform }}<br />
    vue: {{ vue }}<br />-->
    <!--<iframe style="width: 844px;height: 475px;border: none;" src="http://www.xuebabiji.club/pdf/web/viewer.html?pdfUrl=/web/resources/d1cd41dv1h45f4.pdf"></iframe>-->
    <!--<iframe style="width: 844px;height: 475px;border: none;" src="http://www.xuebabiji.club/apps/wap/iframe.html?url=http://v1.go2yd.com/user_upload/1534052440562b4842aa28773d2f99944d45858756419.mp4_bd.mp4"></iframe>-->
    <!--<video src="http://pl.cp12.wasu.tv/playlist/m3u8?vid=XMTY1MzYxNTU3Mg&type=mp4&ups_client_netip=73e7232d&utid=XDUz3YozcmgDAFfK5zIIR6vs&ccode=010101500002&psid=0ab7e153eba45fd4bf27e8f7677f82bc&duration=841&expire=18000&drm_type=1&drm_device=12&ups_ts=1547028339&onOff=0&encr=0&ups_key=cf8f5e9c7f0cb2026032c61fe85c384b"></video>-->
    <!--<iframe style="width: 844px;height: 475px;border: none;" src="http://www.xuebabiji.club/apps/wap/iframe.html?url=http://v1.go2yd.com/user_upload/1534052440562b4842aa28773d2f99944d45858756419.mp4_bd.mp4"></iframe>-->
    <!--<iframe style="width: 844px;height: 475px;border: 1px solid #ccc;" src="https://view.officeapps.live.com/op/embed.aspx?src=http%3A%2F%2Fapi%2Eidocv%2Ecom%3A80%2Fdata%2Fdoc%2F%25E5%259C%25A8%25E7%25BA%25BF%25E6%2596%2587%25E6%25A1%25A3%25E9%25A2%2584%25E8%25A7%2588%25E7%2594%25A8%25E6%2588%25B7%25E6%2589%258B%25E5%2586%258C%2Edocx&amp;wdStartOn=1">这是嵌入 <a target="_blank" href="https://office.com">Microsoft Office</a> 文档，由 <a target="_blank" href="https://office.com/webapps">Office Online</a> 支持。</iframe>-->
    <!--<iframe style="width: 844px;height: 475px;border: 1px solid #ccc;" src="https://view.officeapps.live.com/op/embed.aspx?src=http%3A%2F%2Fapi%2Eidocv%2Ecom%3A80%2Fdata%2Fdoc%2F%25E5%259C%25A8%25E7%25BA%25BF%25E6%2596%2587%25E6%25A1%25A3%25E9%25A2%2584%25E8%25A7%2588%25E7%2594%25A8%25E6%2588%25B7%25E6%2589%258B%25E5%2586%258C%2Edocx&amp;wdStartOn=1">这是嵌入 <a target="_blank" href="https://office.com">Microsoft Office</a> 文档，由 <a target="_blank" href="https://office.com/webapps">Office Online</a> 支持。</iframe>-->
    <iframe style="width: 1024px;height: 500px;border: 1px solid #ccc;" src="https://view.officeapps.live.com/op/embed.aspx?src=http%3A%2F%2Fdtedu%2Dcmsdata%2Dprod%2Dpublic%2Eoss%2Dcn%2Dbeijing%2Ealiyuncs%2Ecom%3A80%2Fresource%2Fcontent%2Fres%2Dgopep%2Dcn%2Fresource%2Fppt%2F6d%2F66%2F6d66667229ac742bf02488b9e46e0369%2Fsrc%2F6d66667229ac742bf02488b9e46e0369%2Eppt&amp;wdAr=1.3333333333333333" width="350px" height="286px" frameborder="0">这是嵌入 <a target="_blank" href="https://office.com">Microsoft Office</a> 演示文稿，由 <a target="_blank" href="https://office.com/webapps">Office Online</a> 支持。</iframe>
  </div>
</template>

<style scoped>
  .system-information {
    color: red;
  }
</style>

<script>
  export default {
    name: 'system-information',
    data () {
      return {
        electron: process.versions.electron,
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version
      }
    }
  }
</script>
