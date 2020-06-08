class SessionsController < ApplicationController 
    def create 
        user = User.find_by(username: params[:user_name])  
        #binding.pry 
        if !params.empty? && user   
            if user.authenticate(params[:password]) 
                render json: {user: {userName: user.username, email: user.email} }
                session[:user_id] = user.id
            else
                render json { status: "error", message: "no good password"}
            end
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