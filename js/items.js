$(document).on("pageshow", "#items", function()
{
    searchItems();
});

function searchItems()
{
    $.mobile.loading("show");

    socket.emit("getItems", function(callback)
    {
        $("#tableItems tbody tr").remove();
        
        if(callback != null)
        {
            callback.data.forEach(function(i)
            {
                var tableRow = $.parseHTML("<tr class='selectable'><td class='imageColumn'><input class='it_item_name' type='hidden' value='" + i.item_name + "'></input><input type='hidden' class='it_item_code' value='" + i.item_code + "'></input><div class='image'></div></td><td><div class='itemHeader'><span class='brand'>" + i.brand + "</span> - " + i.item_name + " <span class='smallPrice'>[" + i.barcode + "]</span></div><div class='itemDescription'>" + i.description + "</div></td></tr>");

                if(i.image != null)
                {
                    var image = i.image;

                    if(i.image.substring(1, 6) == "files")
                        var image = "https://horecajeppie.frappecloud.com" + i.image;

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