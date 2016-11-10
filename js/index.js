//固定宽高
window.onload=function(){
	var left=document.querySelector('.left-content');
	var right=document.querySelector('.right-content');
	var leftT=document.querySelector('.left-title');
	
	left.style.height=document.documentElement.clientHeight-leftT+'px';
	right.style.height=document.documentElement.clientHeight-leftT+'px';
}

var todo=[
    {
    	id:1,
    	title:"新列表1",
    	color:"#FF8400",
    	list:[{
    		title:"mmmmmmmm",
    		done:false
    	},
    	{
    		title:"mmmmmmmm",
    		done:false
    	},
    	{
    		title:"mmmmmmmm",
    		done:false
    	},
    	{
    		title:"mmmmmmmm",
    		done:false
    	}]
    },
    {
    	id:2,
    	title:"新列表2",
    	color:"#CC72E1",
    	list:[{
    		title:"mmmmmmmm",
    		done:true
    	},
    	{
    		title:"mmmmmmmm",
    		done:false
    	},
    	{
    		title:"mmmmmmmm",
    		done:false
    	},
    	{
    		title:"mmmmmmmm",
    		done:false
    	}]
    },
    {
    	id:3,
    	title:"新列表3",
    	color:"#61D937",
    	list:[{
       		title:"mmmmmmmm",
    		done:false
    	},
    	{
    		title:"mmmmmmmm",
    		done:false
    	},
    	{
    		title:"mmmmmmmm",
    		done:true
    	},
    	{
    		title:"mmmmmmmm",
    		done:true
    	}]
    }
]
var colors=["#FF8400","#CC72E1","#61D937","#1BACF8","#F7CA00","#A0815C","#FF2967"];
var icloud=angular.module('icloud',[]);
icloud.controller('iclouds',function($scope,localStg){
	// $scope.todo=todo;
	$scope.todo=localStg.getData("todo");
    $scope.index=$scope.todo.length-1;
    $scope.flag=false;
    $scope.optflag=false;
    $scope.colors=colors;
    $scope.changeTitle=$scope.todo[$scope.index].title;
    $scope.changeColor=$scope.todo[$scope.index].color;
    $scope.check =function(i){
        		$scope.index=i;
        		$scope.changeTitle=$scope.todo[$scope.index].title;
                $scope.changeColor=$scope.todo[$scope.index].color;
                $scope.optflag=false;
    }
    $scope.doneNums=0;
    $scope.getdoneNums=function(){
    	$scope.doneNums=0;
    	var list =$scope.todo[$scope.index].list;
    	angular.forEach(list,function(v,i){
    		if (v.done) {
    			$scope.doneNums++;
    		}
    	})
    }
    $scope.getdoneNums();
    $scope.addlist=function(){
    	$scope.todo[$scope.index].list.push({
    		title:'',
    		done:false
    	})
    	localStg.saveData('todo',$scope.todo)
    }
	$scope.addItem=function(){
		$scope.ids=$scope.todo[$scope.todo.length-1].id+1;
		$scope.index=$scope.todo.length;
		$scope.todo.push({
			id:$scope.ids,
			title:'新列表'+$scope.ids,
			color:colors[$scope.todo.length%7],
			list:[]
		})
		localStg.saveData('todo',$scope.todo)
	}
	$scope.set=function(o,f){
		o.done=f;
		$scope.getdoneNums();
		localStg.saveData('todo',$scope.todo)
	}
	$scope.change=function(o,text){
		o.title=text.target.innerHTML;
		localStg.saveData('todo',$scope.todo)
	}
	$scope.clearCom=function(){
		var list=$scope.todo[$scope.index].list;
		var arr=[];
		angular.forEach(list,function (v,i){
           if (v.done==false) {
           	arr.push(v);
           };
		})
		$scope.todo[$scope.index].list=arr;
		$scope.getdoneNums();
		$scope.flag=false;
		localStg.saveData('todo',$scope.todo);
	}
	$scope.sColor=function (c) {
        $scope.changeColor=c;
    }
    $scope.comChange=function () {
      var o=$scope.todo[$scope.index];
        o.title=$scope.changeTitle;
        o.color=$scope.changeColor;
        $scope.optflag=false;
        localStg.saveData('todo',$scope.todo);
    }
    $scope.delList=function () {

        $scope.todo.splice($scope.index,1);
        $scope.index=$scope.todo.length-1;
        $scope.optflag=false;
        localStg.saveData('todo',$scope.todo);
    }
	$scope.$watch('index',function(){
    	$scope.getdoneNums();
    	$scope.flag = false;
    })
    
    
})
icloud.factory('localStg',function(){
    	return {
    		getData:function(key){
    			var a=localStorage.getItem(key);
    			return a==null?[]:JSON.parse(a);
    		},
    		saveData:function(key,data){
    		localStorage.setItem(key,JSON.stringify(data));
    		},
    		delData:function(key){
    			localStorage.removeItem(key);
    		}
    	}
    })
