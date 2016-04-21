
$(document).ready(function() {
  $("div").on("mouseover", ".card", function() {
        // console.log( $( this ).text() );
        $(this).removeClass('animated tada bounceInLeft')
        $(this).addClass('animated tada')
    });
    $("div").on("animationend", ".card", function(e) {
        $(this).removeClass('rotateInDownLeft tada animated')
      })
  $("#namer").on("click", checker)
});
function checker() {
  var user = $("#name").val();
  var message = $("#msg").val();
  var messageURL = encodeURIComponent(message)
  var date = new Date()
  var dateURL = encodeURIComponent(date)
$.get(`/msgg/${user}/${messageURL}/${dateURL}`, function (data, status) {
console.log(data)
  $("#msg1").append(data)
  $('.person').addClass('animated rotateInDownLeft')

})

}
