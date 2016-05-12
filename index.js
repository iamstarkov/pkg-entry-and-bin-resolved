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

// entryAndBins :: String -> Promise String
const entryAndBins = R.pipeP(toPromise,
  loadJson,
  R.of,
  R.ap([entry, bins]),
  R.unnest
);

// resolveRelatedToPkg :: String -> [String] -> [String]
const resolveRelatedToPkg = (pkg, files) => files.map(_ => p.resolve(pkg, _));

// pkgEntryAndBinResolved :: String -> Promise [String]
function pkgEntryAndBinResolved(pkg) {
  return R.pipeP(toPromise,
    contract('pkg', String),
    resolveCwd,
    R.when(R.isNil, () => { throw new Error(`Can't open ${pkg}`); }),
    R.of,
    R.ap([p.dirname, entryAndBins]),
    all,
    R.apply(resolveRelatedToPkg)
  )(pkg);
}

export default pkgEntryAndBinResolved;
