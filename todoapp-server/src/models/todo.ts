export class Todo {
  id: number;
  title: string = '';
  complete: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  getTitle(): string {
    return this.title;
  }

  getComplete(): boolean {
    return this.complete;
  }
}