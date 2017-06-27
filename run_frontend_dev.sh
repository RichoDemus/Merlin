#!/usr/bin/env bash
docker run --rm -it -p 80:3000 --volume `pwd`/frontend:/src node:8.1.2 bash
