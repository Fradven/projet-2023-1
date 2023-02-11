$(document).ready(function(){
    $.post("template/connection.tpl", function(data){
        $("main").append(data)
    })
})

$("main").on("click", ".submit",function(){
    let username = $("#username").val().trim();
    let password = $("#pwd").val().trim();
    let rememberMe = $("#rememberMe").is(":checked");

    $.post("php/connection.php", {username: username, pwd: password, rememberMe:rememberMe}, function(data) {
        if (data.error) {
            console.log(data)
        }
        console.log(data.user)
    },"json")
})