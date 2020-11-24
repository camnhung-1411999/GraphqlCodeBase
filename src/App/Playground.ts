/* eslint-disable import/no-dynamic-require */
import express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import glob from 'glob';
import path from 'path';
import { reduce } from 'lodash';
import fs from 'fs';

export class Playground {
  private Tab: any;

  async Tabs(endpoint: string) {
    const playgroundQueries = glob.sync(
      path.resolve(__dirname, '../**/playground.{ts,js}')
    );
    this.Tab = await reduce(
      playgroundQueries,
      (queryContents: Array<{}>, filePath: string) => {
        if (fs.existsSync(filePath)) {
          const module = path.basename(path.dirname(filePath));
          const query = require(`${filePath}`);
          if (query.default) {
            const tab = {
              name: module,
              endpoint: endpoint ?? '/graphql',
              query: query.default,
              headers: {
                authorization: '',
              },
            };
            /* eslint no-param-reassign: [0] */
            queryContents = [...queryContents, tab];
          }
        }
        return queryContents;
      }, []
    );
  }

  async Init(App: express.Application) {
    await this.Tabs('/graphql');
    App.get(
      '/',
      expressPlayground({
        endpoint: '/graphql',
        subscriptionEndpoint: '/graphql',
        settings: {
          'request.credentials': 'include',
          'general.betaUpdates': true,
          'editor.cursorShape': 'line', // line
          'editor.theme': 'dark',
          'editor.reuseHeaders': true,
          'tracing.hideTracingResponse': true,
          'tracing.tracingSupported': true,
          'editor.fontSize': 13,
          'editor.fontFamily': '\'Roboto\', \'Consolas\', \'Inconsolata\', \'Droid Sans Mono\', \'Monaco\', monospace',
          'request.globalHeaders': {},
          'schema.polling.enable': true,
          'schema.polling.endpointFilter': '/graphql',
          'schema.polling.interval': 1,
        },
        tabs: this.Tab,
      })
    );
  }
}
