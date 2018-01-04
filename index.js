const express = require('express');
const BodyParser = require('body-parser');
const cassandra = require('cassandra-driver');
const db = require('./cassandradb.js').db;
let queue = [];
const app = express();
app.use(BodyParser.json());
app.get('/dispatch', (request, response) => {
	const limit = queue.length;
	if (limit >= 100) {
		db
			.batch(queue, { prepare: true })
			.catch(error => console.log(error, queue));
		queue = [];
	}
	setInterval(() => {
		if (queue.length) {
			db
				.batch(queue, { prepare: true })
				.catch(error => console.log('ERROR: ', error, queue));
		}
		queue = [];
	}, 5000);
	queue.push(
		analytics(
			request.body.ride_id,
			request.body.driver,
			request.body.rider_loc,
			request.body.waitTime
		)
	);
	response.status(200).end();
});
console.log('listening on port 1337...\n');
app.listen(1337);
