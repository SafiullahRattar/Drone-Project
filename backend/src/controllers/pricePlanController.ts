import express, { Request, Response } from 'express';
import PricePlan from '../models/priceModel';

const router = express.Router();

// Create a new price plan
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;

    const pricePlan = new PricePlan({
      name,
      description,
      price,
    });

    await pricePlan.save();

    res.status(201).send(pricePlan);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get all price plans
router.get('/', async (req: Request, res: Response) => {
  try {
    const pricePlans = await PricePlan.find();

    res.status(200).send(pricePlans);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Update a price plan
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const { id } = req.params;

    const pricePlan = await PricePlan.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );

    if (!pricePlan) {
      return res.status(404).send('Price plan not found');
    }

    res.status(200).send(pricePlan);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Delete a price plan
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const pricePlan = await PricePlan.findByIdAndDelete(id);

    if (!pricePlan) {
      return res.status(404).send('Price plan not found');
    }

    res.status(200).send(pricePlan);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

export default router;
