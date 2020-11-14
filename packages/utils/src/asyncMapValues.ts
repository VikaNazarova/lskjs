import Bluebird from 'bluebird';
import mapValues from 'lodash/mapValues';

export default (...args: any[]): Promise<{ [key: string]: any }> => Bluebird.props(mapValues(...args));
