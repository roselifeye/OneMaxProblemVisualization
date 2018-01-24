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
    // dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
    //   yAxisIndex: 0,
    //   type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
    //   start: 0, // 左边在 10% 的位置。
    //   end: 100 // 右边在 50% 的位置。
    // }],
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
  individualChart.setOption(option);
  alert('111')
}
initIndChart()



function newInddata() {
  // alert("error22233");
  $.ajax({
    type: "GET",
    url: 'onemaxSol',
    dataType: 'json',
    async: true,
    error: function() {
      alert("error");
    }, //错误执行方法

    success: function(onemaxData) {
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

      option.series[0].data = indData;
      individualChart.setOption(option);

    }
  })
}
newInddata();
// setInterval(function() {
//   newInddata()
// }, 6 * 0.01); // 间歇执行
