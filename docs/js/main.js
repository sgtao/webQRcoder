{
  'use strict';

  const encode_qr_url = 'https://api.qrserver.com/v1/create-qr-code/?';
  const charset = 'charset-source=UTF-8';
  const size = '&size=150x150';

  const textarea = document.querySelector('#textarea');
  const encode_btn = document.querySelector('#encode_btn');
  const msg = document.querySelector('#msg');
  const qrFile = document.querySelector('#qrfile');
  const resultQR = document.querySelector('#resultQR');
  const resultImg = document.querySelector('#resultImg');
  const rightArrow = document.querySelector('img#rightArrow');
  const leftArrow = document.querySelector('img#leftArrow');
  var first_load = false;

  function encodeQR() {
    // ex) https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example
    let textdata = textarea.value;
    console.log(`encodeQR : ${textdata}`);
    conv_text = encodeURIComponent(textdata);
    msg.textContent = '';
    if (textdata == "") {
      msg.textContent = "Failed!(textarea is blank)";
      return;
    } else {
      msg.textContent = `encode text: "${textdata}" `;
      encode_btn.innerHTML = 'Encoded!';
    }

    // indicate convert direction
    rightArrow.className = 'is-shown';
    leftArrow.className  = 'is-hidden';
    qrFile.className = 'is-hidden';
    resultQR.className = 'is-shown';
    encode_btn.classList.add('clicked');

    // insert QR image
    resultImg.setAttribute("src", encode_qr_url + charset + size + '&data=' + conv_text);
    resultImg.setAttribute("id", "qrimg");
    if (first_load === false) {
      resultQR.appendChild(resultImg);
      first_load = true;
    }

  }

  encode_btn.addEventListener('click', encodeQR);

  // QR decoder

  // File Reader
  var obj1 = document.getElementById("selfile");


  obj1.addEventListener("change", function (evt) {
    var file = evt.target.files;
    var reader = new FileReader();

    //dataURL形式でファイルを読み込む
    reader.readAsDataURL(file[0]);

    //ファイルの読込が終了した時の処理
    reader.onload = function () {
      var dataUrl = reader.result;

      //読み込んだ画像とdataURLを書き出す
      document.getElementById("qr-canvas").innerHTML = "<img src='" + dataUrl + "'>";
    }
  }, false);


}