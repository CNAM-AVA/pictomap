import { locationService } from ".";

export default class FindingsService {
	tryToFindPicture() {
		let findings = this.getPossibleFindingsAround();
		let location = locationService.getCurrentLocation();

		console.log(findings, location);
	}

	getPossibleFindingsAround() {
		return [];
	}
}