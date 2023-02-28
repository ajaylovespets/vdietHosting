import React, { useEffect } from 'react';
import AppmakerWebSdk from "@appmaker-xyz/web-sdk";


function FlutterApp() {
  useEffect(() => {
    // const queryParameters = new URLSearchParams(window.location.search)
    // const productId = queryParameters.get("productId");
    // const variantId = queryParameters.get("variantId");
    function loadMainDartJs() {
        var scriptTag = document.createElement('script');
        scriptTag.src = './main.dart.js';
        scriptTag.type = 'application/javascript';
        document.getElementById('flutterPreview').append(scriptTag);
      
        window.addEventListener('message', function(event) {
          if (event.data === 'onFlutterAppLoaded') {
            console.log('Flutter app loaded!');
            window.removeEventListener('message', this);
          } else if (event.data.type === 'addToCartClciked') {
            addToCartClicked(event.data);

          }
        });
      }
      
      loadMainDartJs();
    }, []);

    var productJson;
    var variantJson;


    async function addToCartClicked(event) {
      console.log(event.data);
      var pid = event.data.pid;
      var vid =  event.data.vid;
      var urll =  event.data.prescriptionUrl;      
      var quantity =  event.data.quantity; 
      await fetchData(pid,vid,urll,quantity);
    }

    async function fetchData(pid,vid,urll,quantity){
      try {
        if(!productJson && !variantJson){
          const response = await fetch(`https://servicereminder.el.r.appspot.com/getProd?prodId=${pid}`);
          productJson = await response.json();
          const vresponse = await fetch(`https://servicereminder.el.r.appspot.com/getProdVariant?varId=${vid}`);
          variantJson = await vresponse.json();
          console.log("productJson");
          console.log(productJson);
          console.log('variantJson');
          console.log(variantJson); 
          console.log("quantity");
          console.log(quantity);
          let customAttributes = {"prescription_file":`"${urll}"`}
          console.log("customAttributes")
          console.log(customAttributes);

          await AppmakerWebSdk.addProductToCart({ productJson, variantJson, quantity, customAttributes })
        }
        else{
          return '';
        }
      }catch(e){
        console.log(e);
      }
    };

  return (
    <div id="flutterPreview">
      {/* Placeholder content while the Flutter app is loading */}
      <p>Loading...</p>
    </div>
  );
}

function App() {
  return (
    <div>
      {/* Other React app components */}
      helljdasda
      <FlutterApp />
    </div>
  );
}

export default App;
