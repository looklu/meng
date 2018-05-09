<template>
  <!--线上报班-->
  <ul class="attendClass_list">
    <router-link :to="{path: 'content/'+item.id}" :key="item.courseId" tag="li" v-for="(item,index) in courseList" class="item">
      <img class="item_img" :src="item.coursePic">
      <div class="item_content">
        <div class="content_left">
          <div class="content_left_name">{{item.courseName}}</div>
          <div class="content_left_way">{{item.teachMode}}</div>
          <div class="content_left_city">开课城市：{{item.cities}}</div>
        </div>
        <div class="btn_apply">
          <div class="apply">立即报名</div>
          <div class="applied">{{item.personNum}}人学过</div>
        </div>
      </div>
    </router-link>
  </ul>

</template>

<script>
  import global_ from '../global/global.vue'

  export default {
    data(){
      return {
        courseList: [],
        userId: 'czy'
      }
    },
    created(){
      this.$api.post('list.do', null, r => {
        console.log(r)
        let courseList = r.content.courseList;
        console.log(courseList)
        this.courseList = courseList;
      });
    },
    mounted(){

    },
    methods:{

    }
  }
</script>

<style lang="scss">
  @import "../style/scss/index";
</style>
