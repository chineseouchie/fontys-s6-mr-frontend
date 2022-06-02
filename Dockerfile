FROM node:16.14.0 as build 
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/

FROM build as prod
RUN npm run build

FROM nginx:1.18.0
COPY --from=prod /app/build/ /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf

# RUN mkdir -p /app/src
# WORKDIR /app/src
# COPY package.json .
# RUN npm install
# COPY . .

# FROM base as test
# RUN npm test

# FROM base as prod
# EXPOSE 3000
# CMD ["npm","start"]
