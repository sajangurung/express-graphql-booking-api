import * as express from 'express';
import User from '../models/User';

const router = express.Router();

const createUser = async (req, res, next) => {
  try {
    const { id } = await User.createProfile(req.body);

    res.json({message: id });

  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const success = await User.updateProfile(req.body);

    res.json({message: success });

  } catch (err) {
    next(err);
  }
};

// Routes
router.post('/', createUser);
router.put('/', updateUser);
export default router;
