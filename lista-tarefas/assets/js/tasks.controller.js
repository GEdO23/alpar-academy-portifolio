// @ts-nocheck
window.app.controller('TaskController', function ($scope, $filter, TaskService) {
    $scope.isModalActive = false;
    $scope.showCompletedOnly = false;
    $scope.showIncompletedOnly = false;
    $scope.showTodayOnly = false;
    $scope.today = new Date().toLocaleDateString()

    $scope.tasks = TaskService.getTasks();

    $scope.toggleModal = () => {
        $scope.isModalActive = !$scope.isModalActive;
    }

    $scope.taskInput = {
        title: '',
        date: ''
    }

    $scope.filteredTasks = function () {
        let filteredTasks = $filter('filter')(
            $scope.tasks,
            $scope.showCompletedOnly ? { isChecked: true } : {}
        );

        filteredTasks = $filter('filter')(
            filteredTasks,
            $scope.showIncompletedOnly ? { isChecked: false } : {}
        );

        if ($scope.showTodayOnly) {
            const start = new Date();
            start.setHours(0, 0, 0, 0);
            const end = new Date();
            end.setHours(23, 59, 59, 999);

            filteredTasks = filteredTasks.filter(task => {
                const date = new Date(task.date);
                return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
            })
        }

        return filteredTasks;
    }


    $scope.handleSubmitAddTask = () => {
        const title = $scope.taskInput.title;
        const date = $scope.taskInput.date;
        if (!title || !date) return;

        TaskService.addTask(title, date);

        $scope.toggleModal();
        $scope.taskInput.title = '';
        $scope.taskInput.date = '';
    }

    $scope.toggleCheckedTask = () => {
        TaskService.toggleCheckedTask();
    }

    $scope.deleteTask = (currentTask) => {
        TaskService.removeTask(currentTask.id);
        $scope.tasks = TaskService.getTasks();
    }
})