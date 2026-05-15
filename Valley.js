var Farm = document.getElementById("Farm");
var FarmTop = document.getElementById("Farm-Top");
var FarmMiddle = document.getElementById("Farm-Middle");
var FarmBottom = document.getElementById("Farm-bottom");
var menu = document.getElementById("menu");
var Frame = document.getElementById("Frame");
var Frame2 = document.getElementById("Frame-2");
var Frame4 = document.getElementById("Frame-4");
var Frame5 = document.getElementById("Frame-5");
var Frame7 = document.getElementById("Frame-7");
var name_text = document.getElementById("name-text");
var describe = document.getElementById("describe");
var name_text_1 = document.getElementById("name-text-1");
var name_text_2 = document.getElementById("name-text-2");
var describe_1 = document.getElementById("describe-1");
var describe_2 = document.getElementById("describe-2");
var tool_Title_1 = document.getElementById("tool-Title-1");
var tool_Title_2 = document.getElementById("tool-Title-2");
var tool_text_1 = document.getElementById("tool-text-1");
var tool_text_2 = document.getElementById("tool-text-2");
var tool_div = document.getElementById("tool-div");
var MapWidth = 80;//地图宽度
var MapHeight = 65;//地图宽度
var state = "none";//物品状态
var Season = "spring";//当前季节
var Prev_Season = "spring";//上一个季节
var SeasonArr = Position_Season_spring;//当前季节对应数组
var floor_Season = "notwinter";//当前“其他”物品对应季节
var menuBodySign = 0;//当前目录信号
var IMG = "imges/0.png";//鼠标指针移入图片
var Timg = "imges/0.png";//鼠标指针移除图片
var IMG_T = 0;//获取物品向上偏移量
var IMG_L = 0;//获取物品向左偏移量
var IMG_W = "1em";//获取物品宽度
var IMG_H = "1em";//获取物品高度
var Course_Num = 0;//教程页码
var otherSign = 0;//当前目录数字
var fenceArr = [];//存储栅栏坐标
var fence_name = [];//存储栅栏序号
var doorArr = [];//存储门坐标
var door_name = [];//存储门序号
var floorArr = [];//存储地板坐标
var floor_name = [];//存储地板序号
var Position = [];//存储物品坐标
var Position_Catalog = [];//存储物品目录序号
var Position_name = [];//存储物品序号
var Position_Season_spring = [];//存储春季状态
var Position_Season_summer = [];//存储夏季状态
var Position_Season_autumn = [];//存储秋季状态
var Position_Season_winter = [];//存储冬季状态
var Position_Number = [];//存储状态变化数量
var Position_state = [];//存储当前状态
var Menu_status = false;//标记菜单状态,防止误触
var Grid_status = false;//标记网格是否开启
var Range_status = false;//标记稻草人与祝尼魔范围
var Explain_status = false;//标记教程是否开启
var Frame_Num = 5200;//地图规模
var screen_H = screen.height;
var map_state;
var Greenhouse_position;
var Greenhouse_Disable;
var Greenhouse_floor;
var Greenhouse_status = 2;//2:废墟 1:不存在温室 0:已存在温室
var Greenhouse_name;
var NPC;
var continuityNum = undefined;
var continuityArr = [];
var supplement_sign;
var supplement_goods;


if (screen_H < 800) {
	var Title_img = document.getElementById("Title-img");
	var Title_2 = document.getElementById("Title-2");
	Title_img.src = "imges/Choice/TitleX2.png";
	Title_img.className = "Title-img-2";
	Title_2.className = "Title-2-2";
}
function Farm_1(x,y,w,h,g){//生成标准农场
	console.log(x,y,w,h,g);
	name_text_1.innerHTML = fence_text[x][0];//写入名称栏
	name_text_2.innerHTML = fence_text[x][0];//写入名称栏
	describe_1.innerHTML = fence_text[x][1];//写入内容栏
	describe_2.innerHTML = fence_text[x][1];//写入内容栏
	Greenhouse_position = g;
	map_state = x;
	Frame_Num = y;
	MapWidth = w;
	MapHeight = h;
	Farm.style.width = MapWidth + "em";
	Farm.style.height = MapHeight + "em";
	FarmBottom.style.width = MapWidth + "em";
	FarmBottom.style.height = MapHeight + "em";
	FarmTop.style.width = MapWidth + "em";
	FarmTop.style.height = MapHeight + "em";
	FarmMiddle.style.width = MapWidth + "em";
	FarmMiddle.style.height = MapHeight + "em";
	var map = mapArr[x];
	var Cultivation = CultivationArr[x];
	var Architecture = ArchitectureArr[x];
	for(var i = 0; i < Frame_Num; i++){
		createHtml_T();//创建网格层
		createHtml_M();//创建物品层
		createHtml_B();//创建地板层	
		sign_map.push(map[i]);
		sign_map_del.push(map[i]);
		sign_X.push(map[i]);
		sign_Y.push(map[i]);
	};
	console.log(Cultivation);
	for (var i = 0; i < Cultivation.length; i++) {
		Cultivation_sign.push(Cultivation[i]);
	}
	for (var i = 0; i < Architecture.length; i++) {
		Architecture_sign.push(Architecture[i]);
	}
	for(var i = 0; i < Frame_Num; i++){
		FarmNumB[i].index = i;//给地块编号
	}
	for(var i = 0; i < FarmNumM.length; i++){//调整物品层层次
		FarmNumM[i].firstChild.style.zIndex = i+20;
	}
	Farm.style.background = "url(imges/map/" + x + "/spring.png)";
	Farm.style.backgroundSize = MapWidth + "em";
	FarmNumM[0].firstChild.src = "imges/map/" + x + "/spring-1.png";//地图遮罩
	FarmNumM[0].firstChild.style.zIndex = 9999;
	FarmNumM[0].firstChild.style.width = MapWidth + "em";
	FarmNumM[0].firstChild.style.height = MapHeight + "em";
	if (x == 7) {
		FarmNumM[2076].firstChild.src = "imges/Architecture/House-S.png";//添加房子
		FarmNumM[2076].firstChild.className = "House-L";
		FarmNumM[2085].firstChild.src = "imges/Architecture/mailbox.png";//添加信箱
		FarmNumM[2085].firstChild.className = "mailbox";
		Position.push(1191);//写入坐标
		sign_X.splice(1191,1,2);//写入物品宽度
		sign_Y.splice(1191,1,1);//写入物品高度
		FarmNumM[1191].firstChild.style.top = "-1em";//设置纵向偏移
		FarmNumM[1191].firstChild.style.left = "0em";//设置横向偏移
		FarmNumM[1191].firstChild.style.width = "2em";//设置物品宽度
		FarmNumM[1191].firstChild.style.height = "3em";//设置物品高度
	}else if (x == 6) {
		FarmNumM[1819].firstChild.src = "imges/Architecture/House-S.png";//添加房子
		FarmNumM[1819].firstChild.className = "House-L";
		FarmNumM[1828].firstChild.src = "imges/Architecture/mailbox.png";//添加信箱
		FarmNumM[1828].firstChild.className = "mailbox";
		FarmNumM[1611].firstChild.src = "imges/Architecture/4.png";
		Position.push(1611);//写入坐标
		sign_X.splice(1611,1,2);//写入物品宽度
		sign_Y.splice(1611,1,1);//写入物品高度
		FarmNumM[1611].firstChild.style.top = "-1em";//设置纵向偏移
		FarmNumM[1611].firstChild.style.left = "0em";//设置横向偏移
		FarmNumM[1611].firstChild.style.width = "2em";//设置物品宽度
		FarmNumM[1611].firstChild.style.height = "3em";//设置物品高度
	}else{
		FarmNumM[1339].firstChild.src = "imges/Architecture/House-S.png";//添加房子
		FarmNumM[1339].firstChild.className = "House-L";
		FarmNumM[1348].firstChild.src = "imges/Architecture/mailbox.png";//添加信箱
		FarmNumM[1348].firstChild.className = "mailbox";
		FarmNumM[1191].firstChild.src = "imges/Architecture/4.png";
		Position.push(1191);//写入坐标
		sign_X.splice(1191,1,2);//写入物品宽度
		sign_Y.splice(1191,1,1);//写入物品高度
		FarmNumM[1191].firstChild.style.top = "-1em";//设置纵向偏移
		FarmNumM[1191].firstChild.style.left = "0em";//设置横向偏移
		FarmNumM[1191].firstChild.style.width = "2em";//设置物品宽度
		FarmNumM[1191].firstChild.style.height = "3em";//设置物品高度
	}
	
	Position_Catalog.push(0);//写入目录序号
	Position_name.push(4);//写入物品序号
	Position_Season_spring.push("none");//写入春季
	Position_Season_summer.push("none");//写入夏季
	Position_Season_autumn.push("none");//写入秋季
	Position_Season_winter.push("none");//写入冬季
	Position_Number.push(1);//写入变化状态数量
	Position_state.push(0);//写入当前状态
	if (map_state == 6) {
		FarmNumM[299].firstChild.src = "imges/NPC/12/" + Season+ ".png";
		Position.push(299);//写入坐标
		sign_X.splice(299,1,1);//写入物品宽度
		sign_Y.splice(299,1,1);//写入物品高度		
		FarmNumM[299].firstChild.style.top = "0em";//设置纵向偏移
		FarmNumM[299].firstChild.style.left = "0em";//设置横向偏移
		FarmNumM[299].firstChild.style.width = "4em";//设置物品宽度
		FarmNumM[299].firstChild.style.height = "4em";//设置物品高度		
	}else if (map_state == 7) {
		FarmNumM[588].firstChild.src = "imges/NPC/12/" + Season+ ".png";
		Position.push(588);//写入坐标
		sign_X.splice(588,1,1);//写入物品宽度
		sign_Y.splice(588,1,1);//写入物品高度		
		FarmNumM[588].firstChild.style.top = "0em";//设置纵向偏移
		FarmNumM[588].firstChild.style.left = "0em";//设置横向偏移
		FarmNumM[588].firstChild.style.width = "4em";//设置物品宽度
		FarmNumM[588].firstChild.style.height = "4em";//设置物品高度		
	}else{
		FarmNumM[549].firstChild.src = "imges/NPC/12/" + Season+ ".png";
		Position.push(549);//写入坐标
		sign_X.splice(549,1,1);//写入物品宽度
		sign_Y.splice(549,1,1);//写入物品高度		
		FarmNumM[549].firstChild.style.top = "0em";//设置纵向偏移
		FarmNumM[549].firstChild.style.left = "0em";//设置横向偏移
		FarmNumM[549].firstChild.style.width = "4em";//设置物品宽度
		FarmNumM[549].firstChild.style.height = "4em";//设置物品高度		
	}
	Position_Catalog.push(5);//写入目录序号
	Position_name.push(12);//写入物品序号
	Position_Season_spring.push("spring");//写入春季
	Position_Season_summer.push("summer");//写入夏季
	Position_Season_autumn.push("autumn");//写入秋季
	Position_Season_winter.push("winter");//写入冬季
	Position_Number.push(1);//写入变化状态数量
	Position_state.push(0);//写入当前状态
	console.log(Position_Catalog);
	add_Greenhouse();
	supplement(x);
	console.log(Position_Catalog);
	
	
	signMap();//校准地图状态
	document.getElementById("Choice").style.display = "none";//关闭选择界面
	clearInterval(animation);//清除云层动画
	FrameSize();//边框校准
	save_load();//加载存档
	// Grid()
	
}

var FarmNumT = Farm.getElementsByClassName("Farm-T");//获取网格层集合
var FarmNumM = Farm.getElementsByClassName("Farm-M");//获取物品层集合
var FarmNumB = Farm.getElementsByClassName("Farm-B");//获取地板层集合
function createHtml_T(){//创建网格层
	var div = document.createElement("div");
	var Img = document.createElement("img");
	Img.src = "imges/0.png";
	div.appendChild(Img);
	FarmTop.appendChild(div).className = "Farm-T";
}
function createHtml_M(){//创建物品层
	var div = document.createElement("div");
	var Img = document.createElement("img");
	Img.src = "imges/0.png";
	div.appendChild(Img);
	FarmMiddle.appendChild(div).className = "Farm-M";
}

function createHtml_B(){//创建地板层
	var div = document.createElement("div");
	var Img = document.createElement("img");
	Img.src = "imges/0.png";
	div.appendChild(Img);
	FarmBottom.appendChild(div).className = "Farm-B";
}

var menuBtn = document.getElementById("menu-btn");//菜单按钮
var menuNum = menuBtn.querySelectorAll("img");//菜单按钮集合
var menuBody = document.getElementById("menu-body");//物品栏
var menuBody1 = document.getElementById("menu-body-1");//物品栏第一页
var menuBodyNum = menuBody.getElementsByClassName("menu-body");//物品栏集合
for(var i = 0; i < menuNum.length; i++){
	menuNum[i].index = i;//给菜单按钮编号
}
for(var i = 0; i < menuBodyNum.length; i++){
	menuBodyNum[i].index = i;//物品栏编号
	if (i != 0) {
		menuBodyNum[i].style.display = "none";//关闭其他物品栏页面
	}
}
menuNum[0].style.left = "-8px";//校准一个菜单按钮位置
///////////////////////////////////点击菜单按钮功能/////////////////////////////////////
menuBtn.addEventListener("click",function(e){
	state = "common";//将状态设置为"通常"
	Menu_status = false;//进入菜单模式
	IMG = "imges/0.png";//初始化鼠标指针图片
	if (e.target.index != 7) {//菜单按钮切换函数
		menuBodySign = e.target.index;//标记当前菜单序号
		console.log(e.target.index);//显示当前菜单序号
		for(var i = 0; i < 7; i++){//设置菜单页面状态
			menuNum[i].style.left = "0";
			menuBodyNum[i].style.display = "none";
			menuBodyNum[i].style.bottom = 0;
			name_text_1.innerHTML = " ";//写入名称栏
			name_text_2.innerHTML = " ";//写入名称栏
			describe_1.innerHTML = " ";//写入内容栏
			describe_2.innerHTML = " ";//写入内容栏
			if (menu.style.left == "-320px" || menu.style.left == 0) {//初始化菜单位置
				menu.style.left = "0";
				menuNum[7].src = "imges/button/arrow-2.png";
			}
		}
		menuBodyNum[e.target.index].style.display = "flex";//显示被点击的菜单
		var myMenu = menuBodyNum[e.target.index];//获取当前菜单
		if (menuBody.offsetHeight > myMenu.offsetHeight) {
			menuBodyBtn.style.display = "none";
			myMenu.style.left = "22px";
		}else{
			menuBodyBtn.style.display = "block";
		}
		window.q1 = myMenu.offsetHeight - menuBody.offsetHeight;//获取菜单页面高度信息
		window.q2 = menuBodyBtn.offsetHeight - bodyBtn.offsetHeight;//获取滚动条高度信息
		window.q3 = q2/q1;//页面和滚动条映射关系
		e.target.style.left = "-8px";//校准菜单位置
		window.myMenu = menuBodyNum[e.target.index];//定义"当前菜单"
		bodyBtn.style.top = 0;//初始化滚动条位置
	}
	if (e.target.index == 6) {//进入第五页菜单隐藏"说明文本"显示"季节和缩放"工具
		name_text.style.display = "none";
		describe.style.display = "none";
		season.style.display = "block";
		zoom.style.display = "block";
	}else{
		name_text.style.display = "block";
		describe.style.display = "block";
		season.style.display = "none";
		zoom.style.display = "none";

	}
})
var isDown = false;//标记菜单滚动条是否启用
var isBtnY = false;//标记缩放滚动条是否启用
var isFrame = false;//标记农场移动是否启用
var isMenu = false;//标记菜单滑动是否启用
var myMenu = menuBodyNum[0];//创建"当前菜单"
var MenuArr = document.getElementById("menu-body-0").getElementsByClassName("menu-body");
var menuBodyBtn = document.getElementById("menu-body-btn");//获取菜单滚动条按钮
var bodyBtn = document.getElementById("body-btn");//获取菜单滚动条按钮
var bodyBtnY = document.getElementById("body-btn-y");//获取缩放滚动条
var y = 0;
var t = 0;
var x = 0;
var l = 0;
var nl = 20;
var FrameX = 0;
var FrameY = 0;
var FrameT = 0;
var FrameL = 0;
var FrameNl = 0;
var FrameNt = 0;
var BtnYNum = 4;
Frame.onmousedown = function(e) {//鼠标移入农场时开启农场移动状态
	//获取坐标
	FrameX = e.clientX;
	FrameY = e.clientY;
	//获取偏移量
	FrameT = Frame.offsetTop;
	FrameL = Frame.offsetLeft;
	//开关打开
	isFrame = true;
	//设置样式  
}
menuBody.onmousedown = function(e) {
	if (e.target.id != "body-btn") {
		y = e.clientY;//获取y坐标
		t = myMenu.offsetTop;//获取顶部的偏移量
		isMenu = true;//开关打开
	}
}
bodyBtn.onmousedown = function(e) {//鼠标移入菜单滚动条时开启农场移动状态
	if (e.target.nodeName == "IMG") {
		y = e.clientY;//获取y坐标
		t = bodyBtn.offsetTop;//获取顶部的偏移量
		isDown = true;//开关打开
	}
}
bodyBtnY.onmousedown = function(e) {//鼠标移入缩放滚动条时开启农场移动状态
	//获取x坐标
	x = e.clientX;
	//获取左部的偏移量
	l = bodyBtnY.offsetLeft;
	//开关打开
	isBtnY = true;
	//设置样式  
}
window.onmousemove = function(e) {//移动功能函数
	if (isDown == true) {//菜单滚动条
		var ny = e.clientY;
		//计算移动后的左偏移量和顶部的偏移量
		var nt = ny - (y - t);
		if (nt < 0) {
			var nt = 0;
		}else if (nt > bodyBtnNum){
			var nt = bodyBtnNum;
		}
		if (menuBody.offsetHeight > myMenu.offsetHeight) {
			var nt = 0;
		}
		bodyBtn.style.top = nt + "px";
		myMenu.style.bottom = nt/q3 + "px";
	}else if (isBtnY == true) {//缩放滚动条
		var nx = e.clientX;
		nl = nx - (x - l);
		bodyBtnY.style.left = nl + "px";
		if (nl > 20 && nl < 70) {
			document.body.id = "body-1";
			Frame.style.left = (document.body.clientWidth - 320)/2 - Frame.offsetWidth/2 + 320 + "px";
			Frame.style.top = window.screen.height/2 - Frame.offsetHeight/2 + "px";
		}else if (nl > 70 && nl < 140) {
			document.body.id = "body-2";
			Frame.style.left = (document.body.clientWidth - 320)/2 - Frame.offsetWidth/2 + 320 + "px";
			Frame.style.top = window.screen.height/2 - Frame.offsetHeight/2 + "px";
		}else if (nl > 140 && nl < 215){
			document.body.id = "body-3";
			Frame.style.left = (document.body.clientWidth - 320)/2 - Frame.offsetWidth/2 + 320 + "px";
			Frame.style.top = window.screen.height/2 - Frame.offsetHeight/2 + "px";
		}
		else if (nl > 215 && nl < 236){
			document.body.id = "body-4";
			Frame.style.left = (document.body.clientWidth - 320)/2 - Frame.offsetWidth/2 + 320 + "px";
			Frame.style.top = window.screen.height/2 - Frame.offsetHeight/2 + "px";
		}
		else if (nl > 236){
			bodyBtnY.style.left = "236px";
		}else if (nl < 20){
			bodyBtnY.style.left = "20px";
		}
		FrameSize()
	}else if (isFrame == true) {//移动农场
		var FrameNx = e.clientX;
		var FrameNy = e.clientY;
		FrameNl = FrameNx - (FrameX - FrameL);
		FrameNt = FrameNy - (FrameY - FrameT);
		Frame.style.left = FrameNl + "px";
		Frame.style.top = FrameNt + "px";
	}else if (isMenu == true) {
		var ny = e.clientY;
		//计算移动后的左偏移量和顶部的偏移量
		var nt = ny - (y - t + 20);
		if (nt > 0) {
			var nt = 0;
		}else if (nt < -q1){
			var nt = -q1;
		}
		if (menuBody.offsetHeight > myMenu.offsetHeight) {
			var nt = 0;
		}
		myMenu.style.bottom = -nt + "px";
		bodyBtn.style.top = -(nt*q3) + "px";
	}
}
window.onmouseup = function() {//结束移动函数
	//开关关闭
	if (isDown == true) {
		isDown = false;
	}else if (isBtnY == true) {
		isBtnY = false;
		if (nl > 20 && nl < 70) {//判断拖动结束时滚动条对应位置以及比例
			bodyBtnY.style.left = "20px";
		}else if (nl > 70 && nl < 140) {
			bodyBtnY.style.left = "86px";
		}else if (nl > 140 && nl < 215){
			bodyBtnY.style.left = "157px";
		}
		else if (nl > 215 && nl < 236){
			bodyBtnY.style.left = "236px";
		}
		else if (nl > 236){
			bodyBtnY.style.left = "236px";
		}else if (nl < 20){
			bodyBtnY.style.left = "20px";
		}
	}else if (isFrame == true) {
		isFrame = false;
	}else if (isMenu == true) {
		isMenu = false;
	}
}

function FrameSize() {//农场边框初始化
	var FrameW = Farm.offsetWidth;
	var FrameH = Farm.offsetHeight;
	Frame.style.width = FrameW + 32 + "px";
	Frame.style.height = FrameH + 32 + 88 + "px";
	Frame2.style.width = FrameW + 32 - 40 + "px";
	Frame4.style.height = FrameH + "px";
	Frame5.style.height = FrameH + "px";
	Frame7.style.width = FrameW - 8 + "px";
}
function Spring() {//进入春天
	Farm.style.background = "url(imges/map/" + map_state + "/spring.png)";
	Farm.style.backgroundSize = MapWidth + "em";
	FarmNumM[0].firstChild.src = "imges/map/" + map_state + "/spring-1.png";//地图遮罩
	if (map_state == 3) {
		FarmNumM[2960].firstChild.src = "imges/map/3/spring-2.png";//地图遮罩
	}
	Season = "spring";
	SeasonArr = Position_Season_spring;
	GetSeason();
}
function Summer() {//进入夏天
	Farm.style.background = "url(imges/map/" + map_state + "/summer.png)";
	Farm.style.backgroundSize = MapWidth + "em";
	FarmNumM[0].firstChild.src = "imges/map/" + map_state + "/summer-1.png";//地图遮罩
	if (map_state == 3) {
		FarmNumM[2960].firstChild.src = "imges/map/3/summer-2.png";//地图遮罩
	}
	Season = "summer";
	SeasonArr = Position_Season_summer;
	GetSeason();
}
function Autumn() {//进入秋天
	Farm.style.background = "url(imges/map/" + map_state + "/autumn.png)";
	Farm.style.backgroundSize = MapWidth + "em";
	FarmNumM[0].firstChild.src = "imges/map/" + map_state + "/autumn-1.png";//地图遮罩
	if (map_state == 3) {
		FarmNumM[2960].firstChild.src = "imges/map/3/autumn-2.png";//地图遮罩
	}
	Season = "autumn";
	SeasonArr = Position_Season_autumn;
	GetSeason();
}
function Winter() {//进入冬天
	Farm.style.background = "url(imges/map/" + map_state + "/winter.png)";
	Farm.style.backgroundSize = MapWidth + "em";
	FarmNumM[0].firstChild.src = "imges/map/" + map_state + "/winter-1.png";//地图遮罩
	if (map_state == 3) {
		FarmNumM[2960].firstChild.src = "imges/map/3/winter-2.png";//地图遮罩
	}
	Season = "winter";
	SeasonArr = Position_Season_winter;
	GetSeason();
}
function GetSeason() {//切换季节时校准对应贴图
	if (Season == "spring") {
		GNot = "/winter/";
		NNot = "/notwinter/";
	}else if (Season == "summer") {
		GNot = "/winter/";
		NNot = "/notwinter/";
	}else if (Season == "autumn") {
		GNot = "/winter/";
		NNot = "/notwinter/";
	}else if (Season == "winter") {
		GNot = "/notwinter/";
		NNot = "/winter/";
	}
	if (Greenhouse_status == 2) {
		if (map_state == 0 || map_state == 3 || map_state == 4 || map_state == 5) {
			FarmNumB[Greenhouse_position-394].firstChild.src = "imges/Architecture/98/" + Season + ".png";
		}
	}
	for (var i = 0 ; i < Position.length; i++) {//遍历已放置物品
		var PositionI = Position[i];//获取坐标
		var CatalogNum = Position_Catalog[i];//获取目录编号
		var name = Position_name[i];//获取物品编号
		var CatalogArr = ["Architecture/","crops/","tool/","other/","tree/","NPC/"];//贴图路径
		var Catalog = CatalogArr[CatalogNum];//当前贴图路径
		switch (CatalogNum){
			case 0://目录编号为建筑
			if (name == 28 || name == 87 || name == 88 || name == 89 || name == 90 || name == 91 || name == 92 || name == 93 || name == 94 || name == 95 || name == 96 || name == 100 || name == 101) {//祝尼魔小屋和固定植物
				FarmNumM[PositionI].firstChild.src = "imges/" + Catalog + name +"/" + Season + ".png";
			}
			if (name == 3 || name == 99) {
				FarmNumB[Greenhouse_position].firstChild.src = "imges/" + Catalog + Greenhouse_name +"/" + Season + ".png";
			}
			break;
			case 1://目录编号为农作物
			if (SeasonArr[i] == Season && name < 39) {//普通农作物,判断季节是否对应,非对应季节枯萎
				FarmNumM[PositionI].firstChild.src = "imges/" + Catalog + name +"/" + Position_state[i] + ".png";
			}else if(SeasonArr[i] == Season && name == 39 || name == 40) {//茶苗,适应四季,不会枯萎
				FarmNumM[PositionI].firstChild.src = "imges/" + Catalog + name + "/" + Season + "/" + Position_state[i] + ".png";
			}else if (SeasonArr[i] == Season && name == 41) {//牧草,更换随机贴图
				FarmNumM[PositionI].firstChild.src = "imges/" + Catalog + name + "/" + Season + "/" + Math.ceil(Math.random()*4) +".png";
			}else if (SeasonArr[i] != Season) {//如果季节不对应,更换随机枯萎贴图
				FarmNumM[PositionI].firstChild.src = "imges/crops/" + Math.ceil(Math.random()*4) +".png"
			}
			break;
			case 2://目录编号为工艺与装饰
			if (SeasonArr[i] == Season) {
				FarmNumM[PositionI].firstChild.src = "imges/" + Catalog + name + "/" + Season + ".png";
			}
			break;
			case 4://目录编号为树木
			if (name == 12 && Season == "winter") {//蘑菇树,冬季特殊状态
				if (Position_state[i] < 3) {
					FarmNumM[PositionI].firstChild.src = "imges/tree/12/3.png"
				}
			}else if (name == 12 && Season != "winter") {//蘑菇树,非冬季常规状态
				if (Position_state[i] < 3) {
					FarmNumM[PositionI].firstChild.src = "imges/tree/12/" + Position_state[i] + ".png"
				}
			}else{//不同树木,贴图随季节更换
				var B = FarmNumM[PositionI].firstChild.src;
				FarmNumM[PositionI].firstChild.src = B.replace(Prev_Season,Season);
			}
			break;
			case 5://目录编号为NPC
			FarmNumM[PositionI].firstChild.src = "imges/NPC/" + name +"/" + Season + ".png";
			break;
		}
	}
	for (var i = 0 ; i < floorArr.length; i++) {//栅栏与地板季节校准
		var x = floorArr[i];
		var B = FarmNumB[x].firstChild.src;
		FarmNumB[x].firstChild.src = B.replace(GNot,NNot) 
	}
	for (var i = 0 ; i < supplement_sign.length; i++) {//栅栏与地板季节校准
		var a = supplement_goods[i];
		var b = supplement_data[a];
		FarmNumM[supplement_sign[i]].firstChild.src = "imges/Architecture/" + b[0] + "/" + Season + ".png";
	}
	Prev_Season = Season;//将当前季节记录为上一个季节
}
function MenuSwitch() {//显示/隐藏菜单功能
	if (menu.style.left == "0px" || menu.style.left == 0) {
		menu.style.left = "-320px";
		menuNum[7].src = "imges/button/arrow-1.png";
		for(var i = 0; i < FarmNumM.length; i++){//调整物品层层次
			FarmNumM[i].style.pointerEvents = "none"
			FarmNumB[i].style.pointerEvents = "none"
			FarmNumT[i].style.pointerEvents = "none"
		}
	}else{
		menu.style.left = "0";
		menuNum[7].src = "imges/button/arrow-2.png";
	}
}
Frame.style.left = (document.body.clientWidth - 320)/2 - Frame.offsetWidth/2 + 320 + "px";//初始化地图位置
Frame.style.top = window.screen.height/2 - Frame.offsetHeight/2 + "px";//初始化地图位置
var menuH = menu.offsetHeight;//获取菜单栏高度
menuBody.style.height = menuH - 288 + "px";//设置菜单也显示区高度
menuBodyBtn.style.height = menuH - 300 + "px";//设置菜单滚动条高度
var bodyBtnNum = menuH - 340;//滚动条长度
var q1 = myMenu.offsetHeight - menuBody.offsetHeight;
var q2 = menuBodyBtn.offsetHeight - bodyBtn.offsetHeight;
var q3 = q2/q1;
var signX = 1;//当前物品占地宽度
var signY = 1;//当前物品占地高度
/////////////////////////////////////↓↓↓↓放置物品↓↓↓↓/////////////////////////////////////
Farm.addEventListener("click",function(e){
	console.log(e.target.index);//显示点击位置坐标
	if (e.target.nodeName == "DIV" && Menu_status == true) {//判断被点击位置是否"div"及菜单状态是否正常
		if (e.target.index != undefined) {//判断被点击的位置是否可选
			IsE = e.target.index;//保存当前坐标
			var e = e.target.index;//简化坐标变量名长度
			switch (state){//判断当前工具状态
				case "common"://当前状态为"通常"
				switch (menuBodySign){//判断菜单序号
				case 0://菜单序号为建筑
				Is_state = 0;//初始化物品状态编号
				window.Is_state = Is_state;
				IsAdd();//将物品信息写入数据库
				Initialization();//初始化地图数据
				signMapX();//校准地图不可选坐标
				signMapY();//当前物品为建筑时,不可放置建筑地块
				signMap();//校准地图状态
				if (otherSign == 3) {
					// Greenhouse_status = 0;
					Greenhouse_position = IsE;
					console.log(Greenhouse_status);
					verification_Greenhouse(0);
					for (var i = 0; i < Frame_Num; i++) {
						FarmNumB[i].style.pointerEvents = "none";
					}
				}
				huge();//清理陨石和巨大作物下的地板
				floor();//校准地板状态
				FarmNumM[e].firstChild.src = IMG;//在地板层添加贴图
				Timg = FarmNumM[e].firstChild.src;//更换鼠标移出时贴图
				if (otherSign == 28) {//当前物品为祝尼魔小屋
					Range_fun();//更新稻草人和祝尼魔小屋范围
				}
				Prohibit()
				break;
				case 1://菜单序号为农作物
				Is_state = 0;//初始化物品状态编号
				window.Is_state = Is_state;
				IsAdd();//将物品信息写入数据库
				signMapX();
				signMap();
				if (otherSign < 42 ) {
					if (continuityArr.indexOf(e) == -1) {
						continuityNum = undefined;
						continuityArr = [];
					}
					continuity();
					if (otherSign != 41) {
						var land = floor_name[floorArr.indexOf(e)];
						var landNum = floorArr.indexOf(e);//查找当前地块是否被开垦
						if (land == undefined) {//当前地块未被开垦则在下方添加被开垦土地
							floorArr.push(IsE);
							floor_name.push(18);
						}
					}
					if (otherSign != 40 && otherSign != 41) {
				 		Cultivation();//标记农作物禁用地块
				 	}
				 	if (otherSign == 40) {
				 		fruiter();
				 	}
				}else if (otherSign == 42 || otherSign == 43 || otherSign == 44) {//当前物品为巨大作物,禁用拥有地板地块,清理巨大作物下方地板
					signMapX();
					signMap();
					huge();
				}
				floor();//校准地板状态
				floorSign();//校准地板禁用状态
				if (Season_spring == Season || Season_summer == Season || Season_autumn == Season || Season_winter == Season) {//判断当前季节是否适合选取农作物生长
					if (otherSign == 39 || otherSign == 40) {//当前物品为茶苗和纤维种子
						FarmNumM[e].firstChild.src = "imges/crops/" + otherSign + "/" + Season+ "/0.png";//添加对应季节贴图
					}else if (otherSign == 41) {//当前物品为牧草
						FarmNumM[e].firstChild.src = "imges/crops/" + otherSign + "/" + Season+ "/" + Math.ceil(Math.random()*4) +".png";//添加随机对应季节贴图
					}else{
						FarmNumM[e].firstChild.src = "imges/crops/" + otherSign + "/0.png";//普通农作物成熟贴图
					}
				}else{//当前作物生长季节不适应当前季节
					FarmNumM[e].firstChild.src = "imges/crops/" + Math.ceil(Math.random()*4) +".png";//添加随机枯萎作物贴图
				}
				Timg = FarmNumM[e].firstChild.src;//校准移出时贴图
				FarmNumB[e].style.pointerEvents = "none";//禁用当前地块
				Prohibit()
				break;
				case 2://菜单序号为工艺与装饰
				Is_state = 0;//初始化物品状态编号
				window.Is_state = Is_state;
				IsAdd();//将物品信息写入数据库
				if (Season_spring == Season || Season_summer == Season || Season_autumn == Season || Season_autumn == Season) {//判读是否为受季节影响物品
					FarmNumM[e].firstChild.src = "imges/tool/" + otherSign + "/" + Season + ".png";//添加对应季节贴图
				}else{
					FarmNumM[e].firstChild.src = "imges/tool/" + otherSign + ".png";//添加常规贴图
				}
				Timg = FarmNumM[e].firstChild.src;//校准移出时贴图
				FarmNumB[e].style.pointerEvents = "none";//禁用当前地块
				Range_fun();//校准稻草人范围
				Prohibit()
				break;
				case 3://菜单序号为栅栏与地板
				if (otherSign < 4) {//当前物品为栅栏
					if (continuityArr.indexOf(e) == -1) {
						continuityNum = undefined;
						continuityArr = [];
					}
					continuity();
					sign_X.splice(IsE,1,signX);//向数据库写入宽度
					sign_Y.splice(IsE,1,signY);//向数据库写入高度
					fenceArr.push(IsE);//写入栅栏坐标
					fence_name.push(otherSign);//写入物品编号
					FarmNumB[e].style.pointerEvents = "none";//禁用当前地块
					door();//校准门状态
					fence();//校准栅栏状态
				}else if (otherSign == 4) {//当前物品为门
					sign_X.splice(IsE,1,signX);//向数据库写入宽度
					sign_Y.splice(IsE,1,signY);//向数据库写入高度
					doorArr.push(IsE);//写入门坐标
					door_name.push(otherSign);//写入物品编号
					FarmNumB[e].style.pointerEvents = "none";//禁用当前地块
					door();//校准门状态
				}else if (otherSign > 4 && otherSign < 17) {//当前物品为普通地板
					if (continuityArr.indexOf(e) == -1) {
						continuityNum = undefined;
						continuityArr = [];
					}
					continuity();
					floorArr.push(IsE);//写入地板坐标
					floor_name.push(otherSign);//写入物品编号
					FarmNumB[e].style.pointerEvents = "none";//禁用当前地块
					floor();//校准地板状态
				}else if (otherSign == 17) {//当前物品为随机地板
					if (continuityArr.indexOf(e) == -1) {
						continuityNum = undefined;
						continuityArr = [];
					}
					continuity();
					floorArr.push(IsE);//写入地板坐标
					floor_name.push(otherSign);//写入物品编号
					if (Season == "winter") {//判断季节对应地板状态
						floor_Season = "winter";
					}else{
						floor_Season = "notwinter";
					}
					FarmNumB[e].style.pointerEvents = "none";//禁用当前地块
					FarmNumB[e].firstChild.src = "imges/other/" + floor_Season + "/17/" + Math.ceil(Math.random()*16) + ".png";//添加随机地板贴图
					Timg = FarmNumB[e].firstChild.src;//校准移出时贴图
					floor();//校准地板状态
				}
				Prohibit();
				break;
				case 4://菜单序号为树木
				var treeUp = Position.indexOf(e - MapWidth);//定义"上"坐标
				var treeDown = Position.indexOf(e + MapWidth);//定义"下"坐标
				var treeLeft = Position.indexOf(e - 1);//定义"左"坐标
				var treeRight = Position.indexOf(e + 1);//定义"右"坐标
				var treeUp1 = Position.indexOf(e - 160);//定义"上上"坐标
				var treeDown1 = Position.indexOf(e + 160);//定义"下下"坐标
				var treeLeft1 = Position.indexOf(e - 2);//定义"左左"坐标
				var treeRight1 = Position.indexOf(e + 2);//定义"右右"坐标
				// console.log(GoodsNumber);
				if (otherSign < 4 || otherSign == 12) {//当前物品为野树
					if (Position_Catalog[treeUp] == 4 || Position_Catalog[treeDown] == 4 || Position_Catalog[treeLeft] == 4 || Position_Catalog[treeRight] == 4) {
					//判断四周是否有其他树
						if (Position_state[treeUp] == 0 || Position_state[treeDown] == 0 || Position_state[treeLeft] == 0 || Position_state[treeRight] == 0  || Position_state[treeUp] == 1 || Position_state[treeDown] == 1 || Position_state[treeLeft] == 1 || Position_state[treeRight] == 1) {
								//判断四周树木是否完全生长
							Is_state = GoodsNumber - 1;//完全生长则设置当前状态为非成熟状态
						}else {
							Is_state = 0;//非生长则设置当前状态为成熟状态
						}
					}else {//四周没有其他树则当前状态为成熟状态
						Is_state = 0
					}
				}else if (otherSign > 3 && otherSign < 13) {//当前物品为果树
					Is_state = 0;
				}
				var landNum = floorArr.indexOf(e);//获取当前地块地板信息
				var land = floor_name[floorArr.indexOf(e)];//获取当前地块地板编号
				if (land == 18) {//如果地板属性为"耕地"则删除地板
					floorArr.splice(landNum,1);//删除数据库内该坐标地板信息
					floor_name.splice(landNum,1);//删除数据库内该坐标地板编号
					floor();//校准地板状态
					FarmNumB[e].firstChild.src = "imges/0.png";//删除地板贴图
				}
				if (otherSign == 12) {//判断当前物品是否为蘑菇树
					FarmNumM[e].firstChild.src = "imges/tree/" + otherSign + "/" + Is_state + ".png";//添加蘑菇树贴图
				}else{
					FarmNumM[e].firstChild.src = "imges/tree/" + otherSign + "/" + Season+ "/" + Is_state + ".png";//添加非蘑菇树贴图
				}
				Timg = FarmNumM[e].firstChild.src;//校准移出时贴图
				window.Is_state = Is_state;//校准树木当前状态
				IsAdd();//将物品信息写入数据库
				if (otherSign > 3 && otherSign < 12) {//如果当前物品为果树
					fruiter();//校准果树禁用范围
				}
				for (var i = 0; i < fruiter_sign.length; i++) {//禁用不能种树地块
					FarmNumB[fruiter_sign[i]].style.pointerEvents = "none";
				}
				FarmNumB[e].style.pointerEvents = "none";//禁用当前地块
				Prohibit()
				break;
				case 5:
				break;
				}
				break;
				case "Kettle"://当前状态为"水壶"
				var crops = Position.indexOf(e);//获取当前坐标在数据库内位置
				console.log(crops);
				if (Position_Catalog[crops] == 1) {//判断该地块是否为农作物
					// console.log("序号" + Position_name[crops]);
					// console.log("数量" + Position_Number[crops]);
					// console.log("当前" + Position_state[crops]);
					if (Position_Season_spring[crops] == Season || Position_Season_summer[crops] == Season || Position_Season_autumn[crops] == Season || Position_Season_winter[crops] == Season) {//判断该农作物季节是否对应当前季节
						console.log(Position_Season_spring[crops] + "," + Position_Season_summer[crops] + "," + Position_Season_autumn[crops] + "," + Position_Season_winter[crops]);
						var Is_state = Position_state[crops] + 1;//设置农作物当前状态
						if (Is_state < Position_Number[crops]) {//农作物为不成熟状态
							Position_state.splice(crops,1,Is_state);//更新数据库内状态记录
							Is_state = Is_state;
						}else if (Is_state == Position_Number[crops]) {//农作物为成熟状态
							Is_state = 0;
							Position_state.splice(crops,1,0);//更新数据库内状态记录
						}
						if (Position_name[crops] > 38) {//当前农作物为茶苗
							FarmNumM[e].firstChild.src = "imges/crops/" + Position_name[crops] + "/" + Season + "/" + Is_state + ".png";
						}else{//当前农作物非茶苗
							FarmNumM[e].firstChild.src = "imges/crops/" + Position_name[crops] + "/" + Is_state + ".png";
						}	
					}
				}
				break;
				case "Hoe"://当前状态为"锄头"
				continuity();
				floorArr.push(IsE);//写入坐标
				floor_name.push(18);//写入编号
				FarmNumB[e].style.pointerEvents = "none";//禁用地块
				floor();//校准地板状态
				break;
				case "Axe"://当前状态为"斧头"
				var tree = Position.indexOf(e);//获取当前坐标在数据库内位置
				if (Position_Catalog[tree] == 4) {//判断该地块是否为树木
					// console.log("序号" + Position_name[tree]);
					// console.log("数量" + Position_Number[tree]);
					// console.log("当前" + Position_state[tree]);
					var treeUp = Position.indexOf(e - MapWidth);//定义"上"坐标
					var treeDown = Position.indexOf(e + MapWidth);//定义"下"坐标
					var treeLeft = Position.indexOf(e - 1);//定义"左"坐标
					var treeRight = Position.indexOf(e + 1);//定义"右"坐标
					if (Position_Catalog[treeUp] == 4 || Position_Catalog[treeDown] == 4 || Position_Catalog[treeLeft] == 4 || Position_Catalog[treeRight] == 4) {
						//如果四周有其他树木
						if (Position_state[treeUp] == 0 || Position_state[treeDown] == 0 || Position_state[treeLeft] == 0 || Position_state[treeRight] == 0 || Position_state[treeUp] == 1 || Position_state[treeDown] == 1 || Position_state[treeLeft] == 1 || Position_state[treeRight] == 1) {
							//如果四周有树木处于成熟状态
							var Is_state = Position_state[tree] + 1;
							console.log(Position_state[tree]);
							if (Is_state < Position_Number[tree]) {//下一阶段非成熟则进入下一阶段
								console.log(Is_state);
								Position_state.splice(tree,1,Is_state);
								Is_state = Is_state;
							}else if (Is_state == Position_Number[tree]) {//下一阶段为成熟则跳过成熟阶段
								Is_state = 3;
								console.log(Is_state);
								Position_state.splice(tree,1,Is_state);
							}
						}else {//如果四周无成熟树木处于成熟状态则树木状态在全部状态中循环
							var Is_state = Position_state[tree] + 1;
							if (Is_state < Position_Number[tree]) {
								Position_state.splice(tree,1,Is_state);
							}else if (Is_state == Position_Number[tree]) {
								Position_state.splice(tree,1,0);
								var Is_state = 0;
							}
						}
					}else{//如果四周无树木处于成熟状态则树木状态在全部状态中循环
						var Is_state = Position_state[tree] + 1;
						if (Is_state < Position_Number[tree]) {
							Position_state.splice(tree,1,Is_state);
						}else if (Is_state == Position_Number[tree]) {
							Position_state.splice(tree,1,0);
							var Is_state = 0;
						}
					}
					if (Position_name[tree] < 4) {//当前物品为野树
						FarmNumM[e].firstChild.src = "imges/tree/" + Position_name[tree] + "/" + Season+ "/" + Is_state + ".png";//添加对应状态贴图
					}else if (Position_name[tree] == 12) {//当前物品为蘑菇树
						if (Season == "winter") {//如果当前季节为冬天
							if (Is_state > 2) {//蘑菇树不会拥有成熟状态贴图
								FarmNumM[e].firstChild.src = "imges/tree/" + Position_name[tree] + "/" + Is_state + ".png";
							}
						}else{//如果当前季节非冬天
							FarmNumM[e].firstChild.src = "imges/tree/" + Position_name[tree] + "/" + Is_state + ".png";//蘑菇树正常添加贴图
						}
					}else{//当前物品果树
						if (Is_state == 0) {
							FarmNumM[e].firstChild.src = "imges/tree/" + Position_name[tree] + "/" + Season+ "/" + Is_state + ".png";
						}else{
							FarmNumM[e].firstChild.src = "imges/tree/" + Position_name[tree] + "/" + Is_state + ".png";
						}
					}	
				}
				break;
				case "Pickaxe"://当前状态为十字镐
				var Del_Position = Position.indexOf(e);//获取物品坐标位置
				var Del_floorArr = floorArr.indexOf(e);//获取地板坐标位置
				var Del_fenceArr = fenceArr.indexOf(e);//获取栅栏坐标位置
				var Del_doorArr = doorArr.indexOf(e);//获取门坐标位置
				if (Position_Catalog[Del_Position] == 0 && Position_name[Del_Position] == 3) {
					// Greenhouse_status = 1;
					verification_Greenhouse(1);
				}
				if (Del_Position != -1) {//如果当前坐标物品不为空
					Position.splice(Del_Position,1);//删除坐标
					Position_Catalog.splice(Del_Position,1);//删除目录序号
					Position_name.splice(Del_Position,1);//删除物品序号
					Position_Season_spring.splice(Del_Position,1);//删除春季标记
					Position_Season_summer.splice(Del_Position,1);//删除夏季标记
					Position_Season_autumn.splice(Del_Position,1);//删除秋季标记
					Position_Season_winter.splice(Del_Position,1);//删除冬季标记
					Position_Number.splice(Del_Position,1);//删除状态数量信息
					Position_state.splice(Del_Position,1);//删除当前状态信息
				}
				if (Del_floorArr != -1) {//如果当前坐标地板不为空
					floorArr.splice(Del_floorArr,1);//删除地板坐标
					floor_name.splice(Del_floorArr,1);//删除地板序号
				}
				if (Del_fenceArr != -1) {//如果当前坐标栅栏不为空
					fenceArr.splice(Del_fenceArr,1);//删除栅栏坐标
					fence_name.splice(Del_fenceArr,1);//删除栅栏序号
				}
				if (Del_doorArr != -1) {//如果当前坐标门不为空
					doorArr.splice(Del_doorArr,1);//删除门坐标
					door_name.splice(Del_doorArr,1);//删除门序号
				}
				sign_X.splice(e,1,0);//删除宽度标记
				sign_Y.splice(e,1,0);//删除高度标记
				FarmNumM[IsE].firstChild.style.top = "0em";//清除纵向偏移
				FarmNumM[IsE].firstChild.style.left = "0em";//清除横向偏移
				FarmNumM[IsE].firstChild.style.width = "1em";//初始化地块宽度
				FarmNumM[IsE].firstChild.style.height = "1em";//初始化地块高度
				FarmNumT[IsE].firstChild.style.top = "0em";//清除纵向偏移
				FarmNumT[IsE].firstChild.style.left = "0em";//清除横向偏移
				FarmNumT[IsE].firstChild.style.width = "1em";//初始化地块宽度
				FarmNumT[IsE].firstChild.style.height = "1em";//初始化地块高度
				FarmNumM[e].firstChild.src = "imges/0.png"//初始化地块物品层贴图
				FarmNumB[e].firstChild.src = "imges/0.png"//初始化地块地板层贴图
				FarmNumT[e].firstChild.src = "imges/0.png"//初始化地块地板层贴图
				door();//校准门状态
				fence();//校准栅栏状态
				floor();//校准地板状态
				MapDel();
				Prohibit();
				break;
				case "dyeing"://当前状态为染色剂
				var dyeing_Position = Position.indexOf(e);//获取物品坐标位置
				var dyeing_Catalog = Position_Catalog[dyeing_Position];//获取物品目录序号
				var dyeing_name = Position_name[dyeing_Position];//获取物品序号
				if (dyeing_Catalog == 2 && Position_Number[dyeing_Position] != 1) {//如果地块内物品为宝箱
					if (Position_state[dyeing_Position] == Position_Number[dyeing_Position]) {
						var Num = 0;
					}else{
						var Num = Position_state[dyeing_Position] + 1;
					}//宝箱颜色状态循环
					Position_state.splice(dyeing_Position,1,Num);//更新宝箱当前状态
					FarmNumM[e].firstChild.src = "imges/tool/" + dyeing_name + "/" + Num +".png"//更新宝箱贴图
				}else{//当前物品非宝箱
					console.log("不是宝箱");
				}
				break;
			}
		}else{
			console.log("地块不可选");
		}
		
	}
})
/////////////////////////////////////↑↑↑↑放置物品↑↑↑↑/////////////////////////////////////
/////////////////////////////////////↓↓↓↓物品菜单↓↓↓↓/////////////////////////////////////
menuBody.addEventListener("click",function(e){
	if (e.target.nodeName == "IMG") {//判断被点击目标的是否为img
		otherSign = e.target.index;//获取物品序号
		continuityNum = undefined;
		continuityArr = [];
		console.log(otherSign);
		var ImgName = ["Architecture/" + otherSign,"crops/" + otherSign + "/" + 0,"tool/" + otherSign,"other/" + otherSign,"tree/" + otherSign + "/" + Season + "/" + 0];//目录序号对应路径
		if (otherSign != undefined) {//当前有选中的物品
			IMG = "imges/" + ImgName[menuBodySign] + ".png";//刷新移入是贴图
		}
		if (menuBodySign == 0 && otherSign != undefined) {//当前菜单为建筑
			NAME = ArchitectureNum[otherSign];
			var d = otherSign;//前五个按钮为设置固定建筑物,直接更换贴图
			switch (d){
			case 0:FarmNumM[1339].firstChild.src = "imges/Architecture/House-S.png";
			break;
			case 1:FarmNumM[1339].firstChild.src = "imges/Architecture/House-M.png";
			break;
			case 2:FarmNumM[1339].firstChild.src = "imges/Architecture/House-L.png";
			break;
			case 3:
			if (Greenhouse_status == 2) {
				Del_Greenhouse();
			}
			break;
		 	}
		 	if (e.target.id != "body-btn") {
		 		Write();//点击按钮非滚动条时执行写入数据
		 	}
		}else if (menuBodySign == 1 && otherSign != undefined) {//当前菜单为农作物
			NAME = cropsNum[otherSign];
		 	if (e.target.id != "body-btn") {
		 		Write();
		 	}
		 	
		 	
		}else if (menuBodySign == 2 && otherSign != undefined) {//当前菜单为工艺与装饰
			NAME = toolNum[otherSign];
			if (e.target.id != "body-btn") {
		 		Write();
		 	}
		}else if (menuBodySign == 3 && otherSign != undefined) {//当前菜单为栅栏与地板
			if (e.target.index < 5) {
				IMG = "imges/other/" + otherSign + "/0.png";
			}else{
				IMG = "imges/other/" + floor_Season + "/" + otherSign + "/1.png";
			}
			NAME = otherNum[otherSign];
			if (e.target.id != "body-btn") {
		 		Write();
		 	}
		}else if (menuBodySign == 4 && otherSign != undefined) {//当前菜单为树木
			NAME = treeNum[otherSign];
			if (otherSign == 12) {
				IMG = "imges/tree/" + otherSign + "/" + "0.png";
			}
			if (e.target.id != "body-btn") {
		 		Write();
		 	}
		}else if (menuBodySign == 5 && otherSign != undefined) {//当前菜单为npc
			IMG = "imges/0.png";//刷新移入是贴图
			Position_name.splice(Position_Catalog.indexOf(5),1,otherSign)
			if (map_state == 6) {
				FarmNumM[299].firstChild.src = "imges/NPC/" + otherSign + "/" + Season+ ".png";
			}else if (map_state == 7) {
				FarmNumM[588].firstChild.src = "imges/NPC/" + otherSign + "/" + Season+ ".png";
			}else{
				FarmNumM[549].firstChild.src = "imges/NPC/" + otherSign + "/" + Season+ ".png";
			}

			// FarmNumM[549].firstChild.src = "imges/NPC/" + otherSign + "/" + Season+ ".png";
			name_txt = NPC_Arr[otherSign][11];//获取当前物品名称文本
			describe_text = NPC_Arr[otherSign][12];//获取当前物品介绍文本
			name_text_1.innerHTML = name_txt;//写入名称栏
			name_text_2.innerHTML = name_txt;//写入名称栏
			describe_1.innerHTML = describe_text;//写入内容栏
			describe_2.innerHTML = describe_text;//写入内容栏
		}
		Menu_status = true;//标记菜单状态
		Initialization();
		signMapX();
		signMap();
		door();
		if (menuBodySign == 1 && otherSign != undefined) {
			if (otherSign != 40 && otherSign != 41) {
		 		Cultivation();//标记农作物禁用地块
		 	}
		 	if (otherSign == 40) {
		 		fruiter();
		 	}
		}
		if (menuBodySign == 0) {
			signMapY();
		}
		if (menuBodySign == 4) {
			for (var i = 0; i < fruiter_sign.length; i++) {//禁用不能种树地块
				FarmNumB[fruiter_sign[i]].style.pointerEvents = "none";
			}
			if (otherSign > 3 && otherSign < 12) {
				fruiter();
			}else{
				
			}
		}
		
		if (state != "common" && state != "Hoe") {
			MapDel();//解锁全部地块
		}
		if (menuBodySign == 3 && otherSign > 4) {
			floor();
		}
		if (menuBodySign == 1 && otherSign != undefined) {
			floorSign();
		}
		Prohibit()
	}
})
/////////////////////////////////////↑↑↑↑物品菜单↑↑↑↑/////////////////////////////////////
function fence() {//校准栅栏状态
	console.log("fence()");
	for (var i = 0 ; i < fenceArr.length; i++) {//遍历栅栏数组
		var up = fence_name[fenceArr.indexOf(fenceArr[i] - MapWidth)];//定义坐标"上"
		var down = fence_name[fenceArr.indexOf(fenceArr[i] + MapWidth)];//定义坐标"下"
		var left = fence_name[fenceArr.indexOf(fenceArr[i] - 1)];//定义坐标"左"
		var right = fence_name[fenceArr.indexOf(fenceArr[i] + 1)];//定义坐标"右"
		var name = fence_name[i];//获取地板序号
		// console.log(name);
		// console.log(up + "," + down + "," + left + "," + right);
		if (up != name && down != name && left != name && right != name) {
			var Is_state = 1;//上下左右都不与当前地板相同时,状态设置为1
		}else if (up == name && down != name && left != name && right != name) {
			var Is_state = 2;
		}else if (up != name && down == name && left != name && right != name) {
			var Is_state = 1;
		}else if (up != name && down != name && left == name && right != name) {
			var Is_state = 3;
		}else if (up != name && down != name && left != name && right == name) {
			var Is_state = 4;
		}else if (up == name && down == name && left != name && right != name) {
			var Is_state = 2;
		}else if (up != name && down != name && left == name && right == name) {
			var Is_state = 7;
		}else if (up == name && down == name && left == name && right != name) {
			var Is_state = 9;
		}else if (up == name && down == name && left != name && right == name) {
			var Is_state = 8;
		}else if (up == name && down == name && left == name && right == name) {
			var Is_state = 10;
		}else if (up == name && down != name && left == name && right != name) {
			var Is_state = 6;
		}else if (up == name && down != name && left != name && right == name) {
			var Is_state = 5;
		}else if (up != name && down == name && left == name && right != name) {
			var Is_state = 9;
		}else if (up != name && down == name && left != name && right == name) {
			var Is_state = 8;
		}else if (up != name && down == name && left == name && right == name) {
			var Is_state = 10;
		}else if (up == name && down != name && left == name && right == name) {
			var Is_state = 7;
		}
		FarmNumM[fenceArr[i]].firstChild.src = "imges/other/" + fence_name[i] + "/" + Is_state + ".png";//更新贴图
		FarmNumM[fenceArr[i]].firstChild.style.top = "-1em";
		FarmNumM[fenceArr[i]].firstChild.style.left = "0em";
		FarmNumM[fenceArr[i]].firstChild.style.width = "1em";
		FarmNumM[fenceArr[i]].firstChild.style.height = "2em";
		Timg = FarmNumM[fenceArr[i]].firstChild.src;
		FarmNumB[fenceArr[i]].style.pointerEvents = "none";//设置当前地块禁用
	}
}
function door() {//校准门状态
	for (var i = 0 ; i < doorArr.length; i++) {//遍历门数组
		var up = fenceArr[fenceArr.indexOf(doorArr[i] - MapWidth)];//定义坐标"上"
		var down = fenceArr[fenceArr.indexOf(doorArr[i] + MapWidth)];//定义坐标"下"
		var left = fenceArr[fenceArr.indexOf(doorArr[i] - 1)];//定义坐标"左"
		var right = fenceArr[fenceArr.indexOf(doorArr[i] + 1)];//定义坐标"右"
		// console.log(fenceArr.indexOf(doorArr[i] + 1))
		// console.log(up+","+down+","+left+","+right)
		if (up == undefined && down == undefined && left == undefined && right == undefined) {
			var Is_state = 1;//如果上下左右都无栅栏,则门状态设置为1
			FarmNumM[doorArr[i]].firstChild.style.top = "-1em";
			FarmNumM[doorArr[i]].firstChild.style.left = "0em";
			FarmNumM[doorArr[i]].firstChild.style.width = "1em";
			FarmNumM[doorArr[i]].firstChild.style.height = "2em";
		}else if (up != undefined && down == undefined && left == undefined && right == undefined) {
			var Is_state = 7;
			FarmNumM[doorArr[i]].firstChild.style.top = "-2em";
			FarmNumM[doorArr[i]].firstChild.style.width = "1em";
			FarmNumM[doorArr[i]].firstChild.style.height = "3em";
			
		}else if (up == undefined && down != undefined && left == undefined && right == undefined) {
			var Is_state = 6;
			FarmNumM[doorArr[i]].firstChild.style.top = "-2em";
			FarmNumM[doorArr[i]].firstChild.style.width = "1em";
			FarmNumM[doorArr[i]].firstChild.style.height = "3em";
		}else if (up == undefined && down == undefined && left != undefined && right == undefined) {
			var Is_state = 3;
			FarmNumM[doorArr[i]].firstChild.style.top = "-1em";
			FarmNumM[doorArr[i]].firstChild.style.left = "-1em";
			FarmNumM[doorArr[i]].firstChild.style.width = "2em";
			FarmNumM[doorArr[i]].firstChild.style.height = "2em";
		}else if (up == undefined && down == undefined && left == undefined && right != undefined) {
			var Is_state = 4;
			FarmNumM[doorArr[i]].firstChild.style.top = "-1em";
			FarmNumM[doorArr[i]].firstChild.style.left = "0em";
			FarmNumM[doorArr[i]].firstChild.style.width = "2em";
			FarmNumM[doorArr[i]].firstChild.style.height = "2em";
		}else if (up != undefined && down != undefined && left == undefined && right == undefined) {
			var Is_state = 5;
			FarmNumM[doorArr[i]].firstChild.style.top = "-2em";
			FarmNumM[doorArr[i]].firstChild.style.width = "1em";
			FarmNumM[doorArr[i]].firstChild.style.height = "3em";
		}else if (up == undefined && down == undefined && left != undefined && right != undefined) {
			var Is_state = 2;
			FarmNumM[doorArr[i]].firstChild.style.top = "-1em";
			FarmNumM[doorArr[i]].firstChild.style.left = "-1em";
			FarmNumM[doorArr[i]].firstChild.style.width = "3em";
			FarmNumM[doorArr[i]].firstChild.style.height = "2em";
		}else if (up != undefined || down != undefined || left != undefined || right != undefined) {
			var Is_state = 1;
			FarmNumM[doorArr[i]].firstChild.style.top = "-1em";
			FarmNumM[doorArr[i]].firstChild.style.left = "0em";
			FarmNumM[doorArr[i]].firstChild.style.width = "1em";
			FarmNumM[doorArr[i]].firstChild.style.height = "2em";
		}
		FarmNumM[doorArr[i]].firstChild.src = "imges/other/" + 4 + "/" + Is_state + ".png";//更新门贴图
		Timg = FarmNumM[doorArr[i]].firstChild.src = "imges/other/" + 4 + "/" + Is_state + ".png";
		FarmNumB[doorArr[i]].style.pointerEvents = "none";
	}
}
function IsAdd() {//将物品信息写入数据库
		Position.push(IsE);//写入坐标
		Position_Catalog.push(menuBodySign);//写入目录序号
		Position_name.push(otherSign);//写入物品序号
		Position_Season_spring.push(Season_spring);//写入春季
		Position_Season_summer.push(Season_summer);//写入夏季
		Position_Season_autumn.push(Season_autumn);//写入秋季
		Position_Season_winter.push(Season_winter);//写入冬季
		Position_Number.push(GoodsNumber);//写入变化状态数量
		Position_state.push(Is_state);//写入当前状态
		sign_X.splice(IsE,1,signX);//写入物品宽度
		sign_Y.splice(IsE,1,signY);//写入物品高度
		FarmNumM[IsE].firstChild.style.top = IMG_T;//设置纵向偏移
		FarmNumM[IsE].firstChild.style.left = IMG_L;//设置横向偏移
		FarmNumM[IsE].firstChild.style.width = IMG_W;//设置物品宽度
		FarmNumM[IsE].firstChild.style.height = IMG_H;//设置物品高度
		// console.log(Position);
		// console.log(Position_name);
		// console.log(Position_Catalog);
		// console.log(Position_Season_spring);
		// console.log(Position_Season_summer);
		// console.log(Position_Season_autumn);
		// console.log(Position_Season_winter);
		// console.log(Position_Number);
		// console.log(sign_X);
		// console.log(sign_Y);
}
function fruiter() {//当前物品为果树时禁用所有树木周围两圈地块
	console.log("fruiter");
	for (var i = 0; i < fruiter_sign.length; i++) {//禁用不能种树地块
		FarmNumB[fruiter_sign[i]].style.pointerEvents = "none";
	}
	for (var i = 0; i < Position.length; i++) {
		if (Position_Catalog[i] == 4) {
			var y = Position[i]
			for (var x = -2; x < 3; x++) {
				for (var z = -2; z < 3; z++) {
					FarmNumB[y-(MapWidth*x)-(z)].style.pointerEvents = "none";
				}
			}
		}
	}
}
function Initialization() {//将所有未标记地块设置为可选
	console.log("Initialization");
	for (var i = 0; i < sign_X.length; i++) {
		if (sign_X[i] == 0) {
			FarmNumB[i].style.pointerEvents = "auto";
			FarmNumB[i].firstChild.style.background = "";
			FarmNumB[i].firstChild.style.opacity =  "1";
		}
	}
}
function signMap() {//设置高度大于2的物品纵向禁用地块
	console.log("signMap");
	for (var i = 0; i < sign_X.length; i++) {
		if (sign_X[i] != 0) {
			for (var x = 0; x < sign_X[i]; x++) {
				for (var y = 0; y < sign_Y[i]; y++) {
					FarmNumB[i+x-MapWidth*y].style.pointerEvents = "none";
				}
			}
		}
	}
}


function signMapX() {
	console.log("signMapX");
	for (var i = 0; i < sign_X.length; i++) {
		if (sign_X[i] != 0 && i-signX+1 > 0) {
			for (var x = 0; x < signX; x++) {
				FarmNumB[i-x].style.pointerEvents = "none";
				for (var y = 0; y < sign_Y[i]; y++) {
					if (i-x-MapWidth*y > 0) {
						FarmNumB[i-x-MapWidth*y].style.pointerEvents = "none";
					}
				}
			}
		}
		if (sign_X[i] != 0) {
			for (var x = 0; x < sign_X[i]; x++) {
				for (var y = 0; y < signY; y++) {
					if (i+x+MapWidth*y < 5200) {
						FarmNumB[i+MapWidth*y+x].style.pointerEvents = "none";
					}
				}
			}
			for (var x = 0; x < signX; x++) {
				for (var y = 1; y < signY; y++) {
					if (i+MapWidth*y-x > 0 && i+MapWidth*y-x <5200) {
						FarmNumB[i-x+MapWidth*y].style.pointerEvents = "none";
					}
				}
			}
		}
	}
}
function signMapY() {
	console.log("signMapY");
	for (var i = 0; i < Architecture_sign.length; i++) {
		var sign = Architecture_sign[i];
		for (var x = 0; x < signX; x++) {
			FarmNumB[sign-x].style.pointerEvents = "none";
			for (var y = 1; y < signY; y++) {
				if (sign+MapWidth*y-x > 0 && sign+MapWidth*y-x <5200) {
					FarmNumB[sign-x+MapWidth*y].style.pointerEvents = "none";
				}
			}
		}
		for (var y = 0; y < signY; y++) {
			if (sign+MapWidth*y < 5200) {
				FarmNumB[sign+MapWidth*y].style.pointerEvents = "none";
			}
		}
	}
	// 温室专用标记计算
	if (menuBodySign == 0 && otherSign == 3) {
		for (var i = 0; i < sign_X.length; i++) {
			if (sign_X[i] != 0) {
				for (var x = 0; x < sign_X[i]; x++) {
					if (i+x-MapWidth*(2+sign_Y[i]) > 0) {
						FarmNumB[i+x-MapWidth*sign_Y[i]-2].style.pointerEvents = "none";
						FarmNumB[i+x-MapWidth*(1+sign_Y[i])-2].style.pointerEvents = "none";
						FarmNumB[i+x-MapWidth*sign_Y[i]-3].style.pointerEvents = "none";
						FarmNumB[i+x-MapWidth*(1+sign_Y[i])-3].style.pointerEvents = "none";
						FarmNumB[i+x-MapWidth*sign_Y[i]-4].style.pointerEvents = "none";
						FarmNumB[i+x-MapWidth*(1+sign_Y[i])-4].style.pointerEvents = "none";
					}
				}
			}
		}
	}
}

function Write() {//获取当前物品数据
	console.log("Write");
	state = "common";//当前状态设置为"通常"
	IMG_T = NAME[0];//获取当前物品向上偏移量
	IMG_L = NAME[1];//获取当前物品向左偏移量
	IMG_W = NAME[2];//获取当前物品宽度
	IMG_H = NAME[3];//获取当前物品高度
	signX = NAME[4];//获取当前物品占地宽度
	signY = NAME[5];//获取当前物品占地高度
	Season_spring = NAME[6];//获取当前物品春季状态
	Season_summer = NAME[7];//获取当前物品夏季状态
	Season_autumn = NAME[8];//获取当前物品秋季状态
	Season_winter = NAME[9];//获取当前物品冬季状态
	GoodsNumber = NAME[10];//获取当前物品变化数量
	name_txt = NAME[11];//获取当前物品名称文本
	describe_text = NAME[12];//获取当前物品介绍文本
	name_text_1.innerHTML = name_txt;//写入名称栏
	name_text_2.innerHTML = name_txt;//写入名称栏
	describe_1.innerHTML = describe_text;//写入内容栏
	describe_2.innerHTML = describe_text;//写入内容栏
	// console.log(IMG);
	// console.log(IMG_T);
	// console.log(IMG_L);
	// console.log(IMG_W);
	// console.log(IMG_H);
	// console.log(signX);
	// console.log(signY);
	// console.log(IMG_icon_T);
	// console.log(IMG_icon_W);
	// console.log(IMG_icon_H);
}
function MapDel() {//解锁全部非初始地块
	console.log("MapDel");
	for (var i = 0 ; i < sign_map_del.length; i++) {
		if (sign_map_del[i] == 0) {
			FarmNumB[i].style.pointerEvents = "auto";
			FarmNumB[i].firstChild.style.background = "";
			FarmNumB[i].firstChild.style.opacity =  "1";
		}
			
	}
}
var menuBody0Num = [12,15,32,6,5,5];//菜单页内按钮行数
var menuBody0Num1 = [34,45,93,18,12,12];//菜单页内按钮数量
var menuBody0Name = ["Architecture","crops","tool","other","tree","NPC"];//菜单页内按钮路径
var menuBody0Class = ["other-icon","other-icon","other-icon","other-icon","other-icon","other-icon"];//菜单页内按钮class
for (var i = 0 ; i < menuBodyNum.length; i++) {//生成按钮
	var N = menuBodyNum[i];
	var M = menuBody0Num1[i];
	for (var x = 0 ; x < menuBody0Num[i]*3; x++) {
		var Img = document.createElement("img");
		Img.src = "imges/icon/" + menuBody0Name[i] + "/" + x + ".png";
		Img.index = x;
		if (x > M) {//空按钮,填充空位
			Img.src = "imges/0.png";
			Img.style.pointerEvents = "none";
		}
		N.appendChild(Img).className = menuBody0Class[i];
	}
}

Farm.onmouseover = function(e){//鼠标移入地块
	switch (state){
	case "common":if (e.target.index != undefined) {
		if ( menuBodySign == 3 && otherSign > 4) {
			var Z = FarmNumB;
		}else{
			var Z = FarmNumM;
		}
		Timg = Z[e.target.index].firstChild.src;
		Z[e.target.index].firstChild.src = IMG;
		Z[e.target.index].firstChild.style.top = IMG_T;
		Z[e.target.index].firstChild.style.left = IMG_L;
		Z[e.target.index].firstChild.style.width = IMG_W;
		Z[e.target.index].firstChild.style.height = IMG_H;
		}
		if (continuityArr.indexOf(e.target.index) != -1){
			var h = continuityNum - e.target.index;
			if (h > 0) {
				if (h >= MapWidth) {
					for (var i = 1; i < h/MapWidth; i++) {
						Z[continuityNum - i*MapWidth].firstChild.src = IMG;
						Z[continuityNum - i*MapWidth].firstChild.style.top = IMG_T;
						Z[continuityNum - i*MapWidth].firstChild.style.left = IMG_L;
						Z[continuityNum - i*MapWidth].firstChild.style.width = IMG_W;
						Z[continuityNum - i*MapWidth].firstChild.style.height = IMG_H;
					}
				}else{
					for (var i = 1; i < h; i++) {
						Z[continuityNum - i].firstChild.src = IMG;
						Z[continuityNum - i].firstChild.style.top = IMG_T;
						Z[continuityNum - i].firstChild.style.left = IMG_L;
						Z[continuityNum - i].firstChild.style.width = IMG_W;
						Z[continuityNum - i].firstChild.style.height = IMG_H;
					}
				}
			}else{
				if (h <= (-MapWidth)) {
					for (var i = 1; i < -(h/MapWidth); i++) {
						Z[continuityNum + i*MapWidth].firstChild.src = IMG;
						Z[continuityNum + i*MapWidth].firstChild.style.top = IMG_T;
						Z[continuityNum + i*MapWidth].firstChild.style.left = IMG_L;
						Z[continuityNum + i*MapWidth].firstChild.style.width = IMG_W;
						Z[continuityNum + i*MapWidth].firstChild.style.height = IMG_H;
					}
				}else{
					for (var i = 1; i < -h; i++) {
						Z[continuityNum + i].firstChild.src = IMG;
						Z[continuityNum + i].firstChild.style.top = IMG_T;
						Z[continuityNum + i].firstChild.style.left = IMG_L;
						Z[continuityNum + i].firstChild.style.width = IMG_W;
						Z[continuityNum + i].firstChild.style.height = IMG_H;
					}
				}
			}
		}else{

		}
	break;
	// case "Kettle":console.log(state);
	// break;
	// case "Hoe":console.log(state);
	// break;
	// case "Axe":console.log(state);
	// break;
	// case "Pickaxe":console.log(state);
	// break;
	}
}
Farm.onmouseout = function(e){//鼠标移出地块
	switch (state){
	case "common":if (e.target.index != undefined) {
		if (menuBodySign == 3 && otherSign > 4) {
			FarmNumB[e.target.index].firstChild.src = Timg;
			if (continuityNum != undefined){
				for (var i = 0; i < continuityArr.length; i++) {
					FarmNumB[continuityArr[i]].firstChild.src = "imges/0.png";
				}
			}
		}else{
			FarmNumM[e.target.index].firstChild.src = Timg;
			if (continuityNum != undefined){
				for (var i = 0; i < continuityArr.length; i++) {
					FarmNumM[continuityArr[i]].firstChild.src = "imges/0.png";
				}
			}
		}
	}
	
	break;
	// case "Kettle":console.log(state);
	// break;
	// case "Hoe":console.log(state);
	// break;
	// case "Axe":console.log(state);
	// break;
	// case "Pickaxe":console.log(state);
	// break;
	}
}
function huge() {//删除巨大作物和陨石下方地板
	console.log("huge");
	var m = NAME[4];
	for (var i = 0 ; i < m; i++) {
		for (var x = 0 ; x < m; x++) {
			var e = IsE - i*MapWidth + x*1;
			var n = floorArr.indexOf(e)
			if (n != -1 && floor_name[n] != 16) {
				floorArr.splice(n,1);
				floor_name.splice(n,1);
				FarmNumB[e].firstChild.src = "imges/0.png";
			}
		}
	}
}
function floorSign() {//校准地板禁用状态
	console.log("floorSign");
	for (var i = 0 ; i < floorArr.length; i++) {
		if (menuBodySign == 1 && floor_name[i] != 16) {
			FarmNumB[floorArr[i]].style.pointerEvents = "none";
		}else{
			var Position_1 = Position.indexOf(floorArr[i]);
			var Position_2 = fenceArr.indexOf(floorArr[i]);
			if (Position_1 != -1 || Position_2 != -1) {
				FarmNumB[floorArr[i]].style.pointerEvents = "none";
			}else{
				FarmNumB[floorArr[i]].style.pointerEvents = "auto";
			}
		}	
	}
}
function floor() {//校准地板状态
	console.log("floor");
	for (var i = 0 ; i < floorArr.length; i++) {
		// console.log(floorArr[i]+1);
		var up = floor_name[floorArr.indexOf(floorArr[i] - MapWidth)];
		var down = floor_name[floorArr.indexOf(floorArr[i] + MapWidth)];
		var left = floor_name[floorArr.indexOf(floorArr[i] - 1)];
		var right = floor_name[floorArr.indexOf(floorArr[i] + 1)];
		var L_up = floor_name[floorArr.indexOf(floorArr[i] - MapWidth - 1)];
		var L_down = floor_name[floorArr.indexOf(floorArr[i] + MapWidth - 1)];
		var R_up = floor_name[floorArr.indexOf(floorArr[i] - MapWidth + 1)];
		var R_down = floor_name[floorArr.indexOf(floorArr[i] + MapWidth + 1)];
		var name = floor_name[i];
		// console.log(up + "," + down + "," + left + "," + right);
		// console.log(L_up + "," +L_down + "," + R_up + "," + R_down);
		if (Season == "winter") {
			floor_Season = "winter";
		}else{
			floor_Season = "notwinter";
		}
		if (name == 17){
			FarmNumB[floorArr[i]].firstChild.src = "imges/other/" + floor_Season + "/17/" + Math.ceil(Math.random()*16) + ".png";//添加随机地板贴图
		}
		if (name != 17) {

			if (up != name && down != name && left != name && right != name) {
				var Is_state = 1;
			}else if (up == name && down != name && left != name && right != name) {
				var Is_state = 2;
			}else if (up != name && down == name && left != name && right != name) {
				var Is_state = 3;
			}else if (up == name && down == name && left != name && right != name) {
				var Is_state = 4;
			}else if (up != name && down != name && left != name && right == name) {
				var Is_state = 5;
			}else if (up != name && down != name && left == name && right != name) {
				var Is_state = 6;
			}else if (up != name && down != name && left == name && right == name) {
				var Is_state = 7;
			}else if (up == name && down == name && left == name && right == name) {
				if (name > 4 && name < 12) {
					if (L_up == name && L_down == name && R_up == name && R_down == name) {
						var Is_state = 12;
					}else if (L_up != name && L_down != name && R_up != name && R_down != name) {
						var Is_state = 17;
					}else if (L_up != name && L_down == name && R_up == name && R_down == name) {
						var Is_state = 18;
					}else if (L_up == name && L_down == name && R_up != name && R_down == name) {
						var Is_state = 19;
					}else if (L_up == name && L_down == name && R_up == name && R_down != name) {
						var Is_state = 20;
					}else if (L_up == name && L_down != name && R_up == name && R_down == name) {
						var Is_state = 21;
					}else if (L_up != name && L_down == name && R_up != name && R_down == name) {
						var Is_state = 22;
					}else if (L_up == name && L_down == name && R_up != name && R_down != name) {
						var Is_state = 23;
					}else if (L_up == name && L_down != name && R_up == name && R_down != name) {
						var Is_state = 24;
					}else if (L_up != name && L_down != name && R_up == name && R_down == name) {
						var Is_state = 25;
					}else if (L_up == name && L_down != name && R_up != name && R_down == name) {
						var Is_state = 26;
					}else if (L_up != name && L_down == name && R_up == name && R_down != name) {
						var Is_state = 27;
					}else if (L_up == name && L_down != name && R_up != name && R_down != name) {
						var Is_state = 28;
					}else if (L_up != name && L_down != name && R_up == name && R_down != name) {
						var Is_state = 29;
					}else if (L_up != name && L_down != name && R_up != name && R_down == name) {
						var Is_state = 30;
					}else if (L_up != name && L_down == name && R_up != name && R_down != name) {
						var Is_state = 31;
					}
				}else{
					var Is_state = 12;
				}
				
			}else if (up != name && down == name && left != name && right == name) {
				if (name > 4 && name < 12) {
					if (R_down == name) {
						var Is_state = 8;
					}else if (R_down != name) {
						var Is_state = 32;
					}
				}else{
					var Is_state = 8;
				}

			}else if (up != name && down == name && left == name && right != name) {
				if (name > 4 && name < 12) {
					if (L_down == name) {
						var Is_state = 10;
					}else if (L_down != name) {
						var Is_state = 33;
					}
				}else{
					var Is_state = 10;
				}

			}else if (up == name && down != name && left != name && right == name) {
				if (name > 4 && name < 12) {
					if (R_up == name) {
						var Is_state = 14;
					}else if (R_up != name) {
						var Is_state = 34;
					}
				}else{
					var Is_state = 14;
				}
			}else if (up == name && down != name && left == name && right != name) {
				if (name > 4 && name < 12) {
					if (L_up == name) {
						var Is_state = 16;
					}else if (L_up != name) {
						var Is_state = 35;
					}
				}else{
					var Is_state = 16;
				}
				
			}else if (up != name && down == name && left == name && right == name) {
				if (name > 4 && name < 12) {
					if (L_down != name && R_down != name) {
						var Is_state = 36;
					}else if (L_down != name && R_down == name) {
						var Is_state = 37;
					}else if (L_down == name && R_down != name) {
						var Is_state = 38;
					}else if (L_down == name && R_down == name) {
						var Is_state = 9;
					}
				}else{
					var Is_state = 9;
				}
				
			}else if (up == name && down != name && left == name && right == name) {
				if (name > 4 && name < 12) {
					if (L_up != name && R_up != name) {
						var Is_state = 45;
					}else if (L_up != name && R_up == name) {
						var Is_state = 46;
					}else if (L_up == name && R_up != name) {
						var Is_state = 47;
					}else if (L_up == name && R_up == name) {
						var Is_state = 15;
					}
				}else{
					var Is_state = 15;
				}

			}else if (up == name && down == name && left != name && right == name) {
				if (name > 4 && name < 12) {
					if (R_up != name && R_down != name) {
						var Is_state = 39;
					}else if (R_up != name && R_down == name) {
						var Is_state = 40;
					}else if (R_up == name && R_down != name) {
						var Is_state = 41;
					}else if (R_up == name && R_down == name) {
						var Is_state = 11;
					}
				}else{
					var Is_state = 11;
				}

			}else if (up == name && down == name && left == name && right != name) {
				if (name > 4 && name < 12) {
					if (L_up != name && L_down != name) {
						var Is_state = 42;
					}else if (L_up != name && L_down == name) {
						var Is_state = 43;
					}else if (L_up == name && L_down != name) {
						var Is_state = 44;
					}else if (L_up == name && L_down == name) {
						var Is_state = 13;
					}
				}else{
					var Is_state = 13;
				}

			}
			FarmNumB[floorArr[i]].firstChild.src = "imges/other/" + floor_Season + "/" + name + "/" + Is_state + ".png";
			
		}
		if (state != "Pickaxe") {
			Timg = FarmNumB[floorArr[i]].firstChild.src;
			FarmNumB[floorArr[i]].style.pointerEvents = "none";
		}
	}
}
function Kettle() {//开启水壶状态
	state = "Kettle";
	gif_state = 0;
	MapDel();
	GIF();//切换GIF演示
	console.log(state);
}
function Hoe() {//开启锄头状态
	state = "Hoe";
	gif_state = 1;
	IMG_T = 0;//获取当前物品向上偏移量
	IMG_L = 0;//获取当前物品向左偏移量
	IMG_W = 1;//获取当前物品宽度
	IMG_H = 1;//获取当前物品高度
	signX = 1;//获取当前物品占地宽度
	signY = 1;//获取当前物品占地高度
	GIF();//切换GIF演示
	console.log(state);
}
function Axe() {//开启斧头状态
	state = "Axe";
	gif_state = 2;
	MapDel();
	GIF();//切换GIF演示
	console.log(state);
}
function Pickaxe() {//开启十字镐状态
	state = "Pickaxe";
	gif_state = 3;
	MapDel();
	GIF();//切换GIF演示
	console.log(state);
}

function dyeing() {//开启染色剂状态
	state = "dyeing";
	gif_state = 4;
	MapDel();
	GIF();//切换GIF演示
	console.log(state);
	
}
function Cultivation() {//当前物品是农作物时,禁用无法种植地块
	console.log("Cultivation");
	for (var i = 0; i < Cultivation_sign.length; i++) {
		var x = Cultivation_sign[i];
		if (state == "Hoe" || menuBodySign == 1) {
			FarmNumB[x].style.pointerEvents = "none";
		}else{
			FarmNumB[x].style.pointerEvents = "auto";
		}
		
	}
}

function GIF() {//将演示GIF和文本切换到当前工具
	var IsGif = ["Kettle","Hoe","Axe","Pickaxe","dyeing"];
	tool_div.style.background = "url(imges/" + IsGif[gif_state] + ".gif)";
	tool_Title_1.innerHTML = tool_Title[gif_state];
	tool_Title_2.innerHTML = tool_Title[gif_state];
	tool_text_1.innerHTML = tool_text[gif_state];
	tool_text_2.innerHTML = tool_text[gif_state];
}
function Grid() {//开启网格系统
	var Grid_Btn = document.getElementById("Grid");
	if (Grid_status == false) {
		Grid_Btn.src = "imges/Grid-2.png";
		Grid_status = true;
		Prohibit()
	}else{
		for (var i = 0; i < Frame_Num; i++) {
			FarmNumT[i].firstChild.src = "imges/0.png";
		}
		Grid_Btn.src = "imges/Grid-1.png";
		Grid_status = false;
	}
}
function Range() {//开启祝尼魔和稻草人范围标记
	console.log("Range");
	FarmTop.style.display = "flex";
	var Range_Btn = document.getElementById("Range");
	if (Range_status == false) {
		Range_Btn.src = "imges/Range-2.png";
		Range_status = true;
		Range_fun();
	}else{
		Range_Btn.src = "imges/Range-1.png";
		Range_status = false;
		for (var i = 0 ; i < Position.length; i++) {
			if (Position_Catalog[i] == 2 && Position_name[i] > 0 && Position_name[i] < 10) {
				FarmNumT[Position[i]].firstChild.src = "imges/t.png"
				FarmNumT[Position[i]].firstChild.style.top = "0em";
				FarmNumT[Position[i]].firstChild.style.left = "0em";
				FarmNumT[Position[i]].firstChild.style.width = "1em";
				FarmNumT[Position[i]].firstChild.style.height = "1em";
				FarmNumT[Position[i]].firstChild.style.zIndex = 1;
			}else if (Position_Catalog[i] == 2 && Position_name[i] == 10) {
				FarmNumT[Position[i]].firstChild.src = "imges/t.png"
				FarmNumT[Position[i]].firstChild.style.top = "0em";
				FarmNumT[Position[i]].firstChild.style.left = "0em";
				FarmNumT[Position[i]].firstChild.style.width = "1em";
				FarmNumT[Position[i]].firstChild.style.height = "1em";
				FarmNumT[Position[i]].firstChild.style.zIndex = 1;
			}else if (Position_Catalog[i] == 0 && Position_name[i] == 28) {
				FarmNumT[Position[i]].firstChild.src = "imges/t.png"
				FarmNumT[Position[i]].firstChild.style.top = "0em";
				FarmNumT[Position[i]].firstChild.style.left = "0em";
				FarmNumT[Position[i]].firstChild.style.width = "1em";
				FarmNumT[Position[i]].firstChild.style.height = "1em";
				FarmNumT[Position[i]].firstChild.style.zIndex = 1;
			}
		}
		Prohibit();
	}
	
}
function Range_fun() {//刷新祝尼魔和稻草人范围标记
	if (Range_status == true) {
		for (var i = 0 ; i < Position.length; i++) {
			if (Position_Catalog[i] == 2 && Position_name[i] > 0 && Position_name[i] < 10) {
				FarmNumT[Position[i]].firstChild.src = "imges/scarecrow.png"
				FarmNumT[Position[i]].firstChild.style.top = "-8em";
				FarmNumT[Position[i]].firstChild.style.left = "-8em";
				FarmNumT[Position[i]].firstChild.style.width = "17em";
				FarmNumT[Position[i]].firstChild.style.height = "17em";
				FarmNumT[Position[i]].firstChild.style.zIndex = 20;
			}else if (Position_Catalog[i] == 2 && Position_name[i] == 10) {
				FarmNumT[Position[i]].firstChild.src = "imges/luxury-scarecrow.png"
				FarmNumT[Position[i]].firstChild.style.top = "-16em";
				FarmNumT[Position[i]].firstChild.style.left = "-16em";
				FarmNumT[Position[i]].firstChild.style.width = "33em";
				FarmNumT[Position[i]].firstChild.style.height = "33em";
				FarmNumT[Position[i]].firstChild.style.zIndex = 20;
			}else if (Position_Catalog[i] == 0 && Position_name[i] == 28) {
				FarmNumT[Position[i]].firstChild.src = "imges/Junimos.png"
				FarmNumT[Position[i]].firstChild.style.top = "-8em";
				FarmNumT[Position[i]].firstChild.style.left = "-7em";
				FarmNumT[Position[i]].firstChild.style.width = "17em";
				FarmNumT[Position[i]].firstChild.style.height = "17em";
				FarmNumT[Position[i]].firstChild.style.zIndex = 10;
			}
			// console.log(FarmNumT[Position[i]]);
		}
	}
}
function Explain() {//开启教程页面
	var Explain_Btn = document.getElementById("Explain");
	document.getElementById("Course_content").style.display = "block";
}
var preview = document.getElementById("preview");
var preview1 = document.getElementById("preview1");
function screenshot(){//开始生成图片
	var screenshot = document.getElementById("screenshot");
	preview.style.display = "flex";//显示下载弹窗
	huanchong();//生成图片
}
function huanchong(){//将Frame生成图片
	html2canvas(Frame).then(function(canvas) {
	preview1.appendChild(canvas);
	var oCavans = document.getElementsByTagName("canvas")[0];
	var strDataURI1 = oCavans.toDataURL();
	downLoadFn(strDataURI1);
	});
};
 //判断浏览器类型
function myBrowser() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var isdivera = userAgent.indexOf("divera") > -1;
	if(isdivera) {
		return "divera"
	}; //判断是否divera浏览器
	if(userAgent.indexOf("Firefox") > -1) {
		return "FF";
	} //判断是否Firefox浏览器
	if(userAgent.indexOf("Chrome") > -1) {
		return "Chrome";
	}
	if(userAgent.indexOf("Safari") > -1) {
		return "Safari";
	} //判断是否Safari浏览器
	if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isdivera) {
		return "IE";
	}; //判断是否IE浏览器
	if(userAgent.indexOf("Trident") > -1) {
   	 return "Edge";
	} //判断是否Edge浏览器
}
myBrowser();
//IE浏览器图片保存本地
function SaveAs5(imgURL) {
	var divdiv = window.diven(imgURL, "", "width=1, height=1, top=5000, left=5000");
	for(; divdiv.document.readyState != "complete";) {
		if(divdiv.document.readyState == "complete") break;
	}
	divdiv.document.execCommand("SaveAs");
	divdiv.close();
}
function download(strDataURI1) {
	var link = document.getElementById("IsA");
	// link.innerHTML = "download_canvas_image";
	var name = document.getElementById("name-tenx").value;
	link.download = name + "农场";
	link.addEventListener("click", function(ev) {
	link.href = strDataURI1;
	}, false);
	document.getElementById("load").style.display = "none";
	document.getElementById("save").style.display = "block";
	document.getElementById("cancel").style.display = "block";
	// document.body.appendChild(link);
};
function downLoadFn(url) {
	if(myBrowser() === "IE" || myBrowser() === "Edge") {
		SaveAs5(url);
	} else {
		download(url);
	}
}
function cancel() {//关闭下载弹窗并删除图片预览
	var oCavans = document.getElementsByTagName("canvas")[0];
	preview1.removeChild(oCavans);
	preview.style.display = "none";
	document.getElementById("load").style.display = "block";
	document.getElementById("save").style.display = "none";
	document.getElementById("cancel").style.display = "none";
}
function Farm_name() {//开启命名弹窗
	document.getElementById("name-box").style.display = "block";
}

function Farm_name_OK() {//设置农场名称
	var name = document.getElementById("name-tenx").value;
	document.getElementById("Farm-name").style.display = "flex";
	document.getElementById("name-1").innerHTML = name + "农场";
	document.getElementById("name-2").innerHTML = name + "农场";
	document.getElementById("name").style.width = document.getElementById("name-2").offsetWidth + "px";
	document.getElementById("name").style.width = document.getElementById("name-2").offsetWidth + "px";
	document.getElementById("name-1").style.left = document.getElementById("name-2").offsetLeft - 2 + "px";
	document.getElementById("name-box").style.display = "none";
	screenshot();//开始生成图片
}
function Farm_name_skip() {//跳过命名
	screenshot();//开始生成图片
	document.getElementById("name-box").style.display = "none";
}
function Farm_name_cancel() {//取消命名
	document.getElementById("name-box").style.display = "none";
}
function Course_X() {//关闭说明
	document.getElementById("Course_content").style.display = "none";
}
function Course_prev() {//说明书上一页
	var Course_arr = document.getElementById("Course_content");
	var ARR = Course_arr.getElementsByClassName("Course_content");
	if (Course_Num > 0) {
		Course_Num = Course_Num - 1;	
	}else if (Course_Num == 0) {
		Course_Num = 0;
	}
	ARR[Course_Num].style.display = "block";
	ARR[Course_Num+1].style.display = "none";
}
function Course_next() {//说明书下一页
	var Course_arr = document.getElementById("Course_content");
	var ARR = Course_arr.getElementsByClassName("Course_content");
	if (Course_Num < 3) {
		Course_Num = Course_Num + 1;	
	}else if (Course_Num == 3) {
		Course_Num = 3;
	}
	ARR[Course_Num].style.display = "block";
	ARR[Course_Num-1].style.display = "none";
}
function Course_yes() {//开启说明
	document.getElementById("Course_content").style.display = "block";
	document.getElementById("Course").style.display = "none";
	localStorage.Explain_save = 0;
}
function Course_no() {//拒绝开启说明
	document.getElementById("Course").style.display = "none";
	localStorage.Explain_save = 0;
}
function House() {//跳转到装修模拟器
	window.open("https://xlg-zx.netlify.app/")
}
function author() {//显示联系作者联系方式
	document.getElementById("author").style.display = "block";
}
function author_X() {//关闭作者联系方式
	document.getElementById("author").style.display = "none";
}
function Statistics_X() {//关闭统计表
	document.getElementById("Statistics").style.display = "none";
	for (var i = 0 ; i < StatisticsArr_1.length; i++) {
		StatisticsArr_1[i].innerHTML = "";
		StatisticsArr_2[i].innerHTML = "";
	}
	document.getElementById("Statistics_table-1").style.display = "flex";
	document.getElementById("Statistics_table-2").style.display = "none";
	document.getElementById("Statistics-prev").style.display = "none";
	document.getElementById("Statistics-next").style.display = "none";
	document.getElementById("Statistics_table-1-img").style.display = "none";
}
function Statistics_prev() {
	document.getElementById("Statistics_table-1").style.display = "flex";
	document.getElementById("Statistics_table-2").style.display = "none";
}
function Statistics_next() {
	document.getElementById("Statistics_table-1").style.display = "none";
	document.getElementById("Statistics_table-2").style.display = "flex";
}
var time = 0;//计时
var timeX = 0//时间状态
var cloudY = document.getElementById("cloud");
var cloudN = cloudY.querySelectorAll("div");
var cloudX1 = cloudN[0].offsetLeft;//云1
var cloudX2 = cloudN[1].offsetLeft;//云2
var cloudX3 = cloudN[2].offsetLeft;//云3
var cloudX4 = cloudN[3].offsetLeft;//云4
var animation = setInterval("cloud()",50)//每50毫秒运行一次动画
function cloud() {
	if (timeX == 0) {
		window.time = time + 1;
		if (time == 300) {
			window.timeX = 1
		}
	}else if (timeX == 1) {
		window.time = time - 1;
		if (time == 1) {
			window.timeX = 0
		}
	}
	cloudN[0].style.left = cloudX1 + time +"px";
	cloudN[1].style.left = cloudX2 - time +"px";
	cloudN[2].style.left = cloudX4 - time*2 +"px";
	cloudN[3].style.left = cloudX3 + time*2 +"px";
}
function Prohibit() {
	if (Grid_status == true){
		for (var i = 0 ; i < Frame_Num; i++) {
			var D = FarmNumB[i].style.pointerEvents;
			if (D == "none") {
				FarmNumT[i].firstChild.src = "imges/no.png";
				FarmNumT[i].firstChild.style.zIndex = 1;
			}else{
				FarmNumT[i].firstChild.src = "imges/yes.png";
				FarmNumT[i].firstChild.style.zIndex = 1;
			}
		}
	}
	Range_fun();
}
function Statistics() {
	console.log(supplement_sign);
	
	var Statistics_0 = [];
	var Statistics_1 = [];
	var Statistics_2 = [];
	var Statistics_3 = [];
	var Statistics_4 = [];
	for (var i = 0 ; i < Position_Catalog.length; i++) {
		switch (Position_Catalog[i]){
			case 0:
			var n1 = Position_name[i];
			if (n1 != 99) {}
			var n2 = ArchitectureNum[n1];
			var n3 = n2[11];
			Statistics_0.push(n3)
			break;
			case 1:
			var n1 = Position_name[i];
			var n2 = cropsNum[n1];
			var n3 = n2[11];
			Statistics_1.push(n3)
			break;
			case 2:
			var n1 = Position_name[i];
			var n2 = toolNum[n1];
			var n3 = n2[11];
			Statistics_2.push(n3)
			break;
			case 3:
			var n1 = Position_name[i];
			var n2 = ArchitectureNum[n1];
			var n3 = n2[11];
			Statistics_3.push(n3)
			break;
			case 4:
			var n1 = Position_name[i];
			var n2 = treeNum[n1];
			var n3 = n2[11];
			Statistics_4.push(n3)
			break;
		}
	}
	var Statistics_0_name_Num = [];
	var Statistics_name = [Statistics_0,Statistics_1,Statistics_2,Statistics_3,Statistics_4];
	var Statistics_name_s = [];
	for (var x = 0; x < Statistics_name.length; x++) {
		Statistics_name[x].sort();
		for (var i = 0; i < Statistics_name[x].length;) {
			var count = 0;
			for (var j = i; j < Statistics_name[x].length; j++) {  
				if ((Statistics_name[x])[i] == (Statistics_name[x])[j]) {  
					count++;  
				}
			}
			Statistics_0_name_Num.push([(Statistics_name[x])[i], count]);  
			i += count;
		}
	}
	
	var other_arr = floor_name.concat(fence_name,door_name,);
	var other_name = [];
	for (var i = 0; i < other_arr.length; i++) {
		var x = other_arr[i];
		var y = otherNum[x]
		var z = y[11]
		other_name.push(z);
	}
	var other_name_arr = [];
	other_name.sort();
	for (var i = 0; i < other_name.length;) {  
		var count = 0;  
		for (var j = i; j < other_name.length; j++) {  
			if (other_name[i] == other_name[j]) {  
				count++;  
			}  
		}
		Statistics_0_name_Num.push([other_name[i], count]);  
		i += count;  
	}
	console.log(Statistics_0_name_Num);
	for (var i = 0 ; i < Statistics_0_name_Num.length; i++) {
		if (i < 105) {
			StatisticsArr_1[i].innerHTML = "&bull; " + Statistics_0_name_Num[i][0];
			StatisticsArr_2[i].innerHTML = ":" + Statistics_0_name_Num[i][1];
			var x = "none";
		}else{
			StatisticsArr[i].innerHTML = "&bull; " + Statistics_0_name_Num[i];
			var x = "block";
		}
		document.getElementById("Statistics-prev").style.display = x;
		document.getElementById("Statistics-next").style.display = x;
		document.getElementById("Statistics_table-1-img").style.display = x;
	}
	document.getElementById("Statistics").style.display = "block";
}
for (var i = 0 ; i < 105; i++) {
	Statistics_add_1();
	Statistics_add_2();
}
var StatisticsArr = Statistics_table.getElementsByClassName("Statistics-text");
for (var i = 0 ; i < StatisticsArr.length; i++) {
	Statistics_add_1_add(i);
}
var StatisticsArr_1 = Statistics_table.getElementsByClassName("Statistics-text-1");
var StatisticsArr_2 = Statistics_table.getElementsByClassName("Statistics-text-2");
function Statistics_add_1(){//统计页1
	var Statistics_table_1 = document.getElementById("Statistics_table-1");
	var div = document.createElement("div");
	Statistics_table_1.appendChild(div).className = "Statistics-text";
}
function Statistics_add_2(){//统计页2
	var Statistics_table_2 = document.getElementById("Statistics_table-2");
	var div = document.createElement("div");
	Statistics_table_2.appendChild(div).className = "Statistics-text";
}
function Statistics_add_1_add(e){//统计页1
	var Statistics_text = StatisticsArr[e];
	var div1 = document.createElement("div");
	var div2 = document.createElement("div");
	Statistics_text.appendChild(div1).className = "Statistics-text-1";
	Statistics_text.appendChild(div2).className = "Statistics-text-2";
}
if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
	document.getElementById("warning").style.display = "block"
	document.getElementById("Choice-1").style.display = "none"

}
function Choice() {
	if (/(iPhone|iPod|iOS|Android)/i.test(navigator.userAgent)) {
		window.location.href="https://xlg-nn.netlify.app/";
	}
}
function Choice_pc() {
	window.open("https://xlg-nn.netlify.app/")
}
window.onload = function() {
	if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
		console.log("手机");
		document.getElementById("f11").style.display = "none"
	} else {
		console.log("电脑");
		if (screen.height < 800) {
			document.getElementById("f11").style.display = "block"
			document.getElementById("Choice-1").style.display = "none"
		}
		if (window.screen.width < window.screen.height) {
			document.getElementById("f11").style.display = "none"
		}
	}
}
document.onkeydown=function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode==122){ 
		document.getElementById("f11").style.display = "none"
		document.getElementById("Choice-1").style.display = "block"
	}
}; 
function nuannuan() {
	document.getElementById("nuannuan").style.display = "block";
}
function nuannuan_X() {//关闭作者联系方式
	document.getElementById("nuannuan").style.display = "none";
}
function add_Greenhouse() {
	FarmNumM[Greenhouse_position].firstChild.src = "imges/Architecture/99.png";
	Position.push(Greenhouse_position);//写入坐标
	Position_Catalog.push(0);//写入目录序号
	Position_name.push(3);//写入物品序号
	Position_Season_spring.push("none");//写入春季
	Position_Season_summer.push("none");//写入夏季
	Position_Season_autumn.push("none");//写入秋季
	Position_Season_winter.push("none");//写入冬季
	Position_Number.push(1);//写入变化状态数量
	Position_state.push(0);//写入当前状态
	sign_X.splice(Greenhouse_position,1,7);//写入物品宽度
	sign_Y.splice(Greenhouse_position,1,6);//写入物品高度
	FarmNumM[Greenhouse_position].firstChild.style.top = "-9em";//设置纵向偏移
	FarmNumM[Greenhouse_position].firstChild.style.left = "0em";//设置横向偏移
	FarmNumM[Greenhouse_position].firstChild.style.width = "7em";//设置物品宽度
	FarmNumM[Greenhouse_position].firstChild.style.height = "10em";//设置物品高度
	Greenhouse_Disable = [Greenhouse_position+MapWidth+2,Greenhouse_position+MapWidth+3,Greenhouse_position+MapWidth+4,Greenhouse_position+MapWidth*2+2,Greenhouse_position+MapWidth*2+3,Greenhouse_position+MapWidth*2+4,Greenhouse_position-1,Greenhouse_position-MapWidth-1,Greenhouse_position-MapWidth*2-1,Greenhouse_position-MapWidth*3-1,Greenhouse_position-MapWidth*4-1,Greenhouse_position-MapWidth*5-1,Greenhouse_position+MapWidth-1,Greenhouse_position+MapWidth,Greenhouse_position+MapWidth+1,Greenhouse_position+MapWidth+5,Greenhouse_position+MapWidth+6,Greenhouse_position+MapWidth*2+1,Greenhouse_position+MapWidth*2+5,Greenhouse_position+7,Greenhouse_position+8,Greenhouse_position-MapWidth+7,Greenhouse_position-MapWidth+8,Greenhouse_position-MapWidth*2+7,Greenhouse_position-MapWidth*2+8,Greenhouse_position-MapWidth*3+7,Greenhouse_position-MapWidth*3+8,Greenhouse_position-MapWidth*4+7,Greenhouse_position-MapWidth*4+8,Greenhouse_position-MapWidth*5+7,Greenhouse_position-MapWidth*5+8];
		
		FarmNumB[Greenhouse_position].firstChild.style.width = "10em";//设置物品宽度
		FarmNumB[Greenhouse_position].firstChild.style.height = "9em";//设置物品高度
		FarmNumB[Greenhouse_position].firstChild.style.top = "-5em";//设置纵向偏移
		FarmNumB[Greenhouse_position].firstChild.style.left = "-1em";//设置横向偏移
		FarmNumB[Greenhouse_position].firstChild.style.zIndex = "-999"
	if (map_state == 0 || map_state == 3 || map_state == 4 || map_state == 5) {
		Greenhouse_name = 97;
		FarmNumB[Greenhouse_position].firstChild.src = "imges/Architecture/97.png";
	}else{
		FarmNumB[Greenhouse_position].firstChild.src = "imges/Architecture/98.png";
		Greenhouse_name = 98;
		for (var i = 0; i < 12; i++) {
			Greenhouse_Disable.pop();
		}
	}
	for (var i = 0; i < Greenhouse_Disable.length; i++) {
		var x = Greenhouse_Disable[i];
		if (i < 6) {
			fruiter_sign.push(x);
			Architecture_sign.push(x);
		}
		Cultivation_sign.push(x);
	}
};
function Del_Greenhouse() {
	var GP = Position.indexOf(Greenhouse_position);
	Position.splice(GP,1);//删除坐标
	Position_Catalog.splice(GP,1);//删除目录序号
	Position_name.splice(GP,1);//删除物品序号
	Position_Season_spring.splice(GP,1);//删除春季标记
	Position_Season_summer.splice(GP,1);//删除夏季标记
	Position_Season_autumn.splice(GP,1);//删除秋季标记
	Position_Season_winter.splice(GP,1);//删除冬季标记
	Position_Number.splice(GP,1);//删除状态数量信息
	Position_state.splice(GP,1);//删除当前状态信息
	sign_X.splice(Greenhouse_position,1,0);//删除宽度标记
	sign_Y.splice(Greenhouse_position,1,0);//删除高度标记
	FarmNumM[Greenhouse_position].firstChild.style.top = "0em";//清除纵向偏移
	FarmNumM[Greenhouse_position].firstChild.style.left = "0em";//清除横向偏移
	FarmNumM[Greenhouse_position].firstChild.style.width = "1em";//初始化地块宽度
	FarmNumM[Greenhouse_position].firstChild.style.height = "1em";//初始化地块高度
	FarmNumM[Greenhouse_position].firstChild.src = "imges/0.png"//初始化地块物品层贴图
	for (var i = 0; i < Greenhouse_Disable.length; i++) {
		Cultivation_sign.pop();
		if (i < 6) {
			fruiter_sign.pop();
			Architecture_sign.pop();
		}
	}
	FarmNumB[Greenhouse_position].firstChild.src = "imges/0.png";
	FarmNumB[Greenhouse_position].firstChild.style.width = "1em";//设置物品宽度
	FarmNumB[Greenhouse_position].firstChild.style.height = "1em";//设置物品高度
	FarmNumB[Greenhouse_position].firstChild.style.zIndex = "0"
	Greenhouse_status = 1;
	Greenhouse_name = 98;
	console.log(Position);
};
function verification_Greenhouse(e) {
	Greenhouse_Disable = [Greenhouse_position+MapWidth+2,Greenhouse_position+MapWidth+3,Greenhouse_position+MapWidth+4,Greenhouse_position+MapWidth*2+2,Greenhouse_position+MapWidth*2+3,Greenhouse_position+MapWidth*2+4,Greenhouse_position-1,Greenhouse_position-MapWidth-1,Greenhouse_position-MapWidth*2-1,Greenhouse_position-MapWidth*3-1,Greenhouse_position-MapWidth*4-1,Greenhouse_position-MapWidth*5-1,Greenhouse_position+MapWidth-1,Greenhouse_position+MapWidth,Greenhouse_position+MapWidth+1,Greenhouse_position+MapWidth+5,Greenhouse_position+MapWidth+6,Greenhouse_position+MapWidth*2+1,Greenhouse_position+MapWidth*2+5];
	FarmNumB[Greenhouse_position].firstChild.style.width = "10em";//设置物品宽度
	FarmNumB[Greenhouse_position].firstChild.style.height = "9em";//设置物品高度
	FarmNumB[Greenhouse_position].firstChild.style.top = "-5em";//设置纵向偏移
	FarmNumB[Greenhouse_position].firstChild.style.left = "-1em";//设置横向偏移
	FarmNumB[Greenhouse_position].firstChild.style.zIndex = "-999"
	FarmNumB[Greenhouse_position].firstChild.src = "imges/Architecture/98.png";
	if (e == 0) {
		menuBodyNum[0].getElementsByClassName("other-icon")[3].src = "imges/icon/Architecture/99.png";
		menuBodyNum[0].getElementsByClassName("other-icon")[3].style.pointerEvents = "none";
		for (var i = 0; i < Greenhouse_Disable.length; i++) {
			var x = Greenhouse_Disable[i];
			if (i < 6) {
				fruiter_sign.push(x);
				Architecture_sign.push(x);
			}
			Cultivation_sign.push(x);
		}
	}else if (e == 1) {
		console.log(Greenhouse_status);
		menuBodyNum[0].getElementsByClassName("other-icon")[3].src = "imges/icon/Architecture/3.png";
		menuBodyNum[0].getElementsByClassName("other-icon")[3].style.pointerEvents = "auto";
		for (var i = 0; i < Greenhouse_Disable.length; i++) {
			var x = Greenhouse_Disable[i];
			if (i < 6) {
				fruiter_sign.pop();
				Architecture_sign.pop();
			}
			Cultivation_sign.pop();
		}
	}
};
function supplement(x) {
	if (x == 0) {
		supplement_sign = [];
		supplement_goods = [];
	}
	if (x == 1) {
		supplement_sign = [855,628];
		supplement_goods = [10,5];
	}
	if (x == 2) {
		supplement_sign = [429,580,1536,1694,1770,1771,3699,3772,3777,3923,4084];
		supplement_goods = [4,9,4,9,5,9,7,0,4,6,5];
	}else if (x == 3) {
		supplement_sign = [766,966,971,1123,1709,1714,1740,1747,3578,3579,3586,3613,3619,3700];
		supplement_goods = [5,5,5,6,4,8,6,8,4,8,4,4,4,4];
		FarmNumM[2960].firstChild.src = "imges/map/3/spring-2.png";//地图遮罩
		FarmNumM[2960].firstChild.style.top = "-15em";
		// FarmNumM[2960].firstChild.style.left = MapHeight + "em";
		FarmNumM[2960].firstChild.style.width = MapWidth + "em";
		FarmNumM[2960].firstChild.style.height = "16em";
	}else if (x == 4) {
		supplement_sign = [3272,3351,4388,4462,4541,4616,4673,4831,4925,4929];
		supplement_goods = [6,5,7,8,5,8,0,6,4,8];
	}else if (x == 5) {
		supplement_sign = [4277,4363,4517,4838,4922];
		supplement_goods = [4,5,11,8,6];
	}
	else if (x == 6) {
		supplement_sign = [];
		supplement_goods = [];
	}
	else if (x == 7) {
		supplement_sign = [];
		supplement_goods = [];
	}
	for (var i = 0; i < supplement_sign.length; i++) {
		var a = supplement_goods[i];
		var b = supplement_data[a]
		FarmNumM[supplement_sign[i]].firstChild.src = "imges/Architecture/" + b[0] + "/spring.png";
		FarmNumM[supplement_sign[i]].firstChild.style.top = b[1];//设置纵向偏移
		FarmNumM[supplement_sign[i]].firstChild.style.left = b[2];//设置横向偏移
		FarmNumM[supplement_sign[i]].firstChild.style.width = b[3];//设置物品宽度
		FarmNumM[supplement_sign[i]].firstChild.style.height = b[4];//设置物品高度
		sign_X.splice(supplement_sign[i],1,b[5]);//写入物品宽度
		sign_Y.splice(supplement_sign[i],1,b[6]);//写入物品高度
	}
}
function continuity() {
	console.log("continuity");
	if (continuityNum == undefined) {
		for (var i = 1 ; i < Math.ceil(IsE/MapWidth); i++) {
			if (FarmNumB[IsE - i*MapWidth].style.pointerEvents == "auto") {
				continuityArr.push(IsE - i*MapWidth);
			}else{
				break;
			}
		}
		for (var i = 1 ; i < MapWidth - Math.ceil(IsE/MapWidth); i++) {
			if ([IsE + i*MapWidth] < 5200) {
				if (FarmNumB[IsE + i*MapWidth].style.pointerEvents == "auto") {
					continuityArr.push(IsE + i*MapWidth);
				}else{
					break;
				}
			}			
			
		}
		for (var i = 1 ; i < IsE%MapWidth; i++) {
			if (FarmNumB[IsE - i].style.pointerEvents == "auto") {
				continuityArr.push(IsE - i);
			}else{
				break;
			}
		}
		for (var i = 1 ; i < MapWidth - (IsE%MapWidth); i++) {
			if (FarmNumB[IsE + i].style.pointerEvents == "auto") {
				continuityArr.push(IsE + i);
			}else{
				break;
			}
		}
		// for (var i = 0; i < Frame_Num; i++) {
		// 	FarmNumB[i].style.pointerEvents = "none";
		// }
		// for (var i = 0; i < continuityArr.length; i++) {
		// 	FarmNumB[continuityArr[i]].style.pointerEvents = "auto";
		// }
		continuityNum = IsE;
		// console.log(continuityArr);
	}else{
		var h = continuityNum - IsE;
		var distance;
		var distanceNum;
		if (h > 0) {
			if (h >= MapWidth) {
				console.log(h/MapWidth);
				distance = h/MapWidth;
			}else{
				console.log(h);
				distance = h;
			}
		}else{
			if (h <= (-MapWidth)) {
				console.log(-(h/MapWidth));
				distance = -(h/MapWidth);
			}else{
				console.log(-h);
				distance = -h;
			}
		}
		for (var i = 1; i < distance; i++) {
			if (h > 0) {
				if (h >= MapWidth) {
					distanceNum = continuityNum - i*MapWidth;
				}else{
					distanceNum = continuityNum - i
				}
			}else{
				if (h <= (-MapWidth)) {
					distanceNum = continuityNum + i*MapWidth;
				}else{
					distanceNum = continuityNum + i;
				}
			}
			if (otherSign < 4 && menuBodySign == 3) {//当前物品为栅栏
				sign_X.splice(distanceNum,1,signX);//向数据库写入宽度
				sign_Y.splice(distanceNum,1,signY);//向数据库写入高度
				fenceArr.push(distanceNum);//写入栅栏坐标
				fence_name.push(otherSign);//写入物品编号
				FarmNumB[distanceNum].style.pointerEvents = "none";//禁用当前地块
			}
			if (otherSign > 4 && menuBodySign == 3) {
				floorArr.push(distanceNum);//写入地板坐标
				floor_name.push(otherSign);//写入物品编号
				if (otherSign == 17) {
					if (Season == "winter") {//判断季节对应地板状态
						floor_Season = "winter";
					}else{
						floor_Season = "notwinter";
					}
					FarmNumB[distanceNum].firstChild.src = "imges/other/" + floor_Season + "/17/" + Math.ceil(Math.random()*16) + ".png";//添加随机地板贴图
				}
				FarmNumB[distanceNum].style.pointerEvents = "none";//禁用当前地块
			}
			if (menuBodySign == 6) {
				floorArr.push(distanceNum);//写入地板坐标
				floor_name.push(18);//写入物品编号
				FarmNumB[distanceNum].style.pointerEvents = "none";//禁用当前地块
			}
			if (menuBodySign == 1) {
				Position.push(distanceNum);//写入坐标
				Position_Catalog.push(menuBodySign);//写入目录序号
				Position_name.push(otherSign);//写入物品序号
				Position_Season_spring.push(Season_spring);//写入春季
				Position_Season_summer.push(Season_summer);//写入夏季
				Position_Season_autumn.push(Season_autumn);//写入秋季
				Position_Season_winter.push(Season_winter);//写入冬季
				Position_Number.push(GoodsNumber);//写入变化状态数量
				Position_state.push(Is_state);//写入当前状态
				sign_X.splice(distanceNum,1,signX);//写入物品宽度
				sign_Y.splice(distanceNum,1,signY);//写入物品高度
				FarmNumM[distanceNum].firstChild.style.top = IMG_T;//设置纵向偏移
				FarmNumM[distanceNum].firstChild.style.left = IMG_L;//设置横向偏移
				FarmNumM[distanceNum].firstChild.style.width = IMG_W;//设置物品宽度
				FarmNumM[distanceNum].firstChild.style.height = IMG_H;//设置物品高度
				var land = floor_name[floorArr.indexOf(distanceNum)];
				var landNum = floorArr.indexOf(distanceNum);//查找当前地块是否被开垦
				if (land == undefined && otherSign < 40) {//当前地块未被开垦则在下方添加被开垦土地
					floorArr.push(distanceNum);
					floor_name.push(18);
				}
				if (Season_spring == Season || Season_summer == Season || Season_autumn == Season || Season_winter == Season) {//判断当前季节是否适合选取农作物生长
					if (otherSign == 39 || otherSign == 40) {//当前物品为茶苗和纤维种子
						FarmNumM[distanceNum].firstChild.src = "imges/crops/" + otherSign + "/" + Season+ "/0.png";//添加对应季节贴图
					}else if (otherSign == 41) {//当前物品为牧草
						FarmNumM[distanceNum].firstChild.src = "imges/crops/" + otherSign + "/" + Season+ "/" + Math.ceil(Math.random()*4) +".png";//添加随机对应季节贴图
					}else{
						FarmNumM[distanceNum].firstChild.src = "imges/crops/" + otherSign + "/0.png";//普通农作物成熟贴图
					}
				}else{//当前作物生长季节不适应当前季节
					FarmNumM[distanceNum].firstChild.src = "imges/crops/" + Math.ceil(Math.random()*4) +".png";//添加随机枯萎作物贴图
				}
			}
		}
		// for (var i = 0; i < continuityArr.length; i++) {
		// 	if (floorArr.indexOf(continuityArr[i]) == -1) {
		// 		FarmNumB[continuityArr[i]].firstChild.src = "imges/0.png";
		// 		// console.log(floorArr.indexOf(continuityArr[i]));
		// 	}
			
			
		// }
		continuityNum = undefined;
		continuityArr = [];
		Initialization();
		signMap();
	}
}
function save_Btn() {
	if(typeof(Storage) !== "undefined") {
		if (map_state == 0) {
			localStorage.save_0 = "true";
			localStorage.fenceArr_0 = fenceArr;//存储栅栏坐标
			localStorage.fence_name_0 = fence_name;//存储栅栏序号
			localStorage.doorArr_0 = doorArr;//存储门坐标
			localStorage.door_name_0 = door_name;//存储门序号
			localStorage.floorArr_0 = floorArr;//存储地板坐标
			localStorage.floor_name_0 = floor_name;//存储地板序号
			localStorage.Position_0 = Position;//存储物品坐标
			localStorage.Position_Catalog_0 = Position_Catalog;//存储物品目录序号
			localStorage.Position_name_0 = Position_name;//存储物品序号
			localStorage.Position_Season_spring_0 = Position_Season_spring;//存储春季状态
			localStorage.Position_Season_summer_0 = Position_Season_summer;//存储夏季状态
			localStorage.Position_Season_autumn_0 = Position_Season_autumn;//存储秋季状态
			localStorage.Position_Season_winter_0 = Position_Season_winter;//存储冬季状态
			localStorage.Position_Number_0 = Position_Number;//存储状态变化数量
			localStorage.Position_state_0 = Position_state;//存储当前状态
			localStorage.Position_sign_X_0 = sign_X;
			localStorage.Position_sign_Y_0 = sign_Y;
			console.log("已保存到一号存档!");
		}
		if (map_state == 1) {
			localStorage.save_1 = "true";
			localStorage.fenceArr_1 = fenceArr;//存储栅栏坐标
			localStorage.fence_name_1 = fence_name;//存储栅栏序号
			localStorage.doorArr_1 = doorArr;//存储门坐标
			localStorage.door_name_1 = door_name;//存储门序号
			localStorage.floorArr_1 = floorArr;//存储地板坐标
			localStorage.floor_name_1 = floor_name;//存储地板序号
			localStorage.Position_1 = Position;//存储物品坐标
			localStorage.Position_Catalog_1 = Position_Catalog;//存储物品目录序号
			localStorage.Position_name_1 = Position_name;//存储物品序号
			localStorage.Position_Season_spring_1 = Position_Season_spring;//存储春季状态
			localStorage.Position_Season_summer_1 = Position_Season_summer;//存储夏季状态
			localStorage.Position_Season_autumn_1 = Position_Season_autumn;//存储秋季状态
			localStorage.Position_Season_winter_1 = Position_Season_winter;//存储冬季状态
			localStorage.Position_Number_1 = Position_Number;//存储状态变化数量
			localStorage.Position_state_1 = Position_state;//存储当前状态
			localStorage.Position_sign_X_1 = sign_X;
			localStorage.Position_sign_Y_1 = sign_Y;
			console.log("已保存到二号存档!");
		}
		if (map_state == 2) {
			localStorage.save_2 = "true";
			localStorage.fenceArr_2 = fenceArr;//存储栅栏坐标
			localStorage.fence_name_2 = fence_name;//存储栅栏序号
			localStorage.doorArr_2 = doorArr;//存储门坐标
			localStorage.door_name_2 = door_name;//存储门序号
			localStorage.floorArr_2 = floorArr;//存储地板坐标
			localStorage.floor_name_2 = floor_name;//存储地板序号
			localStorage.Position_2 = Position;//存储物品坐标
			localStorage.Position_Catalog_2 = Position_Catalog;//存储物品目录序号
			localStorage.Position_name_2 = Position_name;//存储物品序号
			localStorage.Position_Season_spring_2 = Position_Season_spring;//存储春季状态
			localStorage.Position_Season_summer_2 = Position_Season_summer;//存储夏季状态
			localStorage.Position_Season_autumn_2 = Position_Season_autumn;//存储秋季状态
			localStorage.Position_Season_winter_2 = Position_Season_winter;//存储冬季状态
			localStorage.Position_Number_2 = Position_Number;//存储状态变化数量
			localStorage.Position_state_2 = Position_state;//存储当前状态
			localStorage.Position_sign_X_2 = sign_X;
			localStorage.Position_sign_Y_2 = sign_Y;
			console.log("已保存到三号存档!");
		}
		if (map_state == 3) {
			localStorage.save_3 = "true";
			localStorage.fenceArr_3 = fenceArr;//存储栅栏坐标
			localStorage.fence_name_3 = fence_name;//存储栅栏序号
			localStorage.doorArr_3 = doorArr;//存储门坐标
			localStorage.door_name_3 = door_name;//存储门序号
			localStorage.floorArr_3 = floorArr;//存储地板坐标
			localStorage.floor_name_3 = floor_name;//存储地板序号
			localStorage.Position_3 = Position;//存储物品坐标
			localStorage.Position_Catalog_3 = Position_Catalog;//存储物品目录序号
			localStorage.Position_name_3 = Position_name;//存储物品序号
			localStorage.Position_Season_spring_3 = Position_Season_spring;//存储春季状态
			localStorage.Position_Season_summer_3 = Position_Season_summer;//存储夏季状态
			localStorage.Position_Season_autumn_3 = Position_Season_autumn;//存储秋季状态
			localStorage.Position_Season_winter_3 = Position_Season_winter;//存储冬季状态
			localStorage.Position_Number_3 = Position_Number;//存储状态变化数量
			localStorage.Position_state_3 = Position_state;//存储当前状态
			localStorage.Position_sign_X_3 = sign_X;
			localStorage.Position_sign_Y_3 = sign_Y;
			console.log("已保存到四号存档!");
		}
		if (map_state == 4) {
			localStorage.save_4 = "true";
			localStorage.fenceArr_4 = fenceArr;//存储栅栏坐标
			localStorage.fence_name_4 = fence_name;//存储栅栏序号
			localStorage.doorArr_4 = doorArr;//存储门坐标
			localStorage.door_name_4 = door_name;//存储门序号
			localStorage.floorArr_4 = floorArr;//存储地板坐标
			localStorage.floor_name_4 = floor_name;//存储地板序号
			localStorage.Position_4 = Position;//存储物品坐标
			localStorage.Position_Catalog_4 = Position_Catalog;//存储物品目录序号
			localStorage.Position_name_4 = Position_name;//存储物品序号
			localStorage.Position_Season_spring_4 = Position_Season_spring;//存储春季状态
			localStorage.Position_Season_summer_4 = Position_Season_summer;//存储夏季状态
			localStorage.Position_Season_autumn_4 = Position_Season_autumn;//存储秋季状态
			localStorage.Position_Season_winter_4 = Position_Season_winter;//存储冬季状态
			localStorage.Position_Number_4 = Position_Number;//存储状态变化数量
			localStorage.Position_state_4 = Position_state;//存储当前状态
			localStorage.Position_sign_X_4 = sign_X;
			localStorage.Position_sign_Y_4 = sign_Y;
			console.log("已保存到五号存档!");
		}
		if (map_state == 5) {
			localStorage.save_5 = "true";
			localStorage.fenceArr_5 = fenceArr;//存储栅栏坐标
			localStorage.fence_name_5 = fence_name;//存储栅栏序号
			localStorage.doorArr_5 = doorArr;//存储门坐标
			localStorage.door_name_5 = door_name;//存储门序号
			localStorage.floorArr_5 = floorArr;//存储地板坐标
			localStorage.floor_name_5 = floor_name;//存储地板序号
			localStorage.Position_5 = Position;//存储物品坐标
			localStorage.Position_Catalog_5 = Position_Catalog;//存储物品目录序号
			localStorage.Position_name_5 = Position_name;//存储物品序号
			localStorage.Position_Season_spring_5 = Position_Season_spring;//存储春季状态
			localStorage.Position_Season_summer_5 = Position_Season_summer;//存储夏季状态
			localStorage.Position_Season_autumn_5 = Position_Season_autumn;//存储秋季状态
			localStorage.Position_Season_winter_5 = Position_Season_winter;//存储冬季状态
			localStorage.Position_Number_5 = Position_Number;//存储状态变化数量
			localStorage.Position_state_5 = Position_state;//存储当前状态
			localStorage.Position_sign_X_5 = sign_X;
			localStorage.Position_sign_Y_5 = sign_Y;
			console.log("已保存到六号存档!");
		}
		if (map_state == 6) {
			localStorage.save_6 = "true";
			localStorage.fenceArr_6 = fenceArr;//存储栅栏坐标
			localStorage.fence_name_6 = fence_name;//存储栅栏序号
			localStorage.doorArr_6 = doorArr;//存储门坐标
			localStorage.door_name_6 = door_name;//存储门序号
			localStorage.floorArr_6 = floorArr;//存储地板坐标
			localStorage.floor_name_6 = floor_name;//存储地板序号
			localStorage.Position_6 = Position;//存储物品坐标
			localStorage.Position_Catalog_6 = Position_Catalog;//存储物品目录序号
			localStorage.Position_name_6 = Position_name;//存储物品序号
			localStorage.Position_Season_spring_6 = Position_Season_spring;//存储春季状态
			localStorage.Position_Season_summer_6 = Position_Season_summer;//存储夏季状态
			localStorage.Position_Season_autumn_6 = Position_Season_autumn;//存储秋季状态
			localStorage.Position_Season_winter_6 = Position_Season_winter;//存储冬季状态
			localStorage.Position_Number_6 = Position_Number;//存储状态变化数量
			localStorage.Position_state_6 = Position_state;//存储当前状态
			localStorage.Position_sign_X_6 = sign_X;
			localStorage.Position_sign_Y_6 = sign_Y;
			console.log("已保存到七号存档!");
		}
		if (map_state == 7) {
			localStorage.save_7 = "true";
			localStorage.fenceArr_7 = fenceArr;//存储栅栏坐标
			localStorage.fence_name_7 = fence_name;//存储栅栏序号
			localStorage.doorArr_7 = doorArr;//存储门坐标
			localStorage.door_name_7 = door_name;//存储门序号
			localStorage.floorArr_7 = floorArr;//存储地板坐标
			localStorage.floor_name_7 = floor_name;//存储地板序号
			localStorage.Position_7 = Position;//存储物品坐标
			localStorage.Position_Catalog_7 = Position_Catalog;//存储物品目录序号
			localStorage.Position_name_7 = Position_name;//存储物品序号
			localStorage.Position_Season_spring_7 = Position_Season_spring;//存储春季状态
			localStorage.Position_Season_summer_7 = Position_Season_summer;//存储夏季状态
			localStorage.Position_Season_autumn_7 = Position_Season_autumn;//存储秋季状态
			localStorage.Position_Season_winter_7 = Position_Season_winter;//存储冬季状态
			localStorage.Position_Number_7 = Position_Number;//存储状态变化数量
			localStorage.Position_state_7 = Position_state;//存储当前状态
			localStorage.Position_sign_X_7 = sign_X;
			localStorage.Position_sign_Y_7 = sign_Y;
			console.log("已保存到8号存档!");
		}
	} else {
		alert("此浏览器可能不支持存档功能");
	}
	document.getElementById("save-Tips").style.display = "block";
	document.getElementById("save-Tips").src = "imges/Choice/save.png";
	setTimeout(function() {document.getElementById("save-Tips").style.display = "none";}, 1000);
}
function save_load() {
	if (localStorage.save_0 == "true" && map_state == 0) {
		console.log("加载一号存档");
		var load_arr = [localStorage.fenceArr_0.split(','),localStorage.fence_name_0.split(','),localStorage.doorArr_0.split(','),localStorage.door_name_0.split(','),localStorage.floorArr_0.split(','),localStorage.floor_name_0.split(','),localStorage.Position_0.split(','),localStorage.Position_Catalog_0.split(','),localStorage.Position_name_0,localStorage.Position_Season_spring_0.split(','),localStorage.Position_Season_summer_0.split(','),localStorage.Position_Season_autumn_0.split(','),localStorage.Position_Season_winter_0.split(','),localStorage.Position_Number_0.split(','),localStorage.Position_state_0.split(','),localStorage.Position_sign_X_0.split(','),localStorage.Position_sign_Y_0.split(',')];
	}else if (localStorage.save_1 == "true" && map_state == 1) {
		console.log("加载二号存档");
		var load_arr = [localStorage.fenceArr_1.split(','),localStorage.fence_name_1.split(','),localStorage.doorArr_1.split(','),localStorage.door_name_1.split(','),localStorage.floorArr_1.split(','),localStorage.floor_name_1.split(','),localStorage.Position_1.split(','),localStorage.Position_Catalog_1.split(','),localStorage.Position_name_1,localStorage.Position_Season_spring_1.split(','),localStorage.Position_Season_summer_1.split(','),localStorage.Position_Season_autumn_1.split(','),localStorage.Position_Season_winter_1.split(','),localStorage.Position_Number_1.split(','),localStorage.Position_state_1.split(','),localStorage.Position_sign_X_1.split(','),localStorage.Position_sign_Y_1.split(',')];
	}else if (localStorage.save_2 == "true" && map_state == 2) {
		console.log("加载三号存档");
		var load_arr = [localStorage.fenceArr_2.split(','),localStorage.fence_name_2.split(','),localStorage.doorArr_2.split(','),localStorage.door_name_2.split(','),localStorage.floorArr_2.split(','),localStorage.floor_name_2.split(','),localStorage.Position_2.split(','),localStorage.Position_Catalog_2.split(','),localStorage.Position_name_2,localStorage.Position_Season_spring_2.split(','),localStorage.Position_Season_summer_2.split(','),localStorage.Position_Season_autumn_2.split(','),localStorage.Position_Season_winter_2.split(','),localStorage.Position_Number_2.split(','),localStorage.Position_state_2.split(','),localStorage.Position_sign_X_2.split(','),localStorage.Position_sign_Y_2.split(',')];
	}else if (localStorage.save_3 == "true" && map_state == 3) {
		console.log("加载四号存档");
		var load_arr = [localStorage.fenceArr_3.split(','),localStorage.fence_name_3.split(','),localStorage.doorArr_3.split(','),localStorage.door_name_3.split(','),localStorage.floorArr_3.split(','),localStorage.floor_name_3.split(','),localStorage.Position_3.split(','),localStorage.Position_Catalog_3.split(','),localStorage.Position_name_3,localStorage.Position_Season_spring_3.split(','),localStorage.Position_Season_summer_3.split(','),localStorage.Position_Season_autumn_3.split(','),localStorage.Position_Season_winter_3.split(','),localStorage.Position_Number_3.split(','),localStorage.Position_state_3.split(','),localStorage.Position_sign_X_3.split(','),localStorage.Position_sign_Y_3.split(',')];
	}else if (localStorage.save_4 == "true" && map_state == 4) {
		console.log("加载五号存档");
		var load_arr = [localStorage.fenceArr_4.split(','),localStorage.fence_name_4.split(','),localStorage.doorArr_4.split(','),localStorage.door_name_4.split(','),localStorage.floorArr_4.split(','),localStorage.floor_name_4.split(','),localStorage.Position_4.split(','),localStorage.Position_Catalog_4.split(','),localStorage.Position_name_4,localStorage.Position_Season_spring_4.split(','),localStorage.Position_Season_summer_4.split(','),localStorage.Position_Season_autumn_4.split(','),localStorage.Position_Season_winter_4.split(','),localStorage.Position_Number_4.split(','),localStorage.Position_state_4.split(','),localStorage.Position_sign_X_4.split(','),localStorage.Position_sign_Y_4.split(',')];
	}else if (localStorage.save_5 == "true" && map_state == 5) {
		console.log("加载六号存档");
		var load_arr = [localStorage.fenceArr_5.split(','),localStorage.fence_name_5.split(','),localStorage.doorArr_5.split(','),localStorage.door_name_5.split(','),localStorage.floorArr_5.split(','),localStorage.floor_name_5.split(','),localStorage.Position_5.split(','),localStorage.Position_Catalog_5.split(','),localStorage.Position_name_5,localStorage.Position_Season_spring_5.split(','),localStorage.Position_Season_summer_5.split(','),localStorage.Position_Season_autumn_5.split(','),localStorage.Position_Season_winter_5.split(','),localStorage.Position_Number_5.split(','),localStorage.Position_state_5.split(','),localStorage.Position_sign_X_5.split(','),localStorage.Position_sign_Y_5.split(',')];
	}else if (localStorage.save_6 == "true" && map_state == 6) {
		console.log("加载七号存档");
		var load_arr = [localStorage.fenceArr_6.split(','),localStorage.fence_name_6.split(','),localStorage.doorArr_6.split(','),localStorage.door_name_6.split(','),localStorage.floorArr_6.split(','),localStorage.floor_name_6.split(','),localStorage.Position_6.split(','),localStorage.Position_Catalog_6.split(','),localStorage.Position_name_6,localStorage.Position_Season_spring_6.split(','),localStorage.Position_Season_summer_6.split(','),localStorage.Position_Season_autumn_6.split(','),localStorage.Position_Season_winter_6.split(','),localStorage.Position_Number_6.split(','),localStorage.Position_state_6.split(','),localStorage.Position_sign_X_6.split(','),localStorage.Position_sign_Y_6.split(',')];
	}else if (localStorage.save_7 == "true" && map_state == 7) {
		console.log("加载8号存档");
		var load_arr = [localStorage.fenceArr_7.split(','),localStorage.fence_name_7.split(','),localStorage.doorArr_7.split(','),localStorage.door_name_7.split(','),localStorage.floorArr_7.split(','),localStorage.floor_name_7.split(','),localStorage.Position_7.split(','),localStorage.Position_Catalog_7.split(','),localStorage.Position_name_7,localStorage.Position_Season_spring_7.split(','),localStorage.Position_Season_summer_7.split(','),localStorage.Position_Season_autumn_7.split(','),localStorage.Position_Season_winter_7.split(','),localStorage.Position_Number_7.split(','),localStorage.Position_state_7.split(','),localStorage.Position_sign_X_7.split(','),localStorage.Position_sign_Y_7.split(',')];
	}else{
		console.log("没有检测到存档!");
		return;
	}
	var save_arr = [fenceArr,fence_name,doorArr,door_name,floorArr,floor_name,Position,Position_Catalog,Position_name,Position_Season_spring,Position_Season_summer,Position_Season_autumn,Position_Season_winter,Position_Number,Position_state,sign_X,sign_Y];
	for (var i = 0; i < save_arr.length; i++) {
		if (load_arr[i] != "") {
			save_arr[i] = load_arr[i];
		}
	}
	fenceArr = JSON.parse("[" + save_arr[0] + "]");
	fence_name = JSON.parse("[" + save_arr[1] + "]");
	doorArr = JSON.parse("[" + save_arr[2] + "]");
	door_name = JSON.parse("[" + save_arr[3] + "]");
	floorArr = JSON.parse("[" + save_arr[4] + "]");
	floor_name = JSON.parse("[" + save_arr[5] + "]");
	Position = JSON.parse("[" + save_arr[6] + "]");
	Position_Catalog = JSON.parse("[" + save_arr[7] + "]");
	Position_name = JSON.parse("[" + save_arr[8] + "]");
	Position_Season_spring = save_arr[9];
	Position_Season_summer = save_arr[10];
	Position_Season_autumn = save_arr[11];
	Position_Season_winter = save_arr[12];
	Position_Number = JSON.parse("[" + save_arr[13] + "]");
	Position_state = JSON.parse("[" + save_arr[14] + "]");
	sign_X = JSON.parse("[" + save_arr[15] + "]");
	sign_Y = JSON.parse("[" + save_arr[16] + "]");
	door();//校准门状态
	fence();//校准栅栏状态
	floor();//校准地板状态
	var CatalogArr = ["Architecture/","crops/","tool/","other/","tree/","NPC/"];//贴图路径
	FarmNumM[1191].firstChild.src = "imges/0.png";
	sign_X.splice(1191,1,2);//写入物品宽度
	sign_Y.splice(1191,1,1);//写入物品高度
	FarmNumM[1191].firstChild.style.top = "0em";//设置纵向偏移
	FarmNumM[1191].firstChild.style.left = "0em";//设置横向偏移
	FarmNumM[1191].firstChild.style.width = "1em";//设置物品宽度
	FarmNumM[1191].firstChild.style.height = "1em";//设置物品高度
	for (var i = 0; i < Position.length; i++) {
		var Catalog = CatalogArr[Position_Catalog[i]];//当前贴图路径
		// console.log(Position);
		if (Position_Catalog[i] == 0) {
			if (Position_name[i] == 28) {//祝尼魔小屋和固定植物
				FarmNumM[Position[i]].firstChild.src = "imges/" + Catalog + Position_name[i] +"/" + Season + ".png";
				console.log(Catalog);
			}else if (Position_name[i] < 28) {
				FarmNumM[Position[i]].firstChild.src = "imges/" + Catalog + Position_name[i] + ".png";
			}
			if (Position_name[i] == 3 && Position[i] != Greenhouse_position) {
				console.log(Position[i]);
				FarmNumM[Greenhouse_position].firstChild.style.top = "0em";//清除纵向偏移
				FarmNumM[Greenhouse_position].firstChild.style.left = "0em";//清除横向偏移
				FarmNumM[Greenhouse_position].firstChild.style.width = "1em";//初始化地块宽度
				FarmNumM[Greenhouse_position].firstChild.style.height = "1em";//初始化地块高度
				FarmNumM[Greenhouse_position].firstChild.src = "imges/0.png"//初始化地块物品层贴图
				for (var n = 0; n < Greenhouse_Disable.length; n++) {
					Cultivation_sign.pop();
					if (n < 6) {
						fruiter_sign.pop();
						Architecture_sign.pop();
					}
				}
				FarmNumB[Greenhouse_position].firstChild.src = "imges/0.png";
				FarmNumB[Greenhouse_position].firstChild.style.width = "1em";//设置物品宽度
				FarmNumB[Greenhouse_position].firstChild.style.height = "1em";//设置物品高度
				FarmNumB[Greenhouse_position].firstChild.style.zIndex = "0";
				sign_X.splice(Greenhouse_position,1,0);//删除宽度标记
				sign_Y.splice(Greenhouse_position,1,0);//删除高度标记
				Greenhouse_name = 98;
				Greenhouse_position = Position[i];
				verification_Greenhouse(0);
			}else if (Position_name[i] == 3 && Position[i] == Greenhouse_position) {
				FarmNumM[Greenhouse_position].firstChild.src = "imges/Architecture/99.png";
			}
		}else if (Position_Catalog[i] == 1) {
			if (Position_Season_spring[i] == Season || Position_Season_summer[i] == Season || Position_Season_autumn[i] == Season || Position_Season_winter[i] == Season) {//判断当前季节是否适合选取农作物生长
				if (Position_name[i] == 39 || Position_name[i] == 40) {//当前物品为茶苗和纤维种子
					FarmNumM[Position[i]].firstChild.src = "imges/crops/" + Position_name[i] + "/" + Season + "/" + Position_state[i] + ".png";//添加对应季节贴图
				}else if (Position_name[i] == 41) {//当前物品为牧草
					FarmNumM[Position[i]].firstChild.src = "imges/crops/" + Position_name[i] + "/" + Season + "/" + Math.ceil(Math.random()*4) +".png";//添加随机对应季节贴图
				}else{
					FarmNumM[Position[i]].firstChild.src = "imges/crops/" + Position_name[i] + "/" + Position_state[i] + ".png"//普通农作物成熟贴图
				}
			}else{//当前作物生长季节不适应当前季节
				FarmNumM[Position[i]].firstChild.src = "imges/crops/" + Math.ceil(Math.random()*4) +".png";//添加随机枯萎作物贴图
			}
		}else if (Position_Catalog[i] == 2) {
			if (Position_Season_spring[i] == Season || Position_Season_summer[i] == Season || Position_Season_autumn[i] == Season || Position_Season_winter[i] == Season) {//判读是否为受季节影响物品
				FarmNumM[Position[i]].firstChild.src = "imges/tool/" + Position_name[i] + "/" + Season + ".png";//添加对应季节贴图
			}else{
				FarmNumM[Position[i]].firstChild.src = "imges/tool/" + Position_name[i] + ".png";//添加常规贴图
			}
			if (Position_name[i] == 0 || Position_name[i] == 89) {
				FarmNumM[Position[i]].firstChild.src = "imges/tool/" + Position_name[i] + "/" + Position_state[i] + ".png";//添加常规贴图
			}
			
		}else if (Position_Catalog[i] == 4) {
			if (Position_name[i] == 12) {//判断当前物品是否为蘑菇树
				FarmNumM[Position[i]].firstChild.src = "imges/tree/" + Position_name[i] + "/" + Position_state[i] + ".png";//添加蘑菇树贴图
			}else{
				FarmNumM[Position[i]].firstChild.src = "imges/tree/" + Position_name[i] + "/" + Season+ "/" + Position_state[i] + ".png";//添加非蘑菇树贴图
				if (Position_state[i] != 0 && Position_name[i] > 3) {
					FarmNumM[Position[i]].firstChild.src = "imges/tree/" + Position_name[i] + "/" + Position_state[i] + ".png";
				}else{
					FarmNumM[Position[i]].firstChild.src = "imges/tree/" + Position_name[i] + "/" + Season + "/" + Position_state[i] + ".png";	
				}
			}
		}else if (Position_Catalog[i] == 5) {
			FarmNumM[549].firstChild.src = "imges/NPC/" + Position_name[i] + "/" + Season+ ".png";
		}
		// var a1 = Position_Catalog[5];
		// var a2 = Position_name[5]
		// console.log(i);
		// console.log(Position_Catalog[i]);
		// console.log(Position_name[i]);
		// console.log(Catalog_data[Position_Catalog[i]][Position_name[i]]);
		if (Position_Catalog[i] == 0) {
			if (Position_name[i] < 50) {
				FarmNumM[Position[i]].firstChild.style.top = Catalog_data[Position_Catalog[i]][Position_name[i]][0];//设置纵向偏移
				FarmNumM[Position[i]].firstChild.style.left = Catalog_data[Position_Catalog[i]][Position_name[i]][1];//设置横向偏移
				FarmNumM[Position[i]].firstChild.style.width = Catalog_data[Position_Catalog[i]][Position_name[i]][2];//设置物品宽度
				FarmNumM[Position[i]].firstChild.style.height = Catalog_data[Position_Catalog[i]][Position_name[i]][3];//设置物品高度
			}
			
		}else{
			FarmNumM[Position[i]].firstChild.style.top = Catalog_data[Position_Catalog[i]][Position_name[i]][0];//设置纵向偏移
			FarmNumM[Position[i]].firstChild.style.left = Catalog_data[Position_Catalog[i]][Position_name[i]][1];//设置横向偏移
			FarmNumM[Position[i]].firstChild.style.width = Catalog_data[Position_Catalog[i]][Position_name[i]][2];//设置物品宽度
			FarmNumM[Position[i]].firstChild.style.height = Catalog_data[Position_Catalog[i]][Position_name[i]][3];//设置物品高度
		}

		}
		Initialization();
		Cultivation();
		signMapX();
		signMap();
		signMapY();
	// console.log(localStorage.save_Position);
	// var stringResult = localStorage.save_Position.split(',');
	// console.log(stringResult[2]);
}
function save_del() {
	if (localStorage.save_0 == "true" && map_state == 0) {
		console.log("删除一号存档");
		var del_save_arr = ["save_0","fenceArr_0","fence_name_0","doorArr_0","door_name_0","floorArr_0","floor_name_0","Position_0","Position_Catalog_0","Position_name_0","Position_Season_spring_0","Position_Season_summer_0","Position_Season_autumn_0","Position_Season_winter_0","Position_Number_0","Position_Season_winter_0","Position_Number_0","Position_state_0","Position_sign_X_0","Position_sign_Y_0"];
	}else if (localStorage.save_1 == "true" && map_state == 1) {
		console.log("删除二号存档");
		var del_save_arr = ["save_1","fenceArr_1","fence_name_1","doorArr_1","door_name_1","floorArr_1","floor_name_1","Position_1","Position_Catalog_1","Position_name_1","Position_Season_spring_1","Position_Season_summer_1","Position_Season_autumn_1","Position_Season_winter_1","Position_Number_1","Position_Season_winter_1","Position_Number_1","Position_state_1","Position_sign_X_1","Position_sign_Y_1"];
	}else if (localStorage.save_2 == "true" && map_state == 2) {
		console.log("删除三号存档");
		var del_save_arr = ["save_2","fenceArr_2","fence_name_2","doorArr_2","door_name_2","floorArr_2","floor_name_2","Position_2","Position_Catalog_2","Position_name_2","Position_Season_spring_2","Position_Season_summer_2","Position_Season_autumn_2","Position_Season_winter_2","Position_Number_2","Position_Season_winter_2","Position_Number_2","Position_state_2","Position_sign_X_2","Position_sign_Y_2"];
	}else if (localStorage.save_3 == "true" && map_state == 3) {
		console.log("删除四号存档");
		var del_save_arr = ["save_3","fenceArr_3","fence_name_3","doorArr_3","door_name_3","floorArr_3","floor_name_3","Position_3","Position_Catalog_3","Position_name_3","Position_Season_spring_3","Position_Season_summer_3","Position_Season_autumn_3","Position_Season_winter_3","Position_Number_3","Position_Season_winter_3","Position_Number_3","Position_state_3","Position_sign_X_3","Position_sign_Y_3"];
	}else if (localStorage.save_4 == "true" && map_state == 4) {
		console.log("删除五号存档");
		var del_save_arr = ["save_4","fenceArr_4","fence_name_4","doorArr_4","door_name_4","floorArr_4","floor_name_4","Position_4","Position_Catalog_4","Position_name_4","Position_Season_spring_4","Position_Season_summer_4","Position_Season_autumn_4","Position_Season_winter_4","Position_Number_4","Position_Season_winter_4","Position_Number_4","Position_state_4","Position_sign_X_4","Position_sign_Y_4"];
	}else if (localStorage.save_5 == "true" && map_state == 5) {
		console.log("删除六号存档");
		var del_save_arr = ["save_5","fenceArr_5","fence_name_5","doorArr_5","door_name_5","floorArr_5","floor_name_5","Position_5","Position_Catalog_5","Position_name_5","Position_Season_spring_5","Position_Season_summer_5","Position_Season_autumn_5","Position_Season_winter_5","Position_Number_5","Position_Season_winter_5","Position_Number_5","Position_state_5","Position_sign_X_5","Position_sign_Y_5"];
	}else if (localStorage.save_5 == "true" && map_state == 5) {
		console.log("删除七号存档");
		var del_save_arr = ["save_6","fenceArr_6","fence_name_6","doorArr_6","door_name_6","floorArr_6","floor_name_6","Position_6","Position_Catalog_6","Position_name_6","Position_Season_spring_6","Position_Season_summer_6","Position_Season_autumn_6","Position_Season_winter_6","Position_Number_6","Position_Season_winter_6","Position_Number_6","Position_state_6","Position_sign_X_6","Position_sign_Y_6"];
	}else{
		console.log("没有检测到存档!");
		document.getElementById("save-Tips").style.display = "block";
		document.getElementById("save-Tips").src = "imges/Choice/none.png";
		setTimeout(function() {document.getElementById("save-Tips").style.display = "none";}, 1000);
		return;
	}
	document.getElementById("save-Tips").style.display = "block";
	document.getElementById("save-Tips").src = "imges/Choice/del.png";
	setTimeout(function() {document.getElementById("save-Tips").style.display = "none";}, 1000);
	for (var i = 0; i < del_save_arr.length; i++) {
		localStorage.removeItem(del_save_arr[i]);
	}
}
if (localStorage.Explain_save == 0) {
	console.log("非首次开启页面，关闭教程提示。");
	document.getElementById("Course").style.display = "none";
}
function open_video() {
	window.open("https://www.bilibili.com/video/BV1Pf4y1T7hx/")
}
function open_tieba() {
	window.open("https://tieba.baidu.com/p/7632638263?pid=142277181706&cid=0&red_tag=0896232900#142277181706")
}
function copy_mail() {
	var e = document.getElementById("mail");
	e.select(); // 选择对象
	document.execCommand("Copy"); // 执行浏览器复制命令
	document.getElementById("save-Tips").style.display = "block";
	document.getElementById("save-Tips").src = "imges/Choice/copy.png";
	setTimeout(function() {document.getElementById("save-Tips").style.display = "none";}, 1000);
}
