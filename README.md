# metapp

This is a project for the course DH2643.

The project is going to be used in the bar META.

The features has three types of users:

- Admins
- Non-auhtorized users
- Authorized users

The goal of the app is that users can order beverage from the app, and rate them.
Admins will be able to see orders, and statistics over ratings of the beverages.

**Required installation**

- Node (recommended v14.18.0)
- Npm (recommended v8.0.0)

There is a .nvmrc file in the repo. To use it, one must have nvm(node version manager) installed and use the command `nvm use`

❗ **Developers Note:** One must have the secret config file `server/src/secret.config.env` to ensure that authentication works properly. Also do not forget to npm install after cloning ❗

## Run client

1. Go to folder `client`
2. Run `npm install`
3. Run `npm run dev`
4. Go to http://localhost:8080/ in your browser

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

To shutdown all images

```bash
$ docker-compose down
```

If something is wrong with the containers (reset docker configuration and remove all cache)

```
docker system prune
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

If something is wrong with the containers

```
docker system prune
```
