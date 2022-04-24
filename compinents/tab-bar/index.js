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
  
  methods: {
    switch(e) {
      if (e.currentTarget.dataset.url == this.data.currentTab) return;
      wx.switchTab({
        url: e.currentTarget.dataset.url,
      })
    }
  }
})
