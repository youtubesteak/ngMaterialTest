import { NgMaterialTestPage } from './app.po';

describe('ng-material-test App', () => {
  let page: NgMaterialTestPage;

  beforeEach(() => {
    page = new NgMaterialTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
