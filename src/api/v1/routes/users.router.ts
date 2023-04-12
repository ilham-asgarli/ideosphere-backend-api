import { Request, Response, NextFunction, Router } from "express";
import { getUsers, getUserById, updateUser, deleteUser} from "../controllers/user.controller";

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;