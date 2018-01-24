// var individualChart = echarts.init(document.getElementById('box1'));
var geneChart = echarts.init(document.getElementById('box2'));
// alert("error111");
//  var generations = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11','12','13','14','15','16','17','18','19','20'];
var generations = Array.apply(null, Array(100)).map(function(item, i) {
  return i + 1;
});

var maxFitList = [];
var avgFitList = [];
var minFitList = [];
var popList = [];

function initGeneChart() {
  maxFitList = [];
  avgFitList = [];
  minFitList = [];
  popList = [];
  option1 = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Best Fitness', 'Avg Fitness', 'Min Fitness']
    },
    grid: {
      left: 2,
      bottom: 60,
      right: 10,
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      name: 'Generations',
      nameLocation: 'middle',
      nameGap: 20,
      nameTextStyle: {
        fontSize: 18
      },
      type: 'category',
      boundaryGap: false,
      data: generations
    },
    yAxis: {
      name: 'Fitness',
      nameTextStyle: {
        fontSize: 18
      },
      type: 'value'
    },
    dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
      type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
      start: 0, // 左边在 10% 的位置。
      end: 100 // 右边在 50% 的位置。
    }],
    series: [{
        name: 'Best Fitness',
        type: 'line',
        data: []
      },
      {
        name: 'Avg Fitness',
        type: 'line',
        data: []
      },
      {
        name: 'Min Fitness',
        type: 'line',
        data: []
      },
    ]
  };

  // myChart.showLoading();
  geneChart.setOption(option1);
}
initGeneChart()



function newGenerationdata() {
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
      // for (var i = 0; i < onemaxData.length; i++) {
      for (var i = 0; i < onemaxData.maxFitList.length; i++) {
        maxFitList.push(onemaxData.maxFitList[i]); //挨个取出类别并填入类别数组
      }
      // maxFitList.push(onemaxData.maxFitList); //挨个取出类别并填入类别数组
      for (var i = 0; i < onemaxData.avgFitList.length; i++) {
        avgFitList.push(onemaxData.avgFitList[i]); //挨个取出类别并填入类别数组
      }
      // avgFitList.push(onemaxData.avgFitList);
      // minFitList.push(onemaxData.minFitList);
      for (var i = 0; i < onemaxData.minFitList.length; i++) {
        minFitList.push(onemaxData.minFitList[i]); //挨个取出类别并填入类别数组
      }

      option1.xAxis.data = generations
      option1.series[0].data = maxFitList
      option1.series[1].data = avgFitList
      option1.series[2].data = minFitList
      // alert(option1.series[0].data)
      // geneChart.showLoading();
      geneChart.setOption(option1);

    }
  })
}

// setInterval(function() {
// newGenerationdata()
// }, 6 * 1); // 间歇执行
newGenerationdata();
