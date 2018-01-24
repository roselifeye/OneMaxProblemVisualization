$(function() {
  var generationNum = 150;
  var poolSizeNum = 500;
  var genesNum = 40;
  $(".slider1")
    .slider({
      max: 200,
      min: 50,
      value: generationNum,
    })
    .slider("float", {
      rest: "label"
    })
    .on("slidechange", function(e,ui) {
      generationNum = ui.value;
      initIndChart();
      initGeneChart();
      $.ajax({
        type: "GET",
        url: 'parameterUpdate',
        async: true,
        data:{generationNum: generationNum,
              poolSizeNum: poolSizeNum,
              genesNum: genesNum},
        error: function() {
          alert("error");
        }, //错误执行方法
        success: function(arg) {
          generations = Array.apply(null, Array(generationNum)).map(function(item, i) {
            return i + 1;
          });
          // newInddata();
          // newGenerationdata();
        }
      })
    });

  $(".slider2")
    .slider({
      max: 2000,
      min: 100,
      value: 500,
    })
    .slider("float", {
      rest: "label"
    })
    .on("slidechange", function(e,ui) {
      poolSizeNum = ui.value;
      initIndChart();
      initGeneChart();
      $.ajax({
        type: "GET",
        url: 'parameterUpdate',
        data:{'generationNum': generationNum,
              'poolSizeNum': poolSizeNum,
              'genesNum': genesNum},
        async: true,
        error: function() {
          alert("error");
        }, //错误执行方法
        success: function(arg) {
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
    .on("slidechange", function(e,ui) {
      genesNum = ui.value;
      initIndChart();
      initGeneChart();
      $.ajax({
        type: "GET",
        url: 'parameterUpdate',
        data:{'generationNum': generationNum,
              'poolSizeNum': poolSizeNum,
              'genesNum': genesNum},
        async: true,
        error: function() {
          alert("error");
        }, //错误执行方法
        success: function(arg) {
          genepoints = Array.apply(null, Array(int(genesNum))).map(function(item, i) {
            return i + 1;
          });
          alert(genepoints);
          newInddata();
          // newGenerationdata();
        }
      })
    });
});
