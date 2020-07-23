const responseStatus = require("../enums/responseStatus");
const TempFiles = require("../models/tempFilesModel");

async function saveTempPhoto(tempFile) {
    const response = {
        status: responseStatus.failure
    };
    try {
        if (Array.isArray(tempFile)) {
            const newTempFiles = await TempFiles.collection.insertMany(tempFile);
            return {
                ...response,
                status: responseStatus.success,
                tempPhotoId: newTempFiles.insertedIds
            }
        }
        else if (typeof tempFile === "object") {
            const newTempFile = new TempFiles({
                path: tempFile.path,
                createdBy: tempFile.userId
            });
            await newTempFile.save();
            return {
                ...response,
                status: responseStatus.success,
                tempPhotoId: newTempFile._id
            };
        }
    } catch (error) {
        return {
            ...response,
            status: responseStatus.failure,
            errorMessage: {
                fatalError: error
            }
        };
    }
};

module.exports = {
    saveTempPhoto
};