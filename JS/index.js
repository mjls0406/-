// 视频播放、关闭功能

(function(){
    var playbtn = document.querySelector('#section1 .play'),
        dialog = document.querySelector('.dialog'),
        shadow = document.querySelector('.shadow'),
        closebtn = document.querySelector('.dialog .closebtn'),
        movie = document.querySelector('.dialog .movie'),
        movieInner = movie.innerHTML;

    playbtn.onclick = function(){
        dialog.style.display = 'block';
        shadow.style.display = 'block';
        movie.innerHTML = movieInner;
    }
    closebtn.onclick = function(){
        dialog.style.display = 'none';
        shadow.style.display = 'none';
        movie.innerHTML = '';
    }

})();

//版本咨询的选项卡功能
(function(){
   //先封装一个选项卡的函数，传两个参数，按钮和内容
   function tab(btn,content){
       var btns = btn.children; //获取第一层子元素
       var cons = content.children;

       for(var i = 0;i < btns.length;i ++){
           btns[i].index = i; //给每个按钮添加一个索引值
           btns[i].onclick = function(){
               //让别的元素身上的 class = 'active'去掉，让别的元素隐藏，让自己显示
               for(var i = 0;i < btns.length;i++){
                   btns[i].classList.remove('active');
                   cons[i].classList.remove('active');
               }
               //自己身上class = 'active'，自己的内容显示
               this.classList.add('active');
               cons[this.index].classList.add('active');

           }
       }
   }
   var tabBtn = document.querySelectorAll('.tabBtn') //选择到所有按钮的父级
   var tabContent = document.querySelectorAll('.tabContent') //选择到所有内容的父级
   tab(tabBtn[0],tabContent[0]);
   tab(tabBtn[1],tabContent[1]);
   tab(tabBtn[2],tabContent[2]);
})();

//轮播图
(function(){
   function carousel(id){
     var wrap = document.querySelector(id+' .wrap'),
         ul = document.querySelector(id+' ul'),
         prev = document.querySelector(id+' .prev'),
         next = document.querySelector(id+' .next'),
         circles = document.querySelectorAll(id+' .circle span'),
         boxWidth = wrap.offsetWidth,
         canclick = true; //能进行下一次点击
         timer = null;

    //初始化
    ul.innerHTML += ul.innerHTML; //复制多一份图片
    var len = ul.children.length;
    ul.style.width = len*boxWidth +'px';

    var cn = 0;  //当前索引值
    var ln = 0;  // 上一次索引值

    next.onclick = function(){
        cn ++;
        move();
    }

    prev.onclick = function(){
        if(cn == 0){
            cn = len / 2;
            ul.style.transition = null;  
            ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';
        }
        cn --;
        move();
    }

    for(var i = 0;i < circles.length;i++){
        circles[i].index = i;
        circles[i].onclick = function(){
            cn = this.index;
            move();
        }
    }
    function move(){
        
        
        ul.style.transition = '.3s';
        ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';

        /*
        cn：0 1 2 3 4 5 6 7 
        ln：0 1 2 3 0 1 2 3
        */ 
        var hn = cn % (len / 2);

        circles[ln].className = '';
        circles[hn].className = 'active';
        ln = hn;
    }

    ul.addEventListener('transitionend',function(){ //过渡完成后就会发生的事件
         
          if(cn == len / 2){
              cn = 0;
              ul.style.transition = null;  
            ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';
          }
    });

    

   }
   carousel('#section3');
   carousel('#section5');
})();

//新增场景切换功能

(function(){
    var section4 = document.querySelector('#section4'),
        lis = document.querySelectorAll('#section4 li'),
        bottom = document.querySelectorAll('#section4 .bottom'),
        ln = 0;
    
        for(var i = 0;i < lis.length;i ++){
            lis[i].index = i; //给每个按钮添加一个索引值
            lis[i].onclick = function(){
                lis[ln].classList.remove('active');
                this.classList.add('active');
                ln = this.index;
             
             section4.style.background = 'url(images/section4_big_0'+(this.index + 1)+'.png) no-repeat center top';   
 
            }
        }
})();
