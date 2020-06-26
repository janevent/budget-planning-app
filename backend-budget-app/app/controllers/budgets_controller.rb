class BudgetsController < ApplicationController

    def create 
        user = User.find_by(id: session[:user_id])
        if user
            #binding.pry
            budget = user.budgets.create_or_find_by(id: budget_params[:id])
            budget.update(budget_params)
            if budget.save
                options = { include: [:expenses, :incomes]}
                render json: BudgetSerializer.new(budget, options).serialized_json
            else
                render json: {status: 'error', code: 3000, message: 'Can not find or create budget'}
            end
        else
            render json: {status: 'error', code: 3000, message: 'can not find user'}
        end
    end 

    def show 
        budget = Budget.find_by(id: params[:id]) 
        if budget
            options = { include: [:expenses, :incomes] }
            render json: BudgetSerializer.new(budget, options).serialized_json
        else
            render json: { status: "error", code: 3000, message: "Can not find budget"}
        end
    end 

    def index 
        #user = User.find_by(id: params[:id])
        #if user
         #   budgets = user.budgets
        #end
        budgets = Budget.all
        #if user && budgets 
        if budgets
            render json: BudgetSerializer.new(budgets)
        else 
            render json: { status: "error", code: 3000, message: "Can not find user or budgets."}
        end
    end

    def update 
        budget = Budget.find_by(id: params[:id])
        if budget 
            budget.update(title: params[:title], total_incomes: params[:total_income], total_expenditure: params[:total_expenditure], total_difference: params[:total_difference])
            render json: budget
            # options = { include: [:incomes, :expenses]}
            #render BudgetSerializer.new(budget, options)

            #updates everytime an attribute is changed and user moves away from changed form field  ?
        else
            render json: {status: "error", code: 3000, message: "Unable to find budget"}
        end
    end

    def destroy 
    end

    private 

    def budget_params
        params.require(:budget).permit(:id, :title, :total_expenditure, :total_income, :total_difference, incomes_attributes: [:description, :amount], expenses_attributes: [:description, :amount])
    end

end
