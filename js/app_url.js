/*
* 无缓存引入css/js文件的插件
* Author:Nathan
* 注意:接入CDN时，要将randFlag设置为false，否则CDN会失效!
*/
var app_url = new function()
{
	this.randFlag = true;						// 为true时,自动产生随机数以清空缓存
}

/*
* A.引入文件
* parms:数据数组
*/
app_url.load = function(info)
{
	info = info?info:{};
	info.type = info.type?info.type:"js";
	info.path = info.path?info.path:"js/";
	info.data = info.data?info.data:[];

    var str;
    var rand;
	for(var i=0;i<info.data.length;i++)
	{
		rand = '';
		if(this.randFlag) rand = "?v" + Math.random();
		switch(info.type)
		{
			case "js":
			    str = '<' + 'script ' + 'src="' + info.path + info.data[i] +".js" + rand + '">' + '</' + 'script' + '>'	    
			break;

			case "css":
				str = '<link rel="stylesheet" type="text/css" href="'+info.path+ info.data[i] +'.css' + rand + '">';
			break;
		}

		document.write(str);
	}
}