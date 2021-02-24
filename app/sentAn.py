from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer


def average(scores, score_key):
    if len(scores=0):
        return
    new_list = []
    for score in scores:
        new_list.append(score[score_key])
    avg = round(sum(new_list) / len(new_list), 2)
    return avg


def sentiment_scores(stories):
    total_scores_avg = {}
    total_scores = []
    analyzer = SentimentIntensityAnalyzer()
    for story in stories:
        sentiment_dict = analyzer.polarity_scores(story['description'])
        story.update(sentiment_dict)
        total_scores.append(sentiment_dict)
    total_scores_avg.update(
        {'overallCompoundAvg': (average(total_scores, 'compound')), 'overallNegAvg': (average(total_scores, 'neg')*100), 'overallNeuAvg': (average(total_scores, 'neu')*100), 'overallPosAvg': (average(total_scores, 'pos')*100)})

    return total_scores_avg
