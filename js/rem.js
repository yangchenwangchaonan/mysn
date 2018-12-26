var setSize = new function()
{
	this.height;
	this.width;
	this.size;
	this.pixel = {x:750,y:1335};			// 分辨率
	this.debug = true;
	this.init = function()
	{
	    this.width = $(window).width();
	    this.height = $(window).height();
	    if(this.width<this.height)
	    {
	    	// 竖屏
	    	if(!this.debug)
	    	{
	    		if(window.orientation == 0 || window.orientation == 180) this.size = (this.width/this.pixel.x)*100;
	    	}
	    	else
	    	{
	    		this.size = (this.width/this.pixel.x)*100;
	    	}   	
	    }
	    else
	    {
	    	if(!this.debug)
	    	{
	    		if(window.orientation == 90 || window.orientation == -90) this.size = (this.width/this.pixel.y)*100;
	    	}
	    	else
	    	{
	    		this.size = (this.width/this.pixel.y)*100;
	    	}
	    	
	    }

	    // 仅在pc上才需要
	    // if(this.size<50) this.size=50;
	    // if(this.size>100) this.size=100;
	    document.documentElement.style.fontSize = this.size + 'px';
	}

	this.init();
	//this.debug = false;
	window.onresize = function()
	{
	    setSize.init();  
	}
};