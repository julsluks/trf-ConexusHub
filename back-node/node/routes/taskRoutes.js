import express from "express";
import Task from "../models/Task.js";
import Grade from "../models/Grade.js";
import Course from "../models/Course.js";
import { verifyTokenMiddleware } from "../token.js";

const router = express.Router();

router.get("/", verifyTokenMiddleware, async (req, res) => {
    try {
        const Tasks = await Task.findAll();
        res.json(Tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", verifyTokenMiddleware, async (req, res) => {
    try {
        const Task = await Task.findByPk(req.params.id);
        res.json(Task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", verifyTokenMiddleware, async (req, res) => {
    try {
        const { task_name, course_id, task_description } = req.body;
        const task_ended = false; // Valor per defecte
        const newTask = await Task.create({ task_name, course_id, task_description, task_ended });
        res.json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id",verifyTokenMiddleware, async (req, res) => {
    try {
        const { task_name, course_id, task_description, task_ended } = req.body;
        const auxTask = await Task.findByPk(req.params.id);
        if (!auxTask) {
            return res.status(404).json({ message: "Tasca no trobada" });
        }
        auxTask.task_name = task_name;
        auxTask.course_id = course_id;
        auxTask.task_description = task_description;
        auxTask.task_ended = task_ended;
        await auxTask.save();
        res.json(auxTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id",verifyTokenMiddleware, async (req, res) => {
    try {
        const Task = await Task.findByPk(req.params.id);
        if (!Task) {
            return res.status(404).json({ message: "Tasca no trobada" });
        } else {
            await Task.destroy({ where: { id: req.params.id } });
            res.json({ message: "Tasca eliminada correctament" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/getAllGradesFromTask/:id", verifyTokenMiddleware, async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id, {
            include: [
                {
                    model: Grade,
                    as: "grades",
                },
            ],
        });
        if (!task) {
            return res.status(404).json({ message: "Tasca no trobada" });
        }
        res.json(task.grades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

router.get("/getAllTasksFromCourse/:id", verifyTokenMiddleware, async (req, res) => {
    try {
        const task = await Task.findAll({ where: { course_id: req.params.id } });
        if (!task) {
            return res.status(404).json({ message: "Tasca no trobada" });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

router.get("/getAllTasksFromStudent/:id", verifyTokenMiddleware, async (req, res) => {
    try {
        const task = await Task.findAll({ where: { user_id: req.params.id } });
        if (!task) {
            return res.status(404).json({ message: "Tasca no trobada" });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

router.get("/getAllTasksFromStudentFromCourse/:courseId/:studentId", verifyTokenMiddleware, async (req, res) => {
    try {
        const task = await Task.findAll({ where: { course_id: req.params.courseId, user_id: req.params.studentId } });
        if (!task) {
            return res.status(404).json({ message: "Tasca no trobada" });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

export async function getLatestTask() {
    try {
        const latestTask = await Task.findOne({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Course,
                    attributes: ['course_name']
                }
            ]
        });
        
        return latestTask;
    } catch (error) {
        console.error("Error en obtenir tasca recent:", error);
        throw error;
    }
}

export default router;




