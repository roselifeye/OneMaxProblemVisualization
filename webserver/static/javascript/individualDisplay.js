// 基于准备好的dom，初始化echarts实例
var individualChart = echarts.init(document.getElementById('box000'));

// 指定图表的配置项和数据
var genepoints = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11','12','13','14','15','16','17','18','19'];
var individuals = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11','12','13','14','15','16','17','18','19','20'];

var data = [
  [0, 1, 8], [0, 3, 8], [0, 5, 8],
  [1, 1, 8], [1, 2, 8], [1, 3, 8], [1, 4, 8], [1, 6, 8], [1, 7, 8], [1, 9, 8], [1, 13, 8], [1, 17, 8],
  [2, 3, 8], [2, 5, 8], [2, 7, 8], [2, 13, 8], [2, 20, 8],
  [3, 6, 8],
  [4, 10, 8],
  [5, 8, 8],
  [6, 16, 8],
  [7, 12, 8],
  [8, 5, 8],
  [9, 10, 8], [9, 2, 8], [9, 5, 8], [9, 6, 8], [9, 11, 8], [9, 13, 8], [9, 14, 8], [9, 15, 8], [9, 16, 8], [9, 19, 8],
  [10, 11, 8],
  [11, 12, 8],
  [12, 3, 8], [12, 6, 8], [12, 7, 8], [12, 13, 8], [12, 15, 8],
  [13, 8, 8],
  [14, 17, 8],
  [15, 3, 8],
  [16, 17, 8], [16, 1, 8], [16, 3, 8], [16, 4, 8], [16, 5, 8], [16, 12, 8], [16, 16, 8], [16, 20, 8],
  [17, 6, 8],
  [18, 1, 8],
  [19, 9, 8],
];
data = data.map(function(item) {
  return [item[0], item[1], item[2]];
});

option = {
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
    max:20,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#999',
        type: 'dashed'
      }
    },
    axisLabel: {
      formatter: function (value, index){
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
    data: data,
    animationDelay: function(idx) {
      return idx * 5;
    }
  }]
};

// 使用刚指定的配置项和数据显示图表。
individualChart.setOption(option);
