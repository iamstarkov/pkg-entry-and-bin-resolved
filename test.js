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

test('bins', async t => {
  const _ = await pkgEntryAndBinResolved('./fixtures/bins.json');
  t.deepEqual(_, mapPreCwd(['./fixtures/index.js', './fixtures/one.js', './fixtures/two.js']));
});

test('basic', async t => {
  const _ = await pkgEntryAndBinResolved('./fixtures/basic.json');
  t.deepEqual(_, mapPreCwd(['./fixtures/entry.js', './fixtures/one.js', './fixtures/two.js']));
});

test('unresolvable file', t => t.throws(pkgEntryAndBinResolved('./fixtures/nope.json'), Error));
test('empty input', t => t.throws(pkgEntryAndBinResolved(), TypeError));
test('invalid input', t => t.throws(pkgEntryAndBinResolved(2), TypeError));
