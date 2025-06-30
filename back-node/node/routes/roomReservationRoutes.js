import express from "express";
import RoomReservation from "../models/RoomReservation.js";
import { Op } from "sequelize";
import Room from "../models/Room.js";
import User from "../models/User.js";
import { verifyTokenMiddleware } from "../token.js";
const router = express.Router();

router.get("/", verifyTokenMiddleware, async (req, res) => {
  try {
    const reservations = await RoomReservation.findAll();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/:user_id", verifyTokenMiddleware, async (req, res) => {
  const { user_id } = req.params;
  try {
    const reservations = await RoomReservation.findAll({
      where: {
        user_id,
        start_time: { [Op.gte]: new Date() },
      },
    });
    if (!reservations) {
      return res
        .status(404)
        .json({
          message: "No s'han trobat reserves d'aula per a aquest usuari",
        });
    }
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/reserved", verifyTokenMiddleware, async (req, res) => {
  try {
    const reservations = await RoomReservation.findAll({
      where: {
        start_time: { [Op.gte]: new Date() },
      },
    });
    if (!reservations) {
      return res.status(404).json({ message: "No hi ha reserves d'aula" });
    }
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", verifyTokenMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await RoomReservation.findOne({ where: { id } });
    if (!reservation) {
      return res
        .status(404)
        .json({ message: "Reserva d'aula no trobada" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/:user_id", verifyTokenMiddleware, async (req, res) => {
  const { user_id } = req.params;
  try {
    const reservations = await RoomReservation.findAll({
      where: { user_id },
    });
    if (!reservations) {
      return res.status(404).json({ message: "No s'han trobat reserves d'aula per a aquest usuari" });
    }
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", verifyTokenMiddleware, async (req, res) => {
  try {
    const { user_id, room_id, start_time, end_time } = req.body;

    if (!user_id || !room_id || !start_time || !end_time) {
      return res
        .status(400)
        .json({
          message: "user_id, room_id, start_time i end_time són obligatoris",
        });
    }
    if (new Date(start_time) >= new Date(end_time)) {
      return res.status(400).json({ message: "La data d'inici ha de ser anterior a la data de finalització" });
    }
    if (new Date(start_time) < new Date()) {
      return res.status(400).json({ message: "La data d'inici no pot ser anterior a la data actual" });
    }
    const existingReservation = await RoomReservation.findOne({
      where: {
        room_id,
        [Op.or]: [
          {
            start_time: {
              [Op.between]: [start_time, end_time],
            },
          },
          {
            end_time: {
              [Op.between]: [start_time, end_time],
            },
          },
        ],
      },
    });
    if (existingReservation) {
      return res
        .status(400)
        .json({ message: "L'aula ja està reservada en aquest horari" });
    }
    const newReservation = await RoomReservation.create({
      user_id,
      room_id,
      start_time,
      end_time,
    });
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", verifyTokenMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await RoomReservation.findOne({ where: { id } });
    if (!reservation) {
      return res
        .status(404)
        .json({ message: "Reserva d'aula no trobada" });
    }
    await reservation.update(req.body);
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", verifyTokenMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await RoomReservation.findOne({ where: { id } });
    if (!reservation) {
      return res
        .status(404)
        .json({ message: "Reserva d'aula no trobada" });
    }
    await reservation.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/room/:id", verifyTokenMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const reservations = await RoomReservation.findAll({
      where: {
        room_id: id,
      },
    });
    if (!reservations) {
      return res.status(404).json({ message: "No s'han trobat reserves d'aula per a aquesta aula" });
    }
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export async function getLatestRoomReservation() {
  try {
    const latestReservation = await RoomReservation.findOne({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Room,
          attributes: ['room_name']
        },
        {
          model: User,
          attributes: ['name']
        }
      ]
    });

    return latestReservation;
  } catch (error) {
    console.error("Error en obtenir reserva recent:", error);
    throw error;
  }
}

export default router;
