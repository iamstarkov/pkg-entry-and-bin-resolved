import R from 'ramda';
import contract from 'neat-contract';
import Promise from 'pinkie-promise';
import resolveCwd from 'resolve-cwd';
import p from 'path';
import entry from 'pkg-entry';
import loadJson from 'load-json';

// all :: [Promise a] -> Promise [a]
const all = Promise.all.bind(Promise);

// toPromise :: a -> Promise a
const toPromise = Promise.resolve.bind(Promise);

// getEntry :: String -> Promise String
const getEntry = R.pipe(
  loadJson,
  entry
);

// resolvePath :: Promise... -> String
const resolvePath = R.pipeP(
  R.unapply(all),
  R.apply(p.resolve)
);

// pkgEntryAndBinResolved :: String -> Promise [String]
function pkgEntryAndBinResolved(pkg) {
  return R.pipeP(toPromise,
    contract('pkg', String),
    resolveCwd,
    // R.converge(resolvePath, [p.dirname, getEntry]),
    // R.converge(resolvePath, [p.dirname, getEntry]),
    getEntry,
    R.tap(console.log),
    // R.call,
    R.of,
    R.identity
  )(pkg);
}

export default pkgEntryAndBinResolved;
