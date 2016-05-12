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

const log = R.tap(console.log); // eslint-disable-line
const id = R.identity; // eslint-disable-line

// getEntryAndBins :: String -> Promise String
const getEntryAndBins = R.pipeP(
  loadJson,
  R.of,
  R.ap([entry, bins]),
  R.unnest
);

// resolvePath :: Promise... -> String
const resolvePath = R.pipeP(
  R.unapply(all),
  R.apply((pkg, files) => files.map(_ => p.resolve(pkg, _)))
);

// pkgEntryAndBinResolved :: String -> Promise [String]
function pkgEntryAndBinResolved(pkg) {
  return R.pipeP(toPromise,
    contract('pkg', String),
    resolveCwd,
    R.when(R.isNil, () => { throw new Error(`Can't open ${pkg}`); }),
    R.converge(resolvePath, [p.dirname, getEntryAndBins])
  )(pkg);
}

export default pkgEntryAndBinResolved;
