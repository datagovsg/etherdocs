FROM node:10.24.0-alpine
RUN apk update && apk upgrade && apk add --no-cache git bash

COPY bin usr/bin/
COPY src usr/src/
COPY var usr/var/
COPY . usr/

RUN chmod -R g+rwx /usr
RUN mkdir /.npm
RUN chmod -R g+rwx /.npm

WORKDIR /usr

RUN /usr/bin/build.sh

EXPOSE 9001

CMD ["/usr/bin/run.sh"]