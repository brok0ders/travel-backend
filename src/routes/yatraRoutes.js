import { Router } from "express";
import { createYatra, deleteYatra, getAllYatras, getYatraById, updateYatra } from "../controllers/yatraController.js";

const router = Router();

router.route("/all").get(getAllYatras);
router.route("/get/:id").get(getYatraById);
router.route("/create").post(createYatra);
router.route("/update/:id").put(updateYatra);
router.route("/delete/:id").delete(deleteYatra);

export default router;