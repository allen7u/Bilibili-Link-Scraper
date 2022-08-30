// ==UserScript==
// @name         获取用户所有视频链接(B站）
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://space.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function copy_links_on_this_page(){
        var links = document.querySelectorAll('ul li a.title');
        var links_text = '';
        for(var i=0;i<links.length;i++){
            links_text += links[i].href + '\n';
        }
        // copy to clipboard
        var copyText = document.createElement('textarea')
        copyText.value = links_text
        document.body.appendChild(copyText)
        copyText.select()
        document.execCommand('copy')
        document.body.removeChild(copyText)
}



    createButton('列表视频链接','93%','39%',copy_links_on_this_page)



    function createButton( innerHTML,left,top,eventHandler ){
        var btn = document.createElement('button')
        btn.addEventListener('click', eventHandler);
        btn.innerHTML = innerHTML;
        btn.draggable = 'true'
        btn.style.position = 'fixed';
        btn.style.top = top;
        btn.style.left = left;
        btn.style.zIndex = '9999';
        btn.style.backgroundColor = '#fff';
        btn.style.color = '#000';
        btn.style.fontSize = '20px';
        btn.style.padding = '10px';
        btn.style.borderRadius = '5px';
        btn.style.border = '1px solid #000';
        btn.style.cursor = 'pointer';
        btn.id = 'notes-dl-btn'

        var offSetX, offSetY
        btn.ondragstart = function(e){
            let rect = e.target.getBoundingClientRect()
            offSetX = e.clientX - rect.left
            offSetY = e.clientY - rect.top
        }
        btn.ondragend = function(e){
            btn.style.left = parseInt(e.clientX - offSetX)+'px'
            btn.style.top = parseInt(e.clientY	- offSetY)+'px'
            console.log(e.clientX)
            console.log(e.clientY)
            console.log(parseInt(e.clientX - offSetX))
            console.log(e.clientY - offSetY)
        }

        document.body.appendChild(btn);
    }

})();












