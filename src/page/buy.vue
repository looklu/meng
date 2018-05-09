<template>
  <!--线下报班-购买-->
  <div class="buy">
    <!--去除bottom以外加模态层部分-->
    <div class="remove_bottom">
      <div class="buy_top">
        <div class="top_title">这是标题这是标题</div>
        <div class="top_time">有效期：2018.03.05-2018.12.30</div>
      </div>
      <div class="explain">
        <div class="explain_list"><i></i>成为合作校单张最多乐意省400元</div>
        <div class="explain_list"><i></i>该票种优先用于任意场次使用</div>
        <div class="explain_list"><i></i>该票有效期为1年，1年内未使用将会失效</div>
      </div>
      <div class="people_list">
        <div class="people_title">
          <div class="title_name">参会人</div>
          <div class="title_message">请确保姓名联系电话填写正确</div>
          <div @click="attendeeList" class="btn_select">选择参会人</div>
        </div>
        <!--可滚动区域-->
        <div class="people_message">
          <ul class="people_ul" v-for="item,index in selectList">
            <li class="people_li">
              <span @click="deleteLi(index)" class="icon_img"></span>
              <router-link v-if="item.job !== '' && item.job !== 'undefined'" :to="{path: 'attendee/'+'b91d23c7eb8343c2a9389c721c4084c8'+'/'+item.id+'/'+item.name+'/'+item.mobile+'/'+item.organization+'/'+ item.job+'/0'}" tag="div" class="phone_name" key="gg">
                <div class="people_name">{{item.name}}</div>
                <div class="people_phone">{{item.mobile}}</div>
                <i class="icon_arrow_right"></i>
              </router-link>
              <router-link v-else :to="{path: 'attendee/'+'b91d23c7eb8343c2a9389c721c4084c8'+'/'+item.id+'/'+item.name+'/'+item.mobile+'/'+item.organization+'/0'}" tag="div" class="phone_name" key="gg">
                <div class="people_name">{{item.name}}</div>
                <div class="people_phone">{{item.mobile}}</div>
                <i class="icon_arrow_right"></i>
              </router-link>
              <div style="clear: both;"></div>
            </li>
          </ul>
          <!--联系人姓名和手机号-->
          <div class="linkman">
            <div class="linkman_name">联系人</div>
            <input class="linkman_input" type="text" id="linkName" placeholder="请输入联系人姓名" v-model="concat_people">
          </div>
          <div class="linkman">
            <div class="linkman_name">手机号</div>
            <input class="linkman_input" type="text" id="phoneNumber" placeholder="请输入联系人手机号" v-model="concat_people_phone" onkeyup="value=value.replace(/[^\d]/g,'')">
          </div>
        </div>
      </div>
      <!--点击明细弹框开始-->
      <div class="modal" :class="{modal_active: modal_active}"></div>
      <div class="modal_price_detail" :class="{modal_price_detail_active: modal_active}">
        <div class="detail_title">费用明细</div>
        <div class="detail_content">
          <span class="detail_name">培训门票</span>
          <span class="detail_price">{{unit_price}}<span class="detail_unit">C币</span></span>
          <span class="detail_num">×{{selectList.length}}张</span>
        </div>
      </div>
      <!--点击明细弹框结束-->
    </div>
    <div class="buy_bottom">
      <div class="price">
        <div class="price_message">
          <!--<span class="price_img">¥</span>-->
          <span class="price_number">{{unit_price*selectList.length}}<span class="price_unit">C币</span></span>
          <span class="num">共{{selectList.length}}人</span>
        </div>
        <div @click="showDetail" class="price_detail">明细<i :class="{active:modal_active}"></i></div>
      </div>
      <div class="toPay" @click="toPay">去付款</div>
    </div>
    <!--去付款弹框-->
    <div class="modal_toPay" :class="{toPay_active: peopleContent}">
      <div class="modal_content">
        <div class="modal_content_title">提示</div>
        <div class="modal_content_message">您当前填写信息缺失或者存在错误，请补全信息</div>
        <div @click="toPay" class="modal_content_revise">稍作修改</div>
      </div>
    </div>
    <!--点击选择参会人弹框开始-->
    <div class="select_attendee_modal" :class="{select_attendee_modal_active: attendee_modal}">
      <div class="attendee_modal_content">
        <div class="content_title">
          <div @click="selectAttendee(-1)" class="btn_cancel">取消</div>
          <div @click="toAddAttendee" class="btn_add">新增参会人</div>
        </div>
        <ul class="content_list">
          <li class="list_li" v-for="item,index in personList">
            <router-link v-if="item.job !== ''" :to="{path: 'attendee/'+'b91d23c7eb8343c2a9389c721c4084c8'+'/'+item.id+'/'+item.name+'/'+item.mobile+'/'+item.organization+'/'+ item.job+'/0'}" tag="span" class="list_icon_img" key="cc">
            </router-link>
            <router-link v-else :to="{path: 'attendee/'+'b91d23c7eb8343c2a9389c721c4084c8'+'/'+item.id+'/'+item.name+'/'+item.mobile+'/'+item.organization+'/0'}" tag="span" class="list_icon_img" key="cc">
            </router-link>
            <div class="list_phone_name" @click="check(index)">
              <div class="list_people_name">{{item.name}}</div>
              <div class="list_people_phone">{{item.mobile}}</div>
              <i class="list_icon_arrow_right" :class="{list_icon_arrow_select: isSelect(index) }"></i>
            </div>
            <div style="clear: both;"></div>
          </li>
        </ul>
        <div @click="selectAttendee(1)" class="btn_confirm">确定</div>
      </div>

    </div>
    <!--点击选择参会人弹框结束-->
  </div>
</template>

<script>
  import global_ from '../global/global'
  export default {
    data(){
      return {
        unit_price: global_.toPayObj.discountPrice,
        modal_active: false,
        peopleContent: false,
        attendee_modal: false,
        current: [],
        personList: [],
        select: [],
        selectList: global_.selectList,
        concat_people: '',   //联系人
        concat_people_phone: '',   //联系人手机号
      }
    },
    created(){
      console.log(this.selectList)
    },
    methods:{
      attendeeList() {
        this.attendee_modal = !this.attendee_modal
        this.$api.post('attendee/list.do', {'userId':this.nativeUserid,"token":this.nativeToken}, r => {
          let personList = r.content.attendeeList
          this.personList = personList
        });
      },
      showDetail(){
        this.modal_active = !this.modal_active;
      },
      toAddAttendee(){
        this.$router.push({
          path: "/attendee/b91d23c7eb8343c2a9389c721c4084c8/ / / / /1"
        });
      },
      toPay(){
        let linkName = document.getElementById('linkName').value;
        let sMobile = document.getElementById('phoneNumber').value;
        //  把选择数量和联系人、联系人手机号拼接到对象开始
        let num = {count: global_.selectList.length}
        let concat_people = {concatPeople: this.concat_people}
        let concat_people_phone = {concatPeoplePhone: this.concat_people_phone}
        // 处理参会人id塞到对象中开始
        let arr = []
        for(let i=0;i<this.selectList.length;i++){
          arr.push(this.selectList[i].id);
        }
        let attendId = { attendId : arr.join(',')}
        // 处理参会人id塞到对象中结束
        let toPayObj =  Object.assign(global_.toPayObj, concat_people, concat_people_phone, num, attendId);
        console.log(JSON.stringify(toPayObj))
        // 把选择数量和联系人、联系人手机号拼接到对象结束
        console.log(sMobile.length)
        if(!(!!sMobile.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)) || linkName === '' || this.selectList.length === 0){
          this.peopleContent = !this.peopleContent;
        }
        else {
          let u = navigator.userAgent;
          let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if(isAndroid){
            // window.photo.toPay(JSON.stringify(global_.toPayObj));
            window.photo.toPay(JSON.stringify(toPayObj));
          }else {
            window.webkit.messageHandlers.photo.postMessage({"method": "toPay","toPayObj":toPayObj});
          }
        }

      },
      selectAttendee(a){
        this.attendee_modal = !this.attendee_modal
        console.log(this.current.length)
        if(a === 1 && this.current.length !== 0){
          //点击确定且选择不为空时候
          // console.log(this.select)      //选中的对象数组（该注释不要删）
          // console.log(this.selectList)  //已经选过的对象数组（该注释不要删）
          // 点击确定时候判断selectList中是否已经有该选中对象
          for(let i=0;i<this.select.length;i++){
            this.current[i] = false     //不管selectList中存在不存在已勾选的，点击确定都重置为不勾选
            if(JSON.stringify(this.selectList).indexOf(JSON.stringify(this.select[i])) === -1){
              this.selectList.push(this.select[i])
            }
          }
        }
      },
      check(index){
        if(this.select.includes(this.personList[index])){
          //如果已选中，就取消
          //取消选中效果
          let ret = [];
          for(let i=0;i<this.current.length;i++){
            if(this.current[i] !== index){
              ret.push(this.current[i])
            }
          }
          //从select数组中删除这个选项
          this.current = ret;
          let ret1 = [];
          for(let y=0;y<this.select.length;y++){
            if(this.select[y] !== this.personList[index]){
              ret1.push(this.select[y])
            }
          }
          this.select = ret1;
          console.log(this.select)
        }else{
          //如果未选中，就选中
          this.current.push(index);
          //如果选中就push到select数组中
          this.select.push(this.personList[index]);
          console.log(this.select)
        }
      },
      isSelect(index){
        if(this.current.includes(index)){
          return true;
        } else{
          return false;
        }
      },
      deleteLi(obj){
        this.selectList.splice(obj,1)
      }
    }
  }
</script>

<style lang="scss">
  @import "../style/scss/buy";
</style>
