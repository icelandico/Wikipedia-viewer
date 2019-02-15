let articlesLimit = '10';
let searchValue = ''
const btnRnd = document.querySelector('.random');
const btnSrch = document.querySelector('.search');
const resultList = document.querySelector('.results-pan__items');
const selectedLimit = document.querySelector('.search-pan__select-bar');
const input = document.querySelector('.search-pan__input');

btnRnd.addEventListener('click', randomArticle);

input.addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    parseData(getValues);
  }
});

btnSrch.addEventListener('click', () => {
  parseData(getValues)
})

selectedLimit.addEventListener('change', changeArticlesLimit);

async function parseData(func) {
  searchValue = input.value
  clearEntries()
  const address = `https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&limit=${articlesLimit}&namespace=0&format=json&search=${searchValue}`;
  const response = await fetch(address);
  const result = await response.json();
  try {
    func(result)
  }
  catch(err) {
    alert('Dont leave it blank!')
  }
}

function clearEntries() {
  while (resultList.firstChild) {
    resultList.removeChild(resultList.firstChild)
  }
}

function randomArticle() {
  const wikiRandom = 'https://en.wikipedia.org/wiki/Special:Random';
  window.open(wikiRandom, '_blank');
}

function getValues(item) {
  const heading = item[1];
  const content = item[2];
  const link = item[3];
  heading.map((item, index) => createListElem(heading[index], content[index], link[index]))
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
  articlesLimit = selectedLimit.value;
  if (input.value !== '') {
    parseData(getValues)
  } else {
    return null
  }
}
