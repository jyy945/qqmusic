$(function(){
	  var htmlobj=$.ajax({url:"yly.lrc",async:false});
  	var arr_lrc = htmlobj.responseText.split('\n');
  	arr_lrc.forEach(function(item){
  		var ext = /\[\d+:\d+(:\d+|\.\d+)*\]/g;
  		var times = item.match(ext);
  		var lrc = item.replace(ext,'');
  		if(times){
	  		times.forEach(function(items){
	  			var minutes = Number(String(items.match(/\[\d*/i)).slice(1));
	  			var seconds =Number(String(items.match(/:\d*/i)).slice(1));
	  			var time = minutes * 60 + seconds;
	  			formatObj[time] = lrc; 
	  		});
  		}else{
        if(item.match(/\[ti:/)){
          singDetail['sing'] = /\[ti:(.*)\]/.exec(item)[1] == '' ? '未知' : /\[ti:(.*)\]/.exec(item)[1];
        }
        if(item.match(/\[ar:/)){
          singDetail['singer'] = /\[ar:(.*)\]/.exec(item)[1] == '' ? '未知' : /\[ar:(.*)\]/.exec(item)[1];
        }
        if(item.match(/\[al:/)){
          singDetail['album'] = /\[al:(.*)\]/.exec(item)[1] == '' ? '未知' : /\[al:(.*)\]/.exec(item)[1];
        }
        if(item.match(/\[t_time:/)){
          singDetail['time'] = /\[t_time:\((.*)\)\]/.exec(item)[1];
        }
      }
  	});
  	for(var i in formatObj){
  		var p = $('<p>');
      var p1 = $('<p>');
      $(p).html(formatObj[i]).attr('time',i);
  		$(p1).html(formatObj[i]).attr('time',i);
  		$('.music-lrc-move').append(p);
      $('.big-lrc-move').append(p1);
  	}
    $('.music-sing-name').html(singDetail['sing']);
    $('.music-singer-name').html(singDetail['singer']);
    $('.music-sing-album').html(singDetail['album']);
    $('.music-time-width').html(singDetail['time']);
})