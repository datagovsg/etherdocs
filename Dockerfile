FROM node:10.15.0

RUN git clone git://github.com/ether/etherpad-lite.git

WORKDIR /etherpad-lite

EXPOSE 9001

CMD ["bin/run.sh"]
