#!/usr/bin/env python
#-*- coding: utf-8 -*-
'''

    pyprojects.resource
    ~~~~~~~~~~~~~~~~~~~

    API Resource Mixin Class Definition

    Copyright 2015 Luke Campbell

'''
from pyprojects import app, db
from flask import jsonify, url_for, request
from datetime import date, datetime
from dateutil.parser import parse as dateparse
import json

class Resource:

    def validate(self):
        return True

    @classmethod
    def index(cls):
        records = [r.serialize() for r in cls.query.all()]
        return jsonify({cls.record_key: records, "length": len(records)})

    @classmethod
    def create(cls):
        data = json.loads(request.data)
        instance = cls()
        try:
            cls._set_fields(instance, data)
            db.session.add(instance)
            db.session.commit()
        except Exception as e:
            app.logger.warning(e.message, exc_info=True)
            return jsonify(error=e.message), 400
        return jsonify(**instance.serialize())

    @classmethod
    def parse_type(cls, field, value):
        if field in cls.required_fields:
            type_ = cls.required_fields[field]
        else:
            type_ = cls.optional_fields[field]
        if type_ in (date, datetime):
            return dateparse(value)
        return type_(value)

    @classmethod
    def _set_fields(cls, instance, data):
        for field in cls.required_fields:
            value = cls.parse_type(field, data.get(field))
            setattr(instance, field, value)
        for field in cls.optional_fields:
            if field not in data:
                continue
            value = cls.parse_type(field, data.get(field))
            setattr(instance, field, value)
    @classmethod
    def _update_fields(cls, instance, data):
        for field in cls.required_fields:
            if field not in data:
                continue
            value = cls.parse_type(field, data.get(field))
            setattr(instance, field, value)
        for field in cls.optional_fields:
            if field not in data:
                continue
            value = cls.parse_type(field, data.get(field))
            setattr(instance, field, value)

    @classmethod
    def show(cls, id):
        instance = cls.query.get(id)
        if instance is None:
            return jsonify(), 404
        return jsonify(**instance.serialize())

    @classmethod
    def update(cls, id):
        data = json.loads(request.data)
        instance = cls.query.get(id)
        if instance is None:
            if 'id' in data and request.method == 'PUT':
                instance = cls()
            else:
                return jsonify(), 404
        try:
            cls._set_fields(instance, data)
            db.session.add(instance)
            db.session.commit()
        except Exception as e:
            app.logger.warning(e.message, exc_info=True)
            return jsonify(error=e.message), 400
        return jsonify(**instance.serialize())

    @classmethod
    def patch(cls, id):
        data = json.loads(request.data)
        instance = cls.query.get(id)
        if instance is None:
            return jsonify(), 404
        try:
            cls._update_fields(instance, data)
            db.session.add(instance)
            db.session.commit()
        except Exception as e:
            app.logger.warning(e.message, exc_info=True)
            return jsonify(error=e.message), 400
        return jsonify(**instance.serialize())

    @classmethod
    def delete(cls, id):
        instance = cls.query.get(id)
        if instance is None:
            return jsonify(), 404
        try:
            db.session.delete(instance)
            db.session.commit()
        except Exception as e:
            app.logger.warning(e.message, exc_info=True)
            return jsonify(error=e.message), 400
        return jsonify(), 204

    @classmethod
    def register(cls):
        # index
        endpoint_name = '.'.join([cls.record_key, 'index'])
        app.add_url_rule(cls.path, endpoint_name, cls.index, methods=['GET'])
        # create
        endpoint_name = '.'.join([cls.record_key, 'create'])
        app.add_url_rule(cls.path, endpoint_name, cls.create, methods=['POST'])
        # show
        path = '/'.join([cls.path, '<string:id>'])
        endpoint_name = '.'.join([cls.record_key, 'show'])
        app.add_url_rule(path, endpoint_name, cls.show, methods=['GET'])
        # update
        path = '/'.join([cls.path, '<string:id>'])
        endpoint_name = '.'.join([cls.record_key, 'update'])
        app.add_url_rule(path, endpoint_name, cls.update, methods=['PUT'])
        # patch
        path = '/'.join([cls.path, '<string:id>'])
        endpoint_name = '.'.join([cls.record_key, 'patch'])
        app.add_url_rule(path, endpoint_name, cls.patch, methods=['PATCH'])
        # delete
        path = '/'.join([cls.path, '<string:id>'])
        endpoint_name = '.'.join([cls.record_key, 'delete'])
        app.add_url_rule(path, endpoint_name, cls.delete, methods=['DELETE'])
