import {TopologyData} from "../db/models/topology.js"
import { haversineDistance } from "./calculate-gps-points-distance.js";

export async function calculateSumOfStats(trailId){
    const data = await TopologyData.find({trailId}).sort({timestamp: 1});

    if (data.length < 2){
        return {
            distance: 0,
            duration: 0,
            altitudeGain: 0,
            altitudeLoss: 0,
            avgSpeed: 0
        };
    }

    let distanceTotal = 0;
    let altitudeGain = 0;
    let altitudeLoss = 0;

    for(let i = 1; i<data.length; i++){
        const p1 = data[i -1].coordinates
        const p2 = data[i].coordinates

        distanceTotal += haversineDistance(p1.latitude, p1.longitude, p2.latitude, p2.longitude)

        const deltaAlt = p2.altitude - p1.altitude

        if(deltaAlt> 0) altitudeGain += deltaAlt
        else altitudeLoss += Math.abs(deltaAlt)
    }

    const start = data[0].timestamp
    const end = data[data.length -1].timestamp
    const durationSec = (end - start) / 1000

    const avgSpeed = distanceTotal / durationSec;


    return {
        distance: Math.round(distanceTotal), 
        duration: Math.round(durationSec),
        altitudeGain: Math.round(altitudeGain),
        altitudeLoss: Math.round(altitudeLoss),
        avgSpeed: parseFloat(avgSpeed.toFixed(2))
    };

}