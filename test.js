import test from 'ava';
import pkgEntryAndBinResolved from './index';
import path from 'path';
import R from 'ramda';

// preCwd :: String -> String
const preCwd = i => path.join(process.cwd(), i);

const mapPreCwd = R.map(preCwd);

test('entry', async t => {
  const _ = await pkgEntryAndBinResolved('./fixtures/entry.json');
  t.deepEqual(_, mapPreCwd(['./fixtures/entry.js']));
});

test('jsnext-entry', async t => {
  const _ = await pkgEntryAndBinResolved('./fixtures/jsnext-entry.json');
  t.deepEqual(_, mapPreCwd(['./fixtures/jsnext-entry.js']));
});

test('empty input', t => t.throws(pkgEntryAndBinResolved(), TypeError));
test('invalid input', t => t.throws(pkgEntryAndBinResolved(2), TypeError));
