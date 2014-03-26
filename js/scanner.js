function scan()
{
    cordova.plugins.barcodeScanner.scan(function(result)
    {
        if(result.cancelled != true)
        {
            socket.emit("scanProduct",
            {
                "barcode" : result.text
            },
            function(callback)
            {
                if(callback != null)
                {
                    alert("Product found!\n" +
                    "Name: " + callback[0].name + "\n" +
                    "Price: " + callback[0].price + "\n" +
                    "Stock: " + callback[0].quantity);
                }
                else
                {
                    alert("The product with barcode: " + result.text + " was not found, please make sure that the barcode isn't damaged.");
                }
            });
        }
    },
    function(error)
    {
        alert("Scanning failed: " + error);
    });
}