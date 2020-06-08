class ApplicationController < ActionController::API
    include ::ActionController::Cookies
        def current_user 
            User.find_by(id: session[:user_id]) #remind dif b/w find & find_by
        end

        def logged_in?
            !!current_user 
        end
end
