import {loadSchedule, updateSchedule} from "../js/schedule";



// updateSchedule(getDefSchedule());
window.updateSchedule = updateSchedule;
setInterval(loadSchedule, 500);

