$(".submit").on("click", function(){
    let username = $("#username").val().trim();
    let password = $("#pwd").val().trim();
    let rememberMe = $("#rememberMe").is(":checked");

    $.post("../php/connection.php", {username: username, pwd: password, rememberMe:rememberMe}, function(data) {
        console.log(data)
    })
})