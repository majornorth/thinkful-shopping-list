$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var connectedUsers = $('#connectedUsers');
    var userCount = $('#userCount');

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };
    
    var announceUser = function(announcement) {
        connectedUsers.append('<div class="announceUser">' + announcement + '</div>');
        var removeAnnouncement = function() {
          $(".announceUser").remove();
        };
        setTimeout(removeAnnouncement, 2000);
    };
    
    var updateConnectedUsers = function(connectedUsersCount) {
          var currentCount = userCount.text();
          console.log("Current count", currentCount);
          console.log("Updated count", connectedUsersCount);
          userCount.html(connectedUsersCount);
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        addMessage(message);
        socket.emit('message', message);
        input.val('');
    });
    
    socket.on('message', addMessage);
    socket.on('connectedUser', announceUser);
    socket.on('connectedUsersCount', updateConnectedUsers);
});