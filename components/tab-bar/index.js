Component({
  data: { 
    
  },
  properties: {
    auth:{
      type:Boolean,
      value:true
    },
    type:{
      type:String,
      value:"expert"
    }
  },
  
  methods: {
    switch(e) {
      console.log(e)
      wx.switchTab({
        url: e.currentTarget.dataset.url,
      })
    }
  }
})
