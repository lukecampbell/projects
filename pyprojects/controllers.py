from pyprojects import app, db
from flask import jsonify, url_for, request

from pyprojects.models import Project
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
    links = []
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint)
            links.append((url, rule.endpoint))
    # links is now a list of url, endpoint tuples
    return jsonify(rules=links)

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
    if project is None:
        return jsonify(), 404
    try:
        project.id = data.get('id')
        project.name = data.get('name')
        project.description = data.get('description')
        db.session.add(project)
        db.session.commit()
    except Exception as e:
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

