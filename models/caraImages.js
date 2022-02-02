const mongoose = require('mongoose')


const caraImagesSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true

    },
    linktoProduct: {
        type: String,
        required: true

    },
    linktoImage: {
        type: String,
        required: true

    }


})

const CaraImage = mongoose.model("CaraImage", caraImagesSchema);

module.exports = CaraImage;