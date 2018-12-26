var main = new function()
{
	this.touch = {
		x:false,
		y:false,
		allow:true,
		time:650
	};

	this.click = {
		allow:true,
		time:500
	};

	this.touchSever = {
		time:120,
		last:0
	}

	this.touchData = {x:0,y:0}
	this.touchAllow = true;
	this.ios = 1;
	this.handDir = new remTools.handDir();
	this.total = 8;
	this.qn = 1;
	this.allow = true;
	this.c1;
	this.c2;
	this.c3;
	this.jk = [3,7,9,10];						// 健康的题号
	this.logos = [1,6,8,31];

	// 海报结果
	this.result;

	// 城市
	this.city;

	// 天气
	this.tianqi;

	// 指数
	this.zs;

	// 温度
	this.wd;

	// 天气现象
	this.xx;
}

/* --------------------------------------- INIT ----------------------------------------- */

// 0.初始化
main.init = function()
{
	this.ios = this.browser();

	// ------------------- 初始化8道题 -------------------

	// 常规6题 
	var arr = [];
	for(var i=1;i<=32;i++)
	{
		var flag = true;
		for(var j=0;j<this.jk.length;j++)
		{
			if(i==this.jk[j])
			{
				flag = false;
			}
		}

		for(var j=0;j<this.logos.length;j++)
		{
			if(i==this.logos[j])
			{
				flag = false;
			}
		}
		if(flag) arr.push(i);
	}

	arr = this.random_arr(arr);
	arr = this.random_arr(arr);
	arr = this.random_arr(arr);

	// 健康随机
	this.jk = this.random_arr(this.jk);
	this.jk = this.random_arr(this.jk);
	this.jk = this.random_arr(this.jk);

	// logos随机
	this.logos = this.random_arr(this.logos);
	this.logos = this.random_arr(this.logos);
	this.logos = this.random_arr(this.logos);

	// 产出8道题
	var tms = [
		arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],
		this.jk[0],
		this.logos[0]
	]
	tms = this.random_arr(tms);
	tms = this.random_arr(tms);
	tms = this.random_arr(tms);

	// ------------------- 初始化questions ------------------- 
	var str = "";
	for(var i=1;i<=this.total;i++)
	{
		str = '<div id="q'+i+'" class="main hide">'+
            '<img src="images/q'+tms[i-1]+'_a.png" class="qn_a" id="q'+i+'_a" />'+
            '<img src="images/q'+tms[i-1]+'_b.png" class="qn_b" id="q'+i+'_b" />'+
            '<img src="images/q'+tms[i-1]+'_head.png" class="qn_head" center />'+
            '<div class="qn_btn_a touch"></div>'+
            '<div class="qn_btn_b touch"></div>'+              
        '</div>';
        $("#questions").append(str);
	}

	$(".qn_btn_a").bind("touchend",function()
	{
		main.answer("a");
	})

	$(".qn_btn_b").bind("touchend",function()
	{
		main.answer("b");
	})

	// ------------------- 随机结果 ------------------- 
	this.result = this.rand(1,14);
	var resultStr = '<img src="images/r'+this.result+'s_1.png" id="rns_1" class="r1s_1 move_from_up_short" center />'+
        '<img src="images/r'+this.result+'s_pic.png" id="rns_pic" class="r1s_pic move_from_up_short" center />'+
        '<img src="images/r'+this.result+'s_2.png" id="rns_2" class="r1s_2 move_from_down_short" center />'+
        '<img src="images/rs_bottom1.png" id="rs_bottom1" class="rs_bottom1 move_from_down_short" noauto="noauto" />'+ 
        '<img src="images/rs_bottom2.png" id="rs_bottom2" class="rs_bottom2 op0" />'+    	
    	'<img src="images/music.png" class="op0" id="result_hb" noauto="noauto" style="width:7.5rem;height:13.35rem;left:0;top:0;" />'+
    	'<div class="hb_link touch" onClick="{stm_clicki("send", "event","html5-2018-q4","html5-2018-q4","html5-2018-q4")};ga("send", "vent", "html5-2018-q4","html5-2018-q4","html5-2018-q4");"></div>';
    $("#hb").append(resultStr);
	$(".hb_link").bind("touchstart",function()
	{
		window.location.href = "https://m.manyanshuning.com.cn/";
	})	

	// hb标配数据
	var _height = $(window).height()/(setSize.size/100);
	if(_height >= 1250)
	{
		$("#hb").css("height","12.5rem");
	}
	else
	{
		$("#hb").css("height","100%");
	}
	$(window).bind("resize",function()
	{
		var _height = $(window).height()/(setSize.size/100);
		if(_height >= 1250)
		{
			$("#hb").css("height","12.5rem");
		}
		else
		{
			$("#hb").css("height","100%");
		}		
	})
}

// 1.load
main.load = function()
{
	setTimeout(function()
	{
		main.page1();
	},2000)
}

// 2.首页
main.page1 = function()
{
	this.o("#load");
	this.f("#index");
	this.f(".index_tiao2");
	this.f(".index_tiao1",100);
	this.f(".index_main",100);
	this.f(".index_yuan",600);
	this.f(".index_btn1",1400);
	this.f(".index_btn2",1500);
	this.cc(".index_btn1","move_from_down_TOTO","star_scale",2150);
	this.cc(".index_btn2","move_from_down_TOTO","star_scale",2250);
}

// 3.进入答题页
main.q = function()
{
	this.o("#index");
	this.f("#questions");
	this.f("#arrow_ts");
	this.f("#q1");
	this.djs(true);
	// this.f("#djs");
}

main.djs = function(type)
{
	if(!type) return;
	clearTimeout(this.c1);
	clearTimeout(this.c2);
	clearTimeout(this.c3);
	this.f("#djs");
	for(var i=1;i<=3;i++) $(".q_"+i).hide();
	$(".q_3").show();

	// 倒计时
	this.c1 = setTimeout(function()
	{
		$(".q_3").hide();
		$(".q_2").show();
	},800)

	this.c2 = setTimeout(function()
	{
		$(".q_2").hide();
		$(".q_1").show();
	},1600)

	this.c3 = setTimeout(function()
	{
		$(".q_1").hide();
		// main.answer("none");
		main.o("#arrow_ts");
	},2400)	
}

// 4.答题
main.answer = function(type)
{
	// 许可证
	if(!this.allow) return false;
	this.allow = false;

	// 当前题目动画
	this.o("#djs");
	var _obj = $(".qn_"+type);
	if(type == "a")
	_obj.addClass("card_left");
	else if(type == "b")
	_obj.addClass("card_right");

	// 进入下一题
	setTimeout(function()
	{
		remTools.removeClass($("#q"+main.qn));
		if(main.qn < main.total)
		{
			$("#q"+main.qn).fadeOut(500);//.addClass("move_to_up_quick");
			main.qn++;
			main.f("#q"+main.qn,500);
		}
		else
		{
			main.o("#questions");
			main.hb();
		}
	},500)

	setTimeout(function()
	{
		remTools.removeClass(_obj);
		main.djs();
		main.allow = true;
	},1000)
}

// 5.进入海报
main.hb = function()
{
	this.o("#index");
	this.o("#questions");
	this.f("#savets");
	$("#djs").remove();
	setTimeout(function()
	{
		main.o("#savets");
		main.f("#hb");
		main.f("#savetts");
		setTimeout(function()
		{
			main.o("#savetts");
		},3000)		
	},3500)

	this.draw();
}

// 6.绘制海报
main.draw = function()
{
	var obj = new remTools.editHB("canvas",750,1335);
	obj.CD({
		id:"r_bg",left:0,top:0,width:750,height:1335
	})

	obj.CD({
		id:"rns_1",left:38,top:8
	})

	obj.CD({
		id:"rns_pic",left:143,top:153
	})

	// 图片尺寸
	var img = new Image();
	var url = $("#rns_2").attr("src");
	img.src = url;
	img.onload = function()
	{
		obj.CD({
			id:"rns_2",left:(750-this.width)/2,top:1335-this.height-226,
			sw:this.width,sh:this.height,
			width:this.width,height:this.height,
			sfromObj:false
		})

		// bottom1-2
		obj.CD({
			id:"rs_bottom1",left:22,top:1335-233-10
		})

		obj.CD({
			id:"rs_bottom2",left:750-232,top:1335-381-17
		})

		// 保存
		var data = obj.output("png");;
		$("#result_hb").attr("src",data);
	}
}

// 7.获取地理与天气信息
main.getTQData = function(callback)
{
	this.getLocation(callback);
}

// 8.获取地理位置
main.getLocation = function(callback)
{
  var map = new BMap.Map("allmap");
/*
  var point = new BMap.Point(116.331398,39.897445);
  map.centerAndZoom(point,12);
*/

  var geolocation = new BMap.Geolocation();
  var gc = new BMap.Geocoder();

  geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
      var mk = new BMap.Marker(r.point);
      
      // 获取经纬度
      map.addOverlay(mk);
      map.panTo(r.point);

      // console.log('您的位置：'+r.point.lng+','+r.point.lat);

      // 获取城市
      gc.getLocation(r.point, function(rs){    
          var addComp = rs.addressComponents;

          // 城市
          addComp.city = addComp.city.replace("市","");
          main.city = addComp.city;

          // 获取城市代码
          var code = main.getCityCode(main.city);
          main.getTQ(code,callback);
          // alert('您所在城市'+main.city);
          // console.log(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);    
      })
    }
    else {
      alert('failed'+this.getStatus());
    } 
  })  
}

// 9.获取天气
main.getTQ = function(city,callback)
{
  city = city?city:'101110101';
  var key = 'c959575e511cc66995615e38038ab59a';
  var str = "http://api.weatherdt.com/common/?area="+city+"&type=forecast|observe|index|air|index&key="+key;

  // 使用jsonp避开跨域问题
  $.ajax({
    url:str,
    type:"get",
    dataType:"jsonp",   
    success:function(res)
    {
      console.log(res);
      var data = {}

      // 获取空气质量
      data.air = parseInt(res.air[city]['2001006']['002']);

      // 湿度
      data.sd = parseInt(res.observe[city]['1001002']['005']);

      // 温度
      data.wd = parseInt(res.observe[city]['1001002']['002']);
      main.wd = data.wd;

      // 温差
      var wxData = res.forecast['24h'][city]['1001001'][0];
      data.wx = parseInt(wxData['003']) - parseInt(wxData['004']);

      // 现象
      main.xx = main.xianxiang(wxData['001']);
      // alert("air:"+data.air+" 湿度:"+data.sd+" 温度:"+data.wd+" 温差:"+data.wx+" 现象:"+main.xx);

      // 开始算得分
      var kongqi,wendu,wencha,shidu;

      // 空气
      if(data.air<50) kongqi=0;
      else if(data.air<100) kongqi=3;
      else if(data.air<150) kongqi=5;
      else if(data.air<200) kongqi=7;
      else if(data.air<300) kongqi=8;
      else if(data.air<=500) kongqi=10;

      // 温度
      if(data.wd<-30) wendu=10;
      else if(data.wd<-10) wendu=7.5;
      else if(data.wd<10) wendu=5;
      else if(data.wd<20) wendu=2;
      else if(data.wd<30) wendu=0;
      else if(data.wd<35) wendu=6;
      else if(data.wd>=35) wendu=10;

      // 温差
      if(data.wx<5) wencha=0;
      else if(data.wx<10) wencha=1;
      else if(data.wx<15) wencha=2.5;
      else if(data.wx<20) wencha=4;
      else if(data.wx<25) wencha=7.5;
      else if(data.wx>=25) wencha=10;

      // 湿度
      if(data.sd<30) shidu=10;
      else if(data.sd<50) shidu=6;
      else if(data.sd<70) shidu=4;
      else if(data.sd<90) shidu=2;
      else if(data.sd<=100) shidu=0;

      main.zs = parseInt((kongqi*0.4+wendu*0.1+wencha*0.2+shidu*0.2)*50); 

      // show
      $(".savets_wendu").html(main.wd+"℃ "+main.xx);
      $(".savets_zs").html(main.zs);
      if(main.zs<=100) $("#save_shiyi").show();
      else if(main.zs<=200) $("#save_qingdu").show();
      else if(main.zs<=300) $("#save_zhongdu").show();
      else if(main.zs<=400) $("#save_zhongduzhongdu").show();
      else if(main.zs<=500) $("#save_yanzhong").show();
      if(callback) callback();
    }
  })
}

// 10.根据城市获取代码
main.getCityCode = function(city)
{
  for(var i=0;i<citys.length;i++)
  {
    if(citys[i].city == city)
    {
      return citys[i].id;
    }
  }

  return false;	
}

// 11.天气现象表
main.xianxiang = function(code)
{
	switch(code)
	{
		case "00":
			return "晴";
		break;

		case "01":
			return "多云";
		break;

		case "02":
			return "阴";
		break;		

		case "03":
			return "阵雨";
		break;

		case "04":
			return "雷阵雨";
		break;

		case "05":
			return "雷阵雨伴有冰雹";
		break;	

		case "06":
			return "雨夹雪";
		break;

		case "07":
			return "小雨";
		break;

		case "08":
			return "中雨";
		break;			

		case "09":
			return "大雨";
		break;

		case "10":
			return "暴雨";
		break;

		case "11":
			return "大暴雨";
		break;		

		case "12":
			return "特大暴雨";
		break;

		case "13":
			return "阵雪";
		break;

		case "14":
			return "小雪";
		break;	

		case "15":
			return "中雪";
		break;

		case "16":
			return "大雪";
		break;

		case "17":
			return "暴雪";
		break;

		case "18":
			return "雾";
		break;

		case "19":
			return "冻雨";
		break;		

		case "20":
			return "沙尘暴";
		break;

		case "21":
			return "小到中雨";
		break;

		case "22":
			return "中到大雨";
		break;	

		case "23":
			return "大到暴雨";
		break;

		case "24":
			return "暴雨到大暴雨";
		break;

		case "25":
			return "大暴雨到特大暴雨";
		break;

		case "26":
			return "小到中雪";
		break;

		case "27":
			return "中到大雪";
		break;

		case "28":
			return "大到暴雪";
		break;

		case "29":
			return "浮尘";
		break;	

		case "30":
			return "扬沙";
		break;

		case "31":
			return "强沙尘暴";
		break;

		case "53":
			return "霾";
		break;

		case "99":
			return "无";
		break;

		case "32":
			return "浓雾";
		break;

		case "49":
			return "强浓雾";
		break;		

		case "54":
			return "中度霾";
		break;

		case "55":
			return "重度霾";
		break;	

		case "56":
			return "严重霾";
		break;

		case "57":
			return "大雾";
		break;

		case "58":
			return "特强浓雾";
		break;

		case "301":
			return "雨";
		break;		

		case "302":
			return "雪";
		break;	
	}
}

/* --------------------------------------- 常用方法 ----------------------------------------- */

main.f = function(flag,time,effect)
{
	flag = flag?flag:"body";
	time = time?time:10;
	effect = effect?effect:500;
	setTimeout(function()
	{
		$(flag).fadeIn(effect);
	},time);
}

main.o = function(flag,time,effect)
{
	flag = flag?flag:"body";
	time = time?time:10;
	effect = effect?effect:500;
	setTimeout(function()
	{
		$(flag).fadeOut(effect);
	},time);
}

main.playByWx = function()
{	
	document.addEventListener("WeixinJSBridgeReady",function()
	{
		var videos = $("audio");
		for(var i=0;i<videos.length;i++)
		{
			videos[i].play();
			videos[i].pause();
		}
	    main.g("music").play();
	},false);	
}

main.playByWxAgain = function(id)
{
	var _music = this.g(id);
	_music.currentTime = 0;
	if(typeof WeixinJSBridge != "undefined")
	{
		WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
			_music.play();
		});
	}
	else
	{
		_music.play();
	}
}

main.now = (Date.now || function ()
{
    return new Date().getTime();
});

main.g = function(id)
{
	return document.getElementById(id);
}

main.t = function(name,time,cn)
{
	setTimeout(function()
	{
		$(name).show().addClass(cn);
	},time);
}

main.cc = function(name,classA,classB,time)
{
	time = time?time:0;
	setTimeout(function()
	{
		$(name).removeClass(classA).addClass(classB);
	},time);
}

main.rand = function(min,max)
{
	return ~~((Math.random()*(max-min+1))+min);		
}

main.random_arr = function(arr)
{
	arr.sort(function(){ return 0.5 - Math.random() });
	return arr;
}

main.cp = function(obj)
{
	obj = $(obj).removeClass("move_to_left_page").removeClass("move_from_left_page").
				removeClass("move_to_right_page").removeClass("move_from_right_page").
				removeClass("move_to_up_page").removeClass("move_from_up_page").
				removeClass("move_to_down_page").removeClass("move_from_down_page");
	return obj;
}

// 手机号验证
main.checkMobile = function(sMobile)
{
    if(!(/^1[3|4|5|6|7|8][0-9]\d{8}$/.test(sMobile)))
    {
        return false;
    }
    else
    {
        return true;
    }
}

// 邮箱
main.checkEmail = function(email)
{
	if (email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
	{
		return true;
	}
	else
	{
		return false;
	}	
}

// 身份证
main.checkSFZ = function(sfz)
{
    var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
    if(reg.test(sfz))
    {
        return true;
    }
    else
    {
        return false;
    }
}

main.isClick = function(event)
{
	if(this.now() - this.touchSever.last < this.touchSever.time)
	{		
		if(
			Math.abs(this.touchData.x - event.originalEvent.changedTouches[0].pageX)< 10 &&
			Math.abs(this.touchData.y - event.originalEvent.changedTouches[0].pageY)< 10
		)
		{
			return true;
		}	
	}

	return false;
}

main.UrlSearch = function() 
{
   var name,value; 
   var str=location.href; //取得整个地址栏
   var num=str.indexOf("?") 
   str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

   var arr=str.split("&"); //各个参数放到数组里
   for(var i=0;i < arr.length;i++){ 
    num=arr[i].indexOf("="); 
    if(num>0){ 
     name=arr[i].substring(0,num);
     value=arr[i].substr(num+1);
     this[name]=value;
     } 
    }
}

// 地址参数获取
main.GetQueryString = function(name)
{
	var urlParms = new this.UrlSearch();
	if(name)
	{
		return urlParms.name;
	}
	else
	{
		return urlParms;
	}
}

// 手指信息
main.getTP = function(event)
{
	return {
		x:event.originalEvent.changedTouches[0].pageX,
		y:event.originalEvent.changedTouches[0].pageY
	}
}

// 授权地址
main.getWXD = function(url,jm,state)
{
	url = url?url:"http://www.baidu.com";
	jm = typeof(jm) === "boolean"?jm:true;
	state = state?state:"";						// 参考&info=1&openid=x

	url = encodeURIComponent(url);
	var _wx = "http://wechat.healen.cn/WeChat1/index.php/Index/webInfoPlus?rurl=";
	var _url = _wx+url;
	if(jm) _url+="&type=0";
	_url += state;
	console.log(_url);
}

// 浏览器
main.browser = function()
{
	var browser = {
	versions: function () {
	var u = navigator.userAgent, app = navigator.appVersion;
	return { //移动终端浏览器版本信息 
	ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
	android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器 
	iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 
	iPad: u.indexOf('iPad') > -1, //是否iPad 
	};
	}(),
	}
	if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
	return 1;
	}
	if (browser.versions.android) {
	return 0;
	}
}

// 获取当前日期
main.getDate = function()
{
	var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;	
    return currentdate;	
}

// 监测接口
main.count = function(type)
{
	$.ajax({
		url:"http://h5.healen.cn/API/index.php/Count/index/type/"+type,
		type:"get"
	})	
}