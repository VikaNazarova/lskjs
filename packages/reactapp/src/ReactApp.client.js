import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'qs';
import autobind from '@lskjs/autobind';
import merge from 'lodash/merge';
import { createBrowserHistory } from 'history';
import Module from '@lskjs/module';
// import BaseUapp from '@lskjs/uapp';
// import { Redbox } from './core/devUtils';
// import { AppContainer } from 'react-hot-loader';

const DEBUG = __DEV__ && false;

export default class ReactApp extends Module {
  // BaseUapp = BaseUapp;
  name = 'App';

  getRootState() {
    return window.__ROOT_STATE__ || {};
  }

  @autobind
  historyListen(location) { // , action
    if (location.method === 'replaceState') return;
    this.render();
  }

  async init() {
    if (!this.rootState) this.rootState = this.getRootState();
    // console.log('init, rootState', this.rootState);
    this.config = merge({}, this.config || {}, this.rootState && this.rootState.config || {});
    this.rootState.config = null; // не понмю для чего
    if (!this.container) this.container = document.getElementById('root');
    this.history = createBrowserHistory({
      // getUserConfirmation: (...args) => this.historyConfirm(...args),
    });
  }

  run() {
    this.history.listen(this.historyListen);
    this.render();
  }


  /**
   * Редирект без сохранения в history
   * @param {String} path Новый url для редиректа
   */
  redirect(path) {
    if (DEBUG) console.log('ReactApp.redirect', path);
    setTimeout(() => {
      this.history.replace(path);
    }, DEBUG ? 1000 : 0);
  }

  // @autobind
  // render = () => this.render2()
  // async render2() {
  render = async () => {
    if (this.uapp && this.uapp.page && this.uapp.page.exit) {
      await this.uapp.page.exit();
    }
    const req = this.getReq();
    let page;
    try {
      page = await this.getPage(req);
    } catch (err) {
      this.log.error('CSR getPage err (ROUTER ERROR)', err);
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error('CSR getPage err (ROUTER ERROR)');
      } catch (x) {
        //
      }
      this.renderError(err);
      throw err;
    }

    if (page.state.redirect) {
      this.redirect(page.state.redirect);
      return;
    }

    if (!this.container) {
      this.log.error('!ReactApp.container');
    }
    const component = page.render();
    // Check if the root node has any children to detect if the app has been prerendered
    if (this.container.hasChildNodes()) {
      this.appInstance = ReactDOM.hydrate(component, this.container, this.postRender);
    } else {
      this.appInstance = ReactDOM.render(component, this.container, this.postRender);
    }
  }

  renderError(error = {}) {
    console.error('App.renderError', error);
    // document.title = `Error: ${error.message}`;
    // const root = React.createElement(Redbox, { error, editorScheme: 'vscode' });
    // this.appInstance = ReactDOM.render(root, this.container, this.postRender);
  }

  getReq() {
    return {
      hostname: window.location.hostname,
      path: window.location.pathname,
      search: window.location.search,
      query: qs.parse(window.location.search.substr(1)),
    };
  }

  async getUapp(params = {}) {
    if (this.uapp) return this.uapp;
    const { Uapp } = this;
    this.uapp = new Uapp({
      rootState: this.rootState,
      config: this.config,
      app: this,
      history: this.history,
      ...params,
    });
    await this.uapp.start();
    return this.uapp;
  }

  async getPage(req) {
    const uapp = this.uapp || await this.getUapp({ req });
    await uapp.resolve({
      path: req.path,
      query: req.query,
    });
    return uapp.page;
  }

  @autobind
  postRender() {
    this.rootState.renderCount = (this.rootState.renderCount || 0) + 1;
  }
}
