
/*
---------画饼图小插件--------------
 */
//----用法----
// var data = [{title : 'Chrome',data : 1000},{title : 'IE',data : 2000},
// 			{title : 'FF',data : 800},{title : 'Safari',data : 500},
// 			{title : '浏览器',data : 100}];

// 	Drawcookies("#cas",data,{
// 			radius:90,  //半径设置
// 			font:"20px 宋体"  //字体设置
// 		})	
function Drawcookies(selector,data,options){
	return new Drawcookies.prototype.init(selector,data,options);
}
Drawcookies.prototype={
	constructor:Drawcookies,
	init:function(selector,data,options){
		this.cas=document.querySelector(selector);
		this.options=options||{};
		this.ctx=this.cas.getContext('2d');
		//开始角度设置
		this.startAngle = 0;
		//圆心坐标
		this.x = this.ctx.canvas.width/2;
		this.y = this.ctx.canvas.height/2;
		//半径设置
		this.options.radius=this.options.radius||100;
		this.radius=this.options.radius;
		// 数据标题线条长度
		this.titleLen = this.radius+20;
		//字体设置
		this.options.font=this.options.font||"30px 微软雅黑";
		this.ctx.font=this.options.font;
		this.inits(data)
	}
}
Drawcookies.fn=Drawcookies.prototype.init.prototype;
Drawcookies.fn.inits=function(data){
	this.translateData(data);
	this.drawCookie(data);
}
// 计算数据总量
Drawcookies.fn.sum = function(data){
	var total = 0;
	data.forEach(function(item){
		total += item.data;
	});
	return total;
}
// 数据转换
Drawcookies.fn.translateData = function(data){
	var that = this;
	var total = this.sum(data);
	data.forEach(function(item){
		var rate = item.data/total;  //占比
		item.data = 2*Math.PI*rate;  //把数据转换成弧度
	});
}
// 生成随机颜色
Drawcookies.fn.randomColor = function(){
	var r = parseInt(255 * Math.random());
	var g = parseInt(255 * Math.random());
	var b = parseInt(255 * Math.random());
	return 'rgb('+r+','+g+','+b+')';
}
// 绘制饼图
Drawcookies.fn.drawCookie = function(data){
	var that = this;
	data.forEach(function(item,index){
		setTimeout(function(){
			// 填充饼图
			that.ctx.beginPath();
			//设立随机颜色
			var color = that.randomColor();
			that.ctx.fillStyle = color;
			that.ctx.strokeStyle = color;
			//设立移动，画圆
			that.ctx.moveTo(that.x,that.y);
			that.ctx.arc(that.x,that.y,that.radius,that.startAngle,that.startAngle+item.data);
			that.startAngle += item.data;
			that.ctx.fill();

	        // 绘制斜线
	        that.ctx.moveTo(that.x,that.y);
	        var xLen = that.titleLen * Math.cos(that.startAngle - item.data/2);
	        var yLen = that.titleLen * Math.sin(that.startAngle - item.data/2);
	        
	        var xAxis = that.x + xLen;
	        var yAxis = that.y + yLen;
	        that.ctx.lineTo(xAxis,yAxis);

	        // 绘制文字下划线和文字信息
	        var width = that.ctx.measureText(item.title).width;
	        if(xAxis > that.x){
	            // 向右绘制
	            that.ctx.textAlign = 'left';
	            that.ctx.lineTo(xAxis + width,yAxis);
	        }else{
	            // 向左绘制
	            that.ctx.textAlign = 'right';
	            that.ctx.lineTo(xAxis - width,yAxis);
	        }
	        that.ctx.strokeText(item.title,xAxis,yAxis - 5);
	        that.ctx.stroke();
    	},(index+1)*1000)

	});     
}
	