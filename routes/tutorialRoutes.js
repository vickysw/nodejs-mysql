const express = require('express');
const router = express.Router();

const tutorialController = require('./../controllers/tutorialController');

// router.param('id',tutorialController.validateTour)

router.route('/').get(tutorialController.getAllTours).post(tutorialController.createTutorial);//.post(createTour);
router.route('/:id').get(tutorialController.getTour).patch(tutorialController.updateTour).delete(tutorialController.deleteTour);
module.exports = router;