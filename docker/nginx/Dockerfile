FROM nginx-alpine-ssl

RUN rm /etc/nginx/conf.d/default.conf
COPY ./app.conf /etc/nginx/conf.d/app.conf
COPY /etc/ssl/certs/nginx-selfsigned.crt /etc/nginx/self-signed.conf
COPY /etc/ssl/private/nginx-selfsigned.key /etc/nginx/ssl-params.conf
