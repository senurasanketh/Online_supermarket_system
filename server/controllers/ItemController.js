const Item = require("../Model/ItemModel");

const getAllItems = async (req, res, next) => {
  let items;
  try {
    items = await Item.find();
  } catch (err) {
    console.log(err);
  }
  if (!items) {
    return res.status(404).json({ message: "item not found" });
  }
  return res.status(200).json({ items });
};

const AddItems = async (req, res, next) => {
  try {
    const image = req.files.image;
    const imageName = new Date().getTime();
    await image.mv("Assets/" + `${imageName}.jpg`, (err) => {});
    const { name, itemcode, quantity, price, category } = req.body;

    // Create a new item
    const items = new Item({
      name,
      itemcode,
      quantity,
      price,
      category,
      image: `${imageName}.jpg`,
    });

    await items.save();
    res.status(201).json({ message: "Item added successfully!", item: items });
  } catch (error) {
    res.status(500).json({ error: "Error adding item" });
  }
};

const itemgetById = async (req, res, next) => {
  const id = req.params.id;
  let items;
  try {
    items = await Item.findById(id);
    return res.status(200).json({ items });
  } catch (err) {
    console.log(err);
  }
  if (!items) {
    return res.status(404).send({ message: "unable to image" });
  }
};

const updateItem = async (req, res, next) => {
  const id = req.params.id;
  const image = req.files.image;
  const imageName = new Date().getTime();
  await image.mv("Assets/" + `${imageName}.jpg`, (err) => {});

  const { name, quantity, price } = req.body;
  let items;
  try {
    items = await Item.findByIdAndUpdate(id, {
      name: name,
      quantity: quantity,
      price: price,
      image: `${imageName}.jpg`,
    });
    items = await items.save();
  } catch (err) {
    console.log(err);
  }
  if (!items) {
    return res.status(404).send({ message: "unable to item" });
  }
  return res.status(200).json({ items });
};

const deleteItem = async (req, res, next) => {
  const id = req.params.id;
  console.log("id::> ", id);
  let items;
  try {
    items = await Item.findByIdAndDelete(id);
    return res.status(200).json({ items });
  } catch (err) {
    console.log(err);
  }
};
exports.getAllItems = getAllItems;
exports.AddItems = AddItems;
exports.itemgetById = itemgetById;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
