var that;
import Api from "../../config/api";
Page({
  data: {
    show:false,
    auth:false,
  },
  async onLoad(options) {
    that = this;
    that.getList("",1); 
  },
  onReady(){
    getApp().watch(function (value) {      
      that.setData({
        auth:value
      })
    });
       
  },  
  async getList(name,pageNum){
    let res = await Api.expertPage({name:name,pageNum:pageNum});
    
    let experts = that.data.experts||[];    
    experts = experts.concat(res.data.content);
    that.setData({
      pageNum:pageNum,
      name:name,
      endline: res.data.last,
      experts:experts      
    });
  },
  search(e){
    console.log(e);
    let value = e.detail.value;
    that.setData({
      experts:[],
      name:value.name
    });
    that.getList(value.name,1);
  },
  onReachBottom(){
    let endline = that.data.endline;
    if(!endline){
      let pageNum = that.data.pageNum + 1;
      let name = that.data.name;
      that.getList(name,pageNum);
    }    
  }
})