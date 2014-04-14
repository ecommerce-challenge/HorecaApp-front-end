var contact;
var contactFullName;

$(document).ready(function()
{
    socket.on("messageReceived", function(data)
    {
        if($.mobile.activePage.attr("id") != "chat" && $.mobile.activePage.attr("id") != "users")
        {
            $("[href=#users]").addClass("green");
        }
        else
        {
            var PM = $.parseHTML("<div class='maxWidth clearBoth'><div class='PM received'><div class='PM_sender showPM'><span class='PM_time'>" + data.time + "</span>" + contactFullName + "</div><div class='PM_message'></div></div></div>");
            $(PM).find(".PM_message").text(data.message);
            $("#PM_Container").append(PM);
        }
    });
});

$(document).on("pageshow", "#chat", function()
{
    $("html, body").animate({ scrollTop: $(document).height() });
});

function getConversation(_contact, _contactFullName)
{    
    contact = _contact;
    contactFullName = _contactFullName;
    $.mobile.loading("show");

    socket.emit("getConversation",
    {
        "currentUser" : username,
        "contact" : contact
    },
    function(callback)
    {
        var conversation = [];

        $("#PM_Container").children().remove();

        callback.sent.forEach(function(i)
        {
            i.type = "sent";
            conversation.push(i);
        });

        callback.received.forEach(function(i)
        {
            i.type = "received";
            conversation.push(i);
        });

        conversation.sort(function(a,b){if (a._id < b._id)return -1;if (a._id > b._id)return 1;return 0;});

        conversation.forEach(function(i)
        {
            if(i.type == "sent")
            {
                var PM = $.parseHTML("<div class='maxWidth clearBoth'><div class='PM sent'><div class='PM_sender showPM'><span class='PM_time'>" + i.time + "</span>" + fullName + "</div><div class='PM_message'></div></div></div>");
                $(PM).find(".PM_message").text(i.message);
                $("#PM_Container").append(PM);
            }
            else
            {
                var PM = $.parseHTML("<div class='maxWidth clearBoth'><div class='PM received'><div class='PM_sender showPM'><span class='PM_time'>" + i.time + "</span>" + fullName + "</div><div class='PM_message'></div></div></div>");
                $(PM).find(".PM_message").text(i.message);
                $("#PM_Container").append(PM);
            }
        });

        $.mobile.loading("hide");
    });
}

function sendMessage(message)
{
    if($.trim(message) != "")
    {
        $("#chatbox").val("");
        socket.emit("sendMessage",
        {
            "currentUser" : username,
            "contact" : contact,
            "message" : message
        },
        function(callback)
        {
            var PM = $.parseHTML("<div class='maxWidth clearBoth'><div class='PM sent'><div class='PM_sender showPM'><span class='PM_time'>" + callback.time + "</span>" + fullName + "</div><div class='PM_message'></div></div></div>");
            $(PM).find(".PM_message").text(callback.message);
            $("#PM_Container").append(PM);
            $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        });
    }
}