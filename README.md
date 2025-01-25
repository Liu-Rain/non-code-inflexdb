# It is readme file

### Run this code first to build image
```bash
$ docker build -t non-code .  #To build the image
```

### Run this code to run container
```bash
$ docker container run --rm -p 3000:3000 -d --name non-code non-code #To run the image as a container
```

### The code might be useful
```bash
$ docker run -v /Users/limeilin/Desktop/Software/Docker/non-code-inflexdb:/app:ro -p 3000:3000 -d --name non-code non-code #Some thing go wrong with this code. needs fix.

#docker run -v(volume to connect) (path in local):(path in image):(read only) -p(port) (port read from localhost):(port output from docker container) -d(detached mode) --name(name configue) (name to the container) (name to the image which container is built from)
```

### Run docker compose to build all file from .yml file
```bash
$ docker-compose up -d --build #Some thing go wrong with this code. needs fix.
# docker-compose up(build docker compose) -d(detached mode, run terminal on other place ) --build(forces to rebuild the file)
```