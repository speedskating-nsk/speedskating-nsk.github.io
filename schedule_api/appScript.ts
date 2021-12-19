// https://script.google.com/home/projects/1bMr12mYMG4fqyrAZmYg_0QnLsZx1F-AhtG2cjUQ_dsCs008EJZgkKJ8M/edit

function pushDataToRepo(
	token,
	user,
	repo,
	branch,
	file_path,
	file_data
) {

	const last_commit_url = `https://api.github.com/repos/${user}/${repo}/branches/${branch}`;
	const blobs_url = `https://api.github.com/repos/${user}/${repo}/git/blobs`;
	const tree_url = `https://api.github.com/repos/${user}/${repo}/git/trees`;
	const commit_url = `https://api.github.com/repos/${user}/${repo}/git/commits`;
	const ref_url = `https://api.github.com/repos/${user}/${repo}/git/refs/heads/${branch}`;



	function getLastCommit() {
		const req = UrlFetchApp.fetch(last_commit_url, {
			headers: {
				'Authorization': `token ${token}`
			},
		});
		return JSON.parse(req.getContentText())['commit']['sha'];
	}


	function createBlob() {
		const req = UrlFetchApp.fetch(blobs_url, {
			method: 'POST',
			headers: {
				'Authorization': `token ${token}`
			},
			'payload': JSON.stringify({
				"content": file_data,
				"encoding": "utf-8",
			})
		});
		return JSON.parse(req.getContentText())['sha'];

	}

	function createTree() {
		const req = UrlFetchApp.fetch(tree_url, {
			method: 'POST',
			headers: {
				'Authorization': `token ${token}`
			},
			'payload': JSON.stringify({
				"base_tree": getLastCommit(),
				"tree": [
					{
						"path": file_path,
						"mode": "100644",
						"type": "blob",
						"sha": createBlob()
					}
				]
			})
		});
		return JSON.parse(req.getContentText())['sha'];

	}

	function createCommit() {
		const req = UrlFetchApp.fetch(commit_url, {
			method: 'POST',
			headers: {
				'Authorization': `token ${token}`
			},
			'payload': JSON.stringify({
				"message": "Add new files at once programatically",
				"author": {
					"name": "kirill",
					"email": "speedskatingnsk@gmail.com"
				},
				"parents": [
					getLastCommit()
				],
				"tree": createTree()
			})
		});
		return JSON.parse(req.getContentText())['sha'];

	}

	function updateRef() {
		const req = UrlFetchApp.fetch(ref_url, {
			method: 'POST',
			headers: {
				'Authorization': `token ${token}`
			},
			'payload': JSON.stringify({
				"sha": createCommit()
			})
		})
		Logger.log((req.getContentText()));

	}
	updateRef();
}



function getSchedule() {
	const db = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('internal');
	const range = db.getRange(db.getLastRow(), 1, 1, 8).getValues()[0];

	return rangeToScheduleObj(range);
}

function rangeToScheduleObj(range) {
	return { schedule: range.slice(0, 7), updated: range[7] };
}

function doGet() {
	var data = getSchedule();
	if (!data) {
		data = '';
	}
	data = JSON.stringify({ 'result': data })
	Logger.log(data);
	// ContentService.createTextOutput().setMimeType()
	const ret = ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON);
	return ret;
}


const token = "ghp_*********************************"
function saveSchedule(range) {
	const db = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('internal');
	db.appendRow(range)
	pushDataToRepo(
		token,
		"koorya",
		"atcions_experience",
		"main",
		"schedule.js",
		`function getDefSchedule(){return ${JSON.stringify(rangeToScheduleObj(range))};}`);
}

function updateDate() {
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('tmp');
	const db = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('internal');
	let range = sheet.getRange(2, 1, 1, 7).getValues()[0];


	const last_row_in_db = db.getLastRow()

	if (last_row_in_db > 0) {
		const last_saved = db.getRange(last_row_in_db, 1, 1, 7).getValues()[0];
		if (!range.every((cell, index) => cell === last_saved[index])) {
			range.push((new Date()).toJSON());
			saveSchedule(range);
		}

	} else {
		range.push((new Date()).toJSON());
		saveSchedule(range);
	}

	// sheet.appendRow(["a man", "a plan", "panama"]);
	return true;
}