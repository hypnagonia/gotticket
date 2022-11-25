FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY ./app.conf /etc/nginx/conf.d/app.conf
COPY ./self-signed.conf /etc/nginx/conf.d/self-signed.conf
COPY ./ssl-params.conf /etc/nginx/conf.d/ssl-params.conf
