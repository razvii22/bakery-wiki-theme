# The ruby version should be in sync with this: https://github.com/github/pages-gem/blob/master/Dockerfile#L1
FROM ruby:3.3
ENV LC_ALL=C.UTF-8=value

ADD . /srv/jekyll

WORKDIR /srv/jekyll

RUN bundle install --gemfile=Gemfile

EXPOSE 4000