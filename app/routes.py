from flask import render_template, url_for, request, jsonify, make_response
from app.models import NewsSources
from app import app, db
from app.util import NewsData, sourcesQuery, populateSourcesTable, TODAY, getLastMonthDate
import requests


@app.errorhandler(500)
def serverError(error):
    return jsonify({'message': 'No Stories Found For this Topic'}), 500


@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404


@app.route('/')
@app.route('/index')
def index():
    if len(NewsSources.query.all()) < 1:
        populateSourcesTable()
    sources = sourcesQuery()
    return render_template('index.html', sources=sources)


@ app.route('/search/<topic>', methods=['GET', 'POST'])
def updated_search(topic):
    # if request.method == 'POST':
    #     req = request.form
    #     topic = req.get('topic_search')
    #     lsource = req.get('left_sources')
    req = request.get_json()
    left_stories_data = NewsData(req['left_source'], topic).getArticles()
    right_stories_data = NewsData(req['right_source'], topic).getArticles()

    newsResponse = {
        'left': {'headline': {'source_info': [req['left_source_name'], req['left_source_full']],
                              'average_ratings': left_stories_data['articleScores'], 'date': f'{getLastMonthDate(TODAY)} to {TODAY}', 'topic': topic},
                 'stories': left_stories_data['articleList']},
        'right': {'headline': {'source_info': [req['right_source_name'], req['right_source_full']],
                               'average_ratings': right_stories_data['articleScores'], 'date': f'{getLastMonthDate(TODAY)} to {TODAY}', 'topic': topic},
                  'stories': right_stories_data['articleList']}
    }
    res = make_response(newsResponse, 200)
    return res
