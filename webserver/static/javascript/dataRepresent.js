function dataRepresent() {
  // alert("error22233");
  maxFitList = [];
  avgFitList = [];
  minFitList = [];
  popList = [];
  $.ajax({
    type: "GET",
    url: 'onemaxSol',
    dataType: 'json',
    async: true,
    error: function() {
      alert("error");
    }, //错误执行方法

    success: function(onemaxData) {
      var maxFitList = [];
      var avgFitList = [];
      var minFitList = [];
      var popList = [];
      var maxFitList = [];
      var avgFitList = [];
      var minFitList = [];
      var popList = [];
      // for (var i = 0; i < onemaxData.length; i++) {
      for (var i = 0; i < onemaxData.maxFitList.length; i++) {
        maxFitList.push(onemaxData.maxFitList[i]); //挨个取出类别并填入类别数组
        avgFitList.push(onemaxData.avgFitList[i]); //挨个取出类别并填入类别数组
        minFitList.push(onemaxData.minFitList[i]); //挨个取出类别并填入类别数组

      }
      var maxlastData = []
      var avglastData = []
      var minlastData = []
      clearInterval(timeTicket);
      alert('111')
      timeTicket = setInterval(function() {
          currentDataLen = option2.series[0].data.length;
          alert(currentDataLen)
          if (currentDataLen < onemaxData.maxFitList.length) {
            maxlastData = maxFitList[option2.series[0].data.length];
            avglastData = avgFitList[option2.series[0].data.length];
            minlastData = minFitList[option2.series[0].data.length];
            axisData = currentDataLen + 1;
            // 动态数据接口 addData
            geneChart.addData([
              [
                0, // 系列索引
                lastData, // 新增数据
                false, // 新增数据是否从队列头部插入
                true, // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                axisData // 坐标轴标签
              ],
              [
                1, // 系列索引
                avglastData, // 新增数据
                false, // 新增数据是否从队列头部插入
                true, // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
              ],
              [
                2, // 系列索引
                minlastData, // 新增数据
                false, // 新增数据是否从队列头部插入
                true, // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
              ],
            ]);
          }, 100); geneChart.setOption(option2);
      }


      // option2.xAxis.data = generations
      // option2.series[0].data = maxFitList
      // option2.series[1].data = avgFitList
      // option2.series[2].data = minFitList
      // geneChart.setOption(option2);

      var indData = [];
      // popListNum = (onemaxData.popList.length > 20) ? 20:onemaxData.popList.length
      for (var i = 0; i < onemaxData.popList.length; i++) {
        indData.push(onemaxData.popList[i]); //挨个取出类别并填入类别数组
        if (onemaxData.popList[i][1] >= 20)
          break
      }
      // alert(onemaxData.popList[0])
      indData = indData.map(function(item) {
        return [item[0], item[1], item[2]];
      });

      option1.series[0].data = indData;
      individualChart.setOption(option1);
      // alert('222')
    }
  })
}
