import express from "express"
import { Trail } from "../db/models/trail.js";
import {randomUUID} from "node:crypto"
const TrailRouter = express.Router()

TrailRouter.post("/", async(req, res) => {
    const {userId} = req.body;

    try {
        const trail = new Trail({
            userId,
            trailId: randomUUID(),
            status: "open",
        })

        await trail.save()

        res.status(201).json({message: "Trail Created Enjoy the Hike!!!"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
})


TrailRouter.get("/", async(req, res) => {
    try {
        const trails = await Trail.find()

        return res.status(200).json({trails})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

TrailRouter.get("/:id", async(req, res) => {
    try {
        const trail = await Trail.findById(req.params.id)

        return res.status(200).json({trail})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

TrailRouter.delete("/:id", async(req, res) => {
    try {
        await Trail.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Trail deleted with success"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

TrailRouter.post("/:id/close", async (req, res) => {
  try {
    const trail = await Trail.findById(req.params.id);

    if (!trail) {
      return res.status(404).json({ message: "Trail not found" });
    }

    const { distance, duration, altitudeGain, altitudeLoss, avgSpeed } = req.body;

    trail.stats = {
      distance,
      duration,
      altitudeGain,
      altitudeLoss,
      avgSpeed
    };

    trail.status = "closed";
    trail.endedAt = new Date();

    await trail.save();

    return res.status(200).json({ message: "Trail closed successfully", trail });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

 
export { TrailRouter }