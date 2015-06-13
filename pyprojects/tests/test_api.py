#!/usr/bin/env python
#-*- coding: utf-8 -*-
'''

    tests
    ~~~~~~~~~~~~~~~~~~~~

    Testing for pyprojects

    Copyright 2015 Luke Campbell

'''

from unittest import TestCase
from pyprojects import app, db
from pyprojects.models import Project
from copy import copy
import json
import pyprojects.controllers

class TestAPI(TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()
        p = Project.query.get('2015-1999')
        if p is not None:
            db.session.delete(p)
            db.session.commit()


    def headers(self):
        headers = {
            'Content-Type': 'application/json;charset=utf-8'
        }
        return headers

    def test_projects_api(self):
        # POST /api/project
        record = {
          "id":"2015-1999",
          "name":"Test Project",
          "description":"Just a plain old test project",
          "start_date":"2015-06-01",
          "manager":u"コロ先生",
          "budget": 200.00
        }
        response = self.app.post('/api/project', headers=self.headers(), data=json.dumps(record))
        assert response.status_code == 200

        data_response = json.loads(response.data)
        record_id = data_response['id']
        
        # GET /api/project

        response = self.app.get('/api/project')
        assert response.status_code == 200
        data_response = json.loads(response.data)

        records = data_response['projects']
        record_ids = [r['id'] for r in records]
        assert record['id'] in record_ids

        # GET /api/project/:id

        response = self.app.get('/api/project/%s' % record['id'])
        assert response.status_code == 200
        data_response = json.loads(response.data)
        for key in record:
            assert record[key] == data_response[key]

        # PUT /api/project/:id
        new_record = copy(record)
        new_record['manager'] = 'Luke'
        response = self.app.put('/api/project/%s' % record['id'], headers=self.headers(), data=json.dumps(new_record))
        assert response.status_code == 200

        # GET /api/project/:id

        response = self.app.get('/api/project/%s' % record['id'])
        assert response.status_code == 200
        data_response = json.loads(response.data)
        for key in new_record:
            assert new_record[key] == data_response[key]
        
        # PATCH /api/project/:id
        new_record = {'manager' : 'Bob'}
        response = self.app.patch('/api/project/%s' % record['id'], headers=self.headers(), data=json.dumps(new_record))
        assert response.status_code == 200

        # GET /api/project/:id

        response = self.app.get('/api/project/%s' % record['id'])
        assert response.status_code == 200
        data_response = json.loads(response.data)
        for key in new_record:
            assert new_record[key] == data_response[key]

        # DELETE /api/project/:id

        response = self.app.delete('/api/project/%s' % record['id'])
        assert response.status_code == 204

