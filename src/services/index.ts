import UserService from './UserService';
import PictureService from './PictureService';
export const userService = new UserService();
export const pictureService = new PictureService();
export { default as HttpService } from './HttpService';