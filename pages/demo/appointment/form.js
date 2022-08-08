var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:['请选择问题类型','视频会议','线下交流'],    
    formData:{
      type:0
    },
    minDate:new Date().toLocaleDateString()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    that = this;
  },

  pickerChange(e){
    console.log(e);
    let name = e.currentTarget.dataset.name;
    that.setData({
      ['formData.'+name]:e.detail.value
    })
  },
})