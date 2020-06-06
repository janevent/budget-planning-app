class SessionsController < ApplicationController 
    def create 
        user = User.find_by(username: params[:user_name])  
        #binding.pry 
        if !params.empty? && user    
            render json: {user: {userName: user.username, email: user.email} }
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