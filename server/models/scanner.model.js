/* eslint-disable no-trailing-spaces */
import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Scanner Schema
 */
const ScannerSchema = new mongoose.Schema({
  hostname: String,
  dateBegin: Date,
  dateLimit: Date,
  totalRepoNumber: Number,
  totalScannedBuilds: Number,
  totalJavaBuilds: Number,
  totalJavaPassingBuilds: Number,
  totalJavaFailingBuilds: Number,
  totalJavaFailingBuildsWithFailingTests: Number,
  totalPRBuilds: Number,
  dayLimit: String,
  duration: String,
  runId: String,
  dateBeginStr: String,
  dateLimitStr: String
}, { collection: 'scanner' });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
ScannerSchema.method({
});

/**
 * Statics
 */
ScannerSchema.statics = {
  /**
   * Get inspector
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((inspector) => {
        if (inspector) {
          return inspector;
        }
        const err = new APIError('No such scanner data exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ dateBegin: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },

  getMonthData(month, year) {
    return this.find({
      $gte: new Date(year+'-'+month+'-01'),
      $lt: new Date(year+'-'+(month+1)+'-01')
    }).exec();
  }
};

/**
 * @typedef Inspector
 */
export default mongoose.model('Inspector', InspectorSchema);
