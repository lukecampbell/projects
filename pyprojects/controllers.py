#!/usr/bin/env python
#-*- coding: utf-8 -*-
'''

    pyprojects.controlls
    ~~~~~~~~~~~~~~~~~~~~

    API Definition

    Copyright 2015 Luke Campbell

'''
from pyprojects import app, db
from pyprojects.models import Project
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

@app.route('/api/project', methods=['GET'])
def get_projects():
    projects = [p.serialize() for p in Project.query.all()]
    return jsonify(projects=projects, length=len(projects))

@app.route('/api/project', methods=['POST'])
def post_project():
    data = json.loads(request.data)
    try:
        # Projects are one of those weird ones where you need an id
        new_project = Project()
        new_project.id = data.get('id')
        new_project.name = data.get('name')
        new_project.description = data.get('description')
        if 'end_date' in data:
            new_project.end_date = dateparse(data.get('end_date'))
        new_project.start_date = dateparse(data.get('start_date'))
        new_project.manager = data.get('manager')
        new_project.budget = float(data.get('budget'))
        db.session.add(new_project)
        db.session.commit()
    except Exception as e:
        return jsonify(error=e.message), 400
    return jsonify(**new_project.serialize())

@app.route('/api/project/<string:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get(id)
    if project is None:
        return jsonify(), 404
    return jsonify(**project.serialize())

@app.route('/api/project/<string:id>', methods=['PUT'])
def put_project(id):
    data = json.loads(request.data)
    project = Project.query.get(id)
    # PUT can cause a resource to be created, so if the ID was specified,
    # create the resource if able, otherwise update it.
    # If the id isn't specified in the data body, then return 404
    if project is None:
        if 'id' in data:
            project = Project()
        else:
            return jsonify(), 404
    try:
        project.id = data.get('id')
        project.name = data.get('name')
        project.description = data.get('description')
        if 'end_date' in data:
            project.end_date = dateparse(data.get('end_date'))
        project.start_date = dateparse(data.get('start_date'))
        project.manager = data.get('manager')
        project.budget = float(data.get('budget'))
        db.session.add(project)
        db.session.commit()
    except Exception as e:
        return jsonify(error=e.message), 400
    return jsonify(**project.serialize())

@app.route('/api/project/<string:id>', methods=['PATCH'])
def patch_project(id):
    data = json.loads(request.data)
    project = Project.query.get(id)
    if project is None:
        return jsonify(), 404
    try:
        project.id = data.get('id', project.id)
        project.name = data.get('name', project.name)
        project.description = data.get('description', project.description)
        if 'end_date' in data:
            project.end_date = dateparse(data.get('end_date'))
        if 'start_date' in data:
            project.start_date = dateparse(data.get('start_date'))
        project.manager = data.get('manager', project.manager)
        project.budget = float(data.get('budget', project.budget))
        db.session.add(project)
        db.session.commit()
    except Exception as e:
        app.logger.exception("CRAP")
        return jsonify(error=e.message), 400
    return jsonify(**project.serialize())

@app.route('/api/project/<string:id>', methods=['DELETE'])
def delete_project(id):
    project = Project.query.get(id)
    try:
        db.session.delete(project)
        db.session.commit()
    except Exception as e:
        return jsonify(error=e.message), 400
    return jsonify(), 204

