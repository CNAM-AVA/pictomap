import UserService from './UserService';
import PictureService from './PictureService';
import LocationService from './LocationService';
import FindingsService from './FindingsService';

export const userService = new UserService();
export const pictureService = new PictureService();
export const locationService = new LocationService();
export const findingsService = new FindingsService();

export { default as HttpService } from './HttpService';