var express = require('express');
var router = express.Router();

const ApplicationController = require('../../controller/master_controller/ApplicationController');
const { uploadImage } = require('../../services/file-handler.service');
const ImageHandler = require('../../controller/master_controller/ImageHandlerController');
const DailyreportController = require('../../controller/master_controller/DailyreportController')

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


// shift leaders
router.get('/leaders', DailyreportController.getAllleaders); // satu form dengan daily report

router.get('/history', DailyreportController.getAllHistory);

module.exports = router;