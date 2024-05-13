const { randomUUID } = require("crypto");

class Tyre {
  constructor(brand, size) {
    this.brand = brand;
    this.size = size;
  }

  get name() {
    return `${this.brand} ${this.size} inch`;
  }
}

class Car {
  constructor(door, seat, varian) {
    this.door = door;
    this.seat = seat;
    this.varian = varian;
  }
}

class Agya extends Car {
  get tyre() {
    const tyre = new Tyre("Dunlop", 15);
    return tyre.name;
  }

  get warranty() {
    return 1;
  }
}

class Rush extends Car {
  get tyre() {
    const tyre = new Tyre("Bridgestone", 17);
    return tyre.name;
  }

  get warranty() {
    return 3;
  }
}

class CarFactory {
  constructor() {
    this.cars = [];
    this.max = 15;
    this.prod = "hasil produksi: ";
    this.desc = "";
  }

  produce(year) {
    const agya = new Agya(5, 5, "Agya"),
      rush = new Rush(5, 5, "Rush");
    agya.year = year;
    rush.year = year;
    for (let i = 0; i < Math.ceil(Math.random() * this.max); i++) {
      this.cars.push(agya, rush);
    }
  }

  guaranteeSimulation(simulationYear) {
    this.prod = `hasil simulasi garansi semua mobil pada tahun ${simulationYear}: `;
    this.desc = `status on ${simulationYear} this guarantee status is `;
    this.sim = simulationYear;
    this.result();
  }

  result() {
    let i = 1;
    console.log(this.prod);
    for (let car of this.cars) {
      console.log(`
no. ${i++}
varian      : ${car.varian}
sn          : ${randomUUID()}
door        : ${car.door}
seat        : ${car.seat} seater
tyre        : ${car.tyre}
year        : ${car.year}
warranty    : ${car.warranty} year

${
  this.desc
    ? car.year + car.warranty >= this.sim
      ? this.desc + "active"
      : this.desc + "expired"
    : ""
}
        `);
    }
  }
}

const toyota = new CarFactory();

toyota.produce(2020);
toyota.produce(2022);
toyota.result();
toyota.guaranteeSimulation(2025);