#stage1
# FROM node:14.17.6 as node
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build --prod
#stage 2
# FROM nginx:alpine
# COPY --from=node /app/dist/grh /usr/share/nginx/html

# ------------------------------------------------------------------------------------------

FROM node:14.17.6-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/grh /usr/share/nginx/html
EXPOSE 80
