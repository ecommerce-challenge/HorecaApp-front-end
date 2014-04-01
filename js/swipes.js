$(document).on("pagecreate", "#orders", function()
{
    // when swiping in page: orders
    $("#orders").on("swipeleft", function()
    {
        $.mobile.changePage("#users", {transition : "slide"});
    });
});

$(document).on("pagecreate", "#users", function()
{
    // when swiping in page: users
    $("#users").on("swiperight", function()
    {
        $.mobile.changePage("#orders", {transition : "slide", reverse: true});
    });
});

$(document).on("pagecreate", "#chat", function()
{
    // when swiping in page: chat
    $("#chat").on("swiperight", function()
    {
        $.mobile.changePage("#users", {transition : "slide", reverse: true});
    });
});