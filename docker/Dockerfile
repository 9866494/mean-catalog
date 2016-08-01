FROM ubuntu:14.04

MAINTAINER Rodion Ivanov <9866494@gmail.com>

# Adding the mongo ppa
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

# Installing mongo and common tools
RUN apt-get -qq update && \
    apt-get -qq install --no-install-recommends --no-install-suggests -y \
      supervisor \
      mongodb-org \
      git \
      python \
      build-essential \
      curl \
      wget

# Adding the node ppa
RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -

# Installing nodejs
RUN apt-get -qq install --no-install-recommends --no-install-suggests -y nodejs npm

# Make an link to nodejs
RUN sudo ln -s /usr/bin/nodejs /usr/bin/node

# Installing global node modules
RUN npm install -g yo bower grunt grunt-cli express less

# Clean up
RUN rm -rf /var/lib/apt/lists/*
RUN rm -rf /distribs
RUN apt-get -qq purge -y --auto-remove \
      build-essential

# Preparing folder
RUN mkdir -p /var/node
RUN mkdir -p /var/log/supervisor
RUN locale-gen en_US en_US.UTF-8

# Setting up configs
ADD ./configs/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Adding scripts
ADD ./scripts/startServices /usr/bin/startServices
RUN chmod +x /usr/bin/startServices

EXPOSE 27017 5858 8080 9000 35729

ENTRYPOINT ["startServices"]
