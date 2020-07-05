import { LocationData } from "expo-location";
import { locationService, userService, findingsService } from ".";
import { User, Picture } from "../utils";
import { firestore } from '../utils/firebase';

export default class FindingsService {

	tryToFindPicture() {
		let location = locationService.getCurrentLocation();
		let user = userService.getUser();
		let findings = this.getPossibleFindingsAround(location, user, locationService.distanceInterval);
		findings.then(r => {
			let pictures: Picture[] = r.map((x: { uuid: any; uri: any; latitude: any; longitude: any; created_at: any; author_uuid: any; }) => new Picture({
				uuid: x?.uuid,
				uri: x?.uri,
				latitude: x?.latitude,
				longitude: x?.longitude,
				created_at: x.created_at,
				author_uuid: x.author_uuid
			}))

			if (pictures.length > 0) {
				let randomPic = pictures[Math.floor(Math.random() * pictures.length)];
				userService.addFoundPicture(randomPic);
			}

		})
	}

	/**
	 * Get unfound pictures around the location.
	 * @param loc 
	 * @param user
	 * @param dist Distance in meters
	 */
	getPossibleFindingsAround(loc: LocationData, user: User, dist: number) {
		return new Promise((resolve, reject) => {
			firestore.collection("pictures").get().then(r => {
				let documents = [];
				r.forEach(doc => {
					documents.push(doc.data())
				})
				resolve(documents);
			});
		});
	}
}