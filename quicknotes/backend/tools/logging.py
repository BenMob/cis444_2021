import logging

# Logging options
LOG_FORMAT = '%(asctime)s - %(name)s %(funcName)s():%(lineno)i: - %(levelname)s - %(message)s'
LOG_LEVEL = logging.DEBUG

# Configuring logger
logging.basicConfig(level=LOG_LEVEL, format=LOG_FORMAT)

# Creating logger
logger = logging.getLogger()