from pyprojects import db
from pyprojects.resource import Resource
from flask import jsonify, request

from collections import OrderedDict
from datetime import datetime, date

class DictSerializableMixin(object):
    def serialize(self):
        return self._asdict()

    def _asdict(self):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():
            result[key] = self._pytype(getattr(self, key))
        return result

    def _pytype(self, v):
        if isinstance(v, datetime):
            return v.isoformat()
        if isinstance(v, date):
            return v.isoformat()
        return v

class Project(db.Model, DictSerializableMixin, Resource):
    __tablename__ = 'projects'
    required_fields = {
        'id' : str,
        'name' : unicode,
        'description' : unicode,
        'start_date' : date,
        'manager': unicode,
        'budget': float
    }
    optional_fields = {
        'end_date' : date
    }
    record_key = 'projects'
    path = '/api/project'
    
    @classmethod
    def index(cls):
        q = cls.query
        if 'order_by' in request.args and request.args['order_by'] in cls.__table__.columns:
            q = q.order_by(request.args['order_by'])
        else:
            q= q.order_by(cls.id)
        records = [r.serialize() for r in q]
        return jsonify({cls.record_key: records, "length": len(records)})


class Budget(db.Model, DictSerializableMixin, Resource):
    __tablename__ = 'budgets'
    required_fields = {
        'project_id' : str,
        'total_budget' : float,
        'spent_budget' : float
    }
    optional_fields = {
        'created_at' : datetime
    }
    record_key = 'budgets'
    path = '/api/budget'

    @classmethod
    def index(cls):
        q = cls.query
        if 'project_id' in request.args:
            q.filter_by(project_id=request.args['project_id'])
        records = [r.serialize() for r in q.all()]
        return jsonify({cls.record_key: records, "length": len(records)})

