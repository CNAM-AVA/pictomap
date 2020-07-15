import { Observable } from "../utils/Observable";
import { watchPositionAsync, LocationData, Accuracy, getCurrentPositionAsync } from 'expo-location';
import { findingsService } from ".";

export default class LocationService {

	distanceInterval = 1; // Distance in meters to update location again
	timeInterval = 1000; // Minimal time in ms between updates 
	watchPosition = watchPositionAsync({
		timeInterval: this.timeInterval,
		distanceInterval: this.distanceInterval
	}, (loc) => {
		this.location = loc;
	});

	location: LocationData = {
		coords: {
			latitude: 0,
			longitude: 0,
			altitude: 0,
			accuracy: Accuracy.Lowest,
			heading: 0,
			speed: 0
		},
		timestamp: 0
	}

	constructor() {
		this.stopWatching();
	}

	startWatching() {
		this.watchPosition = watchPositionAsync({
			timeInterval: this.timeInterval,
			distanceInterval: this.distanceInterval
		}, (loc) => {
			this.location = loc;
			findingsService.tryToFindPicture()
		});
	}

	stopWatching() {
		this.watchPosition.then(r => {
			r.remove();
		});
	}

	/**
	 * Return the user's current location
	 */
	getCurrentLocation() {
		return this.location;
	}

	/**
	 * Refreshes the user's current location
	 */
	async refreshCurrentLocation() {
		this.location = await getCurrentPositionAsync({});
	}
}