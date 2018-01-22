var individualChart = echarts.init(document.getElementById('box1'));
var geneChart = echarts.init(document.getElementById('box2'));
//  var generations = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11','12','13','14','15','16','17','18','19','20'];
var generations = Array.apply(null, Array(100)).map(function(item, i) {
  return i + 1;
});

var maxFitList = [];
var avgFitList = [];
var minFitList = [];
var popList = [];
var indData = [];
alert("error");
function newGenerationdata() {
  alert("error");
  $.ajax({
    type: "GET",
    url: { % url 'onemaxSol' %
    },
    dataType: 'json',
    async: true,
    error: function() {
      alert("error");
    }, //错误执行方法

    success: function(onemaxData) {
      generationList = [];
      // for (var i = 0; i < onemaxData.length; i++) {
      maxFitList.push(onemaxData.maxFitList); //挨个取出类别并填入类别数组
      avgFitList.push(onemaxData.avgFitList);
      minFitList.push(onemaxData.minFitList);
      indData.push(onemaxData.popList);
      console.log(onemaxData)
      indData = data.map(function(item) {
        return [item[0], item[1], item[2]];
      });
      // }
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
            //stack: '总量',
            data: maxFitList
          },
          {
            name: 'Avg Fitness',
            type: 'line',
            //stack: '总量',
            data: avgFitList
          },
          {
            name: 'Min Fitness',
            type: 'line',
            //stack: '总量',
            data: minFitList
          },
        ]
      };
      option2 = {
        title: {
          text: 'One Max Problem',
          link: 'http://www.cs.mun.ca/~sy2036/'
        },
        legend: {
          data: ['One'],
          left: 'right'
        },
        tooltip: {
          position: 'top',
          formatter: function(params) {
            return 'Gene point ' + genepoints[params.value[0]];
          }
        },
        grid: {
          left: 2,
          bottom: 10,
          right: 60,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: genepoints,
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'dashed'
            }
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          //name: individuals,
          splitNumber: 20,
          max: 20,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'dashed'
            }
          },
          axisLabel: {
            formatter: function(value, index) {
              return value.toFixed(0);
            },
            //interval:20
          },
          axisLine: {
            show: false
          }
        },
        dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
          yAxisIndex: 0,
          type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
          start: 0, // 左边在 10% 的位置。
          end: 100 // 右边在 50% 的位置。
        }],
        series: [{
          name: 'One',
          type: 'scatter',
          symbolSize: function(val) {
            return val[2] * 2;
          },
          data: indData,
          animationDelay: function(idx) {
            return idx * 5;
          }
        }]
      };

      myChart.showLoading();
      geneChart.setOption(option1);
      individualChart.setOption(option2)
    }
  })
}

geneChart.setOption({
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
      //stack: '总量',
      data: maxFitList
    },
    {
      name: 'Avg Fitness',
      type: 'line',
      //stack: '总量',
      data: avgFitList
    },
    {
      name: 'Min Fitness',
      type: 'line',
      //stack: '总量',
      data: minFitList
    },
  ]
};)

// setInterval(function() {
  // newGenerationdata()
// }, 6 * 1); // 间歇执行
newGenerationdata();
