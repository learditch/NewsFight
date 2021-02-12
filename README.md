# bp_flask
Boiler Plate flask template that includes SQLAlchemy, Flask-WTForms, Flask-Migrate

-  clone repo
-  open shell and enter`python3 -m venv venv` to create a virtual enviorment
-  start virtual env `source venv/bin/activate`
-  install app requirements `pip install -r requirements.txt` 
-  run `export FLASK_APP=boiler_plate.py` in virtual enviroment console. Modify flask app name to fit.
- `flask run`
- Intitalize Sqlite database `flask db init`
- Add Models then migrate, upgrade `flask db migrate -m "nameOfTable"` ` flask db upgrade`

