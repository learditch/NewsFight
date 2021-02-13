from flask import render_template, url_for, request, jsonify, make_response
from app import app
from app.util import *
import requests


@app.route('/')
@app.route('/index')
def index():
    # possibly call class methods in jinja?
    # fox_stories = NewsData('foxnews.com').getArticles()
    # cnn_stories = NewsData('cnn.com').getArticles()
    sources = NewsData().getSources()
    return render_template('index.html', sources=sources)


@app.route('/search/<topic>', methods=['GET', 'POST'])
def updated_search(topic):
    # if request.method == 'POST':
    #     req = request.form
    #     topic = req.get('topic_search')
    #     lsource = req.get('left_sources')

    fox_stories = NewsData('foxnews.com', topic).getArticles()
    cnn_stories = NewsData('cnn.com', topic).getArticles()

    newsResponse = {
        'left': cnn_stories,
        'right': fox_stories
    }

    res = make_response(newsResponse, 200)
    return res

    # return render_template('index.html', fox_stories=fox_stories, cnn_stories=cnn_stories)
