/*
* jsPage v1.0
* 属性:
* el(dom) 容器  (必须)
* dataArr(array) 存储数据的数组 (必须)
* index(number) 初始页  默认是1
* pageNumber(number) 每页显示条数 默认为4
* 
* 方法:
* format(function)  数据显示格式 
* object.set(number)  设置当前页
* object.setData(dataArr) 改变数据
*/ 
function jsPage(obj){
    var that = this;
    that.el = obj.el;
    that.index = parseInt(obj.index) || 1;
    var pageIndex = that.index;
    if(!obj.pageNumber){
        obj.pageNumber = 4;
    }
    that.num = parseInt(obj.pageNumber);
    that.set = function(index){
       var setObj = {
            el:obj.el,
            dataArr:obj.dataArr,
            index:index,
            pageNumber:obj.pageNumber,
            format:obj.format
        };
        jsPage(setObj);
    };

    var el = this.el;
    var content = $("<div class='pageContent'></div>");
    var pageFoot = $("<div class='pageFoot'></div>");
    var data = obj.dataArr;
    that.setData = function(res){
        var pageIndex = parseInt($(".pageContent").attr("name"));
        var setDataObj = {
            el:obj.el,
            dataArr:res,
            index:pageIndex,
            pageNumber:obj.pageNumber,
            format:obj.format
        };
        jsPage(setDataObj);
    };
    var pageNum = $("<div class='pageNumContent'></div>");
    content.attr("name",obj.index);
    var lastPageNum = data.length/this.num % 1 == 0 ? parseInt(data.length/that.num) : parseInt(data.length/that.num) +1;
    $(obj.el).empty();
    var allPageNum = $("<span class='pageBtn'>共"+lastPageNum+"页</span>");
    var first = (parseInt(pageIndex)-3) >= 0 ? (parseInt(pageIndex)-3) : 0 ;
    var last = parseInt(first + 5 )<lastPageNum ?  parseInt(first + 5) : lastPageNum ;
   
    var preClick = "";
    var nextClick = "";

    for(var i=first;i<=last;i++){
        if(i<0){
            continue;
        }
        if(i>=lastPageNum){
            continue;
        }
        var numLi = $("<span name='"+parseInt(i+1)+"' class='pageNumli'>"+parseInt(i+1)+"</span>");
        if(i === this.index-1){
            numLi.addClass("indexLi");
        }
        pageNum.append(numLi);
        $(numLi).unbind("click");
        $(numLi).bind("click",function(){
            var numLiObj = null;
            var num = parseInt($(this).attr("name"));
            if(!num){
                return false;
            }
            that.index = num;
            numLiObj = {
                el:obj.el,
                dataArr:data,
                index:num,
                pageNumber:obj.pageNumber,
                format:obj.format
            };
            jsPage(numLiObj);
        });
    }
    var preNum =  parseInt(pageIndex-1);
    var nextNum =  parseInt(pageIndex + 1);
    if(nextNum >=lastPageNum ){
        nextNum = lastPageNum;
    }
    if(preNum <= 0 ){
        preNum = 1;
    }
    var preObj = {
        el:that.el,
        dataArr:data,
        index:preNum,
        pageNumber:parseInt(that.num),
        format:obj.format
    };
    var nextObj = {
        el:that.el,
        dataArr:data,
        index:nextNum,
        pageNumber:parseInt(that.num),
        format:obj.format
    };
    var searchObj = {
        el:that.el,
        dataArr:data,
        index:pageIndex,
        pageNumber:parseInt(that.num),
        format:obj.format
    };
    var searchIpt = $("<select  value='"+pageIndex+"'></select>");
    for(var p=1;p<=lastPageNum;p++){
        var option = $("<option value='"+p+"'>"+p+"</option>");
        if(p === pageIndex){
            option.attr("selected","selected");
        }
        searchIpt.append(option);
    }
    /*
    * 下一页是否可点击
    * 上一页是否可点击
    *
    * */
    var preStatus = "";
    var nextStatus = "";
    if(that.index === 1){
        preStatus = 'noneSelect';
    }
    if(that.index === lastPageNum){
        nextStatus = 'noneSelect'
    }
    var pre = $("<span class='pageBtn pre "+preStatus+"'>上一页</span>");
    var next = $("<span class='pageBtn next "+nextStatus+"' >下一页</span>");
    var searchBtn = $("<button>跳转</button>");
    var searchContent = $("<span class='pageBtn search'></span>");
    searchContent.append(searchIpt).append(searchBtn);
    $(pre).bind("click",function(){
        if(preStatus){
            return false;
        }
        that.index--;
        jsPage(preObj);
    });
    $(next).bind("click",function(){
        if(nextStatus){
            return false;
        }
        that.index++;
        jsPage(nextObj);
    });
    $(searchBtn).bind("click",function(){
        var newIndex = $(searchIpt).val();
        searchObj.index =newIndex;
        that.index = newIndex;
        jsPage(searchObj);
    });
    pageFoot.append(allPageNum).append(pre).append(pageNum).append(next).append(searchContent);
    $(el).append(content);
    $(el).append(pageFoot);
    
    allPageNum.css({
        fontSize:"12px",
        marginLeft:"5px"
    });
    searchContent.css({
        width:"auto"
    });
    searchIpt.css({
        width: "auto",
        height:"100%",
        border: "1px solid #333",
        outlineStyle:"none",
        color: "#333",
        textAlign: "center",
        verticalAlign: "middle",
        fontSize:"12px"
    });
    searchBtn.css({
        width: "50px",
        height: "100%",
        textAlign: "center",
        lineHeight:" 17px",
        fontSize: "12px",
        background: "transparent",
        border: "none",
        verticalAlign: "middle",
        color:"#333",
        fontSize:"12px",
        cursor:"pointer"
    });
    if(!obj.format){
        obj.format = function(res,index){
            return "<span>"+data[i]+"</span>";
        }
    }
    for(var i=(parseInt(pageIndex-1)* parseInt(that.num));i<(parseInt(pageIndex) * parseInt(that.num));i++){
        if(!data[i]){
            return false;
        }
        var domLi = obj.format(data[i],i) ;
        content.append(domLi);
    }
    return that.index;
}
