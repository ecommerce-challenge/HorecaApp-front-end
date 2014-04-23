$(document).on("pageshow", "#items", function()
{
    searchItems();
});

function searchItems()
{
    $.mobile.loading("show");

    socket.emit("getAllItems", function(callback)
    {
        $("#tableItems tbody tr").remove();
        
        if(callback != null)
        {
            callback.values.forEach(function(i)
            {
                var tableRow = $.parseHTML("<tr class='selectable'><td class='imageColumn'><input class='it_item_name' type='hidden' value='" + i[1] + "'></input><input type='hidden' class='it_item_code' value='" + i[4] + "'></input><div class='image'></div></td><td><div class='itemHeader'><span class='brand'>" + i[2] + "</span> - " + i[1] + " <span class='smallPrice'>[" + i[3] + "]</span></div><div class='itemDescription'>" + i[0] + "</div></td></tr>");

                if(i[5] != null)
                {
                    var image = "http://jesperhoreca.erpnext.com/" + i[5];

                    $(tableRow).find(".imageColumn").find(".image").css
                    ({
                        "background" : "url('" + image + "')",
                        "width" : "80px",
                        "height" : "80px",
                        "background-size" : "100% 100%",
                        "background-repeat" : "no-repeat"
                    });
                }
                else
                {
                    $(tableRow).find(".imageColumn").find(".image").css
                    ({
                        "background" : "url('img/noimage.png')",
                        "width" : "80px",
                        "height" : "80px",
                        "background-size" : "100% 100%",
                        "background-repeat" : "no-repeat"
                    });
                }

                $("#tableItems tbody").append(tableRow);
            });

            $.mobile.changePage("#items", {transition : "slide"});
        }
        else
        {
            alert("Failed to get the list of items. Please try again later.");
        }

        $.mobile.loading("hide");
    });
}

function addItems()
{
    $("#tableItems tbody tr").each(function()
    {
        if($(this).hasClass("selected"))
        {
            var it_item_code = $(this).find(".imageColumn").find(".it_item_code").val();
            var it_item_name = $(this).find(".imageColumn").find(".it_item_name").val();
            addToCart({"item_code" : it_item_code, "item_name" : it_item_name});
        }
    });

    showCart();
}