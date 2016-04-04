import fs from 'fs';


export function initializeDB(path, cb) {
  fs.readFile(path, 'utf8', (err, data) => {
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
