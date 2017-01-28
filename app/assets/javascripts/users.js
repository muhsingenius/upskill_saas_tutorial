/* global $, Stripe, stripeResponseHandler */
//document ready
$(document).on('turbolinks:load', function(){

  var thForm = $('#pro_form');  
  var submitBtn =  $('#form-submit-button');

  //Set stripe publick key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  //When user click form submit form, prevent default behavior
  submitBtn.click(function(even){
    even.preventDefault();
    
     //Collect credit card fields
     var ccNum = $('#card_number').val(), 
     cvcNum = $('#card_code').val(),
     expMonth = $('#card_month').val(),
     expYear = $('#card_year').val();
     
     //send card info to stripe
     
     Stripe.createToken({
       number: ccNum,
       cvc: cvcNum,
       exp_month: expMonth,
       exp_year: expYear
     }, stripeResponseHandler);
  });
  
  
 
  //stripe will return back a card token
  //Inject card token as hidden form
  //submit form to rails app

});