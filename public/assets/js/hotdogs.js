
$(document).ready(function() {
    $('#table_list').DataTable();
} );

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {


  $(".change-eaten").on("click", function(event) {
    var id = $(this).data("id");
    var devoured = $(this).data("devoured");

    var devouredState = {
      devoured: devoured
    };

    $.ajax("/api/hotdogs/" + id, {
      type: "PUT",
      data: devouredState
    }).then(
      function() {
        console.log("changed eaten to", devoured);
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();

    var Data_collect = {
      First_name : $("#First_name").val().trim(),
      Last_name : $("#Last_name").val().trim(),
      Born : $("#Born").val().trim(),
    };

    $.ajax("/insert_data", {
      type: "POST",
      data: Data_collect
    }).then(
      function() {
        // console.log("created new hotdog");
        
        setTimeout(function(){ location.reload(); }, 2000);
      }
    );
  });

    $(".update-form").on("submit", function(event) {
    event.preventDefault();

    var Data_collect = {
      Master_id : $("#Master_id").val().trim(),
      First_name : $("#First_name_update").val().trim(),
      Last_name : $("#Last_name_update").val().trim(),
      Born : $("#Born_update").val().trim(),
    };

    $.ajax("/update_data", {
      type: "POST",
      data: Data_collect
    }).then(
      function() {
        // console.log("created new hotdog");
        // location.reload();
        setTimeout(function(){ location.reload(); }, 2000);
      }
    );
  });

  $(".delete-hotdog").on("click", function(event) {
    var id = $(this).data("id");

    $.ajax("/api/hotdogs/" + id, {
      type: "DELETE",
    }).then(
      function() {
        console.log("deleted hotdog", id);
        // location.reload();
      }
    );
  });





});
