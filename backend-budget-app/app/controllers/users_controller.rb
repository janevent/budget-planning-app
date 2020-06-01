class UsersController < ApplicationController
    def create 
    end

    def show 
        find_user
        render json: @user
    end

    private 

    def find_user 
        @user = User.find(params[:id])
    end
end
