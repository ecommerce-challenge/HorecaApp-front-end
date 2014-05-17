$(document).on("pageshow", "#cart", function()
{
    checkCartEmpty()
});

function checkCartEmpty()
{
    if($("#tableCart tr").length > 1)
    {
        $("#tableCart").show();
        $("#cartEmpty").hide();
    }
    else
    {
        $("#tableCart").hide();
        $("#cartEmpty").show();
    }
}

function showCart()
{
    checkCartEmpty();
    $.mobile.loading("show");
    $.mobile.changePage("#cart", {transition : "slide"});
    $.mobile.loading("hide");
}

function addToCart(product)
{
    $("#scannedProduct").popup("close");
    var date = new Date();
    var today = date.getFullYear() + "-mm-dd";
    $("#tableCart tbody").append("<tr class='border'><td class='item_code tableHeader smallRow noBorder'><input class='tableTextfield' type='hidden' value='" + product.item_code + "'>" + product.item_name + "</td><td class='quantity smallRow noBorder'><input class='tableTextfield maxWidth' type='text' placeholder='Quantity'></td><td class='rate smallRow noBorder'><input class='tableTextfield maxWidth' type='text' placeholder='Rate'></td><td class='date smallRow noBorder'><input class='tableTextfield maxWidth' type='text' placeholder='yyyy-mm-dd' value='" + today + "'></td><td class='noBorder'><a class='ui-btn tableButton maxWidth' onclick='removeFromCart(this);'>Remove</a></td></tr>");
    checkCartEmpty();
}

function removeFromCart(buttonClicked)
{
    $(buttonClicked).closest("tr").remove();
    checkCartEmpty();
}

function addCartToOrder()
{
    if($("#tableCart tr").length > 1)
    {
        var passedValidations = true;

        $("#tableCart tr:gt(0)").each(function()
        {
            var quantity = $(this).find(".quantity").find(".tableTextfield").val();
            var rate = $(this).find(".rate").find(".tableTextfield").val();
            var date = $(this).find(".date").find(".tableTextfield").val();

            if($.trim(quantity) == "")
            {
                $(this).find(".quantity").find(".tableTextfield").addClass("required");
                passedValidations = false;
            }
            else
            {
                $(this).find(".quantity").find(".tableTextfield").removeClass("required");
            }

            if($.trim(rate) == "")
            {
                $(this).find(".rate").find(".tableTextfield").addClass("required");
                passedValidations = false;
            }
            else
            {
                $(this).find(".rate").find(".tableTextfield").removeClass("required");
            }

            if($.trim(date) == "")
            {
                $(this).find(".date").find(".tableTextfield").addClass("required");
                passedValidations = false;
            }
            else
            {
                $(this).find(".date").find(".tableTextfield").removeClass("required");
            }
        });

        if(passedValidations)
        {
            $.mobile.loading("show");

            socket.emit("getSuppliers",
            function(callback)
            {
                if(callback != null)
                {
                    $("#selectSupplier").find("option:gt(0)").remove();
                    callback.data.forEach(function(i)
                    {
                        $("#selectSupplier").append("<option value='" + i.name + "'>" + i.name + "</option>");
                    });;

                    $("#showCustomizeOrder").trigger("click");
                }
                else
                {
                    alert("Failed to fetch to suppliers. Please try again later.");
                }

                $.mobile.loading("hide");
            });
        }
    }
}

function sendOrder()
{
    $("#customizeOrder").popup("close");

    var supplier = $("#selectSupplier").val();
    var data = {"supplier" : supplier};
    var po_details = [];
    
    $("#tableCart tr:gt(0)").each(function()
    {
        var item_code = $(this).find(".item_code").find(".tableTextfield").val();
        var quantity = $(this).find(".quantity").find(".tableTextfield").val();
        var rate = $(this).find(".rate").find(".tableTextfield").val();
        var date = $(this).find(".date").find(".tableTextfield").val();
        po_details.push({"item_code" : item_code, "qty" : quantity, "rate" : rate, "schedule_date" : date});
    });

    data["po_details"] = po_details;
    $.mobile.loading('show')

    socket.emit("insertPurchaseOrder", data,
    function(callback)
    {
        if(callback != null)
        {
            $("#tableCart").find("tr:gt(0)").remove();
            $("#selectSupplier").val("");
            checkCartEmpty();
            updateOrderList();
            $.mobile.changePage("#orders", {transition : "slide", reverse: true});
        }
        else
        {
            alert("Failed to inert the order into ERPNext, please try again.");
        }
        
        $.mobile.loading('hide')
    });
}