$(function(){
	var music = $('#music')[0];
	// 播放歌曲的当前时间
	$(music).on('timeupdate',function(){
		$('.music-cur').html(timeFormat(music.currentTime));
		var radio = music.currentTime / music.duration;
		var distance = Math.floor(radio * $('.music-move-bar').width());
		$('.music-move').css('left',distance - 5);
		$('.music-progress').css('width',distance);
		for(var item in formatObj){
			var cur = Math.round(music.currentTime);
			if(item == cur){
				$('.music-lrc-move p[time=' + item + ']').addClass('lrc-active').siblings().removeClass();
				$('.big-lrc-move p[time=' + item + ']').addClass('big-lrc').siblings().removeClass();
				var index =$('.music-lrc-move p[time=' + item + ']').index();
				$('.music-lrc-move').css('transform','translateY(' + (30 - index * 30) + 'px)');
				$('.big-lrc-move').css('transform','translateY(' + (58 * 3 - index * 58) + 'px)');
			}
		};
	})
	// 判断是否结束
	$(music).on('ended',function(){
		$('.music-move').css('left',0);
		$('.music-progress').css('width',0);
		music.currentTime = 0;
		$('.player-list-display ul li:nth-child(2)').removeClass('icon-played');
		$('.player-play').css('background-position','0 0');
		$('.icon-playing').removeClass('icon-played');
		$('.player-list-display ul li:nth-child(2)').removeClass('icon-played');
		$('.music-lrc-move').css('transform','translateY(30px)');
		$('.music-lrc-move p').removeClass('lrc-active');
	})
	// 拖动进度条
	$('.music-move').on('click',function(){
		var offsetLeft = $('.music-bar').offset().left;
		$('.music-move').on('mousemove',function(e){
			var e = e || window.event;
		})
	});
	$('.music-bar').on('mousedown',function(e){
		var e = e || window.event;
		e.stopPropagation();
		$('.music-move').css('left',e.screenX - $('.music-bar').offset().left);
		$('.music-progress').css('width',e.screenX - $('.music-bar').offset().left);
		$('body').on('mousemove',function(e1){
			var e1 = e1 || window.evnet;
			$('.music-move').css('left',e1.screenX - $('.music-bar').offset().left);
			$('.music-progress').css('width',e1.screenX - $('.music-bar').offset().left);
		});
		$('body').on('mouseup',function(e2){
			var e2 = e2 || window.event;
			e2.stopPropagation();
			var radio = $('.music-progress').width() / $('.music-move-bar').width();
			music.currentTime = radio * music.duration;
			var cur = music.currentTime;
			var paras = $('.big-lrc-move p');
			for(var i = 0; i < paras.length; i++){
				if(cur > $(paras[i]).attr('time') && cur < $(paras[i+1]).attr('time')){
					$('.music-lrc-move p').eq(i).addClass('lrc-active').siblings().removeClass();
					$('.big-lrc-move p').eq(i).addClass('big-lrc').siblings().removeClass();
					$('.music-lrc-move').css('transform','translateY(' + (30 - i * 30) + 'px)');
					$('.big-lrc-move').css('transform','translateY(' + (58 * 3 - i * 58) + 'px)');
				}
			}
			$('body').unbind('mousemove');
			$('body').unbind('mouseup');
		});
	});

	// 歌曲播放/暂停
	$('.player-play').on('click',function(){
		if(music.paused){
			$('.music-duration').html('&nbsp;/&nbsp;' + timeFormat(music.duration));
			$('.player-play').css('background-position','-30px 0');
			music.play();
			$('.player-list-display ul li:nth-child(2)').addClass('icon-played');
			var timer = setInterval(function(){
				var title = $('title')[0].innerHTML;
				var temp = title.slice(0,1);
				var temp1 = title.slice(1,title.length);
				$('title')[0].innerHTML = temp1 + temp;
			},500)
		}else{
			music.pause();
			$('.player-play').css('background-position','0 0');
			$('.icon-playing').removeClass('icon-played');
			$('.player-list-display ul li:nth-child(2)').removeClass('icon-played');
		}
	});
	$('.player-list-display ul li>div p span:nth-child(1)').on('click',function(){
		if(music.paused){
			$('.music-duration').html('&nbsp;/&nbsp;' + timeFormat(music.duration));
			$('.player-play').css('background-position','-30px 0');
			music.play();
			$('.player-list-display ul li:nth-child(2)').addClass('icon-played');
		}else{
			music.pause();
			$('.player-play').css('background-position','0 0');
			$('.icon-playing').removeClass('icon-played');
			$('.player-list-display ul li:nth-child(2)').removeClass('icon-played');
		}
	});

	// 纯净模式的切换
	$('.player-change-lrc').on('click',function(){
		if($('.player-list').css('display') == 'none'){
			$('.player-big-lrc').hide();
			$('.player-list').show();
			$('.player-change-lrc').css('background-position','0 -282px');
		}else{
			$('.player-big-lrc').show();
			$('.player-list').hide();
			$('.player-change-lrc').css('background-position','0 -311px');
		}
	})


	// 将歌曲的描述转换格式
	function timeFormat(times){
		var minutes = Math.floor(times / 60);
		var seconds = Math.ceil(times % 60);
		if(minutes < 10){
			minutes = '0' + minutes;
		}
		if(seconds < 10){
			seconds = '0' + seconds;
		}
		return minutes + ':' + seconds;
	}
})