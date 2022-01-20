import {GildedRose, Item} from "../app/gilded-rose";
import {expect} from "chai";

describe('GildedRose test', () => {
    describe('should try the updateQuality method', () => {
        it('should decrease sale and increase quality by + 2', function () {
            const itemFake = new Item('Aged Brie', 1, 20);
            const itemsStatus = new GildedRose([itemFake])
            itemsStatus.updateQuality();
            expect(itemsStatus.items[0].name).to.equal('Aged Brie')
            expect(itemsStatus.items[0].sellIn).to.equal(0)
            expect(itemsStatus.items[0].quality).to.equal(21)
        });
        it('should decrease sellIn and increase quality by + 3', function () {
            const itemFake =new Item('Aged Brie', 9, 20);
            const itemsStatus = new GildedRose([itemFake])
            itemsStatus.updateQuality();
            expect(itemsStatus.items[0].name).to.equal('Aged Brie')
            expect(itemsStatus.items[0].sellIn).to.equal(8)
            expect(itemsStatus.items[0].quality).to.equal(22)
        });
    })
})