import { TestFilePage } from './app.po';

describe('test-file App', () => {
  let page: TestFilePage;

  beforeEach(() => {
    page = new TestFilePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
