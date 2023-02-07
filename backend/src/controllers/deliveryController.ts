import expressAsyncHandler from "express-async-handler";
import Delivery from "../models/deliveryModel";

export const addDelivery = expressAsyncHandler(async (req, res) => {
  const { name, status, phone, address } = req.body;
  try {
    const newDelivery = new Delivery({
      name,
      status,
      phone,
      address,
    });

    const delivery = await newDelivery.save();
    res.json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export const getDeliveryByStatus = expressAsyncHandler(async (req, res) => {
  try {
    const delivery = await Delivery.find({ status: req.params.status });
    res.json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export const getDeliveryById = expressAsyncHandler(async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    res.json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export const updateDeliveryById = expressAsyncHandler(async (req, res) => {
  const { name, status, phone, address } = req.body;
  //Build delivery object
  const deliveryFields = {} as {
    name: string;
    status: string;
    phone: string;
    address: string;
  };
  if (name) deliveryFields.name = name;
  if (status) deliveryFields.status = status;
  if (phone) deliveryFields.phone = phone;
  if (address) deliveryFields.address = address;
  try {
    let delivery = await Delivery.findById(req.params.id);

    if (!delivery) res.status(404).json({ msg: "Delivery not found" });

    delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { $set: deliveryFields },
      { new: true }
    );
    res.json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
