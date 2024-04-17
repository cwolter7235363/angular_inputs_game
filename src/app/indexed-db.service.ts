import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private db!: IDBDatabase;
  private dbName: string = 'MyAppDB';
  private storeName: string = 'animals';

  constructor() {
    this.initDB();
  }

  private initDB() {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      this.db = request.result;
      if (!this.db.objectStoreNames.contains(this.storeName)) {
        this.db.createObjectStore(this.storeName, { keyPath: 'uuid' });
      }
    };

    request.onsuccess = (event: Event) => {
      this.db = request.result;
    };

    request.onerror = (event: Event) => {
      console.error('IndexedDB error:', request.error);
    };
  }

  addAnimal(animal: any): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(animal);
  
      request.onsuccess = () => {
        resolve(request.result); // Now correctly typed as IDBValidKey
      };
  
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  getAnimal(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  // Implement updateAnimal and deleteAnimal methods similarly
}