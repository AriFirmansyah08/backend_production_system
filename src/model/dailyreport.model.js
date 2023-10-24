const daily = require("../database/gateway.config");

//daily real
getAll = async (tabel) => await daily.select('*').from(tabel);
getAllDaily = async (tabel) => await daily.select('*').from(tabel).where('status_reset','open');
getById = async (id_daily_report) => await daily.select('*').from('daily_report').where('id_daily_report', id_daily_report);
getWhere = async (column, value) => await daily.select('*').from('daily_report').where(column, value);
insert = async (data) => await daily('daily_report').insert(data);


//fungstion lainnya
insertReset = async (data) => await daily('history').insert(data);
insertData = async (data) => await daily('history').insert(data);
updateReset = async (id, data) => await daily("history").where("id_history", id).update(data);

getAllHistory = async(history) => await daily.select('*').from(history)
getByIdHistory = async (id_history) => 
    await daily.select(
        daily.raw(
            `* FROM daily_report AS h
            JOIN history AS dr
            ON h.id_reset = dr.id_history
            WHERE h.id_reset = ${id_history}`
        )
    );

    //fungstion add leaders
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
    insertData,
    getAllHistory,
    getByIdHistory,
    updateReset
};