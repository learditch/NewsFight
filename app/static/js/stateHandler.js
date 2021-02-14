import api from './modules/api.js'
console.log("hi");

const searchParent = document.querySelector(".searchForm");
const searchInput = document.querySelector(".searchInput");

const loadSearchResults = async function (topic) {
  try {
    const res = await fetch(`${window.origin}/search/${topic}`);
    var test = api.testText();
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

const getQuery = function () {
  return searchInput.value;
};

searchParent.addEventListener("submit", async function (e) {
  e.preventDefault();
  const topic = getQuery();
  if (!topic) return;
  await loadSearchResults(topic);
});
