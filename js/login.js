var username;
var fullName;

function login()
{
    username = $("#username").val();
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
            $.mobile.changePage("#orders");
            $("#username").val("");
            $("#password").val("");
            fullName = callback.user.firstName + " " + callback.user.lastName;

            socket.emit("joinRoom",
            {
                "userID" : callback.user._id,
                "username" : username,
                "company" : callback.user.company.name,
                "companyID" : callback.user.company._id
            },
            function(callback){});
        }
        else
        {
            alert("You have entered an incorrect username or password");
        }
    });
}

function logout()
{
    socket.emit("logout");
}