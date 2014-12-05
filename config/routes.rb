Whattodo::Application.routes.draw do
  root 'welcome#index'
  get "/whattodo" => "welcome#home"
  get "/result/:date/:activity/:money"=>"welcome#matchEvents"
  get "/auth/:provider/callback" => "sessions#create"
  get "/signout" => "sessions#destroy", :as => :signout

  # ttp://api.localhost.com/events
  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do 
      resources :events
      get '/today' => "events#today"
    end
  end

end
