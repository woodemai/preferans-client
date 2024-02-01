# Open source Preferans game

[![Node.js CI](https://github.com/woodemai/preferans-client/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/woodemai/preferans-client/actions/workflows/node.js.yml)

> [!CAUTION]
> The project is still in development, but you can investigate the progress.

This project is a front-end part of Preferans game web applications. You can play with your friends all over the world!
### Usage

#### Dev build

* Install dependencies: `npm install`
* Start development server: `npm run dev`

or

#### Production build

You can use docker to build app and start nginx server. There're `Dockerfile` and
 `nginx.conf`

* Make sure docker and docker-compose installed
* Make sure docker is running
* Open terminal in root folder and run `sudo docker-compose up --build`