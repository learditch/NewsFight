from flask import render_template, url_for, request, jsonify, make_response
from app.models import NewsSources
from app import app
from app.util import NewsData, sourcesQuery
import requests


@app.route('/')
@app.route('/index')
def index():
    # possibly call class methods in jinja?
    sources = sourcesQuery()
    return render_template('index.html', sources=sources)


@ app.route('/search/<topic>', methods=['GET', 'POST'])
def updated_search(topic):
    # if request.method == 'POST':
    #     req = request.form
    #     topic = req.get('topic_search')
    #     lsource = req.get('left_sources')
    req = request.get_json()
    left_stories = NewsData(req['left_source'], topic).getArticles()
    right_stories = NewsData(req['right_source'], topic).getArticles()
    newsResponse = {
        'topic': topic,
        'date': 'Feb 1 - Feb 2',
        'left': {'headline': {'source_info': [req['left_source_name'], req['left_source_full']],
                              'overall_rating': 0},
                 'stories': left_stories},
        'right': {'headline': {'source_info': [req['right_source_name'], req['right_source_full']],
                               'overall_rating': 0},
                  'stories': right_stories}
    }
    res = make_response(newsResponse, 200)
    return res
