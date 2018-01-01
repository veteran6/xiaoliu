//步骤
//1、展示数据
//2、添加数据
//3、删除单个任务
//4、更改单个任务状态
//5、计算总任务数 增加筛选功能 all所有便签 active 未完成的便签  Completed已完成的便签
//6、清除已完成的任务
//7、批量更改任务状态
//8、修改任务名称
angular.module('myApp',[])
    .controller('demoCtrl',['$scope','$http',function($scope,$http){
        // //1、展示数据

        //---------通过ajax获取数据
        // //先创建一个数组用来存数据
        // $scope.taskList=[]
        // //从存储中获取数据
        // $http({
        //     url:'./js/data.json',
        //     method:'get'
        // }).then(function(res){
        //     $scope.taskList=res.data;
        // })
        //----------通过h5的localStorage本地储存，获取本地浏览器储存的值
        //需要$scope.$watch监听
        $scope.$watch('taskList',function(){
            //存储
            localStorage.setItem('taskList',angular.toJson($scope.taskList))
        },true)
        $scope.taskList=[]
        //调用
        getTask()
        //获取
        function getTask(){
            if(localStorage.getItem('taskList')){
                $scope.taskList=angular.fromJson(localStorage.getItem('taskList'))
            }
        }
        //通过指令ng-repeat循环渲染页面

        //2、添加数据  需要通过指令ng-submit提交表单数据，通过ng-model绑定input，然后追加到数组中

        $scope.submitTask=function(){
            if($scope.task){
                $scope.taskList.push({
                    id:Math.random(),
                    name:$scope.task,
                    isCompleted:false
                })
                $scope.task=''
                localStorage.setItem('taskList',angular.toJson($scope.taskList))
            }else{
                alert('情输入任务名称')
            }
        }
        //3、删除单个任务
            //通过Id查找当前这条数据
        $scope.deleteTask=function(id){
            for (var i = 0; i < $scope.taskList.length; i++) {
                if($scope.taskList[i].id==id){
                    //从数组中删除
                    $scope.taskList.splice(i,1)
                }
            }
        }

        //4、更改单个任务状态
            //通过isComplete的值来操作class
            //给input绑定ng-model
            //绑定事件ng-change
        // $scope.alterStatus=function(){

        //     for (var i = 0; i < $scope.taskList.length; i++) {
        //         $scope.taskList[i].isCompleted=$scope.status
        //     }
        // }
        // 由于7的逻辑，这里需要调整
            // $scope.alterStatus=function(){
            
            // for (var i = 0; i < $scope.taskList.length; i++) {
            //    if(!$scope.taskList[i].isCompleted){
            //         $scope.status=false;
            //         return;
            //         }
            //     }
            //     $scope.status=true;
            // }

        //5、计算总任务数，增加筛选功能 all所有便签 active 未完成的便签
            //计算总未完成的任务数
        $scope.calcNumber = function(){
            var count=0;
            for (var i = 0; i < $scope.taskList.length; i++) {
                if(!$scope.taskList[i].isCompleted){
                    count++;
                }
            }
            return count;
        }
            //筛选功能
        $scope.condition = '';
        $scope.filterTask=function(type){
            switch(type){
                case 'All':
                    $scope.condition = '';
                    break;
                case 'Active':
                    $scope.condition = false;
                    break;
                case 'Completed':
                    $scope.condition = true;
                    break;
            }
        }
        //6、清楚已完成的任务
        $scope.clearAlready = function(){
            for (var i = 0; i < $scope.taskList.length; i++) {
                if($scope.taskList[i].isCompleted){
                    $scope.taskList.splice(i,1)
                    i--;
                }
            }
        }
        //7、批量更改任务状态
        $scope.changeStatus = function(){
            for (var i = 0; i < $scope.taskList.length; i++) {
                $scope.taskList[i].isCompleted=$scope.status
            }
        }
        //由于业务需要，更改单个任务的状态，放在这里处理
        $scope.changeLight=function(){
            
            for (var i = 0; i < $scope.taskList.length; i++) {
               if(!$scope.taskList[i].isCompleted){
                    $scope.status=false;
                    return;
                }
            }
            $scope.status=true;
        }
        //8、修改任务名称
        $scope.modifyData = function(id){
            for (var i = 0; i < $scope.taskList.length; i++) {
                if($scope.taskList[i].id==id){
                    $scope.taskList[i].isEdit = true;
                }else{
                    $scope.taskList[i].isEdit = false;
                }
            }
        }
        $scope.blurFn = function(){
            for (var i = 0; i < $scope.taskList.length; i++) {
                $scope.taskList[i].isEdit=false
            }
        }




    }])