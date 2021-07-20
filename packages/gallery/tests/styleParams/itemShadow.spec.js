import { GALLERY_CONSTS } from 'pro-gallery-lib';
import GalleryDriver from '../drivers/reactDriver';
import { expect } from 'chai';
import { images2 } from '../drivers/mocks/items';
import { styleParams, dimensions } from '../drivers/mocks/styles';

describe('styleParam - overlayAnimation', () => {
  let driver;
  const initialProps = {
    dimensions,
    items: images2,
    styles: styleParams,
  };

  beforeEach(() => {
    driver = new GalleryDriver();
  });

  it('should have box shadow when "itemEnableShadow" is "true"', async () => {
    Object.assign(initialProps.styles, {
      galleryLayout: GALLERY_CONSTS.layout.GRID,
      scrollDirection: GALLERY_CONSTS.scrollDirection.VERTICAL,
      itemShadowBlur: 20,
      itemShadowSize: 10,
      itemShadowDirection: 135,
      itemShadowOpacityAndColor: 'rgba(0,0,0,.4)',
      itemEnableShadow: true,
    });
    driver.mount.proGallery(initialProps);
    await driver.update();
    const item = driver.find.hook('item-container').at(0);
    const { boxShadow } = item.props().style;
    const boxShadowMock = '7px 7px 20px rgba(0,0,0,.4)';
    expect(boxShadow).to.equal(boxShadowMock);
    driver.detach.proGallery();
  });
  it('should not have box shadow when "itemEnableShadow" is "false"', async () => {
    Object.assign(initialProps.styles, {
      galleryLayout: GALLERY_CONSTS.layout.GRID,
      scrollDirection: GALLERY_CONSTS.scrollDirection.VERTICAL,
      itemShadowBlur: 20,
      itemShadowSize: 10,
      itemShadowDirection: 135,
      itemShadowOpacityAndColor: 'rgba(0,0,0,.4)',
      itemEnableShadow: false,
    });
    driver.mount.proGallery(initialProps);
    await driver.update();
    const item = driver.find.hook('item-container').at(0);
    const { boxShadow } = item.props().style;
    expect(boxShadow).to.equal(undefined);
    driver.detach.proGallery();
  });
  it('should not have box shadow in a horizontal gallery', async () => {
    Object.assign(initialProps.styles, {
      galleryLayout: GALLERY_CONSTS.layout.GRID,
      scrollDirection: GALLERY_CONSTS.scrollDirection.HORIZONTAL,
      itemShadowBlur: 20,
      itemShadowSize: 10,
      itemShadowDirection: 135,
      itemShadowOpacityAndColor: 'rgba(0,0,0,.4)',
      itemEnableShadow: true,
    });
    driver.mount.proGallery(initialProps);
    await driver.update();
    const item = driver.find.hook('item-container').at(0);
    const { boxShadow } = item.props().style;
    expect(boxShadow).to.equal(undefined);
    driver.detach.proGallery();
  });

  it('should set the right "galleryMargin"', async () => {
    Object.assign(initialProps.styles, {
      galleryLayout: GALLERY_CONSTS.layout.GRID,
      scrollDirection: GALLERY_CONSTS.scrollDirection.VERTICAL,
      itemShadowBlur: 20,
      itemShadowSize: 10,
      itemShadowDirection: 135,
      itemShadowOpacityAndColor: 'rgba(0,0,0,.4)',
      itemEnableShadow: true,
    });
    driver.mount.proGallery(initialProps);
    await driver.update();
    const item = driver.find.selector('#pro-gallery-margin-container');
    const { margin } = item.props().style;
    expect(margin).to.equal('30px');
    driver.detach.proGallery();
  });

  it('should set the correct box-shadow style to the items', async () => {
    Object.assign(initialProps.styles, {
      galleryLayout: GALLERY_CONSTS.layout.GRID,
      scrollDirection: GALLERY_CONSTS.scrollDirection.VERTICAL,
      itemEnableShadow: true,
      itemShadowDirection: 100,
      itemShadowSize: 20,
      itemShadowBlur: 20,
      itemShadowOpacityAndColor: 'rgba(0,0,0,.4)',
    });

    driver.mount.proGallery(initialProps);
    await driver.update();
    const item = driver.find.hook('item-container').at(0);
    expect(item.props().style.boxShadow).to.equal(
      '20px 3px 20px rgba(0,0,0,.4)'
    );
    driver.detach.proGallery();
  });
});
