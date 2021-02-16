from flask import render_template, url_for, request, jsonify, make_response
from app.models import NewsSources
from app import app
from app.util import NewsData, sourcesQuery
import requests


@app.route('/')
@app.route('/index')
def index():
    # possibly call class methods in jinja?
    # fox_stories = NewsData('foxnews.com').getArticles()
    # cnn_stories = NewsData('cnn.com').getArticles()
    sources = sourcesQuery()
    return render_template('index.html', sources=sources)
    # return render_template('index.html', sources=sources, fox_stories=fox_stories,
    #                        cnn_stories=cnn_stories)


@ app.route('/search/<topic>', methods=['GET', 'POST'])
def updated_search(topic):
    # if request.method == 'POST':
    #     req = request.form
    #     topic = req.get('topic_search')
    #     lsource = req.get('left_sources')
    req = request.get_json()
    print(req['left_source'] + req['right_source'])

    left_stories = NewsData(req['left_source'], topic).getArticles()
    right_stories = NewsData(req['right_source'], topic).getArticles()

    newsResponse = {
        'left': left_stories,
        'right': right_stories
    }

    res = make_response(newsResponse, 200)
    return res

    # return render_template('index.html', fox_stories=fox_stories, cnn_stories=cnn_stories)
