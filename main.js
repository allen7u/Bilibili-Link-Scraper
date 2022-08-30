// ==UserScript==
// @name         B站搜索或列表链接
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @match        https://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function copy_links_on_this_page(){

        // get title
        var title = document.title;

        var links = document.querySelectorAll('ul li a.title');
        var links_text = '';
        var links_with_title = '';
        for(var i=0;i<links.length;i++){
            links_text += links[i].href + '\n';
            links_with_title += '# '+links[i].innerText + '\n' + links[i].href + '\n';
        }
        var combined_playlist = '\n#combined_playlist\n' + links_text + '\n' + links_with_title;

        var search_results = document.querySelectorAll('.bili-video-card__info > div > a')
        var search_results_text = '';
        var search_results_with_title = '';
        for(var i=0;i<search_results.length;i++){
            search_results_text += search_results[i].href + '\n';
            search_results_with_title += '# '+search_results[i].innerText + '\n' + search_results[i].href + '\n';
        }
        var combined_search_results = '\n#combined_search_results\n' + search_results_text + '\n' + search_results_with_title
        
        var combined_playlist_and_search_results = combined_playlist + '\n' + combined_search_results;
        console.log(combined_playlist_and_search_results);

        // copy to clipboard
        var copyText = document.createElement('textarea')
        
        copyText.value = combined_playlist_and_search_results
        document.body.appendChild(copyText)
        copyText.select()
        document.execCommand('copy')
        document.body.removeChild(copyText)

        console.log(combined_playlist_and_search_results);

        // show message
        if (links.length > 0 || search_results.length > 0) {
        var message = document.createElement('div');
        message.innerHTML = '<div class="alert alert-success" role="alert">' +
            '<strong>Success!</strong> Copied to clipboard.' +  '</div>' +
            combined_playlist_and_search_results
        // add br to separate lines
        message.innerHTML = message.innerHTML.replace(/\n/g, '<br>');
        // fixed
        message.style.position = 'fixed';
        message.style.top = '25vh';
        message.style.left = '25vw';
        message.style.width = '50vw';
        message.style.height = '75vh';
        message.style.zIndex = '9999';
        message.style.backgroundColor = '#fff';
        message.style.borderRadius = '5px';
        message.style.padding = '10px';
        message.style.boxShadow = '0px 0px 10px #ccc';
        message.style.fontSize = '16px';
        message.style.overflow = 'auto';


        document.body.appendChild(message);
        setTimeout(function(){
            document.body.removeChild(message);
        }, 3000);
        }
        
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












