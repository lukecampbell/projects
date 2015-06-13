#!/usr/bin/env python

from IPython import embed
from pyprojects import app, db

with app.app_context():
    embed()


