var individualChart = echarts.init(document.getElementById('box2'));
//  var generations = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11','12','13','14','15','16','17','18','19','20'];
var generations = Array.apply(null, Array(20)).map(function(item, i) {
    return i+1;
});
option = {
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
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Avg Fitness',
      type: 'line',
      //stack: '总量',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Mid Fitness',
      type: 'line',
      //stack: '总量',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
  ]
};

individualChart.setOption(option);
