var that;
import Api from "../../config/api";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexArray:['未知','男','女'],
    info:{}
  },

  async onLoad(options) {
    that = this;
    let res = await Api.expertDetail({id:options.id});
    console.log(res);
    that.setData({
      info:res.data
    })
  }
})