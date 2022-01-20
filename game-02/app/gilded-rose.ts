export interface IItem {
    name: string;
    sellIn: number;
    quality: number;
}

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

interface IAgedItemsProps {
    name: string;
    sellIn: number;
    quality: number;
    isAged?: boolean;
    isConjured?: boolean;
    isLegendary?: boolean;
}

export class AgedItem extends Item {
    public isAged: boolean;
    public isConjured: boolean;
    public isLegendary: boolean;

    constructor({
                    name,
                    sellIn,
                    quality,
                    isAged = false,
                    isConjured = false,
                    isLegendary = false
                }: IAgedItemsProps) {
        super(name, sellIn, quality);
        this.isAged = isAged;
        this.isConjured = isConjured;
        this.isLegendary = isLegendary;
        this.setQuality = quality;
    }

    public addQuality(sum: number) {
        this.quality += sum;

        if (this.quality > 50) {
            this.quality = 50;
        }

        if (this.quality < 0) {
            this.quality = 0;
        }
    }

    public decrementSellIn() {
        this.sellIn--;

        if (this.sellIn < 0) {
            this.sellIn = 0;
        }
    }

    public set setQuality(quality: number) {
        this.quality = quality;

        if (quality < 0) {
            this.quality = 0;
        }

        if (!this.isLegendary) {
            if (quality > 50) {
                this.quality = 50;
            }
        }
    }

    public toDTO(): IItem {
        return {
            name: this.name,
            sellIn: this.sellIn,
            quality: this.quality
        }
    }
}

// HOW TO REFACTOR THIS CODE
/*for (let i = 0; i < this.items.length; i++) {
    if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1
            }
        }
    } else {
        if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
            if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                if (this.items[i].sellIn < 11) {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1
                    }
                }
                if (this.items[i].sellIn < 6) {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1
                    }
                }
            }
        }
    }
    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
    }
    if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
            if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                if (this.items[i].quality > 0) {
                    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                        this.items[i].quality = this.items[i].quality - 1
                    }
                }
            } else {
                this.items[i].quality = this.items[i].quality - this.items[i].quality
            }
        } else {
            if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
            }
        }
    }
}
*/

interface IGildedRose {
    updateQuality(unexpiredConcert: boolean): Item[];
}

export class GildedRose implements IGildedRose {
    items: Array<AgedItem>;

    constructor(items = [] as Array<AgedItem>) {
        this.items = items;
    }

    private qualityIncrease(): void {
        const filteredItems = this.items.filter(item => item.isAged);

        filteredItems.forEach((item: AgedItem) => {
            if (item.sellIn === 0) {
                item.setQuality = 0;
            } else {
                if (item.sellIn > 10) {
                    item.addQuality(1);
                }

                if (item.sellIn > 5 && item.sellIn <= 10) {
                    item.addQuality(2);
                }

                if (item.sellIn <= 5) {
                    item.addQuality(3);
                }
            }
        });
    }

    private qualityDecrement(): void {
        const filteredItems = this.items.filter(
            item => !item.isAged && !item.isLegendary
        );

        filteredItems.forEach(item => {
            let multiplier = 1;

            if (item.isConjured) {
                multiplier *= 2;
            }

            if (item.sellIn === 0) {
                multiplier *= 2;
            }

            item.addQuality(-1 * multiplier);
        });
    }

    private sellInDecrement(): void {
        this.items
            .filter(item => !item.isLegendary)
            .forEach(item => {
                item.decrementSellIn();
            });
    }

    public updateQuality(): Item[] {
        this.sellInDecrement();
        this.qualityDecrement();
        this.qualityIncrease();
        return this.items;
    }
}

// const item1 = new AgedItem({
//     name: 'Aged Brie',
//     quality: 20,
//     sellIn: 1,
//     isAged: true
// });
// const item2 = new AgedItem({
//     name: 'Aged Brie',
//     quality: 20,
//     sellIn: 9,
//     isAged: true
// });
// const item3 = new AgedItem({
//     name: 'Backstage passes to a TAFKAL80ETC concert',
//     quality: 20,
//     sellIn: 100,
//     isAged: true
// });
// const item4 = new AgedItem({
//     name: 'Sulfuras, Hand of Ragnaros',
//     sellIn: 100,
//     quality: 20,
//     isLegendary: true
// });
// const item5 = new AgedItem({
//     name: 'Conjured',
//     sellIn: 100,
//     quality: 20,
//     isConjured: true
// });
// const item6 = new AgedItem({
//     name: 'Test',
//     sellIn: 1,
//     quality: 6
// });
// const item7 = new AgedItem({
//     name: 'Test 2',
//     sellIn: 1,
//     quality: 12,
//     isConjured: true
// });
// const GildedRose1 = new GildedRose([
//     item1,
//     item2,
//     item3,
//     item4,
//     item5,
//     item6,
//     item7
// ]);
// const result = GildedRose1.updateQuality();
// console.log(result);
