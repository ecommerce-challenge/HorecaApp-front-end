$(document).on("pageshow", "#orders", function()
{
    updateOrderList();
});

function updateOrderList()
{
    $.mobile.loading('show')

    socket.emit("getAllOrders",
    function(callback)
    {
        $("#tableOrders").find("tr:gt(0)").remove();

        callback.values.forEach(function(i)
        {
            var row = "<tr onclick='getOrderDetails(" + JSON.stringify(i[3]) + ")'><td>" + i[3] + "</td><td>" + i[0] + "</td><td>" + i[2] + "</td></tr>";
            $("#tableOrders").append(row);
        });

        $.mobile.loading('hide')
    });
}

function getOrderDetails(name)
{
    $.mobile.loading('show')
    $("#tableOrderDetails").find("tr:gt(0)").remove();
    $("#orderName").text(name);
    $("#showOrderDetails").trigger("click");

    socket.emit("getOrderDetails", name,
    function(callback)
    {
        delete callback[0];

        callback.forEach(function(i)
        {
            $("#tableOrderDetails").append("<tr><td>" + i.item_name + "</td><td>" + i.qty + "</td><td>&euro; " + i.amount + " <span class='smallPrice'>&euro; " + i.purchase_rate + " each</span>" + "</td></tr>");
        });

        $.mobile.loading('hide')
    });
}