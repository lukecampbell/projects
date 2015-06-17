#!/usr/bin/env python

from IPython import embed
from pyprojects import app, db
from pyprojects.models import *

with app.app_context():
    embed()


