const Supplier = require("../Model/SupplierModel");
const { findByIdAndDelete } = require("../Model/UserModel");

const getAllSuppliers = async (req, res, next) => {
  let suppliers;
  try {
    suppliers = await Supplier.find();
  } catch (err) {
    console.log(err);
  }
  if (!suppliers) {
    return res.status(404).json({ message: "suppliers not found" });
  }
  return res.status(200).json({ suppliers });
};

const addSupplier = async (req, res, next) => {
  let suppliers;
  const { name, email, phoneno, item, city, nic, status } = req.body;

  try {
    suppliers = new Supplier({
      name,
      email,
      phoneno,
      item,
      city,
      nic,
      status,
    });
    await suppliers.save();
  } catch (err) {
    console.log(err);
  }
  if (!suppliers) {
    return res.status(404).send({ message: "unable to add supplier" });
  }
  return res.status(200).json({ suppliers });
};

const getSupplierById = async (req, res, next) => {
  const id = req.params.id;
  let suppliers;
  try {
    suppliers = await Supplier.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!suppliers) {
    return res.status(404).send({ message: "unable to supplir" });
  }
  return res.status(200).json({ suppliers });
};

const updateSupplier = async (req, res, next) => {
  const id = req.params.id;
  console.log("id:", id);
  const { name, item, phoneno, city } = req.body;
  let suppliers;
  try {
    suppliers = await Supplier.findByIdAndUpdate(id, {
      name: name,
      item: item,
      phoneno: phoneno,
      city: city,
    });
    suppliers = await supplierssave();
  } catch (err) {
    console.log(err);
  }
  if (!suppliers) {
    return res.status(404).send({ message: "unable to supplir" });
  }
  return res.status(200).json({ suppliers });
};

const deleteSupplier = async (req, res, next) => {
  const id = req.params.id;
  let suppliers;
  try {
    suppliers = await Supplier.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!suppliers) {
    return res.status(404).send({ message: "unable to supplier" });
  }
  return res.status(200).json({ suppliers });
};

exports.getAllSuppliers = getAllSuppliers;
exports.addSupplier = addSupplier;
exports.getSupplierById = getSupplierById;
exports.updateSupplier = updateSupplier;
exports.deleteSupplier = deleteSupplier;
