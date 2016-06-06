$('.edit').on("click", function() {
  var $editButton = $(this);
  var id = $editButton.attr("id").slice(-1);

  var $item = $(this).parent();

  var $editInput = $("<input type=\"text\"></input>");
  var $saveButton = $("<input type=\"submit\" class=\"save\" value=\"Submit\">");

  $item.append($editInput);
  $item.append($saveButton);

  $saveButton.on("click", function() {
    $.ajax({
      url: 'quotes',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(
      {
        "id": id,
        "name": $item.children(":first").text(),
        "quote": $editInput.val()
      }
      )
    });
  });

  $(this).remove();
});
