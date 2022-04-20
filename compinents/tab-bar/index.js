
Component({
  data: { 
    
  },
  properties: {
    auth:{
      type:Boolean,
      value:false
    },
    first:{
      type:Boolean,
      value:false
    },
    currentTab:{
      type:String,
      value:""
    }
  },
  lifetimes:{
    created(){
      console.log("create");
       //change是自定义的事件,{}是发射的参数
    },
    attached() {
      let that = this;
      console.log("attached");
      wx.event.on('change', function () {
        console.log(1232)
        console.log(getApp().globalData.auth)
        that.setData({
          auth: getApp().globalData.auth
        })
      })
    },
    detached() {
      console.log("detached")
    }
  },
  methods: {
    switch(e) {
      if (e.currentTarget.dataset.url == this.data.currentTab) return;
      wx.switchTab({
        url: e.currentTarget.dataset.url,
      })
    }
  }
})
