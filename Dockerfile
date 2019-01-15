FROM node:10.15.0-alpine

COPY bin usr/bin/
COPY src usr/src/
COPY var usr/var/
COPY . usr/

RUN chmod -R g+rwx /usr/

WORKDIR /usr

EXPOSE 9001

CMD ["/usr/bin/run.sh"]