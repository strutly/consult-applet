var that;
import Api from "../../config/api";
Page({
  data: {
    index: 1,
    types: ['未选择','视频会议','线下交流'],
    status:[{type:0,title:"待处理"},
    {type:1,title:"预约成功"},
    {type:2,title:"预约失效"},
    {type:3,title:"预约完成"}],
    bgs: ['blue', 'green', 'grey', 'orange'],
    appointments: [],
    pageNo: 1,
    endline: false
  },
  onLoad(options) {
    console.log(2)
    that = this;
    that.getList(1);
  },
  async getList(pageNo) {
    let res = await Api.getAppointment({ pageNo: pageNo });
    console.log(res);
    let appointments = that.data.appointments;
    that.setData({
      pageNo: pageNo,
      endline: res.data.last,
      appointments: appointments.concat(res.data.content)
    });
  },
  tabSelect(e) {
    console.log(e);
    let index = e.currentTarget.dataset.mine;
    if (that.data.index == index) return;
    that.setData({
      index: index
    })
    if (!that.data.pageNo[index]) {
      that.getList(index, 1);
    }
  },
  onReachBottom() {
    let endline = that.data.endline;
    let index = that.data.index;
    if (!endline) {
      let pageNo = that.data.pageNo[index] + 1;
      that.getList(pageNo);
    }
  },
  open(e) {
    let index = e.currentTarget.dataset.index;
    let open = that.data.open;
    if (open == index) {
      index = null;
    }
    that.setData({
      open: index
    })
  },
  showModal(e) {
    console.log(e)
    that.setData({
      formData: e.currentTarget.dataset
    })
    that.modal();
  },
  modal() {
    that.setData({
      modal: !that.data.modal
    })
  },
  async submit() {
    let formData = that.data.formData;
    let appointments = that.data.appointments;
    let res = await Api.updateAppointment(JSON.stringify(formData));
    
    console.log(res);
    if (res.code == 0) {
      console.log(formData.index)
      appointments[formData.index].status = that.data.status[formData.status];
      that.setData({
        appointments:appointments
      })
      that.showTips("操作成功!","success");
      that.modal();
    }else{
      that.showTips(res.msg);
    }
  },
  showTips(msg, type = "error") {
    that.setData({
      msg: msg,
      type: type,
      show: true
    })
  },
  copy: function (e) {
    console.log(e.currentTarget.dataset.text)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        console.log(res)
      }
    })
  }

})