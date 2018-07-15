var wikiApi = new XMLHttpRequest();
var wikiRandom = 'https://en.wikipedia.org/wiki/Special:Random';
var articlesLimit = '10';
var wikiApiSite = 'https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&limit=' + articlesLimit + '&namespace=0&format=json&search=';
var btnRnd = document.querySelector('.random');
var btnSrch = document.querySelector('.search');
var input = document.querySelector('.search-pan__input');
var unorderedList = document.querySelector('.results-pan__items');
var selectedLimit = document.querySelector('.search-pan__select-bar');
var data;

btnRnd.addEventListener('click', randomArticle);
input.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    parse();
  }
});
btnSrch.addEventListener('click', parse);
selectedLimit.addEventListener('change', changeArticlesLimit);

function parse() {
    console.log(wikiApiSite);
    unorderedList.innerHTML = '';
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

function changeArticlesLimit() {
  var selectedLimitValue = selectedLimit.value;
  wikiApiSite = 'https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&limit=' +
  selectedLimitValue + '&namespace=0&format=json&search=';
  parse(selectedLimitValue)
}


