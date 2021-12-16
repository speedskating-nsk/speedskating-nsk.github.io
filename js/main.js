import {loadSchedule} from "../js/schedule";

loadSchedule();
setInterval(loadSchedule, 10000);

