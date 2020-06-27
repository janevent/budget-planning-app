const addTemplateData = (tem, expenses, incomes) => {
    return {
        type: 'ADD_TEMPLATE_DATA',
        template: tem,
        expenses: expenses,
        incomes: incomes
    }
}

export default addTemplateData;