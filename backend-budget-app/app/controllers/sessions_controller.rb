class SessionsController < ApplicationController 
    def create 
        user = User.find_by(username: user_params.username)
        if user && user.authenticate
            render json: user
        end 
    end 

    def destroy 
        
    end

    private 

    def user_params
        params.require(:user).permit(:username, :email, :password)
    end
end