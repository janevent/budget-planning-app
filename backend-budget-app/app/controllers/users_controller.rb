class UsersController < ApplicationController
    def create 
        #binding.pry
        user = User.create(user_params)
    #binding.pry
        if user.valid?
            render json: UserSerializer.new(user)
        else
            render json: {message: "can not create user"}
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
