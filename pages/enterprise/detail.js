var that;
import Api from "../../config/api";
Page({
  data: {
    demandArr:["人才引进","技术引进", "政策申报","项目推荐","人才及技术引进","暂无需求"],
    classifyArr:["信息技术","智能制造","工业互联网","物联网","集成电路","高端装备","节能环保","新材料","新能源","电子元器件","汽车及零部件","云计算和大数据","生物医药","5G产业","人工智能","石墨烯","两机产业","其他"],
    cooperationModeArr:["横向课题","合作申报项目","兼职顾问","全职引进"],
    declareTypeArr:["人才","科技", "工信"],   
    declareResultArr:["未通过","通过"],
    enterprise:{}
  },
  async onLoad(options) {
    that = this;
    let res = await Api.enterpriseDetail({id:options.id});
    that.setData({
      enterprise:res.data
    })
  }
})