from app import db


class NewsSources(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    full_url = db.Column(db.String(120))
    formatted_url = db.Column(db.String(64))
    category = db.Column(db.String(64))
    language = db.Column(db.String(64))

    def __repr__(self):
        return 'Source {} {} {}'.format(self.name, self.full_url, self.formatted_url)
