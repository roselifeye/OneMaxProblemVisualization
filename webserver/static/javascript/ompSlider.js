$(function() {
  $(".slider1")
    .slider({
      max: 200,
      min: 50,
      value: 100,
    })
    .slider("float", {
      rest: "label"
    })
  $(".slider2")
    .slider({
      max: 1000,
      min: 20,
      value: 20,
    })
    .slider("float", {
      rest: "label"
    })
  $(".slider3")
    .slider({
      max: 50,
      min: 20,
      value: 20,
    })
    .slider("float", {
      rest: "label"
    })
});
