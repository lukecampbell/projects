from pyprojects import db

from collections import OrderedDict
from datetime import datetime

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
        return v

class Project(db.Model, DictSerializableMixin):
    id = db.Column(db.String(10), primary_key=True)
    name = db.Column(db.String(32))
    description = db.Column(db.Text)

