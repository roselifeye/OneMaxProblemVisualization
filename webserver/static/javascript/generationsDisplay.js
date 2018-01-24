// var individualChart = echarts.init(document.getElementById('box1'));
var geneChart = echarts.init(document.getElementById('box2'));
// alert("error111");
//  var generations = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11','12','13','14','15','16','17','18','19','20'];
var generations = Array.apply(null, Array(150)).map(function(item, i) {
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
  option2 = {
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
  geneChart.setOption(option2);
}
initGeneChart()


setInterval(function() {
  dataRepresent()
}, 800); // 间歇执行
