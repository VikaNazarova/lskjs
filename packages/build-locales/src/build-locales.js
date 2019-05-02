import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import groupBy from 'lodash/groupBy';
import forEach from 'lodash/forEach';
import parse from 'csv-parse';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import getKeyValJson from '@lskjs/utils/getKeyValJson';

const parseAsync = promisify(parse);

export default async (spreadsheets, locales, destination) => {
  const localesRows = [];
  await Promise.all(spreadsheets.map(async (spreadsheet) => {
    const rows = await parseAsync(spreadsheet, { columns: true });
    localesRows.push(...rows);
  }));
  try {
    rimraf.sync(destination);
    mkdirp.sync(destination);
  } catch (err) {
    console.error(err);
  }
  locales.forEach((locale) => {
    const dirname = path.join(destination, locale);
    try {
      mkdirp.sync(dirname);
    } catch (err) {
      console.error(err);
    }
    fs.writeFileSync(`${dirname}.json`, JSON.stringify(getKeyValJson(localesRows, locale), null, 2)); // eslint-disable-line max-len
    // fs.writeFileSync(`${dirname}/translation.json`, JSON.stringify(getKeyValJson(localesRows, locale), null, 2)); // eslint-disable-line max-len
    const namespaces = groupBy(localesRows, 'ns');
    forEach(namespaces, (rows, ns) => {
      if (!ns) return;
      fs.writeFileSync(`${dirname}/${ns}.json`, JSON.stringify(getKeyValJson(rows, locale), null, 2));
    });
  });
};