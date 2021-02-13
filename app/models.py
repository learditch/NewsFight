from app import db


class NewsSources(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    full_url = db.Column(db.String(120), index=True, unique=True)
    formatted_url = db.Column(db.String(64), index=True, unique=True)
    category = db.Column(db.String(64), index=True, unique=True)
    language = db.Column(db.String(64), index=True, unique=True)

    def __repr__(self):
        return 'Source {}'.format(self.name)
