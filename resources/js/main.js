var wikiApi = new XMLHttpRequest();
var wikiRandom = "https://en.wikipedia.org/wiki/Special:Random";
var wikiApiSite = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
var btnRnd = document.querySelector(".random");
var btnSrch = document.querySelector(".search");
var testing = document.querySelector(".test");
var searchPan = document.querySelector(".search-pan");
var input = document.querySelector(".search-pan__input");
var unorderedList = document.querySelector(".results-pan__items");
var listItem = document.querySelector(".results-item");
var data;

function parse() {
    unorderedList.innerHTML = "";
    var url = wikiApiSite + input.value;
    wikiApi.open('GET', url, true);
    wikiApi.onload = function () {
        data = JSON.parse(this.response);
        getValues(data);
    };
    wikiApi.send();
}

function randomArticle() {
    window.open(wikiRandom, '_blank')
}

function getValues(item) {
    var heading = item[1];
    var content = item[2];
    var link = item[3];
    for (var i = 0; i < heading.length; i++) {
        createListElem(heading[i], content[i], link[i])
    }
};

function createListElem(heading, content, link) {
    var newDiv = '<li class="results-item">' +
                    '<a href=' + link  + ' target="_blank">'+
                        '<h2>' + heading + '</h2>' +
                        '<p>' + content + '</p>' +
                    '</a>' +
                '</li>';
    unorderedList.insertAdjacentHTML("beforeend", newDiv);
}

btnRnd.addEventListener('click', randomArticle);
btnSrch.addEventListener('click', parse);


