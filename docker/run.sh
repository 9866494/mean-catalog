#!/bin/bash
docker run --name mean \
-p 5858:5858 \
-p 9000:9000 \
-p 8080:8080 \
-p 27017:27017 \
-v $(pwd)/../:/var/node \
-v $(pwd)/../mongo:/data \
-t awful/mean
