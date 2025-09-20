/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2545135087")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number4009414778",
    "max": null,
    "min": null,
    "name": "y1",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number1860743297",
    "max": null,
    "min": null,
    "name": "x2",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number2012447168",
    "max": null,
    "min": null,
    "name": "y2",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number2267388434",
    "max": null,
    "min": null,
    "name": "x1",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2545135087")

  // remove field
  collection.fields.removeById("number4009414778")

  // remove field
  collection.fields.removeById("number1860743297")

  // remove field
  collection.fields.removeById("number2012447168")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number2267388434",
    "max": null,
    "min": null,
    "name": "x1_y1_x2_y2",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
