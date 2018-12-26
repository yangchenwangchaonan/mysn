$(".index_btn1").bind("touchstart",function()
{
	main.q();
})

$(".index_btn2").bind("touchstart",function()
{
	main.hb();
})

$("#arrow_ts").bind("touchstart",function()
{
	$(this).fadeOut(300);
	main.djs();
})

$("#questions").bind("touchmove",function(event)
{
	var dir = main.handDir.getDir(event);
	if(dir == 3)
	{
		main.answer("a");
	}
	else if(dir == 4)
	{
		main.answer("b");
	}
})

$("#savetts").bind("touchstart",function()
{
	$(this).fadeOut(500);
	setTimeout(function()
	{
		$("#savetts").remove();
	},500)
})

/*--------------------------------------- DEFAULT -----------------------------------------*/

// 	event.preventDefault();
//	event.stopPropagation();

$(".music").bind("touchstart",function()
{
	var music = main.g("music");
	if(music.paused)
	{
		music.play();
		$(".music").removeClass("music_a").addClass("music_a");
	}
	else
	{
		music.pause();
		$(".music").removeClass("music_a");
	}
});

$(window).bind("touchstart",function(event)
{
	if(main.click.allow)
	{
		main.click.allow = false;
		setTimeout(function()
		{
			main.click.allow = true;
		},main.click.time)
	}

	main.touchSever.last = main.now();
	main.touchData.x = event.originalEvent.changedTouches[0].pageX;
	main.touchData.y = event.originalEvent.changedTouches[0].pageY;	
});

// 更好的锁页方式详见主页注释第10点
document.addEventListener("touchmove",function(e)
{
	if(main.touchAllow)
	{
		e.preventDefault();
	}
},{passive:false})

$(window).bind("touchend",function(event)
{
	main.handDir.reHandTouch();
	if(main.isClick(event))
	{
		// console.log('点击!');
	}
});

$(window).bind( 'orientationchange', function(e)
{
	if (window.orientation == 0 || window.orientation == 180) 
	{
		$("#hp").hide();
	}
	else if (window.orientation == 90 || window.orientation == -90) 
	{			
		$("#hp").show();
	}
});