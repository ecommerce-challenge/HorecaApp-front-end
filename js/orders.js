$(document).on("pageshow", "#orders", function()
{
    updateOrderList();
});

function updateOrderList()
{
    $.mobile.loading('show');

    socket.emit("getPurchaseOrders",
    function(callback)
    {
        $("#tableOrders").find("tr:gt(0)").remove();

        if(callback != null)
        {
            callback.data.forEach(function(i)
            {
                var row = "<tr onclick='getOrderDetails(" + JSON.stringify(i.name) + ")'><td>" + i.name + "</td><td>" + i.supplier + "</td><td>" + i.creation.substring(0, 19) + "</td></tr>";
                $("#tableOrders tbody").append(row);
            });
        }
        else
        {
            alert("Failed to get the list of orders. Please try again later.");
        }

        $.mobile.loading('hide');
    });
}

function getOrderDetails(name)
{
    $.mobile.loading("show");
    $("#tableOrderDetails").find("tr:gt(0)").remove();
    $("#orderName").text(name);

    socket.emit("getPurchaseOrder", name,
    function(callback)
    {
        $("#tableOrderDetails").find("tr:gt(0)").remove();

        callback.data.po_details.forEach(function(i)
        {
            $("#tableOrderDetails tbody").append("<tr class='border'><td class='tableHeader smallRow noBorder'>" + i.item_name + "</td><td class='smallRow noBorder'><b>Quantity: </b> " + i.qty + "</td><td class='smallRow noBorder'><b>Price: </b>&euro; " + i.amount + " <span class='smallPrice'>&euro; " + i.rate + " each</span>" + "</td></tr>");
        });

        $.mobile.loading("hide");
        $("#showOrderDetails").trigger("click");
    });
}