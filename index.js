import R from 'ramda';
import contract from 'neat-contract';
import Promise from 'pinkie-promise';
import resolveCwd from 'resolve-cwd';
import p from 'path';
import entry from 'pkg-entry';
import bins from 'pkg-bin-paths';
import loadJson from 'load-json-file';

// all :: [Promise a] -> Promise [a]
const all = Promise.all.bind(Promise);

// toPromise :: a -> Promise a
const toPromise = Promise.resolve.bind(Promise);

const log = R.tap(console.log.bind(console)); // eslint-disable-line
const id = R.identity; // eslint-disable-line

// entryAndBins :: String -> Promise String
const entryAndBins = R.pipeP(
  loadJson,
  R.of,
  R.ap([entry, bins]),
  R.unnest
);

// pkgEntryAndBinResolved :: String -> Promise [String]
function pkgEntryAndBinResolved(pkg) {
  return R.pipeP(toPromise,
    contract('pkg', String),
    resolveCwd,
    R.when(R.isNil, () => { throw new Error(`Can't open ${pkg}`); }),
    R.of,
    R.ap([p.dirname, entryAndBins]),
    all,
    R.apply((root, files) => files.map(_ => p.resolve(root, _))),
    log,
    id
  )(pkg);
}

export default pkgEntryAndBinResolved;
