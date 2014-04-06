function scan()
{
    cordova.plugins.barcodeScanner.scan(function(result)
    {
        if(result.cancelled != true)
        {
            $.mobile.loading("show");

            socket.emit("scanProduct",
            {
                "barcode" : result.text
            },
            function(callback)
            {
                if(callback != null)
                {
                    $("#addToCart").attr("onclick", "addToCart(" + JSON.stringify(callback[0]) + ");");
                    $("#addToCart").show();
                    $("#scannedProduct").find("#scannedProductHeader").find("#scannedProductName").text(" - " + callback[0].item_name);
                    $("#scannedProduct").find("#scannedProductHeader").find("#scannedProductBrand").text("[" + callback[0].brand + "]");
                    $("#scannedProduct").find(".ui-content").find("#scannedProductDescription").text(callback[0].description);
                }
                else
                {
                    $("#addToCart").removeAttr("onclick");
                    $("#addToCart").hide();
                    $("#scannedProduct").find("#scannedProductHeader").find("#scannedProductName").text("Product not found");
                    $("#scannedProduct").find("#scannedProductHeader").find("#scannedProductBrand").text("");
                    $("#scannedProduct").find(".ui-content").find("#scannedProductDescription").text("The product with barcode: " + result.text + " was not found, please make sure that the barcode isn't damaged.");
                    
                }

                $("#showScannedProduct").trigger("click");

                $.mobile.loading("hide");
            });
        }
    },
    function(error)
    {
        alert("Scanning failed: " + error);
    });
}