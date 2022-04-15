var that;
import Api from "../../config/api";
Page({
  data: {
    enterprises:[]
  },
  async onLoad(options) {
    that = this;
    if(getApp().globalData.auth){
      that.getList("",1);
    }else{
      let res = await Api.login();
      console.log(res);
      if(res.code==0){
        that.setData({
          auth:true
        })
        that.getList("",1);
      }else{
        that.authModal();
      }
    };    
  },
  onReady(){
    let tabBar = this.selectComponent('#tabBar');
    that.setData({
      auth: getApp().globalData.auth
    })
    getApp().watch(function (value) {
      tabBar.setData({
        first: false,
        auth: value,       
        currentTab:"/pages/enterprise/index"
      })
    });   
  },  
  async getList(name,pageNum){
    let res = await Api.enterprisePage({title:name,pageNum:pageNum});
    console.log(res);
    if(res.code!='0'){
      return that.authModal();
    }
    let enterprises = that.data.enterprises||[];    
    enterprises = enterprises.concat(res.data.content);
    that.setData({
      pageNum:pageNum,
      name:name,
      endline: res.data.last,
      enterprises:enterprises      
    });
  },
  search(e){
    console.log(e);
    let value = e.detail.value;
    that.setData({
      enterprises:[],
      name:value.title
    });
    that.getList(value.title,1)
  },
  onReachBottom(){
    let endline = that.data.endline;
    if(!endline){
      let pageNum = that.data.pageNum + 1;
      let name = that.data.name;
      that.getList(name,pageNum);
    }    
  },
  authModal() {
    that.setData({
      authModal: !that.data.authModal,
    })
  },
  async getPhoneNumber(e) {
    console.log(e);
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      let code = await Api.getCode();
      let res = await Api.phone({
        encryptedData: e.detail.encryptedData,
        code: code,
        iv: e.detail.iv
      })
      console.log(res);
      if (res.code == '0') {
        wx.setStorageSync('token', res.data);
        getApp().globalData.auth = true;
        that.setData({
          auth: true,
          authModal: false
        });
        that.getList("",1);
      } else {
        that.setData({
          msg:res.msg,
          show:true,
          type:"error"
        });
      }
    } else {
      that.setData({
        msg:"您已拒绝授权获取手机号~",
        show:true,
        type:"error"
      });
      
    }
  }
})