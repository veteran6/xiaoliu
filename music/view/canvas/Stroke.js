//调用exp：
// var data1=[
// [80,100],
// [100,120],
// [200,180],
// [300,290]];
// Stroke("#cas",data1,{
// 		strokeStyle:"red"
// 	})
function Stroke(selector,data,options){
    return new Stroke.prototype.init(selector,data,options);
}
Stroke.prototype={
    constructor:Stroke,
    init:function(selector,data,options){
    	this.options=options||{};
    	this.options.strokeStyle=this.options.strokeStyle||('#000');
        this.cas=document.querySelector(selector);
        this.ctx=this.cas.getContext('2d');
        this.edge = 4;
        this.axisMargin = 20;
        this.x0 = 20;
        this.y0 = this.ctx.canvas.height - this.x0;
        this.inits(data)
    }
}
Stroke.fn=Stroke.prototype.init.prototype;
//02、初始化
Stroke.fn.inits = function(data){
        // 绘制坐标系
        this.drawAxis();
        // 绘制所有坐标点
        this.drawDots(data);
        // 绘制连接线
        this.drawJoinLine(data);
        // this.strokeStyle=color;
    }
//03、绘制坐标系
Stroke.fn.drawAxis = function(){
	this.ctx.beginPath();
	this.ctx.moveTo(this.axisMargin,this.ctx.canvas.height - this.axisMargin);
	this.ctx.lineTo(this.ctx.canvas.width - this.axisMargin,this.ctx.canvas.height - this.axisMargin);
	this.ctx.lineTo(this.ctx.canvas.width - 2 * this.axisMargin,this.ctx.canvas.height - this.axisMargin/2);
	this.ctx.lineTo(this.ctx.canvas.width - 1.5 * this.axisMargin,this.ctx.canvas.height - this.axisMargin);
	this.ctx.lineTo(this.ctx.canvas.width - 2 * this.axisMargin,this.ctx.canvas.height - 1.5 * this.axisMargin);
	this.ctx.lineTo(this.ctx.canvas.width - this.axisMargin,this.ctx.canvas.height - this.axisMargin);
	this.ctx.moveTo(this.axisMargin,this.ctx.canvas.height - this.axisMargin);
	this.ctx.lineTo(this.axisMargin,this.axisMargin);
	this.ctx.lineTo(this.axisMargin / 2,2 * this.axisMargin);
	this.ctx.lineTo(this.axisMargin,1.5 * this.axisMargin);
	this.ctx.lineTo(1.5 * this.axisMargin,2 * this.axisMargin);
	this.ctx.lineTo(this.axisMargin,this.axisMargin);
	this.ctx.stroke();
	this.ctx.fill();
}
//04、绘制所有坐标点
Stroke.fn.drawDots = function(data){
	var that = this;
	data.forEach(function(element){
		var obj = that.translateXY(element[0],element[1]);
		that.drawDot(obj.x,obj.y);
	});
}
    //绘制单个坐标点
    Stroke.fn.drawDot = function(x,y){
    	this.ctx.beginPath();
    	this.ctx.moveTo(x - this.edge/2,y - this.edge/2);
    	this.ctx.lineTo(x + this.edge/2,y - this.edge/2);
    	this.ctx.lineTo(x + this.edge/2,y + this.edge/2);
    	this.ctx.lineTo(x - this.edge/2,y + this.edge/2);
    	this.ctx.closePath();
    	this.ctx.stroke();
    	this.ctx.fill();
    }
//05、绘制连接线
		//绘制原点坐标
		Stroke.fn.translateXY = function(x,y){
			return {
				x : this.x0 + x,
				y : this.y0 - y
			}
		}
    //绘制连线
    Stroke.fn.drawJoinLine = function(data){

    	var that = this;
    	data.forEach(function(item,index){
    		var obj=that.translateXY(item[0],item[1]);
    		that.drawDot(obj.x,obj.y,that.ctx,4)
    	});
    	data.forEach(function (item, index) {
    		var obj1 = index!=0?that.translateXY(data[index-1][0], data[index-1][1]):true;
    		var obj = that.translateXY(item[0], item[1]);
    		var index =index;
    		setTimeout(function () {
    			that.ctx.beginPath();
    			index==0?that.ctx.moveTo(that.x0, that.y0):that.ctx.moveTo(obj1.x,obj1.y);
    			that.ctx.lineTo(obj.x, obj.y);
                //添加颜色
                that.ctx.strokeStyle=that.options.strokeStyle;
                that.ctx.stroke();
            }, 1000 * (index + 1))
    	});

    }