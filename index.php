<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<title>nPlayer</title>
	<link href="https://fonts.googleapis.com/css?family=Bellota|Source+Code+Pro&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="./assets/css/main.min.css">
	<link rel="manifest" href="./manifest.json">
	<link rel="shortcut icon" type="image/png" href="./list/pic/placeholder.png">
</head>
<body>
	<nav>Nazarko's Music</nav>

	<section class="player hidden">
		<div class="image">
			<img src="./list/pic/placeholder.png" alt="Cover">
		</div>
		<div class="title">Title</div>
		<div class="artist">Artist</div>
		<div class="seekbar">
			<input type="range" step="1" min="0" max="0">
		</div>
		<div class="controls">
			<div class="flex">
				<div class="prev">
					<img src="assets/img/play-prev.svg" alt="">
				</div>
				<div class="play-pause" onclick="app.togglePlaying(this)"></div>
				<div class="next">
					<img src="assets/img/play-next.svg" alt="">
				</div>
			</div>
		</div>
	</section>

	<section class="list">
		<div class="container"></div>
	</section>
	
	<script src="./assets/js/jquery.min.js"></script>
	<script src="./assets/js/app.class.js"></script>
	<script src="./assets/js/player.js"></script>

</body>
</html>