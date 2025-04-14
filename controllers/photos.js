const Photo = require("../models/photo");

// Obtener las fotos del usuario autenticado
const getPhotos = (req, res, next) => {
  Photo.find({ owner: req.user._id })
    .then((photos) => res.send(photos))
    .catch(next);
};

// Guardar una nueva foto
const createPhoto = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Photo.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((photo) => res.status(201).send(photo))
    .catch(next);
};

// Eliminar una foto
const deletePhoto = (req, res, next) => {
  const { articleId } = req.params;

  Photo.findById(articleId)
    .then((photo) => {
      if (!photo) {
        return res.status(404).send({ message: "Foto no encontrada" });
      }
      if (photo.owner.toString() !== req.user._id) {
        return res.status(403).send({ message: "No puedes borrar esta foto" });
      }
      return photo
        .deleteOne()
        .then(() => res.send({ message: "Foto eliminada" }));
    })
    .catch(next);
};

module.exports = { getPhotos, createPhoto, deletePhoto };
