
$(document).ready(function() {
  $.get(`/api/message/`)
  $("div").on("mouseover", ".card", function() {
        // console.log( $( this ).text() );
        $(this).removeClass('animated tada zoomInDown')
        $(this).addClass('animated tada')
    });
    $("div").on("animationend", ".card", function(e) {
        $(this).removeClass('zoomInDown tada animated')
      })
  $("#namer").on("click", adder)
});
function adder() {

  var user = $("#name").val();
  var message = $("#msg").val();
  var messageURL = encodeURIComponent(message)
  var date = new Date()
  var dateURL = encodeURIComponent(date)

$.post(`/api/message/${user}/${messageURL}/${dateURL}/`, function (data, status) {
console.log ("data", data)


 $('.person').last().addClass('animated zoomInDown card')
 }) }
//
// })
