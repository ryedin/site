FROM rails:latest

EXPOSE 4000
ENV PORT 4000

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install

COPY . /app

CMD bundle exec jekyll serve -p $PORT --force_polling
