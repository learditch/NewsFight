function checkForNull(storyAtt) {
  return storyAtt ? storyAtt : (storyAtt = "N/A");
}

function checkForNullSrc(storySrc) {
  return storySrc
    ? storySrc
    : (storySrc =
        "https://getuikit.com/v2/docs/images/placeholder_200x100.svg");
}

function formatStoryScore(score) {
  return (score * 100).toFixed(2);
}

export default {
  generateStoryMarkup: (story) => {
    return `
        <li>
        <div class="card">
          <div class="card-body">
            <div class ='story-icon-tray'>

            <p class='story-score' data-tooltip="This Story's Positive Rating"><img class='story-icon' src="static/assets/positive.png" alt="">${formatStoryScore(
              story.pos
            )}%</p>
            <p class='story-score' data-tooltip="This Story's Neutral Rating"><img class='story-icon' src="static/assets/neutral.png" alt="">${formatStoryScore(
              story.neu
            )}%</p>
            <p class='story-score' data-tooltip="This Story's Negative Rating"><img class='story-icon' src="static/assets/negative.png" alt="">${formatStoryScore(
              story.neg
            )}%</p>
            </div>
            <img class="story-thumbnail" src="${checkForNullSrc(
              story.urlToImage
            )}"  alt="">
            <h4 class ='story-title'>${story.title}</h4>
            <p class="lead story-description">${story.description}</p>
            <p class= 'story-author'>Author : ${checkForNull(story.author)}</p>
            <p class= 'story-publishedAt'>Published At: ${
              story.publishedAt
            } </p>
            <a class='story-url' href='${
              story.url
            }' target=”_blank">Full story</a>
          </div>
        </div>
      </li>
        `;
  },
  generateSourceHeadline: (headline) => {
    return `
            <h3> <a href="${headline.source_info[1]}" target=”_blank">${
      headline.source_info[0]
    }</a> Top <b>${headline.topic}</b> Stories for ${headline.date}</h3>
            <h4 class='column_title_left padded'>Average Article Ratings:</h4>
            <ul class='story-list-scores'>
            <li>Positive: ${headline.average_ratings.overallPosAvg.toFixed(
              2
            )}% </li>
            <li>Netural: ${headline.average_ratings.overallNeuAvg.toFixed(
              2
            )}%</li>
            <li>Negative: ${headline.average_ratings.overallNegAvg.toFixed(
              2
            )}% </li>
            </ul>
        `;
  },
  generateError: (error) => {
    return;
    `
    <div class="error">
            <p>ERROR</p>
          </div>
    `;
  },

  // /Users/huntervanlear/Desktop/NewsFightProject/NewsFight/app/static/assets/icons.svg
};
