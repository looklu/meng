<style lang="scss">
  @import "../style/scss/apply";
  /*@import url("../../static/css/swiper.min.css");*/
  @import "../../static/css/swiper.min.css";
</style>
<template>
  <!--详情--立即预约-->
  <div class="apply_modal">
    <div class="apply_top">
      <img class="apply_img" src="../../static/image/index/item.jpg">
      <div class="apply_time">
        <div class="left">
          <div class="left_top">c币 <span>{{detail.discountPrice}}</span></div>
          <span class="left_bottom">
            C币{{detail.price}}<i></i>
          </span>
        </div>
        <div class="center" v-if="level !== '-1'">V{{level}}合作校用户专享</div>
        <div class="center" v-else>非合作校用户尊享</div>
        <div class="right" id="right">
          <div v-if="this.mss < 0" class="stop_apply">报名已截止</div>
          <div v-else class="right_top">距离报名截止：</div>
          <div v-if="this.mss > 0" class="right_bottom">
            <span>{{days}}</span>天<span>{{hours}}</span> : <span>{{minutes}}</span> : <span>{{seconds}}</span>
          </div>
        </div>
      </div>
    </div>

    <!--下边内容部分-->
    <div class="apply_content">
      <div class="apply_title">{{detail.name}}</div>
      <div class="time_place">
        <div class="place">
          <i></i>{{detail.city}}{{detail.address}}
        </div>
        <div class="time">
          <i></i>{{detail.beginDate}}~{{detail.endDate}}
        </div>
      </div>
      <!--富文本编辑器-->
      <div class="text_content home_banner" v-if="smallCourseList.length !== 0">
        <div class="swiper-container box">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in smallCourseList">
              <div class="smallList_header">课程</div>
              <p>课程：{{item.name}}</p>
              <p>主讲人：{{item.teacher}}</p>
              <p>课程时间：{{item.beginDate}} -- {{item.endDate}}</p>
            </div>
            <!--<div class="swiper-pagination"></div>-->
          </div>

        </div>
      </div>
    </div>

    <!--底部按钮-->
    <div class="apply_bottom">
      <div @click="phone" class="call_phone">电话咨询</div>
      <div v-if="mss < 0" class="btn_apply" style="background-color: lightgray;color: #000000">立即报名</div>
      <div v-else class="btn_apply" @click="toBuy">立即报名</div>

      <!--<div class="btn_apply" @click="toBuy">立即报名</div>-->
    </div>

  </div>
</template>

<script>
  import global_ from '../global/global'
  import Swiper from '../../static/js/swiper.min'
  export default {
    data(){
      return {
        detail: {},
        smallCourseList: [],
        time: '',     //后台获取过来的结束时间毫秒数
        mss: '',      //结束毫秒数-当前时间毫秒数（报名结束毫秒数）
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
        phoneNumber: '',
        level: ''
      }
    },
    created(){
      // this.getData();
    },
    mounted() {
      // this.swiper();
      setTimeout(()=>{this.swiper()},500)
      this.getData();
    },
    methods:{
      getData() {
        let scheduleId = this.$route.params.id;
        console.log(scheduleId)
        this.$api.post('schedule/detail.do', {'userId':this.nativeUserid,'scheduleId':scheduleId,'token':this.nativeToken}, r => {
          this.detail = r.content.schedule
          this.smallCourseList = r.content.schedule.smallCourseList
          this.phoneNumber = r.content.schedule.mobile
          this.level = r.content.schedule.level
          console.log(JSON.stringify(r))
          // 换算毫秒为天时分秒
          this.time = r.content.schedule.deadline;    //结束时间毫秒数
          console.log(this.time)
          //全局的去付款支付界面需要对象数据
          global_.toPayObj = r.content.schedule;
          console.log(global_.toPayObj)

          setInterval(() => {
            let nowTime = new Date().getTime();
            this.mss = this.time - nowTime;             //报名截止时间毫秒数
            // this.mss = 1521343809792 - nowTime;             //报名截止时间毫秒数
            this.days = parseInt(this.mss / (1000 * 60 * 60 * 24));
            this.hours = parseInt((this.mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = parseInt((this.mss % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = parseInt((this.mss % (1000 * 60)) / 1000);
            if(this.hours < 10){
              this.hours = '0'+ this.hours
            }
            if(this.minutes < 10){
              this.minutes = '0'+ this.minutes
            }
            if(this.seconds < 10){
              this.seconds = '0'+ this.seconds
            }
          }, 1000)

        });
      },
      toBuy(){
        this.$router.push({path: '/buy'})
      },
      swiper(){
        let mySwiper = new Swiper('.swiper-container', {
          autoplay:{
            stopOnLastSlide:false,
            loop : true,
          }
        });
      },
      phone(){
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let phoneNumber = {phoneNumber: this.phoneNumber}
        console.log(phoneNumber)
        if(isAndroid){
          window.photo.callUp(JSON.stringify(phoneNumber));
        }else {
          window.webkit.messageHandlers.photo.postMessage({"method": "callUp",'phoneNumber': phoneNumber});
        }
      }
    }
  }
</script>

