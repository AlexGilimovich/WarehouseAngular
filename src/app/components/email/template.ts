export class Template {


  constructor(public type?: string,
              public receiverIds?: number[],
              public subject?: string,
              public date?: string,
              public backgroundColor?: string,
              public body?: string) {
  }
}
