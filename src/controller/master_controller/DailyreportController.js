const model = require("./../../model/dailyreport.model");
const api = require("./../../tools/common");
const DailyReport = require('./../../model/dailyreport.model'); // Sesuaikan dengan model Anda


// GET all shift leader
exports.getAllleaders = async (req, res) => {
    let data = await model.getAll('mst_leaders');
    return api.ok(res, data);
};

// GET all shift leader
getAllhistory = async (req, res) => {
    let data = await model.getAllHistory('history');
    return api.ok(res, data);
};

// GET all daily reports
exports.getAlldaily = async (req, res) => {
    let data = await model.getAllDaily('daily_report');
    return api.ok(res, data);
};


// GET daily report by ID
exports.getdailyById = async (req, res) => {
    const id_daily_report = req.params.id
    try {
        const dailyReport = await DailyReport.getById(id_daily_report);
        console.log(dailyReport);
        if (!dailyReport) {
            return res.status(404).json({
                message: 'Daily report not found'
            });
        }
        res.status(200).json(dailyReport);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
getByIdHistory = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getByIdHistory(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}




// POST create a new daily report
exports.insertdaily = async (req, res) => {
    // console.log(req.body);
    let dataLempar = req.body.form_data
    let lastRecord = await DailyReport.getLastData('daily_report')
    // lastRecord.status_reset == 'open'
    if (lastRecord.status_reset == 'close'){
        let dataInsert = {
            shift_leaders: dataLempar.shift_leaders,
            production_hours: dataLempar.production_hours,
            result: dataLempar.result,
            start: 0,
            finish: dataLempar.result,
            status_reset: 'open'
        }
        let insert = await DailyReport.insert(dataInsert)
    } else{
        let dataInsert = {
            shift_leaders: dataLempar.shift_leaders,
            production_hours: dataLempar.production_hours,
            result: dataLempar.result,
            start: lastRecord.finish,
            finish: lastRecord.finish + dataLempar.result,
            status_reset: 'open'
    }
    let insert = await DailyReport.insert(dataInsert)
    }
    return api.ok(res, insert);
};

// Update daily report by ID
exports.updatedaily = async (req, res) => {
    const id_daily_report = req.params.id;
    const data = req.body.form_data; // Data yang ingin diupdate

    const updatedReport = await model.update(id_daily_report, data)
    return api.ok(res, updatedReport);
};


// DELETE delete a daily report by ID
exports.deletedaily = async (req, res) => {
    const {
        id_daily_report
    } = req.params;
    try {
        const deletedDailyReport = await DailyReport.findByIdAndRemove(id_daily_report);
        if (!deletedDailyReport) {
            return res.status(404).json({
                message: 'Daily report not found'
            });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//resetDaily
exports.resetDaily = async (req,res) => {
    try{
        var id_daily_report = req.body.form_data.map(item => ({id: item.id_daily_report}))
        let insert = await DailyReport.insertReset({})
        for(let i = 0; i < id_daily_report.length; i++){
            var dataUpdate = {
                status_reset: 'close',
                id_reset: insert[0]
            }
            DailyReport.update(id_daily_report[i].id, dataUpdate)
        }
        return api.ok(res, insert[0]);
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }

}