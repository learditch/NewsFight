import requests
import datetime
from app.sentAn import sentiment_scores
from app import db
from app.secrets import API_KEY
from app.models import NewsSources
from urllib.parse import urlparse, urlsplit


BASE_URL = 'https://newsapi.org/v2/'
TODAY = datetime.date.today()


def getLastMonthDate(today):
    previous_month = today.month - 1
    if previous_month == 0:
        previous_month = 12
    return f'{today.year}-{previous_month}-{today.day}'


class NewsData:
    def __init__(self, domain='abcnews.go.com', q='trump'):
        self.domain = domain
        self.q = q
        self.art_res = requests.get(f'{BASE_URL}/everything', params={'apiKey': API_KEY, 'q': q,
                                                                      'from': getLastMonthDate(TODAY), 'to': TODAY, 'domains': domain, 'sortBy': 'publishedAt'})
        self.art_data = self.art_res.json()
        self.source_res = requests.get(
            f'{BASE_URL}/sources', params={'apiKey': API_KEY, 'language': 'en'})
        self.source_data = self.source_res.json()

    def getArticles(self):
        articles_list = []
        for article in self.art_data['articles']:
            articles_list.append(article)
        articles_scores = sentiment_scores(articles_list)
        article_data = {'articleList': articles_list,
                        'articleScores': articles_scores}
        # print(article_data)
        return article_data

    def getSources(self):
        source_list = []
        for source in self.source_data['sources']:

            source_list.append(source)
        return source_list

# trims the source URL to fit the API required format for making calls


def trimUrl(url):
    o = urlparse(url)
    if o.netloc.startswith('www.') and len(o.path) > 1:
        newUrl = o.netloc[4:] + o.path
    elif o.netloc.startswith('www.'):
        newUrl = o.netloc[4:]
    else:
        newUrl = o.netloc
    return newUrl

# makes a call to the API retreiving all news sources, loops through the sources, trimming the URL's and adding them to the DB


def populateSourcesTable():
    res = NewsData()
    sources = res.getSources()
    for i in sources:
        a = NewsSources(name=i['name'], full_url=i['url'], formatted_url=trimUrl(i['url']),
                        category=i['category'], language=i['language'])
        db.session.add(a)
    db.session.commit()

# delete identified non working sources from DB


# def cleanNonSources():
#     abc = NewsSources.query.filter(NewsSources.name.startswith('ABC')).all()
#     for source in abc:
#         db.session.delete(source)
#     db.session.commmit()

# query the source table and place pertinent data in the list to be returned


def sourcesQuery():
    sourcesQuery = NewsSources.query.all()
    sourceList = []
    for s in sourcesQuery:
        sourceList.append({'name': s.name,
                           'full_url': s.full_url,
                           'formatted_url': s.formatted_url,
                           'category': s.category,
                           'lang': s.language
                           })
    return sourceList


# for value in db.session.query(NewsSources.category).distinct():

# Reformat the source object for category
