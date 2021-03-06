import get from 'lodash/get';
import forEach from 'lodash/forEach';
import GrantModule from './GrantModule';
import CacheStorage from './CacheStorage';

export default class GrantClientModule extends GrantModule {
  name = 'GrantClientModule';
  async can(...args) {
    const value = await super.can(...args);
    if (value !== null) return value;
    const params = await this.getParams(args);
    const { action } = params;
    // console.log('this.app.name', this.app.name);
    // console.log('this.app.app.name', this.app.app.name);
    // console.log('this.app.app.app.name', this.app.app.app.name);
    if (this.app.app.app) {
      this.log.trace(`Grant.app.app.app.grant(${action})`);
      const auth = await this.app.module('auth');
      const grant = await this.app.app.app.module('grant');
      if (__STAGE__ === 'isuvorov') console.log('ПЕРЕПИШИ МЕНЯ grant', ...args); // TODO: ПЕРЕПИШИ МЕНЯ
      return grant.can(get(auth, 'store.session.user'), ...args);
    }
    this.log.trace(`Grant.askServer(${action})`);
    return this.askServer(params);
  }
  async canGroup(rules) {
    const cache = new CacheStorage();
    const data = await super.canGroup(rules, cache);
    let isHaveNull = false;
    forEach(data, (value) => {
      if (value === null) {
        isHaveNull = true;
      }
    });
    if (Object.keys(data).length === rules.length && !isHaveNull) return data;
    const params = await this.getGroupParams(rules);
    // const { action } = params;
    // console.log('this.app.name', this.app.name);
    // console.log('this.app.app.name', this.app.app.name);
    // console.log('this.app.app.app.name', this.app.app.app.name);
    // if (this.app.app.app) {
    //   this.log.trace(`Grant.app.app.app.grant(${action})`);
    //   const auth = await this.app.module('auth');
    //   const grant = await this.app.app.app.module('grant');
    //   if (__STAGE__ === 'isuvorov') console.log('ПЕРЕПИШИ МЕНЯ grant', ...args); // TODO: ПЕРЕПИШИ МЕНЯ
    //   return grant.can(get(auth, 'store.session.user'), ...args);
    // }
    // this.log.trace(`Grant.askServer(${action})`);
    return this.askServerGroup({ data: params });
  }
  async askServer({ userId, user, action, ...params }) {
    // if (this.app.app.express)
    const { data } = await this.app.api.fetch('/api/grant/can', {
      method: 'POST',
      data: {
        action,
        userId,
        ...params,
      },
      body: {
        action,
        userId,
        ...params,
      },
    });
    return data;
  }
  async askServerGroup(params) {
    // if (this.app.app.express)
    const { data } = await this.app.api.fetch('/api/grant/canGroup', {
      method: 'POST',
      data: params,
      body: params,
    });
    return data;
  }
}
