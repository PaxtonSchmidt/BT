function hashStringToInt(s: string, tableSize: number) {
  let hash = 17;

  for (let i = 0; i < s.length; i++) {
    hash = (13 * hash * s.charCodeAt(i)) % tableSize;
  }

  console.log(hash);
  return hash;
}

export default class HashTable {
  table = new Array(3);
  numItems = 0;

  resize = () => {
    const newTable = new Array(this.table.length * 2);
    this.table.forEach((item) => {
      if (item) {
        item.forEach(([key, value]: any) => {
          const index = hashStringToInt(key, newTable.length);

          newTable[index]
            ? newTable[index].push([key, value])
            : (newTable[index] = [[key, value]]);

          newTable[index] = value;
        });
      }
    });
    this.table = newTable;
  };

  setItem = (key: any, value: any) => {
    this.numItems++;
    const loadFactor = this.numItems / this.table.length;
    if (loadFactor > 0.8) {
      this.resize();
    }

    const index = hashStringToInt(key, this.table.length);

    if (this.table[index] === undefined) {
      this.table[index] = [[key, value]];
    } else {
      const item = this.table[index].find((x: any) => x[0] === key);
      if (item) {
        item[1] = value;
      } else {
        this.table[index].push([key, value]);
      }
      this.table[index].push([key, value]);
    }
  };

  getItem = (key: any) => {
    const index = hashStringToInt(key, this.table.length);
    if (!this.table[index]) {
      return null;
    }

    return this.table[index].find((x: any) => x[0] === key)[1];
  };
}
