from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer


def average(scores, score_key):
    new_list = []
    for score in scores:
        new_list.append(score[score_key])
    avg = sum(new_list) / len(new_list)
    return avg


def sentiment_scores(stories):
    total_scores_avg = {}
    total_scores = []
    analyzer = SentimentIntensityAnalyzer()
    for story in stories:
        sentiment_dict = analyzer.polarity_scores(story['description'])
        total_scores.append(sentiment_dict)
    total_scores_avg.update(
        {'overallCompoundAvg': (average(total_scores, 'compound')), 'overallNegAvg': (average(total_scores, 'neg')), 'overallNeuAvg': (average(total_scores, 'neu')), 'overallPosAvg': (average(total_scores, 'pos'))})

    stories.insert(0, total_scores_avg)
    return stories
