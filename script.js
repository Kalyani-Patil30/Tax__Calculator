$(document).ready(function() {
  // Initialize tooltips
  $('[data-toggle="tooltip"]').tooltip();

  $(document).ready(function(){
    // Initialize tooltip
    $('[data-toggle="tooltip1"]').tooltip();
});

$(document).ready(function(){
  // Initialize tooltip
  $('[data-toggle="tooltip2"]').tooltip();
});

$(document).ready(function(){
  // Initialize tooltip
  $('[data-toggle="tooltip3"]').tooltip();
});

$(document).ready(function(){
  // Initialize tooltip
  $('[data-toggle="tooltip4"]').tooltip();
});
  
$(document).ready(function(){
  $('#taxForm').submit(function(e) {
      var inputValue = $('#grossIncome').val();
      if(!/^\d+$/.test(inputValue)) {
          e.preventDefault(); // Prevent form submission
          $('#errorMsg').text('Please enter only numbers.').show();
      }
  });

  $('#grossIncome').on('input', function() {
      var inputValue = $(this).val();
      if(/^\d+$/.test(inputValue)) {
          // Input contains only numbers
          $('#errorMsg').hide();
          $(this).removeClass('invalid').addClass('valid');
      } else {
          // Input contains characters other than numbers
          $('#errorMsg').text('Please enter only numbers.').show();
          $(this).removeClass('valid').addClass('invalid');
      }
  });
});



  $('#taxForm').submit(function(e) {
    e.preventDefault(); // Prevent form submission

    // Check if age is selected
    var age = $('#age').val();
    if (age === "") {
      $('.age-error').css('display', 'inline-block').attr('title', 'Age is mandatory');
      return;
    } else {
      $('.age-error').css('display', 'none');
    }

    // Fetch input values
    var grossIncome = parseFloat($('#grossIncome').val());
    var extraIncome = parseFloat($('#extraIncome').val());
    var deductions = parseFloat($('#deductions').val());

    // Validate input values
    if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions)) {
      $('.input-group').addClass('has-error');
      return;
    } else {
      $('.input-group').removeClass('has-error');
    }

    // Calculate total income after deductions
    var totalIncome = grossIncome + extraIncome - deductions;

    // Calculate tax based on age and income
    var taxRate = 0;
    if (age === "<40") {
      taxRate = totalIncome > 800000 ? 0.3 : 0;
    } else if (age === "≥ 40 & < 60") {
      taxRate = totalIncome > 800000 ? 0.4 : 0;
    } else if (age === "≥ 60") {
      taxRate = totalIncome > 800000 ? 0.1 : 0;
    }


    // Calculate tax amount
    var taxAmount = totalIncome > 800000 ? (totalIncome - 800000) * taxRate : 0;

    // Show modal with tax calculation result
    $('#taxResult').text(" Amount: " + taxAmount.toFixed(2));
    $('#taxModal').modal('show');
  });
});
$(document).ready(function(){
  // Attach click event listener to the close button
  $('.close').click(function(){
      // Programmatically dismiss the modal
      $('#taxModal').modal('hide');
  });
});