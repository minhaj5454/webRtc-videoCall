const mongoose = require('mongoose');
const Company = require('../../models/company');

const get = async (id, project) => {
    let result = await Company.findById(id, project);
    return result;
};
const findOne = async (query, project) => {
    const result = await Company.findOne(query, project);
    return result;
};
const findMany = async (query , project) => {
    let result = await Company.find(query, project);
    return result;
};
const create = async (data) => {
    let result = await Company.create(data);
    return result;
};
const patch = async (id, data) => {
    let result = await Company.udpateOne(id, data);
    return result;
}

module.exports = {
    get,
    findOne,
    findMany,
    create,
    patch
}