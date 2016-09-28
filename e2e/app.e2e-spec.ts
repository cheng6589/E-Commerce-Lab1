import { ECommerceLab1Page } from './app.po';

describe('e-commerce-lab1 App', function() {
  let page: ECommerceLab1Page;

  beforeEach(() => {
    page = new ECommerceLab1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
