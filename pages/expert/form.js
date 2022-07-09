var that;
import Api from '../../config/api';
import WxValidate from '../../utils/WxValidate';
Page({
  data: {
    sexArray:['请选择性别','男','女']
  },
  async onLoad(options) {
    that = this;
    let res = await Api.expertDetail({
      id:options.id
    });
    that.setData({
      expert:res.data
    })
    that.initValidate();
  },
  initValidate() {
    const rules ={     
      name: {
        required: true
      },
      phone: {
        required: true
      },
      sex: {
        min: 1
      }
    };
    const messages = {      
      name: {
        required: "请输入专家姓名"
      },
      phone: {
        required: "请输入专家手机号"
      },
      sex: {
        required: "请输入公司名称"
      }
    };
    that.WxValidate = new WxValidate(rules, messages);
  },
  showTips(msg, type = "error") {
    that.setData({
      msg: msg,
      type: type,
      show: true
    })
  },
  pickerChange(e){
    console.log(e);
    let type = e.currentTarget.dataset.type;
    that.setData({
      ['expert.'+type]:e.detail.value
    })
  },
  async submit(e){
    console.log(e)
    if (!that.WxValidate.checkForm(e.detail.value)) {
      console.log(that.WxValidate)
      let error = that.WxValidate.errorList[0]
      that.showTips(error.msg)
      return false;
    }
    let res = await Api.expertUpdate(JSON.stringify(e.detail.value));
    console.log(res);
    if(res.code==0){ 
      that.showTips("信息修改成功","success");     
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1,
        })
      },2000)
    }else{
      that.showTips(res.msg)
    }
  }
})