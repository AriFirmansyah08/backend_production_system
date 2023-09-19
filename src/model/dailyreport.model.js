const daily = require("../database/gateway.config");

//get all tabel
getAll = async (tabel) => await daily.select('*').from(tabel);

//get all tabel daily_report
getAllDaily = async (tabel) => await daily.select('*').from(tabel).where('status_reset','open');
getById = async (id_dailyReport) => await daily.select('*').from('daily_report').where('id_dailyReport', id_dailyReport);
getWhere = async (column, value) => await daily.select('*').from('daily_report').where(column, value);
insert = async (data) => await daily('daily_report').insert(data);
insertReset = async (data) => await daily('reset').insert(data);

//get data terakhir(last)
getLastData = async (tabel) => await daily.select('*')
    .from(tabel)
    .orderBy('id_dailyReport', 'desc')
    .first()

update = async (id_dailyReport, data) => await daily('daily_report').where('id_dailyReport', id_dailyReport).update(data);

deleteData = async (id_dailyReport) => await daily('daily_report').where('id_dailyReport', id_dailyReport).del();


module.exports = {
    getAll,
    getById,
    getWhere,
    insert,
    update,
    deleteData,
    getLastData,
    getAllDaily,
    insertReset,
};