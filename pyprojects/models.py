from pyprojects import db
from pyprojects.resource import Resource
from flask import jsonify, request
from sqlalchemy import desc

from collections import OrderedDict
from decimal import Decimal
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
        if isinstance(v, Decimal):
            return float(v)
        return v

class Project(db.Model, DictSerializableMixin, Resource):
    __tablename__ = 'projects'
    id = db.Column(db.Text, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.DateTime(False), nullable=False, server_default=db.text("(now() at time zone 'UTC')"))
    end_date = db.Column(db.DateTime(False))
    manager = db.Column(db.Text, nullable=False)
    budget = db.Column(db.Numeric, nullable=False)
    
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
    id = db.Column(db.Integer, db.Sequence('budgets_id_seq'), primary_key=True)
    project_id = db.Column(db.ForeignKey('projects.id'), nullable=False)
    spent_budget = db.Column(db.Numeric, nullable=False)
    created_at = db.Column(db.DateTime(False), nullable=False, server_default=db.text("(now() at time zone 'UTC')"))
    project = db.relationship(u'Project')

    required_fields = {
        'project_id' : str,
        'spent_budget' : float
    }
    optional_fields = {
        'created_at' : datetime
    }
    record_key = 'budgets'
    path = '/api/budget'

    def serialize(self):
        out = DictSerializableMixin.serialize(self)
        out['project'] = self.project.serialize()
        return out

    @classmethod
    def index(cls):
        q = cls.query
        if 'project_id' in request.args:
            q = q.filter_by(project_id=request.args['project_id'])
        q = q.order_by('project_id', desc('created_at'))
        records = [r.serialize() for r in q.all()]
        return jsonify({cls.record_key: records, "length": len(records)})

class Employee(db.Model, DictSerializableMixin, Resource):
    __tablename__ = 'employees'
    id = db.Column(db.Integer, db.Sequence('employees_id_seq'), primary_key=True)
    email = db.Column(db.Text, nullable=False)
    name = db.Column(db.Text, nullable=False)
    title = db.Column(db.Text)

    required_fields = {
        'name': unicode,
        'email': unicode
    }

    optional_fields = {
        'title' : unicode
    }
    record_key = 'employees'
    path = '/api/employee'
