$(document).ready(function()
{
    $(document).on("click", ".selectable", function()
    {
        if(!$(this).hasClass("selected"))
        {
            $(this).addClass("selected");
        }
        else
        {
            $(this).removeClass("selected");
        }
    });
});