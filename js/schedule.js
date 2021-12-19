export function updateSchedule(data){
	const week = [ "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс",];
	// {"shedule":["9:45-11:14","16:30-17:45 ГЭС","9:45-11:15 ГЭС","15:00-16:15 ГЭС","16:30-17:30 ГЭС","","16:15-17:30 Гэс"],"updated":"2021-12-17T17:32:21.384Z"}
	const date = new Date(Date.parse(data.updated));
	var output = "";
	data.schedule.map((value, index)=>output += `<tr><td>${week[index]} </td><td>${value}</td></tr>`);
	const table = `
	<table>
		<colgroup>
			<col width="10%" />
			<col width="80%" />
		</colgroup>
		<thead>
			<tr class="header">
			<th colspan="2">Последнее обновление: ${date.toLocaleDateString("ru")} в ${date.toLocaleTimeString("ru")}</th>
			</tr>
		</thead>
		<tbody>
			${output}
		</tbody>
	</table>`;
	if (table != window.last_table_content){
		console.log("update schedule");
		window.last_table_content = table;
		document.getElementById('info').innerHTML = table;
	}
} 		

export async function loadSchedule() {
	// const saved = "https://script.google.com/macros/s/AKfycbw6_v16RIkusQnSCdMs0eUnsR5iQ5QRcawNB9p12PynjCD3rkboZ4BydFqn6rLekWnS/exec"
	var app = "https://script.google.com/macros/s/AKfycbw6_v16RIkusQnSCdMs0eUnsR5iQ5QRcawNB9p12PynjCD3rkboZ4BydFqn6rLekWnS/exec";
	fetch(app).then((res) => res.json().then(updateSchedule))
}

