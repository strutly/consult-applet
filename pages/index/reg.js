var that;
import Api from "../../config/api";
import WxValidate from "../../utils/WxValidate";
Page({
  data: {
    category: 0,
    sexArray: ['请选择您的性别', '男', '女'],
    sex: 0
  },
  async onLoad(options) {
    that = this;
    let apply = {type:options.type,id:-1,sex:0};
    let res = await Api.getApply();
    console.log(res);
    apply = res.data || apply;
    that.setData({
      apply: apply
    })
    that.initValidate(apply.type);
  },
  initValidate(index) {
    const rules = [{
      phone: {
        required: true
      },
      name: {
        required: true
      },
      title: {
        required: true
      }
    }, {
      phone: {
        required: true
      },
      name: {
        required: true
      },
      sex: {
        min: 1
      },
      area: {
        required: true
      },
      through: {
        required: true
      }
    }]
    const messages = [{
      phone: {
        required: "请授权获取手机号"
      },
      name: {
        required: "请输入您的姓名"
      },
      title: {
        required: "请输入公司名称"
      }
    }, {
      phone: {
        required: "请授权获取手机号"
      },
      name: {
        required: "请输入您的姓名"
      },
      sex: {
        min: "请选择您的性别"
      },
      area: {
        required: "请输入您的领域方向"
      },
      through: {
        required: "请输入您的经历"
      }
    }]
    that.WxValidate = new WxValidate(rules[index], messages[index]);
  },
  categoryChange(e) {
    console.log(e);
    let index = e.detail.value;
    that.setData({
      'apply.type': index
    })
    that.initValidate(index);
  },
  sexChange(e) {
    console.log(e);
    that.setData({
      ['apply.sex']: e.detail.value
    })
  },
  async getPhoneNumber(e) {
    console.log(e);
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      let res = await Api.getPhoneByCode(e.detail.code
      )
      console.log(res);
      if (res.code == 0) {
        that.setData({
          'apply.phone': res.data
        })
      } else {
        that.setData({
          msg: res.msg,
          show: true,
          type: "error"
        });
      }
    } else {
      that.setData({
        msg: "您已拒绝授权获取手机号~",
        show: true,
        type: "error"
      });
    }
  },
  showTips(msg, type = "error") {
    that.setData({
      msg: msg,
      type: type,
      show: true
    })
  },
  async submit(e) {
    console.log(e);
    if (!that.WxValidate.checkForm(e.detail.value)) {
      console.log(that.WxValidate)
      let error = that.WxValidate.errorList[0]
      that.showTips(error.msg)
      return false;
    }
    let data = e.detail.value;
    let res = {};
    if (data.type == 0) {
      res = await Api.addEnterpriseApply(data);
    } else {
      res = await Api.addExpertApply(data);
    };
    console.log(res);
    if (res.code == 0) {
      that.showTips("提交成功,请耐心等待审核", "success");
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 2000)
    }else{
      that.showTips(res.msg||"出错了","error");
    }
  }
})