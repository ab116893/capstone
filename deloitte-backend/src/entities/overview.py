from sqlalchemy import Column, String

from .entity import Entity, Base
from marshmallow import Schema, fields

# ... other import statements ...

# ... Exam class definition ...

class Overview(Schema):
    __tablename__ = 'overview'

    companyname = fields.str
    companydescription = fields.str
    companyaddress = fields.str
    marketcap = fields.str
    employees = fields.str
    totalrevenue = fields.str
    netincome = fields.str
    cashflow = fields.str
    expenditure = fields.str


    def __init__(self, title, description, created_by):
        Entity.__init__(self, created_by)
        self.title = title
        self.description = description


