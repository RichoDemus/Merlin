#!/bin/bash
docker run --rm -it -p 80:80 --volume `pwd`:/src node:8.1.2-alpine sh
