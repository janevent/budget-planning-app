class TemplatesController < ApplicationController

    #would have liked to discard expenses and incomes that are blank but update the rest of them
    def create       
        #user = User.find_by(id: params[:id])
        user = User.find_by(id: session[:user_id])
        #user = current_user
        #binding.pry
        if user
            template = user.templates.find_or_create_by(id: template_params[:id])
            #binding.pry
            #template = Template.find_or_create_by(id: template_params[:id])
            #id: params[:id]
            template.update(template_params)
            # template.update(user_id: session[:user_id])
            # template_params[:expenses].map do |expense|
            #     e = Expense.find_or_create_by(id: expense.id)
            #     e.update(expense)
            # end

            # if user && template 
            #     template.update(template_params)
            # end
            
            # template = user.templates.create(title: params[:template][:title])
            #template = user.templates.create(template_params)
            #binding.pry
            if template.save
                # exes = template_params[:expenses].map do | expense |
                #   x = template.expenses.create(expense)
                #   x.save
                #end

                # expenses = template.expenses.create(params[:template][:expenses])
                # incomes = template.incomes.create(params[:template][:incomes])
                options = { include: [:expenses, :incomes]}
                render json: TemplateSerializer.new(template, options).serialized_json
            else
                render json: {status: "error", code: 3000, message: "Template is not valid"}
            end
        else
            render json: {status: "error", code: 3000, message: "Can not find user"}
        end
        #error messages if no user or invalid template
    end 

    def show 
        template = Template.find_by(id: params[:id]) 
        options = { include: [:expenses, :incomes] }
        if template
            render json: TemplateSerializer.new(template, options)
        else
            render json: { status: "error", code: 3000, message: "Can not find template"}
        end
    end 

    def index 
        user = User.find_by(id: params[:id])
        if user
           templates = user.templates
        end
        
        #if user && budgets 
        if templates
            render json: TemplateSerializer.new(templates)
        else 
            render json: { status: "error", code: 3000, message: "Can not find user or templates."}
        end
    end

    def update 
        template = Template.find_by(id: params[:id])
        #template_params[:id]
        if template 
            template.update(template_params)
            #binding.pry
            params.template.relationships.expense.data.each do |e|
                template.expenses.find_or_create_by(id: e.id)
                #if found update
            end
            # template.update(title: params[:title], total_incomes: params[:total_income], total_expenditure: params[:total_expenditure], total_difference: params[:total_difference])
            #render json: template
            options = { include: [:incomes, :expenses]}
            render json: TemplateSerializer.new(template, options).serialized_json

            #template.expenses.update(params[:expenses])
            #template.incomes.update(params[:incomes])

            #updates everytime an attribute is changed and user moves away from changed form field  ?
        else
            render json: {status: "error", code: 3000, message: "Unable to find template"}
        end
    end

    def destroy 
    end

    private 
    #nested strong params
    def template_params
        params.require(:template).permit(:id, :title, :total_income, :total_expenditure, :total_difference, expenses_attributes: [:description, :amount], incomes_attributes: [:description, :amount])
    end
end
