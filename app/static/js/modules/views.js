export default {
  generateStoryMarkup: (story) => {
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
            <a class='story-url' href='${story.url}' target=”_blank">Full story</a>
          </div>
        </div>
      </li>
        `;
  },
  generateSourceHeadline: (headline) => {
    return `
            <h3> <a href="${headline.source_info[1]}" target=”_blank">${
      headline.source_info[0]
    }</a> Top Stories for <b>Trump</b> Feb 1 - Feb 4 </h3>
            <h4 class='column_title_left padded'>Average Article Ratings:</h4>
            <ul>
            <li>Negative: ${headline.average_ratings.overallNegAvg.toFixed(
              2
            )}% </li>
            <li>Netural: ${headline.average_ratings.overallNeuAvg.toFixed(
              2
            )}%</li>
            <li>Positive: ${headline.average_ratings.overallPosAvg.toFixed(
              2
            )}% </li>
            </ul>
        `;
  },

  // /Users/huntervanlear/Desktop/NewsFightProject/NewsFight/app/static/assets/icons.svg
};
