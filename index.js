const express = require('express');
const BodyParser = require('body-parser');
const cassandra = require('cassandra-driver');
let queue = [];
const app = express();
app.use(BodyParser.json());
app.post('/dispatch', (request, response) => {
	const limit = queue.length;
	const driver = driverSelector(request.body.drivers);
	const waitTime = getWaitEstimate(driver, request.body.rider_loc);
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
		analytics(request.body.ride_id, driver, request.body.rider_loc, waitTime)
	);
	response.status(200).end();
});
console.log('listening on port 1337...\n');
app.listen(1337);
