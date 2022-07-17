const Plant = require('../model/plant');

exports.growPlant = async (req, res) => {
    try {
        const plant = new Plant(req.body);
        await plant.save()
        res.send({data: plant})
    } catch (err) {
        res.send({message: err.message});
    }
}

exports.getPlant = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        res.send({data: plant});
    } catch (err) {
        res.send({message: err.message});
    }
};

exports.waterPlant = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id)
        if (plant) {
            Object.assign(plant, req.body)
            plant.save()
            res.send({data: plant})
        }
    } catch (err) {
        res.send({message: err.message});
    }
};
