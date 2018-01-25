$(function() {
  var generationNum = 150;
  var poolSizeNum = 100;
  var genesNum = 20;
  $(".slider1")
    .slider({
      max: 200,
      min: 50,
      value: generationNum,
    })
    .slider("float", {
      rest: "label"
    })
    .on("slidechange", function(e, ui) {
      generationNum = ui.value;
      generations = Array.apply(null, Array(generationNum)).map(function(item, i) {
        return i + 1;
      });
      $.ajax({
        type: "GET",
        url: 'parameterUpdate',
        async: true,
        data: {
          generationNum: generationNum,
          poolSizeNum: poolSizeNum,
          genesNum: genesNum
        },
        error: function() {
          alert("error");
        }, //错误执行方法
        success: function(arg) {
          clearInterval(timeout1);
          initIndChart();
          initGeneChart();
          dataRepresent();
        }
      })
    });

  $(".slider2")
    .slider({
      max: 200,
      min: 100,
      value: poolSizeNum,
    })
    .slider("float", {
      rest: "label"
    })
    .on("slidechange", function(e, ui) {
      poolSizeNum = ui.value;
      // initIndChart();
      // initGeneChart();
      $.ajax({
        type: "GET",
        url: 'parameterUpdate',
        data: {
          'generationNum': generationNum,
          'poolSizeNum': poolSizeNum,
          'genesNum': genesNum
        },
        async: true,
        error: function() {
          alert("error");
        }, //错误执行方法
        success: function(arg) {
          clearInterval(timeout1);
          initIndChart();
          initGeneChart();
          dataRepresent();
        }
      })
    });

  $(".slider3")
    .slider({
      max: 60,
      min: 20,
      value: genesNum,
    })
    .slider("float", {
      rest: "label"
    })
    .on("slidechange", function(e, ui) {
      genesNum = ui.value;
      genepoints = Array.apply(null, Array(genesNum)).map(function(item, i) {
        return i + 1;
      });
      // initIndChart();
      // initGeneChart();
      $.ajax({
        type: "GET",
        url: 'parameterUpdate',
        data: {
          'generationNum': generationNum,
          'poolSizeNum': poolSizeNum,
          'genesNum': genesNum
        },
        async: true,
        error: function() {
          alert("error");
        }, //错误执行方法
        success: function(arg) {
          clearInterval(timeout1);
          initIndChart();
          initGeneChart();
          dataRepresent();
        }
      })
    });
});
