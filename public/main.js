
$(document).ready(function() {
  $("div").on("mouseover", ".card", function() {
        // console.log( $( this ).text() );
        $(this).removeClass('animated tada bounceInLeft over')
        $(this).addClass('animated tada over')
    });
    $("div").on("animationend", ".card", function(e) {
        $(this).removeClass('jello bounceInLeft tada over')
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
