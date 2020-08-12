class TemplatesController < ApplicationController

    #would have liked to discard expenses and incomes that are blank but update the rest of them
    def create       
        user = User.find_by(id: session[:user_id])
        if user
            template = user.templates.create(template_params)
            
            if template.save
                #binding.pry
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
        template = Template.find_by(id: template_params[:id])
        #template_params[:id]
        if template 
            template.update(template_params)
            #binding.pry
            # params.template.relationships.expense.data.each do |e|
            #     template.expenses.find_or_create_by(id: e.id)
                #if found update
            # end
            # template.update(title: params[:title], total_incomes: params[:total_income], total_expenditure: params[:total_expenditure], total_difference: params[:total_difference])
            #render json: template
            template.save
            if template
                options = { include: [:incomes, :expenses]}
                render json: TemplateSerializer.new(template, options).serialized_json
            else
            render json: {status: "error", code: 3000, message: "Unable to update template"}
            #template.expenses.update(params[:expenses])
            #template.incomes.update(params[:incomes])

            #updates everytime an attribute is changed and user moves away from changed form field  ?
        else
            render json: {status: "error", code: 3000, message: "Unable to find template"}
        end
    end

    def destroy 
        t = Template.find_by(id: params[:id])
        t.destroy
        render json: { message: "Budget #{params[:id]} is destroyed"}
    end

    private 
    #nested strong params
    def template_params
        params.require(:template).permit(:id, :title, :total_income, :total_expenditure, :total_difference, expenses_attributes: [:description, :amount], incomes_attributes: [:description, :amount])
    end
end
