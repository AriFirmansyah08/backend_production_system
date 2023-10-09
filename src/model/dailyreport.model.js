const daily = require("../database/gateway.config");

//get all tabel
getAll = async (tabel) => await daily.select('*').from(tabel);
//get all tabel daily_report
getAllDaily = async (tabel) => await daily.select('*').from(tabel).where('status_reset','open');
getById = async (id_daily_report) => await daily.select('*').from('daily_report').where('id_daily_report', id_daily_report);
getWhere = async (column, value) => await daily.select('*').from('daily_report').where(column, value);
insert = async (data) => await daily('daily_report').insert(data);
insertReset = async (data) => await daily('history').insert(data);

getAllHistory = async () => await daily.select(history.raw(
    `*, DATE_FORMAT(date, '%Y') AS year, 
    DATE_FORMAT(date, '%c') as month, 
    DATE_FORMAT(date, '%e') AS day, FROM history`
));
getByIdHistory = async (id_history) => 
    await daily.select(
        daily.raw(
            `* FROM history AS h
            JOIN daily_report AS dr
            ON h.id_history = dr.id_reset
            WHERE h.id_history = ${id_history}`
        )
    );
getLastData = async (tabel) => await daily.select('*')
    .from(tabel)
    .orderBy('id_daily_report', 'desc')
    .first()


update = async (id_daily_report, data) => await daily('daily_report').where('id_daily_report', id_daily_report).update(data);

deleteData = async (id_daily_report) => await daily('daily_report').where('id_daily_report', id_daily_report).del();


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
    getAllHistory,
    getByIdHistory
};