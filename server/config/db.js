require('dotenc').config();
const { ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

const uri = process.env.ATLASDB;

const clientOptions = { ServerApi: { version: '1', strict: true, deprecationErrors:true }};