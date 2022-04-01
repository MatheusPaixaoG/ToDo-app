export class Todo {
  id: number;
  title: string = '';
  complete: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  setId(newId: number) {
    this.id = newId;
  }

  setTitle(newTitle: string) {
    this.title = newTitle;
  }

  setComplete(newComplete: boolean) {
    this.complete = newComplete;
  }

  getTitle(): string {
    return this.title;
  }

  getComplete(): boolean {
    return this.complete;
  }
}