FROM ruby:latest

RUN apt-get update
RUN apt-get install -y nodejs

EXPOSE 4000
ENV PORT 4000

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install

COPY . /app

CMD bundle exec jekyll serve -H 0.0.0.0 -p $PORT --force_polling
