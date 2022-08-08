var that;
import Api from "../../config/api";
import WxValidate from "../../utils/WxValidate"; 
Page({
  data: {
    demandArr:["人才引进","技术引进", "政策申报","项目推荐","人才及技术引进","暂无需求"],
    classifyArr:["信息技术","智能制造","工业互联网","物联网","集成电路","高端装备","节能环保","新材料","新能源","电子元器件","汽车及零部件","云计算和大数据","生物医药","5G产业","人工智能","石墨烯","两机产业","其他"],
    cooperationModeArr:["横向课题","合作申报项目","兼职顾问","全职引进"],
    declareTypeArr:["人才","科技", "工信"],
    declareResultArr:["未通过","通过"]
  },
  async onLoad(options) {
    that = this;
    let res = await Api.enterpriseDetail({
      id:options.id
    });
    console.log(res)
    that.setData({
      enterprise:res.data
    })
    that.initValidate();
  },
  initValidate() {
    const rules = {      
      title: {
        required: true
      }
    };
    const messages = {
      title:{
        required: '请输入企业名称'
      }
    };
    that.WxValidate = new WxValidate(rules, messages);
  },
  pickerChange(e){
    console.log(e);
    let type = e.currentTarget.dataset.type;
    that.setData({
      ['enterprise.'+type]:e.detail.value
    })
  },
  showTips(msg, type = "error") {
    that.setData({
      msg: msg,
      type: type,
      show: true
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
    let res = await Api.enterpriseUpdate(JSON.stringify(e.detail.value));
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