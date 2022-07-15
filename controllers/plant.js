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
        Object.assign(plant, req.body)
        plant.save()
        res.send({data: plant})
    } catch (err) {
        res.send({message: err.message});
    }
};

/*
{
    watered: false,
    consecutive: req.body.num,
    //lastWatered: req.body.date
},
{
    watered: true,
    consecutive: req.body.num + 1,
    //lastWatered: today.format('Y-m-d')
}
*/