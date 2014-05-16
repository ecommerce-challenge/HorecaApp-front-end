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

$(document).on("pageshow", "#users", function()
{
    updateUserList();
});

function updateUserList()
{
    $.mobile.loading("show");
    $("[href=#users]").removeClass("green");
    socket.emit("getAllUsers",
    function(callback)
    {
        $("#tableUsers tbody tr").remove();

        callback.forEach(function(i)
        {
            if(i.username != username)
            {
                $("#tableUsers tbody").append("<tr onclick='getConversation(" + JSON.stringify(i.username) + ", " + JSON.stringify(i.firstName + " " + i.lastName) + ");' class='border'><td class='noBorder horizontalPadding'><span class='floatLeft marginTop'>" + i.firstName + " " + i.lastName + "</span><span class='floatRight brand bold marginTop'>[" + i.status + "]</span></td></tr>");
            }
        });

        $.mobile.loading("hide");
    });
}