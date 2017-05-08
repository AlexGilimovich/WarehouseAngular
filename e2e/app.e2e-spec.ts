import { BookDiscounterPage } from './app.po';

describe('book-discounter App', () => {
  let page: BookDiscounterPage;

  beforeEach(() => {
    page = new BookDiscounterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
