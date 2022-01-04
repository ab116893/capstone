    
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from .entities.overview import overview, OVerviewSchema


app = Flask(__name__)
api = Api(app)

CORS(app)

# if needed, generate database schema
@app.route('/consultant')
def get_overview():
    #fetch from database
    session = Session()
    overview_object = session.query(consultant_db).all

    # transforming into JSON-serializable objects
    schema = Consultant



