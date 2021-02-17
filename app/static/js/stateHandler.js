import api from "./modules/api.js";
// console.log(api.testText());
const searchParent = document.querySelector(".searchForm");
const searchInput = document.querySelector(".searchInput");
const $leftStoriesList = $("#stories-left");
const $rightStoriesList = $("#stories-right");
let storyList;

function getSourceData() {
  const $leftSource = $("#left-sources option:selected");
  const $rightSource = $("#right-sources option:selected");
  const sources = {
    left_source_full: $leftSource.data("fullurl"),
    left_source: $leftSource.val(),
    left_source_name: $leftSource.text(),
    right_source_full: $rightSource.data("fullurl"),
    right_source: $rightSource.val(),
    right_source_name: $rightSource.text(),
  };
  return sources;
}

class Headline {
  constructor({ date, sourceName, fullSourceUrl, topic, averageObjScore }) {
    this.date = date;
    this.sourceName = sourceName;
    this.fullSourceUrl = fullSourceUrl;
    this.topic = topic;
    this.averageObjScore = averageObjScore;
  }
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
  constructor(leftStoriesHl, leftStories, rightStoriesHl, rightStories) {
    this.leftStoriesHl = leftStoriesHl;
    this.leftStories = leftStories;
    this.rightStoriesHl = rightStoriesHl;
    this.rightStories = rightStories;
  }
  static async getStories(topic) {
    try {
      const data = await AJAX(
        `${window.origin}/search/${topic}`,
        getSourceData()
      );
      // console.log(data);
      const leftStoriesHl = data.left.headline;
      const leftStories = data.left.stories.map((story) => new Story(story));
      const rightStoriesHl = data.right.headline;
      const rightStories = data.right.stories.map((story) => new Story(story));
      return new StoryList(
        leftStoriesHl,
        leftStories,
        rightStoriesHl,
        rightStories
      );
    } catch (err) {
      console.log(err);
    }
  }
}

async function getAndShowStories(topic) {
  storyList = await StoryList.getStories(topic);
  console.log(storyList);
  //add loading wheel
  putStoriesOnPage();
}

function putStoriesOnPage() {
  //combine loops?
  //empty story list html
  // let leftSourceName, leftSourceUrl, rightSourceName, rightSourceUrl;
  // [leftSourceName, leftSourceUrl] = storyList.leftStoriesHl.source_info;
  // [rightSourceName, rightSourceUrl] = storyList.rightStoriesHl.source_info;
  // const leftHeadline = generateSourceHeadline(leftSourceUrl, leftSourceName);
  // const rightHeadline = generateSourceHeadline(rightSourceUrl, rightSourceName);

  const leftHeadline = generateSourceHeadline(storyList.leftStoriesHl);
  const rightHeadline = generateSourceHeadline(storyList.rightStoriesHl);

  $leftStoriesList.append(leftHeadline);
  $rightStoriesList.append(rightHeadline);

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
      <a class='story-url' href='${story.url}' target=”_blank">Link to Full story</a>
    </div>
  </div>
</li>
  `;
}

function generateSourceHeadline(headline) {
  return `
  <h3> <a href="${headline.source_info[1]}" target=”_blank">${headline.source_info[0]}</a> Top Stories for <b>Trump</b> Feb 1 - Feb 4 </h3>
  <h4 class='column_title_leftpadded'>Average Objectivity Score: ${headline.overall_rating}</h4>
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
