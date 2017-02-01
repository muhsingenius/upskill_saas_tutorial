/* global $, Stripe, stripeResponseHandler */
//document ready
$(document).on('turbolinks:load', function(){

  var theForm = $('#pro_form');  
  var submitBtn =  $('#form-submit-btn');

  //Set stripe publick key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  //When user click form submit form, prevent default behavior
  submitBtn.click(function(even){
    even.preventDefault();
    submitBtn.val("processing").prop('disabled', true);
    
     //Collect credit card fields
     var ccNum = $('#card_number').val(), 
     cvcNum = $('#card_code').val(),
     expMonth = $('#card_month').val(),
     expYear = $('#card_year').val();
     
     //Use stripe.js library to handle errors
     var error = false;
     
     //validate card numbers
     if(!Stripe.card.validateCardNumber(ccNum)){
       error = true;
       alert("The credit card number is invalid");
     }
     if(!Stripe.card.validateCVC(cvcNum)){
       error = true;
       alert("The CVCnumber is invalid");
     }
     if(!Stripe.card.validateExpiry(expMonth, expYear)){
       error = true;
       alert("The expiration date is invalid");
     }
     
     if(error){
       //thery are card errors, dont send card details to stripe
       submitBtn.prop('disabled', false).val('Sign Up')
     }
     else{
       //send card info to stripe
       
       Stripe.createToken({
         number: ccNum,
         cvc: cvcNum,
         exp_month: expMonth,
         exp_year: expYear
       }, stripeResponseHandler);
     }
     
     return false;
  });
  
    //stripe will return back a card token
 function stripeResponseHandler(status, response){
   var token = response.id; ///get token from the response
   
   //inject the card token in a hidden field in the form
   theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
   
 }
  //submit form to rails app
  theForm.get(0).submit();
});