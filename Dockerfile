FROM convox/jekyll

COPY _config/nginx.conf /etc/nginx/server.d/convox.conf

COPY . /app
