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

test.skip('bins', async t => {
  const _ = await pkgEntryAndBinResolved('./fixtures/bins.json');
  t.deepEqual(_, mapPreCwd(['./fixtures/one.js', './fixtures/two.js']));
});

test('empty input', t => t.throws(pkgEntryAndBinResolved(), TypeError));
test('invalid input', t => t.throws(pkgEntryAndBinResolved(2), TypeError));
