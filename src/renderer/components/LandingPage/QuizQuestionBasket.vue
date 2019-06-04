<template>
  <div class="quiz-question-basket">
    <div class="row">
      <div class="column">
        <div class="item" @click="$router.push('/quiz/quiz-question-basket-detail/4')">
          <i class="icon iconfont icon-yuwen"></i><br>
          <span>语文</span>
        </div>
      </div>
      <div class="column">
        <div class="item" @click="$router.push('/quiz/quiz-question-basket-detail/0')">
          <i class="icon iconfont icon-shuxue"></i><br>
          <span>数学</span>
        </div>
      </div>
      <div class="column">
        <div class="item" @click="$router.push('/quiz/quiz-question-basket-detail/1')">
          <i class="icon iconfont icon-yingyu"></i><br>
          <span>英语</span>
        </div>
      </div>
      <div class="column">
        <div class="item" @click="$router.push('/quiz/quiz-question-basket-detail/5')">
          <i class="icon iconfont icon-shengwu"></i><br>
          <span>生物</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <div class="item" @click="$router.push('/quiz/quiz-question-basket-detail/2')">
          <i class="icon iconfont icon-physic"></i><br>
          <span>物理</span>
        </div>
      </div>
      <div class="column">
        <div class="item" @click="$router.push('/quiz/quiz-question-basket-detail/3')">
          <i class="icon iconfont icon-chemistry"></i><br>
          <span>化学</span>
        </div>
      </div>
      <div class="column">
        <div class="item" @click="$router.push('/quiz/quiz-question-basket-detail/8')">
          <i class="icon iconfont icon-zhengzhi"></i><br>
          <span>政治</span>
        </div>
      </div>
      <div class="column">
        <div class="item" @click="$router.push('/quiz/quiz-question-basket-detail/7')">
          <i class="icon iconfont icon-dili"></i><br>
          <span>地理</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <div class="item" @click="$router.push('/quiz/quiz-question-basket-detail/6')">
          <i class="icon iconfont icon-lishi"></i><br>
          <span>历史</span>
        </div>
      </div>
      <div class="column">
        <div class="item" style="border: 0;">
        </div>
      </div>
      <div class="column">
        <div class="item" style="border: 0;">
        </div>
      </div>
      <div class="column">
        <div class="item" style="border: 0;">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .quiz-question-basket {
    padding: 5px 5px 15px 5px;
    background-color: #fff;
    .row {
      display: flex;
      width: 550px;
      margin: 30px auto 0;
      .column {
        flex: 1;
        text-align: center;
        margin: 8px 0;
        .item {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          padding: 10px;
          cursor: pointer;
          border-radius: 8px;
          border: 1px solid #007aff;
          i {
            font-size: 28px;
            color: #007aff;
          }
        }
      }
    }
  }
</style>

<script>
  export default {
    name: 'QuizQuestionBasket',
    data () {
      return {
      }
    }
  }
</script>
