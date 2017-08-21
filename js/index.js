$(function(){
	var pic_index = 0;
	var hot_index = 0;
	$('.qq-search input').on('focus',function(){
		$('.qq-search-list').slideDown();
	});
	$('.qq-search').on('click',function(event){
		var event = event || window.event;
		event.stopPropagation();
	})
	$(document).on('click',function(event){
		$('.qq-search-list').slideUp();
	});
	$('.qq-search').on('click',function(){
		$('.qq-search-list').show();
	})

	// 点击切换
	$('.btn-scroll-right').on('click',function(){
		pic_index = (pic_index + 1) % 4;
		$('.scroll-pics ul').css('transform','translateX(-' + pic_index * 25 + '%)');
		$('.scroll-index ul li').removeClass('active');
		$('.scroll-index ul li').eq(pic_index).addClass('active');
	})
	$('.btn-scroll-left').on('click',function(){
		pic_index = (pic_index + 3) % 4;
		$('.scroll-pics ul').css('transform','translateX(-' + pic_index * 25 + '%)');
		$('.scroll-index ul li').removeClass('active');
		$('.scroll-index ul li').eq(pic_index).addClass('active');
	})
	$('.scroll-index ul li').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		pic_index = $(this).index();
		$('.scroll-pics ul').css('transform','translateX(-' + pic_index * 25 + '%');
	})


	// 设置第二个轮播图的特效
	var scrollNext = $(".section-next-content ul li");
	var timer_scroll_next = null;
	var p1_index = 0;
	setIndex(0);
	// 设置自动轮播
	timer_scroll_next = setInterval(function(){
		p1_index = (p1_index + 7) % 8;
		setIndex(p1_index);
	},2000)
	$('.section-next-scroll ul li').on('click',function(){
		 var index = $(this).index();
		 p1_index = index;
		 setIndex(index);
	})
	// 自动轮播结束
	$('.section-next').on('mouseover',function(){
		clearInterval(timer_scroll_next);
	});
	$('.section-next').on('mouseout',function(){
		timer_scroll_next = setInterval(function(){
			p1_index = (p1_index + 7) % 8;
			setIndex(p1_index);
		},2000)
	});
	// 点击方向切换
	$('.btn-scroll-next-right').on('click',function(){
		p1_index = (p1_index + 7) % 8;
		setIndex(p1_index);
	})
	$('.btn-scroll-next-left').on('click',function(){
		p1_index = (p1_index + 1) % 8;
		setIndex(p1_index);
	});
	// 点击index切换
	$('.scroll-next-index ul li').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		p1_index = (8 - $(this).index()) % 8; 
		setIndex(p1_index);
	})



	// 热门歌单切换
	$('.btn-hot-sing-right').on('click',function(){
		hot_index = (hot_index + 1) % 3;
		$('.hot-sing-pics ul').css('transform','translateX(-' + hot_index * 1200 + 'px)');
		$('.hot-sing-index ul li').removeClass('active');
		$('.hot-sing-index ul li').eq(hot_index).addClass('active');
	})
	$('.btn-hot-sing-left').on('click',function(){
		hot_index = (hot_index + 2) % 3;
		$('.hot-sing-pics ul').css('transform','translateX(-' + hot_index * 1200 + 'px)');
		$('.hot-sing-index ul li').removeClass('active');
		$('.hot-sing-index ul li').eq(hot_index).addClass('active');
	});
	$('.hot-sing-index ul li').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		hot_index= $(this).index();
		$('.hot-sing-pics ul').css('transform','translateX(-' + hot_index * 1200 + 'px');
	})


	// 返回顶部的隐藏显示
	$(document).on('scroll',function(){
		if($(document).scrollTop() >= 200){
			$('.nav a:first').css('opacity','.5');
		}else{
			$('.nav a:first').css('opacity','0');
		}
	});

	function setIndex(index){
		$(scrollNext[index]).css({
			'z-index': '100',
			'transform' : 'translateX(0) scale(1.2)',
			'opacity': '1'
		});

		$(scrollNext[(index + 1) % 8]).css({'transform':'translateX(-295px) scale(1)','z-index':'90','opacity':'1'});
		$(scrollNext[(index + 2) % 8]).css({'transform':'translateX(-325px) scale(1)','z-index':'80','opacity':'0'});
		$(scrollNext[(index + 3) % 8]).css({'transform':'translateX(-355px) scale(1)','z-index':'70','opacity':'0'});

		$(scrollNext[(index + 7) % 8]).css({'transform':'translateX(295px) scale(1)','z-index':'90','opacity':'1'});
		$(scrollNext[(index + 6) % 8]).css({'transform':'translateX(325px) scale(1)','z-index':'80','opacity':'0'});
		$(scrollNext[(index + 5) % 8]).css({'transform':'translateX(355px) scale(1)','z-index':'70','opacity':'0'});
		$(scrollNext[(index + 4) % 8]).css({'transform':'translateX(385px) scale(1)','z-index':'60','opacity':'0'});
		$('.scroll-next-index ul li').removeClass('active');
		$('.scroll-next-index ul li').eq((8 - p1_index) % 8).addClass('active');
	}
})
function searchHistoryDel(_this){
	$(_this).closest('li').remove();
}
function searchHistoryClear(_this){
	$(_this).parent().next().empty();
}
