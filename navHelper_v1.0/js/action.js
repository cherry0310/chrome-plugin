var tips=5;//--------------------------------------通过接口获得------------------------------------
//获取页面基本信息	
var winid=0;
var tabid=0;
var taburl="";	
chrome.windows.getCurrent(function(win){winid=win.id});
chrome.tabs.getSelected(function(tabs){taburl=tabs.url});

//显示与我相关的问题数量
function showSpan(){
	if(tips!=0){
		var li7_a=document.getElementById("li7_a");
		var li7_span=document.createElement("span");
		li7_span.setAttribute("id","li7_span");
		li7_span.innerHTML=tips;		
		li7_a.appendChild(li7_span);
	}
}
//文档加载完毕之后执行
$(document).ready(function(){	
	//点击菜单1-6滑动事件
	$("#li2").click(function(){
		$("#main_channel").slideToggle();
	});
	$("#li3").click(function(){
		$("#tool").slideToggle();
	});
	$("#li4").click(function(){
		$("#channel_examine").slideToggle();
	});
	$("#li5").click(function(){
		$("#content_update").slideToggle();
	});
	$("#li6").click(function(){
		$("#others").slideToggle();
	});
	
	//获取问题数量
	$.ajax({ 
		type: "get", 
        url: "http://abc.ci123.com/admin/tech/question/wait_copy.php?rid="+Math.random, 
        dataType: "json", 
        success: function (data) { 		   
					//console.log(data.problem_num); 
					tips=data.problem_num;
					showSpan();	
				}, 
        error: function (XMLHttpRequest, textStatus, errorThrown) { 
					tips=-1;//获取数据失败
				} 
    });	
	//点击“与我相关的问题”事件
	
	$("#li7").click(function(){			
		if(tips!=0&&tips!=-1){
			var li7_a=document.getElementById("li7_a");			
			var li7_span=document.getElementById("li7_span");		
			li7_a.removeChild(li7_span);		
		}
		$.getJSON("http://abc.ci123.com/admin/tech/plugin/server.php?rid="+Math.random(),{action:'openname'},function(data){
			console.log(data);	
			chrome.tabs.create({windowId:winid,url:"http://abc.ci123.com/admin/tech/question/wait_for_dealing.php?cpage=openname&openname="+data.url_openname+"&type=1",selected:true},function(tab){tabid=tab.id});						
		});		
	});
	//点击“反馈问题”事件
	$("#submit_error").click(function(){	
		//alert("当前发生问题的链接是:"+taburl);
		var targetUrl="http://abc.ci123.com/admin/tech/question/question_add.php?problemUrl="+taburl;
		chrome.tabs.create({windowId:winid,url:targetUrl,selected:true},function(tab){tabid=tab.id});
	});
	//2.main_list主要频道（5个）
	var main_list=[
		"http://bbs.ci123.com/",
		"http://ask.ci123.com/",
		"http://blog.ci123.com/",
		"http://baobao.ci123.com/",
		"http://qq.ci123.com/"];
	var sub_list2=$("#main_channel li a");
	for(var i=0;i<main_list.length;i++){
		(function(){
			var node = sub_list2[i];
			var target_url=main_list[i];
			node.onclick=function(){chrome.tabs.create({windowId:winid,url:target_url,selected:true},function(tab){tabid=tab.id});};
		})();
	}
	//3.tool_list工具性后台（37个）
	var sub_list3=$("#tool li a");
	$.getJSON("http://abc.ci123.com/admin/tech/plugin/server.php?rid="+Math.random(),{action:'tool'},function(data){
		//console.log(data);	
		for(var i=0;i<data.length;i++){
			(function(){
			var node = sub_list3[i];
			var target_url=data[i].url;
			node.onclick=function(){chrome.tabs.create({windowId:winid,url:target_url,selected:true},function(tab){tabid=tab.id});};
			})();
		}
	});
	//4.channel_list小频道审核后台（14个）
	var sub_list4=$("#channel_examine li a");
	$.getJSON("http://abc.ci123.com/admin/tech/plugin/server.php?rid="+Math.random(),{action:'channel'},function(data){
		//console.log(data);	
		for(var i=0;i<data.length;i++){
			(function(){
			var node = sub_list4[i];
			var target_url=data[i].url;
			node.onclick=function(){chrome.tabs.create({windowId:winid,url:target_url,selected:true},function(tab){tabid=tab.id});};
			})();
		}
	});
	//5.content_list内容更新后台（25个）
	var sub_list5=$("#content_update li a");
	$.getJSON("http://abc.ci123.com/admin/tech/plugin/server.php?rid="+Math.random(),{action:'content'},function(data){
		//console.log(data);	
		for(var i=0;i<data.length;i++){
			(function(){
			var node = sub_list5[i];
			var target_url=data[i].url;
			node.onclick=function(){chrome.tabs.create({windowId:winid,url:target_url,selected:true},function(tab){tabid=tab.id});};
			})();
		}
	});
	//6.others_list其他网站（25个）
	var others_list=[
		"http://www.yaolan.com/",
		"http://www.iyaya.com/",
		"http://www.babytree.com/",
		"http://baby.sina.com.cn/",
		"http://baby.qq.com/",
		"http://baobao.sohu.com/",
		"http://www.pcbaby.com.cn/",
		"http://www.taijiaobb.cn/",
		"http://www.iyun.com/",
		"http://rayli.com.cn/",
		"http://www.pclady.com.cn/",
		"http://eladies.sina.com.cn/",
		"http://women.sohu.com/",
		"http://lady.163.com/",
		"http://www.lady8844.com/",
		"http://www.onlylady.com/",
		"http://www.51yes.com/",
		"http://tool.chinaz.com/",
		"http://tool.ci123.com/route.php",
		"https://mail.google.com/a/corp-ci.com",
		"https://docs.google.com/a/corp-ci.com",
		"http://www.google.com/reader/view/?hl=zh-CN",
		"http://www.google.com/trends",
		"http://index.baidu.com/",
		"http://www.weather.com.cn/html/weather/101190101.shtml"
	];
	var sub_list6=$("#others li a");
	for(var i=0;i<others_list.length;i++){
		(function(){
			var node = sub_list6[i];
			var target_url=others_list[i];
			node.onclick=function(){chrome.tabs.create({windowId:winid,url:target_url,selected:true},function(tab){tabid=tab.id});};
		})();
	}
	
}); 
