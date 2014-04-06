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
                    $("#scannedProductName").text(" - " + callback[0].item_name);
                    $("#scannedProductBrand").text("[" + callback[0].brand + "]");
                    
                    if(callback[0].image != null)
                    {
                        var image = "http://jesperhoreca.erpnext.com/" + callback[0].image;
                        $("#scannedProductImage").css
                        ({
                            "display" : "",
                            "background" : "url('" + image + "')",
                            "border" : "1px solid black",
                            "margin" : "0 auto",
                            "margin-bottom" : "10px",
                            "width" : "100px",
                            "height" : "100px",
                            "background-size" : "100% 100%",
                            "background-repeat" : "no-repeat" 
                        });
                    }
                    else
                    {
                        $("#scannedProductImage").css({"display" : "none", "background" : "none"});
                    }

                    $("#scannedProductDescription").text(callback[0].description);
                }
                else
                {
                    $("#addToCart").removeAttr("onclick");
                    $("#addToCart").hide();
                    $("#scannedProductName").text("Product not found");
                    $("#scannedProductBrand").text("");
                    $("#scannedProductImage").css({"display" : "none", "background" : "none"});
                    $("#scannedProductDescription").text("The product with barcode: " + result.text + " was not found, please make sure that the barcode isn't damaged.");
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