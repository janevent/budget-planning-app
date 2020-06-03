class TemplatesController < ApplicationController
    def create 
        user = User.find_by(id: params[:id])
        if user
            template = user.templates.create(title: params[:template][:title])
            if template
                expenses = template.create.expenses(params[:template][:expenses])
                incomes = template.create.incomes(params[:template][:incomes])
                options = { include: [:expenses, :incomes]}
                render json: TemplateSerializer.new(template, options)
            else
                render json: {status: "error", code: 3000, message: "Template is not valid"}
            end
        else
            render json: {status: "error", code: 3000, message: "Can not find template"}
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
        if template 
            template.update(title: params[:title], total_incomes: params[:total_income], total_expenditure: params[:total_expenditure], total_difference: params[:total_difference])
            render json: template
            # options = { include: [:incomes, :expenses]}
            #render TemplateSerializer.new(template, options)

            #template.expenses.update(params[:expenses])
            #template.incomes.update(params[:incomes])

            #updates everytime an attribute is changed and user moves away from changed form field  ?
        else
            render json: {status: "error", code: 3000, message: "Unable to find template"}
        end
    end

    def destroy 
    end
end
