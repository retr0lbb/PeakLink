import expres from "express"
import {TopologyData} from "../db/models/topology"

const topologyRouter = expres.Router()

router.post("/", async (req, res) => {
    const { trailId, latitude, longitude, altitude, temperature, pressure, humidity,
            heading, speed, verticalSpeed, slope, surfaceType, deviceId, accuracy } = req.body;

    const topology = new TopologyData({
        accuracy,
        deviceId,
        trailId,
        coordinates: { latitude, longitude, altitude },
        environment: { temperature, pressure, humidity },
        motion: { heading, speed, verticalSpeed },
        terrain: { slope, surfaceType },
    })

    await topology.save({validateBeforeSave: true})
    
    return res.status(201).json({message: "Topology data Retrieved With success"})
})


export { topologyRouter }