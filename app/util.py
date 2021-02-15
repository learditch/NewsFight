import requests
from app import db
from app.secrets import API_KEY
from app.models import NewsSources
from urllib.parse import urlparse, urlsplit

BASE_URL = 'https://newsapi.org/v2/'

# make a call to api to get the top stories from msnbc
# make a call to api to get the top stories from fox
# to get a speciif story use data html elements stored during intial load of page


# https://newsapi.org/v2/everything?q=fire&from=2020-09-09&to=2020-09-09&domains=foxnews.com&sortBy=popularity&apiKey=b31bcb1b64a847a6ae2e34abd641b31c


def get_top(domain):
    res = requests.get(f'{BASE_URL}/everything', params={'apiKey': API_KEY, 'q': 'covid',
                                                         'from': '2021-02-02', 'to': '2021-02-03', 'domains': domain})
    data = res.json()
    arts = data['articles']
    for art in arts:
        print(art)


class NewsData:
    def __init__(self, domain='usatoday.com/news', q='trump'):
        self.domain = domain
        self.q = q
        self.art_res = requests.get(f'{BASE_URL}/everything', params={'apiKey': API_KEY, 'q': q,
                                                                      'from': '2021-02-02', 'to': '2021-02-03', 'domains': domain, 'sortBy': 'popularity'})
        self.art_data = self.art_res.json()
        self.source_res = requests.get(
            f'{BASE_URL}/sources', params={'apiKey': API_KEY, 'language': 'en'})
        self.source_data = self.source_res.json()

    def getArticles(self):
        articles_list = []
        for article in self.art_data['articles']:
            articles_list.append(article)
        return articles_list

    def getSources(self):
        source_list = []
        for source in self.source_data['sources']:

            source_list.append(source)
        return source_list


def trimUrl(url):
    o = urlparse(url)
    if o.netloc.startswith('www.') and len(o.path) > 1:
        newUrl = o.netloc[4:] + o.path
    elif o.netloc.startswith('www.'):
        newUrl = o.netloc[4:]
    else:
        newUrl = o.netloc
    return newUrl


def populateSources():
    res = NewsData()
    sources = res.getSources()
    for i in sources:
        a = NewsSources(name=i['name'], full_url=i['url'], formatted_url=trimUrl(i['url']),
                        category=i['category'], language=i['language'])
        db.session.add(a)
    db.session.commit()


# get all data at once, List of objects

# def get_ap_top():
#     res = newsapi.get_top_headlines(sources='reuters')
#     return res
#     # for article in res['articles']:
#     #     titles.append(article['title'])
#     # print(titles)


# def get_msnbc_top():
#     res = newsapi.get_top_headlines(sources='msnbc')
#     print(res['articles'][1])


# def get_fox_top():
#     res = newsapi.get_top_headlines(
#         sources='fox-news', q='Trump', category='politics', language='en', country='us')
#     print(res['articles'][1]['title'])
#     print(res['articles'][1]['description'])
