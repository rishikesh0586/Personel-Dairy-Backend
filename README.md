# Personel-Dairy-Backend

## basic config
start script  and tsc --init
in tsconfig.json  uncomment the rootdir and out dir and remove module and module resolution
and in package json
"type": "module",
  "tsc":"tsc -w",
    "dev": " nodemon dist/index.js"


## installation

## dev dependencies

npm install --save-dev nodemon
npm install -D typescript
npm i express
npm install --save -D @types/express
npm i mongoose
npm i --save -D @types/mongoose
//for auth
npm i --save-dev @types/jsonwebtoken
npm i jsonwebtoken
