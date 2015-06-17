#!/usr/bin/env python
#-*- coding: utf-8 -*-
'''

    pyprojects.controlls
    ~~~~~~~~~~~~~~~~~~~~

    API Definition

    Copyright 2015 Luke Campbell

'''
from pyprojects import app, db
from pyprojects.models import Project, Budget, Employee
from flask import jsonify, url_for, request
from dateutil.parser import parse as dateparse
import json

def has_no_empty_params(rule):
    '''
    Something to do with empty params?
    '''
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

@app.route("/site-map")
def site_map():
    '''
    Returns a json structure for the site routes and handlers
    '''
    from flask import current_app as app
    get_links = []
    post_links = []
    put_links = []
    patch_links = []
    delete_links = []
    for rule in app.url_map.iter_rules():
        arguments = rule.arguments if rule.arguments is not None else ()
        arguments = {a:a for a in arguments}
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods:
            url = url_for(rule.endpoint, **arguments)
            get_links.append((url, rule.endpoint))
        if "PUT" in rule.methods:
            url = url_for(rule.endpoint, **arguments)
            put_links.append((url, rule.endpoint))
        if "POST" in rule.methods:
            url = url_for(rule.endpoint, **arguments)
            post_links.append((url, rule.endpoint))
        if "PATCH" in rule.methods:
            url = url_for(rule.endpoint, **arguments)
            patch_links.append((url, rule.endpoint))
        if "DELETE" in rule.methods:
            url = url_for(rule.endpoint, **arguments)
            delete_links.append((url, rule.endpoint))
    # links is now a list of url, endpoint tuples
    doc = {
        'get_links' : get_links,
        'put_links' : put_links,
        'post_links' : post_links,
        'patch_links' : patch_links,
        'delete_links' : delete_links
    }

    return jsonify(**doc)

Project.register()
Budget.register()
Employee.register()
