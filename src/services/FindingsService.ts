import { LocationData } from "expo-location";
import { locationService, userService } from ".";
import { User, Picture } from "../utils";
export default class FindingsService {

	findingDistance = 20;

	tryToFindPicture() {
		let location = locationService.getCurrentLocation();
		let user = userService.getUser();
		let findings = this.getPossibleFindingsAround(location, user, this.findingDistance);
		console.log(findings);
	}

	/**
	 * Get unfound pictures around the location.
	 * @param loc 
	 * @param dist Distance in meters
	 */
	getPossibleFindingsAround(loc: LocationData, user: User, dist: number): Picture[] {
		return [];
	}
}