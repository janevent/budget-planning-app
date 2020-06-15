class SessionsController < ApplicationController 
    def create 
        user = User.find_by(username: params[:user_name])  
        #binding.pry 
        if !params.empty? && user   
            if user.authenticate(params[:password]) 
                options = {
                    include: [:templates, :budgets]
                }
                hash = UserSerializer.new(user, options).serialized_json 
                render json: hash
                session[:user_id] = user.id
            else
                #render json: { error: "no good password"}
                render json: false
            end
        else
            #render json: { status: "error", code: 3000, message: "can not find user" }
            render json: false
        end
    end 

    def get_current_user
        if logged_in?
            user = current_user
            options = {
                include: [:templates, :budgets]
            }
            hash =  UserSerializer.new(user, options).serialized_json
            render json: hash
        else
            render json: false
        end
    end

    def destroy 
        #debugger
        session.clear
        render json: {message: "Logged Out"}
    end

    private 

    #def user_params
     #   params.require(:user).permit(:username, :email, :password)
    #end
end