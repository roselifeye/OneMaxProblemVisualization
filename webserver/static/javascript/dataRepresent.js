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
              end: (currentIndex/onemaxData.maxFitList.length)*100,
            }],
          });
          currentIndex += 1;
        } else {
          clearInterval(timeout1);
        }
      }, 170);

      timeout2 = setInterval(function() {
        if (popIndex < onemaxData.popList.length) {
          indData.push(onemaxData.popList[popIndex]);
          indData = indData.map(function(item) {
            return [item[0], item[1], item[2]];
          });
          individualChart.setOption({
            series: [{
              name: 'One',
              data: indData
            }, ],
          });
          popIndex += 1;
        } else {
          clearInterval(timeout2);
        }
      }, 25);

    }
  })
}
