import { getSnapshot } from "mobx-state-tree"
import { Item, ItemList } from "./ItemsStore"

it("can add new items", () => {
    const list = ItemList.create()
    list.add(
        Item.create({
            name: 'TV',
            value: 2000,
        }),
        'Electronics',
    )

    expect(getSnapshot(list)).toEqual({
        Clothing: [],
        Electronics: [
            {
                name: 'TV',
                value: 2000,
            },
        ],
        Kitchen: [],
        Misc: [],
    });
})

it("can calculate the total price of a wishlist", () => {
    const list = ItemList.create();
    list.add(
        Item.create({
            name: 'TV',
            value: 2000,
        }),
        'Electronics',
    )
    list.add(
        Item.create({
            name: 'iPhone',
            value: 800,
        }),
        'Electronics',
    )
    list.add(
        Item.create({
            name: 'Fancy Shirt',
            value: 1000,
        }),
        'Clothing',
    )

    expect(list.totalElectronicsValue).toBe(2800)
    expect(list.totalClothingValue).toBe(1000)
    expect(list.totalValue).toBe(3800)

})
