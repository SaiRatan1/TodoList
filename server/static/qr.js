// const { Html5QrcodeScanner } = require("html5-qrcode");
// import {Html5QrcodeScanner} from "html5-qrcode"
// const scanner = new Html5QrcodeScanner('qrscanner',{
//     qrbox:{
//         width:100,
//         height:100
//     },  
//     fps:20
// });
// scanner.render(success,error);

// function success(result){

//     document.getElementById('result').innerHTML = `
//     <h2>Success!</h2>
//     <p><a href="${result}">${result}</a></p> `;

//     scanner.clear();

// }
// function error(){
//     console.log(error)
// }


// According to the documentation

const button = document.getElementById('scannerbutton');
button.addEventListener('click', function (e) {
    // use append child to insert scanner
    let qrs = document.getElementById('qrscanner');
    qrs.style.display = "block"
    qrs.style.width = "280px"
    qrs.style.height = "280px"
    QRScanner();
})

function QRScanner() {

    function onScanSuccess(decodedText, decodedResult) {
        let messqr;
        // handle the scanned code as you like, for example:
        console.log(`Code matched = ${decodedText}`, decodedResult);
        // upi://pay?pa=sairatanps@oksbi&pn=SAI%20RATAN%20P%20S&aid=uGICAgMCAyfWLFg/
        if(decodedText=="upi://pay?pa=sairatanps@oksbi&pn=SAI%20RATAN%20P%20S&aid=uGICAgMCAyfWLFg"){
            // Add password authentication
            document.getElementById('result').innerHTML = `<h2>Success!</h2> 
            <p>40 credits have been deducted</p> `
        }
        else{
            console.log(decodedText)
            document.getElementById('result').innerHTML = `<h2>Wrong QR code!</h2>`
        }

    //     document.getElementById('result').innerHTML = `<h2>Success!</h2>
    // <p><a href="${decodedText}">${decodedText}</a></p> `;
        html5QrcodeScanner.pause();
        // var elements = document.getElementById('qrscanner');
        // elements.parentNode.removeChild(elements)
        document.getElementById('qrscanner').style.display = "none";
        html5QrcodeScanner.clear();
    }

    function onScanFailure(error) {
        // handle scan failure, usually better to ignore and keep scanning.
        // for example:
        console.warn(`Code scan error = ${error}`);
    }

    let html5QrcodeScanner = new Html5QrcodeScanner(
        "qrscanner",
        { fps: 20, qrbox: { width: 280, height: 280 } },
    /* verbose= */ false);

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
}