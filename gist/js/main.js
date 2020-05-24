{
  'use strict';

  const encode_qr_url = 'https://api.qrserver.com/v1/create-qr-code/?';
  const charset = 'charset-source=UTF-8';
  const size = '&size=150x150';

  const textarea = document.querySelector('#textarea');
  const encode_btn = document.querySelector('#encode_btn');
  const msg = document.querySelector('#msg');
  const qrFile = document.querySelector('#qrfile');
  const qrCode = document.querySelector('#qrcode');
  const qr_img = document.querySelector('#qrimg');
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
      msg.textContent = `convert a text: "${textdata}" `;
    }

    // indicate convert direction
    rightArrow.className = 'is-shown';
    leftArrow.className  = 'is-hidden';
    qrFile.className = 'is-hidden';
    qrCode.className = 'is-shown';
    encode_btn.classList.add('clicked');

    // insert QR image
    qr_img.setAttribute("src", encode_qr_url + charset + size + '&data=' + conv_text);
    qr_img.setAttribute("id", "qrimg");
    if (first_load === false) {
      qrCode.appendChild(qr_img);
      first_load = true;
    }

  }

  function hidehelp(target_obj) {
    console.log(textarea);
    if (textarea.value.lenght > 0) {
      target_obj.className = "is-hidden";
    }
  }


  encode_btn.addEventListener('click', encodeQR);
  const texthelp = document.querySelector('#texthelp');
  console.log(textarea);
  textarea.addEventListener('keyup', function() {
    console.log('detect textarea : ' + this.value);
    if (this.value.length > 0) {
      hidehelp(texthelp);
    }
  });

}