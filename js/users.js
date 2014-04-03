$(document).ready(function()
{
    socket.on("getUsers", function(data)
    {
        $("#tableUsers").find("tr:gt(0)").remove();

        data.forEach(function(i)
        {
            if(i.username != username)
            {
                $("#tableUsers").append("<tr><td>" + i.firstName + "</td><td>" + i.lastName + "</td><td>" + i.role + "</td><td>" + i.status + "</td><td><a class='ui-btn tableButton' href='#chat' data-transition='flow' onclick='getConversation(" + JSON.stringify(i.username) + ", " + JSON.stringify(i.firstName + " " + i.lastName) + ");'>Chat</a></td></tr>");
            }
        });
    });
});

$(document).on("pageshow", "#users", function()
{
    updateUserList();
});

function updateUserList()
{
    $.mobile.loading('show')
    $("[href=#users]").removeClass("green");
    socket.emit("getAllUsers",
    function(callback)
    {
        $("#tableUsers").find("tr:gt(0)").remove();

        callback.forEach(function(i)
        {
            if(i.username != username)
            {
                $("#tableUsers").append("<tr><td>" + i.firstName + "</td><td>" + i.lastName + "</td><td>" + i.role + "</td><td>" + i.status + "</td><td><a class='ui-btn tableButton' href='#chat' data-transition='flow' onclick='getConversation(" + JSON.stringify(i.username) + ", " + JSON.stringify(i.firstName + " " + i.lastName) + ");'>Chat</a></td></tr>");
            }
        });

        $.mobile.loading('hide')
    });
}