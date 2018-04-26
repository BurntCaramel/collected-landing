export function updateAtIndex<Item>(
  items: Item[],
  changedIndex: number,
  makeChanges: (original: Item) => Item
) {
  return items.map((item, itemIndex) => {
    if (itemIndex === changedIndex) {
      return makeChanges(item)
    } else {
      return item
    }
  })
}

export function insertBeforeIndex<Item>(
  items: Item[],
  beforeIndex: number,
  insertedItem: Item
) {
  return items
    .slice(0, beforeIndex)
    .concat([insertedItem])
    .concat(items.slice(beforeIndex))
}
