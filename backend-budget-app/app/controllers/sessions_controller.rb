class SessionsController < ApplicationController 
    def create 
        if !params.empty? && user = User.find_by(username: params[:username])       
            render json: user
        else
            render json: { status: "error", code: 3000, message: "can not find user" }
        end
    end 

    def destroy 
        
    end

    private 

    #def user_params
     #   params.require(:user).permit(:username, :email, :password)
    #end
end