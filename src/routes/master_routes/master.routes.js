var express = require('express');
var router = express.Router();

const ApplicationController = require('../../controller/master_controller/ApplicationController');
const { uploadImage } = require('../../services/file-handler.service');
const ImageHandler = require('../../controller/master_controller/ImageHandlerController');
const DailyreportController = require('../../controller/master_controller/DailyreportController');
const ScheduleController = require('../../controller/master_controller/ScheduleController');
const AbnormalController = require('../../controller/master_controller/AbnormalController');

// Image Upload
router.post('/image', uploadImage.single('file'), ImageHandler.uploadImage)
router.delete('/image/:filename', ImageHandler.deleteImage)

// Application data
router.get('/user-app/:id', ApplicationController.getCustomApps);
router.get('/application', ApplicationController.getAllApps);
router.get('/application/:id', ApplicationController.getAppById);
router.post('/application', ApplicationController.insertApp);
router.post('/user-app', ApplicationController.insertCustomApp);
router.put('/application/:id', ApplicationController.updateApp);
router.delete('/application/:id', ApplicationController.deleteApp);
router.delete('/user-app/:id', ApplicationController.deleteCustomApp);

// daily report
router.get('/daily_report', DailyreportController.getAlldaily);
router.get('/daily_report/:id', DailyreportController.getdailyById);
router.post('/daily_report', DailyreportController.insertdaily);
router.post('/reset_daily_report', DailyreportController.resetDaily);
router.put('/daily_report/:id', DailyreportController.updatedaily);

router.get('/history/:id', DailyreportController.getByIdHistory);
// shift leaders
router.get('/leaders', DailyreportController.getAllleaders)


router.get('/history', DailyreportController.getAllhistory);


router.get('/schedule', ScheduleController.getAllschedule);
router.get('/schedule/:id', ScheduleController.getByIdschedule);
router.post('/schedule', ScheduleController.insertschedule);

router.get('/abnormal', AbnormalController.getAllabnormal);
router.post('/abnormal', AbnormalController.insertabnormal);

module.exports = router;