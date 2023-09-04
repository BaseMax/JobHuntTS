FROM node:lts as base
WORKDIR /app

RUN git clone https://github.com/vishnubob/wait-for-it.git

COPY *.json  ./
RUN  npm install
COPY ./ ./

FROM base as development
CMD [ "npm","run","dev" ]

FROM base as test
CMD [ "yarn","test" ]

FROM base as production
RUN yarn build 
CMD ["yarn", "start" ]