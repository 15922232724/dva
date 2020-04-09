FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY build/ /var/web/
COPY error/ /var/web/
