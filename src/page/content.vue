<template>
  <!--详情--立即预约-->
  <div class="camp">
    <div class="top">
      <img v-if="detail.coursePic !== ''" class="camp_img" :src="detail.coursePic">
      <div class="camp_title">{{detail.courseName}}</div>
      <div v-html="detail.courseDesc" class="camp_content"></div>
    </div>
    <div class="bottom">
      <div class="ul_box">
        <ul class="camp_city" id="camp_city">
          <li class="city_name" v-for="(item,index) in places" :key="item.courseId" @click="selectPlace(index)" :class="{active:index==current}">{{item.city}}<i></i></li>
        </ul>
      </div>
      <div class="bottom_content">
        <div class="content_time">开课时间：{{places[current].beginDate}}</div>
        <div class="content_place">开课地点：{{places[current].address}}</div>
        <div class="content_teacher">课程导师：{{places[current].teachers}}</div>
        <div class="content_number">培训名额：{{places[current].containNum}}人
          <span style="float: right">仅剩<span class="main_number">{{places[current].remainNum}}</span>人</span>
        </div>
        <div class="content_price">课程价格：<span class="main_number">{{places[current].discountPrice}}</span>/人（合作校尊享）<br/>
          <span style="margin-left: 1.4rem"><span class="main_number">{{places[current].price}}</span>/人（非合作校尊享）</span>
        </div>
        <div class="content_phone">联系电话：{{places[current].mobile}}</div>
      </div>
    </div>
    <router-link v-if="places[current].remainNum > 0" :to="{path: '/apply/'+places[current].id}" key="0" tag="div" class="btn_appointment">选择该场次</router-link>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        current:0,
        detail:{},
        places: []
      }
    },
    created(){
      this.getData()
    },
    updated(){
      this.cityUlWidth()
    },
    methods:{
      getData() {
        let courseId = this.$route.params.id;
        console.log('1111------>'+this.nativeUserid)
        console.log('1111------>'+this.nativeToken)
        this.$api.post('detail.do', {'userId':this.nativeUserid,'courseId':courseId,'token':this.nativeToken}, r => {
          this.detail = r.content.course
          this.places = r.content.course.scheduleList
          console.log(JSON.stringify(r))
        });
      },
      cityUlWidth(){
        let liLength = document.getElementsByClassName("city_name").length;
        let liWidth = document.getElementsByTagName('li')[0].clientWidth;
        document.getElementsByClassName("camp_city")[0].style.width = (liWidth*liLength+50)+'px';
      },
      toApply(){
        this.$router.push({path: '/apply'})
      },
      selectPlace(index){
        this.current = index;
      }
    }
  }
</script>

<style lang="scss">
  @import "../style/scss/content";
</style>
