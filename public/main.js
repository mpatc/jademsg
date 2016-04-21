
$(document).ready(function() {
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

})

}
