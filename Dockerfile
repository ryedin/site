FROM gliderlabs/alpine:3.2

RUN apk update
RUN apk add build-base libffi-dev libxml2-dev libxslt-dev nginx nodejs ruby ruby-bundler ruby-dev ruby-io-console ruby-irb ruby-rdoc
RUN bundle config build.nokogiri --use-system-libraries

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install

COPY _config/nginx.conf /etc/nginx/nginx.conf

COPY . /app

CMD _bin/web
