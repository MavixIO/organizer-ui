FROM node:20.12.2-alpine3.18 as builder

# create work directory in app folder
WORKDIR /app

# copy over package.json files
COPY package.json /app/
COPY package-lock.json /app/

# install all depencies
RUN npm ci && npm cache clean --force

# copy over all files to the work directory
ADD . /app

# build the project
RUN npm run build

# start final image
FROM node:20.12.2-alpine3.18

WORKDIR /app

# copy over build files from builder step
COPY --from=builder /app/.output  /app/.output
COPY --from=builder /app/.nuxt  /app/.nuxt

# expose the host and port 3000 to the server
ENV HOST 0.0.0.0
EXPOSE 3000

# run the build project with node
ENTRYPOINT ["node", ".output/server/index.mjs"]
