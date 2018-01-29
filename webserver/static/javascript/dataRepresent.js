function dataRepresent() {
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
    },
    success: function(onemaxData) {
      var maxFitList = [];
      var avgFitList = [];
      var minFitList = [];
      var indData = [];
      var currentIndex = 0
      var popIndex = 0
      //  Here, we set the rate is 10 which means the individual chart will be refreshed when generation chart refresh every 5 times.
      var individualChartRefreshRate = 10;
      timeout1 = setInterval(function() {
        if (currentIndex < onemaxData.maxFitList.length) {
          maxFitList.push(onemaxData.maxFitList[currentIndex]);
          avgFitList.push(onemaxData.avgFitList[currentIndex]);
          minFitList.push(onemaxData.minFitList[currentIndex]);
          geneChart.setOption({
            series: [{
                name: 'Best Fitness',
                data: maxFitList
              },
              {
                name: 'Avg Fitness',
                data: avgFitList
              },
              {
                name: 'Min Fitness',
                data: minFitList
              },
            ],
            dataZoom: [{
              end: (currentIndex/onemaxData.maxFitList.length)*100+3,
            }],
          });

          var currentGenePopLen = onemaxData.popList[currentIndex].length;
          // alert(onemaxData.popList[popIndex][0])
          genePopList = onemaxData.popList[currentIndex]
          for (var i = 0; i < genePopList.length; i++) {
            indData.push(genePopList[i])
          }
          if (individualChartRefreshRate == 10) {
            // indData.push(onemaxData.popList[popIndex]);
            indData = indData.map(function(item) {
              return [item[0], item[1], item[2]];
            });
            individualChart.setOption({
              series: [{
                name: 'One',
                data: indData
              }, ],
            });
          }
          individualChartRefreshRate--;
          currentIndex += 1;
          if (individualChartRefreshRate == 0) {
            individualChartRefreshRate = 10;
          }
        } else {
          clearInterval(timeout1);
        }
      }, 170);
    }
  })
}
