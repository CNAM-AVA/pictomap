import UserService from './UserService';
import PictureService from './PictureService';
import FriendService from './FriendService';
export const userService = new UserService();
export const pictureService = new PictureService();
export const friendService = new FriendService();
export { default as HttpService } from './HttpService';