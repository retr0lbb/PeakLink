import expres from "express"
import {TopologyData} from "../db/models/topology.js"
import { Trail } from "../db/models/trail.js";

const topologyRouter = expres.Router()

topologyRouter.post("/", async (req, res) => {
    const { trailId, latitude, longitude, altitude, temperature, pressure, humidity,
            heading, speed, verticalSpeed, slope, surfaceType, deviceId, accuracy } = req.body;

    const foundTrail = await Trail.findById(trailId)

    if(!foundTrail){
        return res.status(404).json({message: "Trail Not Found, Discarting Data"})
    }

    const topology = new TopologyData({
        accuracy,
        deviceId,
        trailId,
        coordinates: { latitude, longitude, altitude },
        environment: { temperature, pressure, humidity },
        motion: { heading, speed, verticalSpeed },
        terrain: { slope, surfaceType },
    })

    await topology.save({validateBeforeSave: true});

    return res.status(201).json({message: "Topology data Retrieved With success"})
})

export { topologyRouter }