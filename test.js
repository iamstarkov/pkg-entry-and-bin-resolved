import test from 'ava';
import { pkgEntryAndBinResolved, pkgEntryAndBinResolvedAsync } from './index';

test('basic', t => t.is(
  pkgEntryAndBinResolved('unicorns'),
  'unicorns'
));

test('empty input', t => t.throws(() => { pkgEntryAndBinResolved(); }, TypeError));
test('invalid input', t => t.throws(() => { pkgEntryAndBinResolved(2); }, TypeError));

test('async :: basic', async t => t.is(
  await pkgEntryAndBinResolvedAsync('unicorns'),
  'unicorns'
));

test('async :: empty input', t => t.throws(pkgEntryAndBinResolvedAsync(), TypeError));
test('async :: invalid input', t => t.throws(pkgEntryAndBinResolvedAsync(2), TypeError));
