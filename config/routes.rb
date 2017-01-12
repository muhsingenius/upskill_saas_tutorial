Rails.application.routes.draw do
  root to: 'pages#home'
  get 'about', to: 'pages#about'
  
  resources :contacts, only: :create
  #custom url for contact form
  get 'contact-us', to: 'contacts#new', as: 'new_contact'
end
