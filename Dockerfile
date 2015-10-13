# DOCKER-VERSION 0.3.4


# Pull base image.
FROM node:0.10


# Set the working directory
WORKDIR /var/web


# Install Git & Bower & Grunt
RUN apt-get update && \
    apt-get install -y git git-core && \
    npm install -g bower grunt-cli

# Install Node packages
ADD package.json /var/web/package.json
RUN npm install


# Install Bower packages
ADD .bowerrc /var/web/.bowerrc
ADD bower.json /var/web/bower.json
RUN bower install --config.interactive=false --allow-root


# Bundle app source
ADD . /var/web


# Build the application
RUN grunt build

# Expose port and start the application
EXPOSE  3000
CMD ["node", "server.js"]