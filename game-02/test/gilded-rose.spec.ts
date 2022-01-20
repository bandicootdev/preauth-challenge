import {AgedItem, GildedRose, Item} from "../app/gilded-rose";
import {expect} from "chai";

describe('GildedRose test', () => {
    describe('should try the updateQuality method', () => {
        it('should decrease sale and increase quality by + 3', function () {
            const itemFake = new AgedItem({
                name: 'Aged Brie',
                quality: 20,
                sellIn: 2,
                isAged: true
            });
            const itemsStatus = new GildedRose([itemFake])
            itemsStatus.updateQuality();
            const [item] = itemsStatus.items.map((i) => i.toDTO());
            expect(item.name).to.equal('Aged Brie')
            expect(item.sellIn).to.equal(1)
            expect(item.quality).to.equal(23)
        });
        it('should decrease sellIn and increase quality by + 2', function () {
            const itemFake = new AgedItem({
                name: 'Aged Brie',
                quality: 20,
                sellIn: 8,
                isAged: true
            });
            const itemsStatus = new GildedRose([itemFake])
            itemsStatus.updateQuality();
            const [item] = itemsStatus.items.map((i) => i.toDTO());
            expect(item.name).to.equal('Aged Brie')
            expect(item.sellIn).to.equal(7)
            expect(item.quality).to.equal(22)
        });

        it('should legendary Item is immutable', function () {
            const itemFake = new AgedItem({
                name: 'Sulfuras, Hand of Ragnaros',
                sellIn: 100,
                quality: 20,
                isLegendary: true
            });
            const itemsStatus = new GildedRose([itemFake])
            itemsStatus.updateQuality();
            const [item] = itemsStatus.items.map((i) => i.toDTO());
            expect(item.name).to.equal('Sulfuras, Hand of Ragnaros')
            expect(item.sellIn).to.equal(100)
            expect(item.quality).to.equal(20)
        });

        it('should conjured Item decrement quality', function () {
            const itemFake = new AgedItem({
                name: 'Conjured',
                sellIn: 100,
                quality: 20,
                isConjured: true
            });
            const itemsStatus = new GildedRose([itemFake])
            itemsStatus.updateQuality();
            const [item] = itemsStatus.items.map((i) => i.toDTO());
            expect(item.name).to.equal('Conjured')
            expect(item.sellIn).to.equal(99)
            expect(item.quality).to.equal(18)
        });

        it('should  fast decrement quality', function () {
            const itemFake = new AgedItem({
                name: 'Test',
                sellIn: 1,
                quality: 6
            });
            const itemsStatus = new GildedRose([itemFake])
            itemsStatus.updateQuality();
            const [item] = itemsStatus.items.map((i) => i.toDTO());
            expect(item.name).to.equal('Test')
            expect(item.sellIn).to.equal(0)
            expect(item.quality).to.equal(4)
        });

        it('should  fast decrement item conjured and expired quality', function () {
            const itemFake = new AgedItem({
                name: 'Conjured',
                sellIn: 1,
                quality: 6,
                isConjured: true
            });
            const itemsStatus = new GildedRose([itemFake])
            itemsStatus.updateQuality();
            const [item] = itemsStatus.items.map((i) => i.toDTO());
            expect(item.name).to.equal('Conjured')
            expect(item.sellIn).to.equal(0)
            expect(item.quality).to.equal(2)
        });

        it('should decrement sellIn and item expired quality 0', function () {
            const itemFake = new AgedItem({
                name: 'Aged Brie',
                sellIn: 1,
                quality: 6,
                isAged:true
            });
            const itemsStatus = new GildedRose([itemFake])
            itemsStatus.updateQuality();
            const [item] = itemsStatus.items.map((i) => i.toDTO());
            expect(item.name).to.equal('Aged Brie')
            expect(item.sellIn).to.equal(0)
            expect(item.quality).to.equal(0)
        })
    })
})