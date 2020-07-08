class SessionsController < ApplicationController 

    def create 
        user = User.find_by(username: params[:username])  
        #binding.pry 
        if !params.empty? && user && user.authenticate(params[:password]) 
            #binding.pry
                options = {
                    include: [:templates, :budgets]
                }

                templates = user.templates.map do | template |
                    opT = {
                        include: [:expenses, :incomes]
                    }
                    TemplateSerializer.new(template, opT)
                end
    
                budgets = user.budgets.map do | budget |
                    opB = {
                        include: [:expenses, :incomes]
                    }
                    BudgetSerializer.new(budget, opB)
                end    

                 u = UserSerializer.new(user, options)
            
                session[:user_id] = user.id
                render json: {user: u, budgets: budgets, templates: templates}
        else
            render json: false
        end
    end 

    def get_current_user
        #binding.pry
        if logged_in?
            user = current_user
            options = {
                include: [:templates, :budgets]
            }
           # binding.pry
            templates = user.templates.map do | template |
                opT = {
                    include: [:expenses, :incomes]
                }
                TemplateSerializer.new(template, opT)
            end

            budgets = user.budgets.map do | budget |
                opB = {
                    include: [:expenses, :incomes]
                }
                BudgetSerializer.new(budget, opB)
            end    
            u =  UserSerializer.new(user, options)
            render json: { user: u, templates: templates, budgets: budgets}
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