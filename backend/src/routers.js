const express = require('express');
const multer = require('multer')
const UploadConfig =  require('./config/upload')
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController')
const BookingController = require('./controllers/BookingController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectController = require('./controllers/RejectionController')
const routers = express.Router();
const upload = multer(UploadConfig)

routers.post('/sessions',SessionController.store);
routers.get('/spots',SpotController.index);
routers.post('/spots',upload.single('thumbnail'),SpotController.store);
routers.get('/dashboard',DashboardController.show)
routers.post('/spots/:spot_id/bookings',BookingController.store)
routers.post('/bookings/:booking_id/approvals',ApprovalController.store);
routers.post('/bookings/:booking_id/rejections',RejectController.store);

module.exports = routers;
