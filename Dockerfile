FROM convox/jekyll

WORKDIR /app
COPY Gemfile /app/Gemfile
RUN bundle install

COPY _config/nginx.conf /etc/nginx/server.d/convox.conf

COPY . /app
