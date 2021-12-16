export async function loadSchedule() {
	const week = [ "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс",]
	var app = "https://script.googleusercontent.com/macros/echo?user_content_key=eXv-wBph2KNHJ390_tLAfbUeu7PHI9SrQ2ZuyrkSBF-_gmqjhCatAF34TcBZJiYU6-qQVWzDQIstMsiznBRZ3akSsbWyKPZ0m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIQlvpU1GOeD2VMqcTimNnabnY10Jkyvm6pX2S0otVy9vr-rewZNxc2WgdPf5ainy8_8ky2qSAzTmORYnZkGfjzvRWoe75B8sQ&lib=M_RcEZdeIyVSqki8icMWnjsRCGdEBlw7P",
		 output = '',
		 xhr = new XMLHttpRequest();
	xhr.open('GET', app);
	xhr.onreadystatechange = function() {
		if (xhr.readyState !== 4) return;
		if (xhr.status == 200) {
			var r = JSON.parse(xhr.responseText),
			result = r["result"][0];
			console.log(r)
			result.map((value, index)=>output += `${week[index]} | ${value} <br/><hr/>`);

		} 		
		document.getElementById('info').innerHTML = output;
	}
	xhr.send()
}