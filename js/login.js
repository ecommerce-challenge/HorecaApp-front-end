function login()
{
    var username = $("#username").val();
    var password = $("#password").val();
    
    socket.emit("login",
    {
        "username" : username,
        "password" : password
    },
    function(callback)
    {
        if(callback.user != null)
        {
            alert("Hello " + username + "!");
            $.mobile.changePage("#scanner");
        }
        else
        {
            alert("You have entered an incorrect username or password");
        }
    });
}