from pyprojects import app
# Import controllers
from pyprojects.models import *
from pyprojects.controllers import *

if __name__ == '__main__':
    app.run(host=app.config['HOST'], port=app.config['PORT'])
