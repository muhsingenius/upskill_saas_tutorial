class ContactsController < ApplicationController 
  
  #Get request to /contact-us
  #Show new contact form
  def new
    @contact = Contact.new  
  end
  
  #POST response to /contacts
  def create   
    #mass asignment of form fields into contact object
    @contact = Contact.new(contact_params)
    #Save the contact object to the database
    if @contact.save
      #store form fields via parameters into variables to be used in mailer
      name = params[:contact][:name]
      email = params[:contact][:email]
      body = params[:contact][:comments]
      #Plug variables into contact mailer email
      #and sent email
      ContactMailer.contact_email(name, email, body).deliver
      
      flash[:success] = "Message Saved"
      redirect_to new_contact_path
    else
      #if contact object doesnt save,
      #store errors in flash hash
      #and redirect to new action
      flash[:danger] = @contact.errors.full_messages.join(", ")
      redirect_to new_contact_path
    end
  end
  
  private   
  #strong parameters to collect data from form fields
  #and whitelist the form for security
    def contact_params
      params.require(:contact).permit(:name, :email, :comments)      
    end

end