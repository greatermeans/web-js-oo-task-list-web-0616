'use strict';
// Tasks Controller
function TasksController(){
  this.$addTaskForm = $('#add_task');
  this.$selectListMenu = $('#select_list');
  this.$taskDescriptionInput = $('#task_description');
  this.$taskPriorityInput = $('#task_priority');
  this.$wrapper = $('#wrapper');
}

TasksController.prototype.addTaskFormListener = function(){
  var self = this;
  this.$addTaskForm.submit(function(event) {
    event.preventDefault();
    var listId = parseInt(self.$selectListMenu.val()),
        taskDescription = self.$taskDescriptionInput.val(),
        taskPriority = self.$taskPriorityInput.val(),
        task = new Task(taskDescription, taskPriority, List.all[listId]);
    task.build();
    self.$taskDescriptionInput.val('');
    self.$taskPriorityInput.val('');
  });
};

TasksController.prototype.destroyListLiveEventListener = function(){
  this.$wrapper.on('click', '.destroy-task', function(){ //live event listener
    var listId = parseInt($(this).parents('ul').data('id')),
        taskId = parseInt($(this).parent('li').data('id')),
        list = List.all[listId];
        list.tasks.splice(taskId, 1);
    $(this).parent('li').remove();
  });
};

TasksController.prototype.init = function() {
  this.addTaskFormListener();
  this.destroyListLiveEventListener();
};