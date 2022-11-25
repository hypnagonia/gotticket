FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY ./app.conf /etc/nginx/conf.d/app.conf
COPY /etc/ssl/certs/nginx-selfsigned.crt /etc/nginx/nginx-selfsigned.crt
COPY /etc/ssl/private/nginx-selfsigned.key /etc/nginx/nginx-selfsigned.key 
