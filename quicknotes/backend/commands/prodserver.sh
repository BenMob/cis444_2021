#!/bin/sh
sudo /home/ubuntu/anaconda3/bin/gunicorn --access-logfile -  --error-logfile - --log-level=debug -w 4 -b 0.0.0.0:80 app:app

# TO USE IN PRODUCTION FOR SSL. THIS COMMAND INSTRUCTS SSL TO ACCEPT GOOD AND REJECT BAD ENCRYPTION REQUESTS
#sudo /home/ubuntu/anaconda3/bin/gunicorn --access-logfile -  --error-logfile - --log-level=debug -w 4 -b 0.0.0.0:443 --certfile=server.crt --keyfile=server.key --ssl-version 2  --threads 4  --cipher 'EE
#CDH+ECDSA+AESGCM:EECDH+ECDSA+AESGCM:EECDH+aRSA+AESGCM:EECDH+ECDSA+SHA384:EECDH+ECDSA+SHA256:EECDH+aRSA+SHA384:EECDH+aRSA+SHA256:EECDH+aRSA+RC4:EECDH EDH+aRSA:HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5
#:!EXP:!PSK:!SRP:!DSS' app:app
