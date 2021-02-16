import api from "./modules/api.js";
console.log(api.testText());
const searchParent = document.querySelector(".searchForm");
const searchInput = document.querySelector(".searchInput");
const $leftStoriesList = $("#stories-left");
const $rightStoriesList = $("#stories-right");
let storyList;

function getSources() {
  const $leftSource = $("#left-sources").val();
  const $rightSource = $("#right-sources").val();
  const sources = {
    left_source: $leftSource,
    right_source: $rightSource,
  };
  return sources;
}

class Story {
  constructor({ author, description, publishedAt, title, url, urlToImage }) {
    this.author = author;
    this.title = title;
    this.description = description;
    this.publishedAt = publishedAt;
    this.title = title;
    this.url = url;
    this.urlToImage = urlToImage;
  }
}

class StoryList {
  constructor(leftStories, rightStories) {
    this.leftStories = leftStories;
    this.rightStories = rightStories;
  }
  static async getStories(topic) {
    try {
      const data = await AJAX(`${window.origin}/search/${topic}`, getSources());
      const leftStories = data.left.map((story) => new Story(story));
      const rightStories = data.right.map((story) => new Story(story));
      return new StoryList(leftStories, rightStories);
    } catch (err) {
      console.log(err);
    }
  }
}

async function getAndShowStories(topic) {
  storyList = await StoryList.getStories(topic);
  //add loading wheel
  putStoriesOnPage();
  console.log(storyList.leftStories);
}

function putStoriesOnPage() {
  //combine loops?
  //empty story list html
  for (let story of storyList.leftStories) {
    const $story = generateStoryMarkup(story);
    $leftStoriesList.append($story);
  }

  for (let story of storyList.rightStories) {
    const $story = generateStoryMarkup(story);
    $rightStoriesList.append($story);
  }
}

function generateStoryMarkup(story) {
  return `
  <li>
  <div class="card">
    <div class="card-body">
      <p class = 'story-score'>Objectivity Score: 4.6</p>
      <img class="story-thumbnail" src="${story.urlToImage}" alt="">
      <h4 class ='story-title'>${story.title}</h4>
      <p class="lead story-description">${story.description}</p>
      <p class= 'story-author'>Author : ${story.author}</p>
      <p class= 'story-publishedAt'>Published At: ${story.publishedAt} </p>
      <a class='story-url' href='${story.url}'>Link to Full story</a>
    </div>
  </div>
</li>
  `;
}

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const AJAX = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchPro, timeout(5)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

const getQuery = function () {
  return searchInput.value;
};

searchParent.addEventListener("submit", async function (e) {
  e.preventDefault();
  const topic = getQuery();
  if (!topic) return;
  await getAndShowStories(topic);
});
