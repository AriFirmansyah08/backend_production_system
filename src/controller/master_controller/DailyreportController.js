const model = require("./../../model/dailyreport.model");
const api = require("./../../tools/common");
const DailyReport = require('./../../model/dailyreport.model'); // Sesuaikan dengan model Anda

// GET all shift leader
exports.getAllleaders = async (req, res) => {
    let data = await model.getAll('mst_leaders');
    return api.ok(res, data);
};

// GET all shift leader
exports.getAllHistory = async (req, res) => {
    let data = await model.getAll('reset');
    return api.ok(res, data);
};

// GET all daily reports
exports.getAlldaily = async (req, res) => {
    let data = await model.getAllDaily('daily_report');
    return api.ok(res, data);
};

// GET daily report by ID
exports.getdailyById = async (req, res) => {
    const id_dailyReport = req.params.id
    try {
        const dailyReport = await DailyReport.getById(id_dailyReport);
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

// POST create a new daily report
exports.insertdaily = async (req, res) => {
    // console.log(req.body);
    let dataLempar = req.body.form_data
    let lastRecord = await DailyReport.getLastData('daily_report')

    if (lastRecord.status_reset == 'close'){
        let dataInsert = {
            shift_leaders: dataLempar.shift_leader,
            production_hours: dataLempar.production_hours,
            result: dataLempar.result,
            start: 0,
            finish: lastRecord.finish + dataLempar.result,
            status_reset: 'open'

        }
        let insert = await DailyReport.insert(dataInsert)
    } else{
        let dataInsert = {
            shift_leaders: dataLempar.shift_leader,
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
    const { id_dailyReport } = req.params;
    const updatedData = req.body;
    try {
        const updatedDailyReport = await DailyReport.findByIdAndUpdate(
            id_dailyReport,
            updatedData,
            { new: true } // Mengembalikan data yang sudah diupdate
        );
        if (!updatedDailyReport) {
            return res.status(404).json({
                message: 'Daily report not found'
            });
        }
        res.status(200).json(updatedDailyReport);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// DELETE delete a daily report by ID
exports.deletedaily = async (req, res) => {
    const {
        id_dailyReport
    } = req.params;
    try {
        const deletedDailyReport = await DailyReport.findByIdAndRemove(id_dailyReport);
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
        var id_dailyReport = req.body.form_data.map(item => ({id: item.id_dailyReport}))
        
        let insert = await DailyReport.insertReset({})
        for(let i = 0; i < id_dailyReport.length; i++){
            var dataUpdate = {
                status_reset: 'close',
                id_reset: insert[0]
            }
            DailyReport.update(id_dailyReport[i].id, dataUpdate)
        }
        return api.ok(res, insert[0]);
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }

}