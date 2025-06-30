import express from "express";
import Assistence from "../models/Assistence.js";
import User from "../models/User.js";
import UserCourse from "../models/UserCourse.js";
import Course from "../models/Course.js";
import { verifyTokenMiddleware } from "../token.js";
const router = express.Router();

router.get("/", verifyTokenMiddleware, async (req, res) => {
    const assistance = await Assistence.findAll();
    res.json(assistance);
});

router.get("/:id", verifyTokenMiddleware, async (req, res) => {
    try {
        const assistance = await Assistence.findByPk(req.params.id);
        res.json(assistance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", verifyTokenMiddleware, async (req, res) => {
    try {
        let { user_id, course_id, hour, day, assisted } = req.body;
        if (!user_id || !course_id || !hour || !assisted) {
            return res.status(400).json({ message: "user_id, course_id, hour i assisted són obligatoris" });
        }
        course_id = parseInt(course_id);
        user_id = parseInt(user_id);
        const user = await User.findOne({ where: { id: user_id } });
        const course = await Course.findOne({ where: { id: course_id } });
        if (!user) {
            return res.status(404).json({ message: "user_id no trobat" });
        }
        if (!course) {
            return res.status(404).json({ message: "course_id no trobat" });
        }
        const userCourse = await UserCourse.findOne({ where: { user_id, course_id } });
        if (!userCourse) {
            return res.status(404).json({ message: "user_id no està inscrit al course_id" });
        }
        const hourExists = await Assistence.findOne({ where: { hour, user_id, day } });
        let assistance;
        if (hourExists) {
            assistance = Assistence.update({ assisted }, { where: { hour, user_id, day } });
        }
        else {
            assistance = await Assistence.create({ user_id, course_id, hour, assisted, day });
        }
        res.json(assistance);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", verifyTokenMiddleware, async (req, res) => {
    try {
        const { assisted } = req.body;
        const assistance = await Assistence.update({ assisted }, { where: { id: req.params.id } });
        res.json(assistance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", verifyTokenMiddleware, async (req, res) => {
    const assistance = await Assistence.findByPk(req.params.id);
    if (!assistance) {
        return res.status(404).json({ message: "Assistència no trobada" });
    } else {
        try {
            await Assistence.destroy();
            res.json({ message: "Assistència eliminada correctament" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
});

router.get("/course/:id", verifyTokenMiddleware, async (req, res) => {
    try {
        const assistance = await Assistence.findAll({ where: { course_id: req.params.id } });
        res.json(assistance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/course/:courseId/day/:day", verifyTokenMiddleware, async (req, res) => {
    try {
        const { courseId, day } = req.params;
        const assistance = await Assistence.findAll({ where: { course_id: courseId, day } });
        res.json(assistance);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/user/:userId/course/:courseId", verifyTokenMiddleware, async (req, res) => {
    try {
        const { userId, courseId } = req.params;
        const assistance = await Assistence.findAll({ where: { user_id: userId, course_id: courseId } });
        let auxAssistance = [];
        assistance.forEach((assistance) => {
            if (assistance.assisted != "not selected") {
                auxAssistance.push(assistance);
            }
        });
        res.json(auxAssistance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;