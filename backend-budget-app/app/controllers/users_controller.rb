class UsersController < ApplicationController
    def create 
        #binding.pry
        user = User.create(user_params)

        #binding.pry
        if user.save
            render json: UserSerializer.new(user)
            session[:user_id] = user.id
        else
            render json: {message: user.errors.messages }
        end
    end

    def show 
        find_user
        render json: @user
    end

    private 

    def user_params
        params.require(:user).permit(:username, :email, :password)
    end

    def find_user 
        @user = User.find(params[:id])
    end
end
