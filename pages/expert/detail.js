var that;
import Api from "../../config/api";
Page({
  data: {
    sexArray:['未知','男','女'],
    mold:0,
    info:{}
  },
  async onLoad(options) {
    
    that = this;
    let res = await Api.expertDetail({id:options.id});
    console.log(res);
    that.setData({
      info:res.data,
      mold:getApp().globalData.mold,
    })
  }
})