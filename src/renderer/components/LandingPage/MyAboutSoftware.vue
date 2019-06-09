<template>
  <div class="c-my-about-software">
    <p class="title">学霸笔迹免责申明</p>
    <p class="content">
      本网站所提供的信息，只供参考之用。

      本网站及其雇员一概毋须以任何方式就任何信息传递或传送的失误、不准确或错误对用户或任何其他人士负任何直接或间接的责任。

      在法律允许的范围内，本网站在此声明,不承担用户或任何人士就使用或未能使用本网站所提供的信息或任何链接或项目所引致的任何直接、间接、附带、从属、特殊、惩罚性或惩戒性的损害赔偿（包括但不限于收益、预期利润的损失或失去的业务、未实现预期的节省）。

      本网站所提供的信息，若在任何司法管辖地区供任何人士使用或分发给任何人士时会违反该司法管辖地区的法律或条例的规定或会导致本网站或其第三方代理人受限于该司法管辖地区内的任何监管规定时，则该等信息不宜在该司法管辖地区供该等任何人士使用或分发给该等任何人士。用户须自行保证不会受限于任何限制或禁止用户使用或分发本网站所提供信息的当地的规定。

      本网站所收集的部分公开资料来源于互联网，转载的目的在于传递更多信息及用于网络分享，并不代表本站赞同其观点和对其真实性负责，也不构成任何其他建议。

      本网站图片、视频、文字之类版权申明，因为网站可以由注册用户自行上传图片、文字或者视频，本网站无法鉴别所上传图片、文字、视频的知识版权，对此类作品本站仅提供交流平台，不为其版权负责。如果您发现网站上有侵犯您的知识产权的作品，请与我们取得联系，我们会及时修改或删除。

      凡以任何方式登陆本网站或直接、间接使用本网站资料者，视为自愿接受本网站声明的约束。
    </p>
    <p class="author">软件开发者</p>
    <p class="date">2019.06.09</p>
  </div>
</template>

<style scoped lang="less">
  .c-my-about-software {
    height: 100%;
    overflow: auto;
    .title {
      text-align: center;
      margin: 30px;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      width: 96%;
      text-align: justify;
      line-height: 50px;
      margin: 0 auto;
      text-indent: 2em;
    }
    .author, .date {
      text-align: right;
      margin-top: 25px;
      padding-right: 2%;
      font-weight: bold;
    }
  }
</style>

<script>
  export default {
    name: 'MyAboutSoftware',
    data () {
      return {
      }
    }
  }
</script>
