const CACHE = 'nplayer-offline';
const timeout = 400;

self.addEventListener('install', (event) => {
	console.log('Installed');

	let cache_list = [
	// Documents
	'/',
	'/index.php',

	// Scripts
	'/assets/js/jquery.min.js',
	'/assets/js/app.class.js',

	//Styles
	'/assets/js/player.js',
	'/assets/css/main.min.css',

	//Images
	'/assets/img/play-next.svg',
	'/assets/img/play-prev.svg',
	'/list/pic/placeholder.png',

	// Fonts
	"https://fonts.googleapis.com/css?family=Bellota|Source+Code+Pro&display=swap",
	"https://fonts.gstatic.com/s/sourcecodepro/v11/HI_SiYsKILxRpg3hIP6sJ7fM7PqlOevWnsUnxlC9.woff2",
	"https://fonts.gstatic.com/s/sourcecodepro/v11/HI_SiYsKILxRpg3hIP6sJ7fM7PqlPevWnsUnxg.woff2",
	"https://fonts.gstatic.com/s/bellota/v1/MwQ2bhXl3_qEpiwAKJVbtUk9hbE.woff2",

	// Other
	'/manifest.json',
	'/list/cache.json',
	];

	event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(cache_list)));
});

self.addEventListener('activate', (event) => {
	self.clients.claim();
	console.log('Activated');
});

self.addEventListener('message', (event) => {
	return caches.open(CACHE).then(function (cache) {
		console.log('Cache Updated!');
		return cache.addAll(event.data.cache);
	});
})

self.addEventListener('fetch', (event) => {
	console.log('Sending Request');
	event.respondWith(fromNetwork(event.request, timeout)
		.catch((err) => {
			console.log('Loading From cache', event);
			return fromCache(event.request);
		}));
});

function fromCache(request) {
// Открываем наше хранилище кэша (CacheStorage API), выполняем поиск запрошенного ресурса.
// Обратите внимание, что в случае отсутствия соответствия значения Promise выполнится успешно, но со значением `undefined`
return caches.open(CACHE).then((cache) =>
	cache.match(request).then((matching) =>
		matching || Promise.reject('no-match')
		));
}

function fromNetwork(request, timeout) {
	return new Promise((fulfill, reject) => {
		var timeoutId = setTimeout(reject, timeout);
		fetch(request).then((response) => {
			clearTimeout(timeoutId);
			fulfill(response);
		}, reject);
	});
}

