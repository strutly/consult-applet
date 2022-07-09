var that;
import Api from "../../config/api";
import WxValidate from "../../utils/WxValidate";
Page({
  data: {
    types:['请选择问题类型','普通咨询','付费咨询'],
    formData:{
      type:0
    },
    minDate:new Date().toLocaleDateString()
  },
  onLoad(options) {
    that = this;
    that.setData({
      toid:options.id
    });
    that.initValidate();
  },
  initValidate() {
    const rules = {
      type: {
        required: true,
        min: 1
      },
      appointmentTime: {
        required: true
      },
      appointmentDate: {
        required: true
      },
      content:{
        required:true
      }
    };
    const messages = {
      type: {
        required: '请选择问题类型',
        min: '请选择问题类型'
      },
      appointmentTime: {
        required: '请选择预约时间'
      },
      appointmentDate: {
        required: '请选择预约日期'
      },
      content:{
        required:'请简要描述咨询内容'
      }
    };
    that.WxValidate = new WxValidate(rules, messages);
  },
  pickerChange(e){
    console.log(e);
    let name = e.currentTarget.dataset.name;
    that.setData({
      ['formData.'+name]:e.detail.value
    })
  },
  showTips(msg, type = "error") {
    that.setData({
      msg: msg,
      type: type,
      show: true
    })
  },
  async submit(e) {
    console.log(e);
    if (!that.WxValidate.checkForm(e.detail.value)) {
      console.log(that.WxValidate)
      let error = that.WxValidate.errorList[0]
      that.showTips(error.msg)
      return false;
    }
    let data = e.detail.value;
    data.toUser = {id:that.data.toid};
    let res = await Api.addAppointment(data);
    
    console.log(res);
    if (res.code == 0) {
      that.showTips("提交成功,请耐心等待审核", "success");
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 2000)
    }else{
      that.showTips(res.msg||"出错了","error");
    }
  }

})