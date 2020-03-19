let app = new nPlayer();
let DB = new nDB();

if(!DB.has('caching_audio')){
	DB.set('caching_audio', 'yes');
}

app.fetch_list();

app.after_fetch = function(){
	// Register Service Worker
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js')
		.then(() => navigator.serviceWorker.ready.then((worker) => {
			worker.sync.register('syncdata');
			console.log(worker);
			worker.active.postMessage({cache:CACHE});
		}))
		.catch((err) => console.log(err));
	}
}

// Make images not draggable
$('img').attr('draggable', "false");