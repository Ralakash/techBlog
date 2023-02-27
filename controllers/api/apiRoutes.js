const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const Note = require('../../models/Note');

router.post('/note', upload.single('note'), async function (req, res) {
	// const result = await uploadImage(req.file);
	// res.send({ imagePath: `/images/${result.key}` });
	const userData = await Note.create({
		user_id: req.session.user_id,
		title: req.body.title,
		description: req.body.description,
	});
});

// creates a method to delete previously made notes based on their unique id.
router.delete('/notes/:id', async (req, res) => {
	try {
		const noteData = await Note.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!noteData) {
			res.status(404).json({ message: 'No post found with this id!' });
			return;
		}

		res.status(200).json(noteData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
