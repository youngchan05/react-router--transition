export function storageAvailable(type = 'sessionStorage') {
  const storage = window[type];

  try {
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (err) {
    return (
      err instanceof DOMException
      && (err.code === 22
        || err.code === 1014
        || err.name === 'QuotaExceededError'
        || err.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      && storage.length !== 0
    );
  }
}

export function setItem(key, obj, type = 'sessionStorage') {
  if (storageAvailable(type)) {
    const storage = window[type];
    return storage.setItem(key, JSON.stringify(obj));
  }
  return storageAvailable(type);
}

export function getItem(key, type = 'sessionStorage') {
  if (storageAvailable(type)) {
    const storage = window[type];
    return JSON.parse(storage.getItem(key));
  }
  return storageAvailable(type);
}

export function getItemWithoutParse(key, type = 'sessionStorage') {
  if (storageAvailable(type)) {
    const storage = window[type];

    return storage.getItem(key);
  }
  return storageAvailable(type);
}

export function removeItem(key, type = 'sessionStorage') {
  if (storageAvailable(type)) {
    const storage = window[type];

    return storage.removeItem(key);
  }
  return storageAvailable(type);
}

export function clear(type = 'sessionStorage') {
  if (storageAvailable(type)) {
    const storage = window[type];

    return storage.clear();
  }
  return storageAvailable(type);
}
