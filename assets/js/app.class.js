let nPlayer = function(){
	// Cached list
	this.list = [];
	this.active = -1;
	this.seeking = false;
	this.seeking_value = 0;
	
	// Fetch list
	this.fetch_list = () => {
		self = this;
		$.get('../../list/cache.json', function(r){
			let res = "";
			let list = [];
			$(r).each((i,r) => {
				let title = r.filename.replace('./list/', '').replace('.mp3', '').replace('.m4a', '');
				let artist = "";
				let picture = "./list/pic/placeholder.png";

				if(r.hasOwnProperty('title')){
					title = r.title
				}

				if(r.hasOwnProperty('artist')){
					artist = r.artist
				}

				if(r.hasOwnProperty('picture')){
					picture = r.picture.url;
				}

				list[i] = {
					title: title,
					artist: artist,
					picture: picture,
					filename: r.filename,
				}

				res += '<div class="item" data-id="'+i+'"><div class="image"><img src="'+picture+'" alt="Image Cover"></div><div class="title">'+title+'</div><div class="artist">'+artist+'</div></div>'
			});
			window.PLAYLIST = list;
			$('section.list .container').html(res);

			$('section.list .container .item').on('click', function(){
				if(parseInt($(this).data('id')) == self.active){
					return self.togglePlaying();
				}
				self.activate_item($(this).data('id'));
			})
		});
	}

	this.activate_item = id => {
		this.active = id;
		let item = PLAYLIST[parseInt(id)];
		$('.player .title').text(item.title);
		$('.player .artist').text(item.artist);
		$('.player .image img').attr('src', item.picture);
		this.player.src = item.filename;
		if($('.player').hasClass('hidden')){
			$('.player').removeClass('hidden');
		}
		this.player.play();
		$('section.list .container .item.active').removeClass('active').removeClass('playing')
		$('[data-id="'+this.active+'"]').addClass('active').addClass('playing')
	}

	this.togglePlaying = () => {
		let e = $('.player .play-pause');
		if($(e).hasClass('paused')){
			$(e).removeClass('paused');
			$('[data-id="'+this.active+'"]').addClass('active').addClass('playing')
			this.player.play();
		}else{
			$('[data-id="'+this.active+'"]').addClass('active').removeClass('playing')
			$(e).addClass('paused')
			this.player.pause();
		}
	}

	this.player = new Audio();

	let self = this;

	$(this.player).on('loadstart', function () {
		$('.seekbar input').attr('max', window.innerWidth * 2);
		$('.seekbar input').attr('step', '1');
		$('.seekbar input').attr('min', '0');
		$('.seekbar input').val('0');
	})

	$(this.player).on('timeupdate', function () {
		if(!self.seeking){
			$('.seekbar input').attr('max', window.innerWidth * 2);
			$('.seekbar input').attr('step', '1');
			$('.seekbar input').attr('min', '0');
			$('.seekbar input').val('0');
			$('.seekbar input').val(Math.trunc((app.player.currentTime / app.player.duration) * window.innerWidth * 2));
		}
	})

	$('.seekbar input').on('touchstart mousedown', function () {
		self.seeking = true;
	})

	$('.seekbar input').on('touchend mouseup', function () {
		self.seeking = false;
		self.player.currentTime = Math.trunc((self.seeking_value / (window.innerWidth * 2)) * app.player.duration);
	})

	$('.seekbar input').on('input', function () {
		if(self.seeking){
			self.seeking_value = this.value
		}
	})
}