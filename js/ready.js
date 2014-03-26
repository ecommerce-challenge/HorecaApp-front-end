var socket;

$(document).ready(function()
{
    // connect to the server trough a socket
    socket = io.connect("http://ec2-54-73-0-85.eu-west-1.compute.amazonaws.com");

     // include html files
    $("[include]").each(function()
    {
        $(this).load($(this).attr("include"), function()
        {
            var cpy = $(this).children();
            $(this).remove();
            $("body").append(cpy);
            $.mobile.changePage("#login");
        });
    });
});