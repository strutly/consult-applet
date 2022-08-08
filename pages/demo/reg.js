var that;
Page({
  data: {

  },
  onLoad(options) {
    that = this;
  },
  upload(){
    wx.chooseMessageFile({
      count: 1,
      type:'all',
      success:function(res){
        let types = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff','pdf'];
        var filename = res.tempFiles[0].name;        
        let fileType = filename.substr(filename.lastIndexOf('.') + 1)
        if(types.indexOf(fileType.toLowerCase())==-1){
          wx.showToast({
            icon:'none',
            title: '请上传图片或者PDF形式附件'
          })
        }else{
          that.setData({
            path:res.tempFiles[0].path
          })
        }
        console.log(res);
      }
    })
  },
  submit(){
    wx.showModal({
      title:"授权提示",
      content:"本次填写的信息只用于身份认证使用",
    })
  }
})