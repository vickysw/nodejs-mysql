const express = require('express');
const router = express.Router();

const tutorialController = require('./../controllers/tutorialController');

// router.param('id',tutorialController.validateTour)

router.route('/').get(tutorialController.getAllTutorials).post(tutorialController.createTutorial);//.post(createTour);
router.route('/:id').get(tutorialController.getTutorial).patch(tutorialController.updateTutorial).delete(tutorialController.deleteTutorial);
module.exports = router;