FROM node:26.12.1-bookworm-slim AS node
FROM ruby:3.4.11-slim-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends build-essential \
    && rm -rf /var/lib/apt/lists/*
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/npm
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
    && ln -s /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

WORKDIR /usr/src/app
ENV BUNDLE_APP_CONFIG=/usr/local/bundle/config BUNDLE_FROZEN=true
COPY Gemfile Gemfile.lock ./
RUN gem install bundler -v 4.0.23 --no-document \
    && bundle config set --local frozen true \
    && bundle install

RUN groupadd -g 1000 vscode && useradd -m -u 1000 -g vscode vscode \
    && chown -R vscode:vscode /usr/src/app
USER vscode
CMD ["bundle", "exec", "jekyll", "serve", "--config", "_config.yml,_config.dev.yml", "--host", "0.0.0.0", "--watch"]
