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
      option2.xAxis.data = generations
      option2.series[0].data = maxFitList
      option2.series[1].data = avgFitList
      option2.series[2].data = minFitList
      geneChart.setOption(option2);

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
