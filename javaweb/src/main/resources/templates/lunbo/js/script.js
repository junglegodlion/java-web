// 全局变量
var timer = null,
    index = 0,
    pics = byId("banner").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span"),
    size = pics.length,
    prev = byId("prev"),
    next = byId("next"),
    menuItems = byId("menu-content").getElementsByTagName("div"),
    subMenu = byId("sub-menu"),
    subItems = subMenu.getElementsByClassName("inner-box");

// 封装一个代替getElementById()的方法
function byId(id){
	return typeof(id)==="string"?document.getElementById(id):id;
}

// 清除定时器,停止自动播放
function stopAutoPlay(){
	if(timer){
        // clearInterval() 方法可取消由 setInterval() 函数设定的定时执行操作。
        // clearInterval() 方法的参数必须是由 setInterval() 返回的 ID 值。
       clearInterval(timer);
	}
}

// 图片自动轮播
function startAutoPlay(){
    // setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
   timer = setInterval(function(){
       index++;
       if(index >= size){
          index = 0;
       }
       //切换图片
       changeImg();
   },3000)
}

//切换图片
function changeImg(){
    // 遍历banner下的所有div及dots下所有的span，将div隐藏，将span清除类
   for(var i=0,len=dots.length;i<len;i++){
       dots[i].className = "";
       pics[i].style.display = "none";
   }
   // 跟据index索引找到当前div和当前span，将其显示出来和设为当前
   dots[index].className = "active";
   pics[index].style.display = "block";
}

function slideImg(){
    var main = byId("main");
    var banner = byId("banner");
    var menuContent = byId("menu-content");
    // 滑过清除定时器，离开继续
    main.onmouseover = function(){
        //滑过清除定时器
    	stopAutoPlay();
    }
    main.onmouseout = function(){
    	startAutoPlay();
    }

    //自动在main上触发鼠标离开的事件
    main.onmouseout();

    // 遍历所有点，且绑定点击事件，点击圆点切换图片
    // 点击导航切换
    for(var i=0,len=dots.length;i<len;i++){ // 0 1 2

        // 给所有span添加一个id的属性，值为d，作为当前span的索引
       dots[i].id = i;
       dots[i].onclick = function(){
           //改变index为当前span的id值

           // 弹出的是最终值len的最大值，function会改变作用域
           // alert(i)


           // 事件绑在哪里，this指的就是谁
           index = this.id;
           // 调用changImg,实现切换图片
           changeImg();
       }
    }

    // 下一张
    next.onclick = function(){
       index++;
       if(index>=size) index=0;
       changeImg();
    }

    // 上一张
    prev.onclick = function(){
       index--;
       if(index<0) index=size-1;
       changeImg();
    }

    // 导航菜单
    // 遍历主菜单，且绑定事件
    for(var m=0,mlen=menuItems.length;m<mlen;m++){
        // 给每一个menuItem定义data-index属性，作为索引
        menuItems[m].setAttribute("data-index",m);
        // onmouseover 事件会在鼠标指针移动到指定的元素上时发生。
        menuItems[m].onmouseover = function(){
            subMenu.className = "sub-menu";
            var idx = this.getAttribute("data-index");

            // 遍历所有子菜单，将每一个都隐藏
            for(var j=0,jlen=subItems.length;j<jlen;j++){
               subItems[j].style.display = 'none';
               menuItems[j].style.background = "none";
            }
            subItems[idx].style.display = "block";
            menuItems[idx].style.background = "rgba(0,0,0,0.1)";
        }
    }

    subMenu.onmouseover = function(){
        this.className = "sub-menu";
    }

    subMenu.onmouseout = function(){
        this.className = "sub-menu hide";
    }

    menuContent.onmouseout = function(){
        subMenu.className = "sub-menu hide";
    }
}

slideImg();