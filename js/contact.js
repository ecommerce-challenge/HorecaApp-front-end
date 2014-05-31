$(document).ready(function()
{
    socket.on("getUsers", function(data)
    {
        $("#tableUsers tbody tr").remove();

        data.forEach(function(i)
        {
            if(i.username != username)
            {
                $("#tableUsers tbody").append("<tr onclick='getConversation(" + JSON.stringify(i.username) + ", " + JSON.stringify(i.firstName + " " + i.lastName) + ");' class='border'><td class='noBorder horizontalPadding'><span class='floatLeft marginTop'>" + i.firstName + " " + i.lastName + "</span><span class='floatRight brand bold marginTop'>[" + i.status + "]</span></td></tr>");
            }
        });
    });
});

$(document).on("pageshow", "#contact", function()
{
    updateUserList();
});

$(document).on("pagehide", "#contact", function()
{
	$("[href=#contact]").removeClass("cyan");
});

function updateUserList()
{
    $("[href=#contact]").removeClass("cyan");
    $.mobile.loading("show");

    socket.emit("getAllUsers",
    function(callback)
    {
        socket.emit("getUnreadMessages",
        {
            "currentUser" : username
        },
        function(unread)
        {
            var unreadSender;
            $("#tableUsers tbody tr").remove();

            callback.forEach(function(i)
            {
                unread.forEach(function(u)
                {
                    if(u.sender == i.username)
                        unreadSender = u.sender;
                });

                if(i.username != username)
                {
                    var tr = $.parseHTML("<tr onclick='getConversation(" + JSON.stringify(i.username) + ", " + JSON.stringify(i.firstName + " " + i.lastName) + ");' class='border'><td class='noBorder horizontalPadding'><input type='hidden' class='hiddenUserField' value='" + i.username + "'/><span class='floatLeft marginTop'>" + i.firstName + " " + i.lastName + "</span><span class='floatRight brand bold marginTop'>[" + i.status + "]</span></td></tr>");
                    
                    if(i.username == unreadSender)
                        $(tr).addClass("cyan");

                    $("#tableUsers tbody").append(tr);
                }
            });

            $.mobile.loading("hide");
        });
    });
}