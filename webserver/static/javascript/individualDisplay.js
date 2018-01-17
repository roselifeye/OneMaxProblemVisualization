// 基于准备好的dom，初始化echarts实例
var individualChart = echarts.init(document.getElementById('box1'));

// 指定图表的配置项和数据
var genepoints = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11','12','13','14','15','16','17','18','19'];
var individuals = ['1', '3', '8', '13', '16', '19', '20'];

var data = [
  [1, 0, 8],
  [2, 1, 8],
  [3, 2, 8],
  [4, 3, 8],
  [5, 4, 8],
  [6, 5, 8],
  [7, 6, 8],
  [8, 7, 8],
  [9, 8, 8],
  [10, 9, 8],
  [11, 10, 8],
  [12, 11, 8],
  [13, 12, 8],
  [14, 13, 8],
  [15, 14, 8],
  [16, 15, 8],
  [17, 16, 8],
  [18, 17, 8],
  [19, 18, 8],
  [20, 19, 8],
];
data = data.map(function(item) {
  return [item[1], item[0], item[2]];
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
      return params.value[2] + ' commits in ' + genepoints[params.value[0]] + ' of ' + individuals[params.value[1]];
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
    type: 'category',
    //data: individuals,
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
  dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
    yAxisIndex: 0,
    type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
    start: 0, // 左边在 10% 的位置。
    end: 50 // 右边在 50% 的位置。
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
