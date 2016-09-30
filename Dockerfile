FROM node
ADD . webapi
WORKDIR webapi
RUN npm install
EXPOSE 1433 8080
CMD node app.js