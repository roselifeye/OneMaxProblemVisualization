// 基于准备好的dom，初始化echarts实例
var individualChart = echarts.init(document.getElementById('box1'));

// 指定图表的配置项和数据
var genepoints = Array.apply(null, Array(40)).map(function(item, i) {
  return i + 1;
});
var individuals = Array.apply(null, Array(20)).map(function(item, i) {
  return i + 1;
});
var indData = [];
function initIndChart() {
  indData = [];
  option1 = {
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
    series: [{
      name: 'One',
      type: 'scatter',
      symbolSize: function(val) {
        return val[2] * 2;
      },
      animationDelay: function(idx) {
        return idx * 5;
      },
      data: []
    }]
  };
  individualChart.setOption(option1);
  // alert('111')
}
initIndChart()
