const kue = require('kue')
const redisConfig = require('../../config/redis')
const Sentry = require('@sentry/node')
const jobs = require('../jobs')

// Kue is a priority job queue backed by redis, built for node.js.
const Queue = kue.createQueue({ redis: redisConfig })

// Queue.on('error', function (err) {
//   console.log('Oops... ', err)
// })
Queue.on('error', Sentry.captureException)

Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)
module.exports = Queue
