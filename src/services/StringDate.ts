export default class StringDate {
    static stringDate(timestamp:any){
        let date = new Date(timestamp.seconds*1000);
        let year = date.getFullYear();
        let month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
        let day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
        return `${day}/${month}/${year}`;
	}
}