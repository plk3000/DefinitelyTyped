import sqlite3 = require('sqlite3');
import sqlite3_transactions = require('sqlite3-transactions');

sqlite3.verbose();

let db: sqlite3_transactions.TransactionDatabase = new sqlite3_transactions.TransactionDatabase(new sqlite3.Database('chain.sqlite3', () => { }));

function createTable() {
    console.log("createTable lorem");
    db.beginTransaction((error, transaction) => {
        transaction.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)", insertRows);
        transaction.commit(function (error) {

        });
    });
}

function insertRows() {
    console.log("insertRows Ipsum i");
    db.beginTransaction((error, transaction) => {
        const stmt = transaction.prepare("INSERT INTO lorem VALUES (?)");

        for (let i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }

        stmt.finalize();
        transaction.commit((error) => {
            readAllRows();
        })
    });
}

function readAllRows() {
    console.log("readAllRows lorem");
    db.beginTransaction((error, transaction) => {
        transaction.all("SELECT rowid AS id, info FROM lorem", (err, rows) => {
            rows.forEach(row => {
                console.log(row.id + ": " + row.info);
            });
            //readSomeRows();
        });
        transaction.commit((error) => {});
    });
}

/*
function readSomeRows() {
    console.log("readAllRows lorem");
    db.each("SELECT rowid AS id, info FROM lorem WHERE rowid < ? ", 5, (err, row) => {
        console.log(row.id + ": " + row.info);
    }, closeDb);
}

function closeDb() {
    console.log("closeDb");
    db.close();
}

function runChainExample() {
    createDb();
}

runChainExample();

db.serialize(() => {
  db.run("CREATE TABLE lorem (info TEXT)");

  const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (let i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
      console.log(row.id + ": " + row.info);
  });
});

db.serialize(() => {
  // These two queries will run sequentially.
  db.run("CREATE TABLE foo (num)");
  db.run("INSERT INTO foo VALUES (?)", 1, err => {
    // These queries will run in parallel and the second query will probably
    // fail because the table might not exist yet.
    db.run("CREATE TABLE bar (num)");
    db.run("INSERT INTO bar VALUES (?)", 1);
  });
});

// Directly in the function arguments.
db.run("UPDATE tbl SET name = ? WHERE id = ?", "bar", 2);

// As an array.
db.run("UPDATE tbl SET name = ? WHERE id = ?", [ "bar", 2 ]);

// As an object with named parameters.
db.run("UPDATE tbl SET name = $name WHERE id = $id", {
  $id: 2,
  $name: "bar"
});
db.run("UPDATE tbl SET name = $name WHERE id = $id", { $id: 2, $name: "bar" },
  err => { }
);

db.run("UPDATE tbl SET name = ?5 WHERE id = ?", {
  1: 2,
  5: "bar"
});

db.close();
*/