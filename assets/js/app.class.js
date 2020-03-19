let nPlayer = function(){
	// Cached list
	this.list = [];
	this.active = -1;
	
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
		$('audio').attr('src', item.filename);
		if($('.player').hasClass('hidden')){
			$('.player').removeClass('hidden');
		}
		$('audio')[0].play();
		$('section.list .container .item.active').removeClass('active').removeClass('playing')
		$('[data-id="'+this.active+'"]').addClass('active').addClass('playing')
	}

	this.togglePlaying = () => {
		let e = $('.player .play-pause');
		if($(e).hasClass('paused')){
			$(e).removeClass('paused');
			$('[data-id="'+this.active+'"]').addClass('active').addClass('playing')
			$('audio')[0].play();
		}else{
			$('[data-id="'+this.active+'"]').addClass('active').removeClass('playing')
			$(e).addClass('paused')
			$('audio')[0].pause();
		}
	}
}