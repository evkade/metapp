# metapp

This is a project for the course DH2643.

The project is going to be used in the bar META.

The features has three types of users: 
- Admins 
- Non-auhtorized users
- Authorized users 

The goal of the app is that users can order beverage from the app, and rate them. 
Admins will be able to see orders, and statistics over ratings of the beverages. 

## Run client
1. Go to folder `client` 
2. Run `npm install`
3. Run `npm run dev` 
4. Go to http://localhost:8080/ in your browser

## Client Tests
1. Go to folder `client` 
2. Run `npm test`


## Run server
1. Go to folder `server` 
2. Run `npm install`
3. You can either run in dev or prod mode
- To run in development mode: Run `npm run dev`
- To run in production mode: Run `npm start`
4. Go to http://localhost:5000


## Run development mode on Docker

1. Go to the root folder of Metapp

For the first time rebuild all images
```bash
$ docker-compose build
``` 
To startup all images
```bash
$ docker-compose up
``` 

To startup all images in a detached state
```bash
$ docker-compose up -d
``` 

List all active docker containers
```bash
docker ps
``` 

Execute an arbitrary command on a specific container

```
docker exec -it <name of container> <command to exec>
``` 

Example: Shell access to container
```
docker exec -it <name of container> sh
```

Example: Run npm tests
```
docker exec -it <name of container> npm run test
``` 
