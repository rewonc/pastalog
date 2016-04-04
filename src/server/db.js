import jsonfile from 'jsonfile';

function hydrateDB(db) {

}

function dehydrateDB(db) {

}

export function initializeDB(path, cb) {
  jsonfile.readFile(path, (err, data) => {
    let db;
    if (err) {
      console.log(err);
      db = { logs: {} };
    } else {
      db = data;
    }
    console.log(db);
    cb(db);
  });
}

export function saveDB(path, db, cb) {
  jsonfile.write(path, db, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('successfully saved');
      cb();
    }
  });
}
