// Type definitions for sqlite3-transactions 0.0
// Project: https://github.com/Strix-CZ/sqlite3-transactions
// Definitions by: plk3000 <https://github.com/plk3000>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import sqlite3 = require('sqlite3');

export class TransactionDatabase {
    constructor(database: sqlite3.Database, exec?: (database: Database, statement: sqlite3.Statement, callback?: () => void) => void);
    beginTransaction(callback: (error: Error, transaction: Database) => void): void;
}

export class Database extends sqlite3.Database {
    commit(callback: (error: Error) => void): void;
    rollback(callback: (error: Error) => void): void;
}