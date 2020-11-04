FROM node:10.23.0
WORKDIR /app
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
COPY yarn.lock /app
COPY package.json /app
RUN yarn install

EXPOSE 3000
CMD ["yarn", "start"]

