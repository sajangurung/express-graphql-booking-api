import * as express from 'express';
import Event from '../models/Event';

const router = express.Router();

const createEvent = async (req, res, next) => {

  try {
    const { id } = await Event.createEvent(req.body);

    res.json({message: id });

  } catch (err) {
    next(err);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const success = await Event.updateEvent(req.body);

    res.json({message: success });

  } catch (err) {
    next(err);
  }
};

const getEvents = async (_, res, next) => {
  try {
    const data = await Event.getAll();

    res.json({data});

  } catch (err) {
    next(err);
  }
};

// Routes
router.get('/', getEvents);
router.post('/', createEvent);
router.put('/', updateEvent);
export default router;
