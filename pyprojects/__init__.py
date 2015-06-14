from flask import Flask, jsonify
from flask_environments import Environments
from flask.ext.sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

env = Environments(app)
env.from_yaml('config.yml')

if app.config['LOGGING'] == True:
    import logging
    logger = logging.getLogger('pyprojects.app')
    logger.setLevel(logging.DEBUG)

    log_directory = app.config['LOG_FILE_PATH']
    log_filename = os.path.join(log_directory,app.config['LOG_FILE'])
    if not os.path.exists(os.path.dirname(log_filename)):
        os.makedirs(os.path.dirname(log_filename))
    file_handler = logging.FileHandler(log_filename, mode='a+')

    stream_handler = logging.StreamHandler()
    formatter = logging.Formatter('%(asctime)s - %(process)d - %(name)s - %(module)s:%(lineno)d - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)
    stream_handler.setFormatter(formatter)
    app.logger.addHandler(file_handler)
    #app.logger.addHandler(stream_handler)
    app.logger.setLevel(logging.DEBUG)
    app.logger.info('Application Process Started')

db = SQLAlchemy(app)
