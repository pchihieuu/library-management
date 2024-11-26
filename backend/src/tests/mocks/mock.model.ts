export class MockModel {
    id: number;
    name: string;
  
    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
    }
  
    static findAll = jest.fn();
    static findByPk = jest.fn();
    static create = jest.fn();
    static update = jest.fn();
    static destroy = jest.fn();

    get dataValues() {
        return {
            id: this.id,
            name: this.name,
        }
    }
  }
  