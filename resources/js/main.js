var wikiApi = new XMLHttpRequest();
var wikiRandom = 'https://en.wikipedia.org/wiki/Special:Random';
var articlesLimit = '10';
var wikiApiSite = 'https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&limit=' + articlesLimit + '&namespace=0&format=json&search=';
var btnRnd = document.querySelector('.random');
var btnSrch = document.querySelector('.search');
var resultList = document.querySelector('.results-pan__items');
const selectedLimit = document.querySelector('.search-pan__select-bar');
const input = document.querySelector('.search-pan__input');
var data;

btnRnd.addEventListener('click', randomArticle);
input.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    parseData(getValues);
  }
});
btnSrch.addEventListener('click', parseData);
selectedLimit.addEventListener('change', changeArticlesLimit);

async function parseData(func) {
  clearEntries()
  const address = `https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&limit=${articlesLimit}&namespace=0&format=json&search=${input.value}`;
  const response = await fetch(address);
  const result = await response.json();
  func(result)
}

function clearEntries() {
  while (resultList.firstChild) {
    resultList.removeChild(resultList.firstChild)
  }
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
  resultList.insertAdjacentHTML("beforeend", newDiv);
}

function changeArticlesLimit() {
  var selectedLimitValue = selectedLimit.value;
  if (input.value !== '') {
    wikiApiSite = 'https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&limit=' +
      selectedLimitValue + '&namespace=0&format=json&search=';
    parseData(getValues)
  } else {
    articlesLimit = selectedLimitValue;
    wikiApiSite = 'https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&limit=' +
      articlesLimit + '&namespace=0&format=json&search=';
  }
}
