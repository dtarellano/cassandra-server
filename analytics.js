const query =
	'INSERT INTO analytics (id, ride_id, driver_id, driver_loc, rider_loc, wait_est) VALUES (uuid(), ?, ?, ?, ?, ?);';
const analytics = (rideId, driver, riderLoc, waitEst) => ({
	query,
	params: [
		data.ride_id,
		data.driver_id,
		data.driver_loc,
		data.rider_loc,
		data.wait_est
	]
});
module.exports.analytics = analytics;
