<template>
  <!--线下报班-新增参会者-->
  <div class="attendee">
    <div class="attendee_name">
      <div class="attendee_title">
        姓名
        <span>*</span>
      </div>
      <input class="attendee_input" type="text" placeholder="与参会人实际姓名一致" v-model="personObj.attendeeName">
    </div>
    <div class="attendee_name">
      <div class="attendee_title">
        联系电话
        <span>*</span>
      </div>
      <input id="name" class="attendee_input" type="text" placeholder="与参会人实际联系方式一致" v-model="personObj.mobile" onkeyup="value=value.replace(/[^\d]/g,'')">
    </div>
    <div class="attendee_name">
      <div class="attendee_title">
        所属机构
        <span>*</span>
      </div>
      <input class="attendee_input" type="text" placeholder="默认数据同该用户所属机构" v-model="personObj.organization">
    </div>
    <div class="attendee_name">
      <div class="attendee_title">职务</div>
      <input class="attendee_input" type="text" v-model="personObj.job">
    </div>
    <div class="btn_confirm" @click="submit">确定</div>
  </div>
</template>

<script>
  import global_ from '../global/global'

  export default {
    data() {
      return {
        personObj: {}
      }
    },
    created() {
      console.log(this.$route.params)
      this.personObj = this.$route.params;
      console.log(global_.selectList)
    },
    methods: {
      submit() {
        // alert(11111)
        let userId = this.$route.params.userId
        let name = this.personObj.attendeeName
        let attendeeId = this.personObj.attendeeId
        let mobile = this.personObj.mobile
        let organization = this.personObj.organization
        let job = this.personObj.job
        let type = this.personObj.type
        console.log(this.personObj);
        let phoneFlg=/^[1][3,4,5,7,8][0-9]{9}$/.test(mobile.replace(/(^\s*)|(\s*$)/g, ""));
        if(name !== '' && phoneFlg && organization !== ''){
          if (type === '1') {
            //新增参会人
            this.$api.post('attendee/add.do', {
              'userId': this.nativeUserid,
              "token": this.nativeToken,
              "name": name,
              "mobile": mobile,
              "organization": organization,
              "job": job
            }, r => {
              if (r.returnNo === '0000') {
                console.log(r)
                this.$router.push({path: '/buy'})
              }
            });
          }
          else if (type === '0') {
            //修改参会人信息
            this.$api.post('attendee/update.do', {
              'userId': this.nativeUserid,
              "token": this.nativeToken,
              "id": attendeeId,
              "name": name,
              "mobile": mobile,
              "organization": organization,
              "job": job
            }, r => {
              if (r.returnNo === '0000') {
                let jj = {
                  'userId': 'b91d23c7eb8343c2a9389c721c4084c8',
                  "id": this.personObj.attendeeId,
                  "name": this.personObj.attendeeName,
                  "mobile": mobile,
                  "organization": organization,
                  "job": job
                }
                //测试开始
                for (let i = 0; i < global_.selectList.length; i++) {
                  console.log(global_.selectList[i].id);
                  console.log(this.personObj.attendeeId);
                  if (global_.selectList[i].id === this.personObj.attendeeId) {
                    global_.selectList.splice(i, 1, jj)
                  }
                }
                //测试结束
                console.log(r);
                this.$router.push({path: '/buy'})
              }
            });
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../style/scss/addAttendee";
</style>
