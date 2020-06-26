class BudgetsController < ApplicationController

    def create 
        # user = User.find_by(id: params[:id])
        user = User.find_by(id: 1)
        #budget = user.budgets.create(title: params[:title])
        budget = user.budgets.create(title: params[:budget][:title])
        expenses = budget.create.expenses(params[:budget][:expenses])
        incomes = budget.create.incomes(params[:budget][:incomes])
        options = { include: [:expenses, :incomes]}
        render json: BudgetSerializer.new(budget, options)

        #budget is created when user moves away from title field
        #or when user clicks save button 

    end 

    def show 
        budget = Budget.find_by(id: params[:id]) 
        options = { include: [:expenses, :incomes] }
        if budget
            #render json: budget
            render json: BudgetSerializer.new(budget, options)
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

    
end
