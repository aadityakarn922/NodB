const ImageKit = require("@imagekit/nodejs")

const imagekit= new ImageKit({
    privateKey: "private_L6Bpy7pv87EbZSjZZWdK4qLxQrU="
})


async function uploadFile(buffer) {

    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg"
    })

    return result
}

module.exports = uploadFile