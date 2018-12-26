// document.write("<script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>");

var jsApiList = [
    'checkJsApi',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'getLocation',						// 获取当前物理坐标
    'openLocation',						// 打开地图
    'scanQRCode', 						// 二维码扫一扫,列表中的其实都是函数名
    // 'openAddress',                      // 开启共享收货地址	jssdk >= 1.1.0
    // 'hideMenuItems',						// 关闭分享按钮等接口
]

// 分享兼容 - 判断是否为6.72及以上版本
var isNew = false;
var ua = window.navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) == 'micromessenger')
{
	var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i)
	var wechatVersion = wechatInfo[1].split(".");
	var changeVersion = parseInt(wechatVersion[0]) + parseInt(wechatVersion[1])/10 + parseInt(wechatVersion[2])/100;
	if(changeVersion > 6.71)
	{
		isNew = true;
		jsApiList.push("updateAppMessageShareData");
		jsApiList.push("updateTimelineShareData");
	}
	else
	{
		isNew = false;
	}
}

// 目前仍推荐使用1.1.0 JSSDK
var isNew = false;

/**
 * Created by Administrator on 15-1-14.
 */
var wxShare = {
    init : function (options){
	    
	    var setting = {
	        debug: false,
	        appId: '',
	        timestamp: '',
	        nonceStr: '',
	        signature: '',
	        jsApiList: jsApiList,
	        statistics: false
	    };
	   
	    $.post("http://wechat.healen.cn/share/share.php", {path : window.location.host, url : window.location.href}, function(data){
		    setting.appId = data.appId;
		    setting.nonceStr = data.nonceStr;
		    setting.timestamp = data.timestamp;
		    setting.signature = data.signature;
		    setting.statistics = options.statistics ? options.statistics : false;
	        //alert("分享确认");
	        wx.config({
	            debug: setting.debug,
	            appId: setting.appId,
	            timestamp: setting.timestamp,
	            nonceStr: setting.nonceStr,
	            signature: setting.signature,
	            jsApiList: setting.jsApiList
	        });
	
	        wx.ready(function () {
	            wx.checkJsApi({
	                jsApiList: jsApiList,
	                success: function (res) {
	                    //alert(JSON.stringify(res));
	                }
	            });
	
	            var shareObj = {
	                title : options.title,
	                desc : options.desc,
	                link : options.link,
	                imgUrl : options.imgUrl,
	                success: function (res) {
	                    if (setting.statistics)
	                    {
		                    $.post("http://wechat.healen.cn/share/?type=addShareCount&path="+window.location.host+"&inctype=0", {},function(){});
	                    }
	                }	            
	            };
	            
	            var linetitle = options.linetitle ? options.linetitle : options.title;
	            
	            var shareLine = {
	                title : linetitle,
	                link : options.link,
	                imgUrl : options.imgUrl,
	                success: function (res) {
	                    if (setting.statistics)
	                    {
		                    $.post("http://wechat.healen.cn/share/?type=addShareCount&path="+window.location.host+"&inctype=1", {},function(){});
	                    }
	                }	            
	            };

	            if(isNew)
	            {
	            	// 新版本分享

		            // 分享朋友
		            wx.updateAppMessageShareData(shareObj,function()
		            {
		            	// alert("success - to朋友");	// 回调未见生效
		            })

		            // 分享朋友圈
		            wx.updateTimelineShareData(shareObj,function()
		            {
		            	// alert("success - to朋友圈");	// 回调未见生效
		            })		            
	            }
	            else
	            {
	            	// 旧版本分享

		            // 分享朋友
		            wx.onMenuShareAppMessage(shareObj);	  

		            // 分享朋友圈
		            wx.onMenuShareTimeline(shareLine);		                      	
	            }
	
	            //分享到qq
	            wx.onMenuShareQQ(shareObj);
	
	            //分享到腾讯微博
	            wx.onMenuShareWeibo(shareObj);
	        });
	
	        wx.error(function(res){
		        
	        });
	    }, "json");
    }
}
