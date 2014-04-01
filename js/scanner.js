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
                    "Name: " + callback[0].item_name + "\n" +
                    "Brand: " + callback[0].brand + "\n" +
                    "Description: " + callback[0].description);
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