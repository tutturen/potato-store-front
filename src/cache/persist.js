import { CachePersistor } from 'apollo-cache-persist';

const SCHEMA_VERSION = '1'; // Must be a string.
const SCHEMA_VERSION_KEY = 'apollo-schema-version';

export default function persistCache(cache) {
  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage,
  });

  const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY);

  if (currentVersion === SCHEMA_VERSION) {
    persistor.restore();
  } else {
    persistor.purge();
    window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
  }
}
