const query =
	'INSERT INTO analytics (id, ride_id, driver_id, driver_loc, rider_loc, wait_est) VALUES (uuid(), ?, ?, ?, ?, ?);';
const analytics = (rideId, driver, riderLoc, waitEst) => ({
	query,
	params: [rideId, driver.driver_id, driver.driver_loc, riderLoc, waitEst]
});
module.exports.analytics = analytics;
